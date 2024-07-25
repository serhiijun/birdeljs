export const BriSelect = ({ briSelect }) => {
  const head = briSelect.querySelector("[data-bri-select--head]");
  const listEl = briSelect.querySelector("[data-bri-select--list]");
  const listItems = listEl.querySelectorAll("[data-bri-select--list-item]")
  const items = Array.from(listItems);

  const toggle = () => {
    briSelect.dataset.active = bel.dataset.active === "true" ? "false" : "true";
  };

  const select = ({ item, highlight }) => {
    head.innerHTML = item.outerHTML;
    if (highlight) {
      items.forEach((item) => item.dataset.active = "false");
      item.dataset.active = "true";
    }
    toggle();
  };

  const currentValue = () => {
    const currentItem = bel.querySelector("[data-bri-select--head] [data-bri-select--list-item][data-active='true']");
    return currentItem.dataset.value;
  };

  return {
    toggle,
    select,
    currentValue
  };
};