import { createConsumer } from "@rails/actioncable"
export class ActorForward {
  constructor() {
    this.actors = {};
    this.queueBumps = [];
  }

  pushBump(bump){
    this.queueBumps.push(bump);
  }

  removeActor(actor) {
    const protoName = actor.name.split("--").pop().split("-").map((word) => {
      return word.toUpperCase()[0] + word.slice(1);
    }).join("") + "Actor";
    const index = this.actors[protoName].indexOf(actor);
    if (index > -1) {
      this.actors[protoName].splice(index, 1);
    }
  }

  addActor(actor) {
    const protoName = actor.name.split("--").pop().split("-").map((word) => {
      return word.toUpperCase()[0] + word.slice(1);
    }).join("") + "Actor";
    if(!this.actors[protoName]) this.actors[protoName] = [];
    this.actors[protoName].push(actor);
  }

  getActor(componentCssClass, actorName, resourceId){
    const actorDashed = actorName;
    const actorCamelized = this.actorCamelized(actorDashed);
    return this.actors[actorCamelized].find(actor => (actor.name == componentCssClass) && (actor.resourceId == resourceId));
  }

  forward(componentCssClass, actorAndMethod, resourceId, e) {
    const [actorDashed, methodName] = actorAndMethod.split('#');
    const actorCamelized = this.actorCamelized(actorDashed);
    const actor = this.actors[actorCamelized].find(actor => actor.name === componentCssClass && actor.resourceId === resourceId);
    actor?.[methodName]?.call(actor, e);
  }

  subscribe({channel, id} = {}) {
    const consumer = createConsumer();
    this.channel = consumer.subscriptions.create(
      {
        channel: channel,
        id: id
      },
      {
        connected: () => {
          console.log("connected");
          this.queueBumps.forEach(bump => {
            this.forward(bump.componentCssClass, bump.actorAndMethod, bump.resourceId, bump.e);
          });
        },
        received: (res) => {
          console.log(res);
          const callback = res.callback;
          const componentCssClass = callback.component;
          const actorName = callback.actor.split('--').pop().split('-').map(word => {return word.toUpperCase()[0] + word.slice(1)}).join("");
          const actor = this.actors[actorName].find(actor => actor.name == componentCssClass && actor.resourceId == callback.resourceId);
          actor[callback.method].call(actor, res.data);
        },
        disconnected: () => console.log("disconnected")
      }
    );
  }

  send(req){
    this.channel.perform("actorThrough", req);
  }

  actorCamelized(actorDashed){
    return actorDashed.split('-').map(word => {return word.toUpperCase()[0] + word.slice(1)}).join("");
  }
}