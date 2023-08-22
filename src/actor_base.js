export class ActorBase{
  constructor(element, {setProps, isMain} = {setProps: false, isMain: false}){
    this.element = element
    this.name = this.element.dataset.controller
    this.resourceId = this.element.dataset.resourceId || false
    this.props = this.#setProps({setProps})

    this.isMain = isMain
    window.Birdel.addActor({...this})
  }

  replace(newElHtml, oldEl){
    const parser = new DOMParser()
    const newEl = parser.parseFromString(newElHtml, "text/html").body.firstChild
    oldEl.parentNode.replaceChild(newEl, oldEl)
  }

  retrievePropsFromCookie({name}){
    const cookieValue = document.cookie
      .split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith(`${name}=`))

    if (!cookieValue) return false

    const decoded = decodeURIComponent(cookieValue.split('=')[1])
    const parsedData = JSON.parse(decoded)
    return parsedData
  }

  retrievePropsFromDataset({name}){
    const props = this.element.dataset.props || false
    return JSON.parse(props)
  }

  #setProps({setProps}){
    const setPropsAvailable = ['cookie', 'dataset']
    if (!setPropsAvailable.includes(setProps)) return false

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
    const setPropsMethodName = `retrievePropsFrom${capitalize(setProps)}`
    return this[setPropsMethodName].call(this, {name: this.name})
  }
}