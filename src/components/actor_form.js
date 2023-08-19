export const BFormData = ({belRef}) => {
  const ref = belRef.dataset.belRef;
  const elements = document.querySelectorAll(`[data-bel-group="${ref}"]`);
  return [...elements].map((element) => {
    const value = (element.tagName === "TEXTAREA" || element.tagName === "INPUT")
      ? element.value
      : element.innerHTML;
    return {
      [element.dataset.belName]: value
    }
  });
}