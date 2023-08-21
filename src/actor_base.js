export class ActorBase{
  constructor(element, {setProps} = {setProps: false}){
    this.element = element;
    this.name = this.element.dataset.controller;
    this.resourceId = this.element.dataset.resourceId || false;
    console.log("setProps", setProps)
    const retrieveCookie = this.retrievePropsFromCookie({name: this.name});
    console.log("retrieveCookie", retrieveCookie);
    this.props = setProps && retrieveCookie;
    window.Birdel.addActor(this);
  }

  replace(newElHtml, oldEl){
    const parser = new DOMParser();
    const newEl = parser.parseFromString(newElHtml, "text/html").body.firstChild;
    oldEl.parentNode.replaceChild(newEl, oldEl);
  }

  retrievePropsFromCookie({name}){
    const cookieValue = document.cookie
      .split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith(`${name}=`));
    console.log("cookieValue", cookieValue);
    const decoded = decodeURIComponent(cookieValue.split('=')[1]);
    console.log("decoded", decoded);
    const parsedData = JSON.parse(decoded);
    console.log("parsedData", parsedData);
    return parsedData;
  }
}