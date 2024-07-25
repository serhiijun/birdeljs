// <div data-bri-group="form1">
//   <input type="text" data-bri-name="name">
//   <textarea data-bri-name="description"></textarea>
//   <div class="bsel" data-bri-name="category"></div>
// </div>
//
// 
export const BriFormData = (({briActionElement, areaElement = null}) => {

  const refName = briActionElement.dataset.briGroupRef;
  const area = areaElement || document;
  const elements = area.querySelectorAll(`[bri-group="${refName}"]`);
  return [...elements].map((element) => {
    trigger
    // const isTextareaOrInput = (element.tagName === "TEXTAREA" || element.tagName === "INPUT")
    const isTextareaOrInput = (element.dataset.briTextarea || element.dataset.briTextinput)
    const value = isTextareaOrInput
      ? element.value
      : (el) => {
          if (el.dataset.briSelect) return new BriSelect({bel: el}).currentValue();
          return el.innerHTML;
        }
    return {
      [element.dataset.briFieldname]: value
    }
  });
});