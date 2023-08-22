export class ActorBase{
  constructor(element, {setProps, isMain} = {setProps: false, isMain: false}){
    const setPropsAvailable = ['cookie', 'dataset']
    this.element = element
    this.name = this.element.dataset.controller
    this.resourceId = this.element.dataset.resourceId || false
    if (!setPropsAvailable.includes(setProps)) {
      this.props = setProps
    } else {
      const setPropsMethodName = `#retrievePropsFrom${setProps.capitalize()}`;
      this[setPropsMethodName].call(this, {name: this.name})
    }
    this.isMain = isMain
    window.Birdel.addActor({...this})
  }

  replace(newElHtml, oldEl){
    const parser = new DOMParser()
    const newEl = parser.parseFromString(newElHtml, "text/html").body.firstChild
    oldEl.parentNode.replaceChild(newEl, oldEl)
  }

  #retrievePropsFromCookie({name}){
    const cookieValue = document.cookie
      .split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith(`${name}=`))

    if (!cookieValue) return false

    const decoded = decodeURIComponent(cookieValue.split('=')[1])
    const parsedData = JSON.parse(decoded)
    return parsedData
  }

  #retrievePropsFromDataset({name}){
    return JSON.parse(this.element.dataset.props)
  }
}