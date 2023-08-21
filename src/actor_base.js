export class ActorBase{
  constructor(element, {setProps} = {setProps: false}){
    this.element = element;
    this.name = this.element.dataset.controller;
    this.resourceId = this.element.dataset.resourceId || false;
    this.props = setProps && this.#retrievePropsFromCookie({name: this.name});
    window.Birdel.addActor(this);
  }

  replace(newElHtml, oldEl){
    const parser = new DOMParser();
    const newEl = parser.parseFromString(newElHtml, "text/html").body.firstChild;
    oldEl.parentNode.replaceChild(newEl, oldEl);
  }

  #retrievePropsFromCookie({name}){
    const cookieValue = document.cookie
      .split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith(`${name}=`));
    const decoded = decodeURIComponent(cookieValue.split('=')[1]);
    const parsedData = JSON.parse(decoded);
    return parsedData;
  }
}