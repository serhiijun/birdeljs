import {BelSelect} from "./bel_select";

export class BelForm {
  constructor() {
    // This element has no own element
  }

  data({belRef}) {
    // const ref = belRef.dataset.belRef;
    // const elements = document.querySelectorAll(`[data-bel-group="${ref}"]`);
    // return [...elements].map((element) => {
    //   const isTextareaOrInput = (element.tagName === "TEXTAREA" || element.tagName === "INPUT")
    //   const value = isTextareaOrInput
    //     ? element.value
    //     : (el) => {
    //         if (el.classList.contains("bsel")) {
    //           return new BelSelect({bel: el}).currentValue();
    //         }
    //         return el.innerHTML;
    //       }
    //   return {
    //     [element.dataset.belName]: value
    //   }
    // });
  }
};
