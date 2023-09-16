import { createConsumer } from "@rails/actioncable"
export class ActorForward {
  constructor({log} = {}) {
    this.actors = {}
    this.queueBumps = []
    this.log = log
  }

  pushBump(bump){
    this.queueBumps.push(bump)
  }

  removeActor(actor){
    const actorDashed = actor.name.split("--").pop()
    const actorCam = this.actorCamelized(actorDashed) + "Actor"
    const index = this.actors[actorCam].indexOf(actor)
    if (index > -1) {
      this.actors[actorCam].splice(index, 1)
    }
  }

  addActor(actor){
    const actorDashed = actor.name.split("--").pop()
    const actorCam = this.actorCamelized(actorDashed) + "Actor"
    if(!this.actors[actorCam]) this.actors[actorCam] = []
    this.actors[actorCam].push(actor)
    this.mainActor = actor.isMain && actor
  }

  getActor(componentCssClass, actorDashed, {resourceId} = {}){
    resourceId = resourceId || false
    const actorCam = this.actorCamelized(actorDashed)
    const actorsArray = this.actors[actorCam]
    if(!actorsArray) return false
    return actorsArray.find(actor => (actor.name == componentCssClass) && (actor.resourceId == resourceId))
  }

  forward(componentCssClass, actorAndMethod, {data, resourceId} = {}) {
    resourceId = resourceId || false
    const [actorDashed, methodName] = actorAndMethod.split('#')
    const actor = this.getActor(componentCssClass, actorDashed, {resourceId: resourceId})
    actor[methodName].call(actor, data)
  }

  subscribe({channel, id} = {}) {
    const consumer = createConsumer()
    this.channel = consumer.subscriptions.create(
      {
        channel: channel,
        id: id
      },
      {
        connected: () => {
          if (this.log) console.log("connected")
          this.queueBumps.forEach(bump => {
            this.forward(bump.componentCssClass, bump.actorAndMethod, {resourceId: bump.resourceId, data: bump.e})
          })
        },
        received: (res) => {
          if (this.log) console.log(res)
          const callback          = res.callback
          const componentCssClass = callback.component
          const actorDashed       = callback.actor
          const actor             = this.getActor(componentCssClass, actorDashed, {resourceId: callback.resourceId})
          actor[callback.method].call(actor, res.data)
        },
        disconnected: () => {
          if (this.log) console.log("disconnected")
        }
      }
    )
  }

  send(req){
    this.channel.perform("actorThrough", req)
  }

  actorCamelized(actorDashed){
    return actorDashed.split('-').map(word => {return word.toUpperCase()[0] + word.slice(1)}).join("")
  }

  get mainActor(){
    return this._mainActor
  }

  set mainActor(actor){
    this._mainActor = actor
  }
}