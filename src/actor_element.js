export class ActorElement{
  static toggleDropdown({dwEl} = {}) {
    dwEl.classList.toggle("b_dw--active");
  }

  static closeDropdown({dwEl} = {}) {
    dwEl.classList.remove("b_dw--active");
  }

  static toggleSel({sel} = {}) {
    const disabled = sel.classList.contains("b_sel--disabled");
    if(disabled) return;
    sel.classList.toggle("b_sel--active");
  }

  static closeSel({sel} = {}) {
    sel.classList.remove("b_sel--active");
  }

  static selectItem({sel, selItem} = {}) {
    // In select element
    const selTitle = sel.getElementsByClassName("b_sel__title")[0];
    selTitle.innerHTML = selItem.innerHTML;
    sel.dataset.bselId = selItem.dataset.itemId;
  }

  static selectRadio({rad} = {}) {
    const radioGroup = rad.dataset.bRadGroup;
    const radios = document.querySelectorAll(`[data-b-rad-group="${radioGroup}"]`);
    if(rad.classList.contains("b_rad--active")) return;
    radios.forEach((radio) => {
      radio.classList.remove("b_rad--active");
    });
    rad.classList.add("b_rad--active");
  }

  static toggleModal({modal} = {}) {
    modal.classList.toggle("b_modal--active");
  }
}