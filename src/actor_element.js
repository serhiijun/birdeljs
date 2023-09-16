export class ActorElement{
  static toggleDropdown({bel}) {
    bel.classList.toggle("b_dw--active")
  }

  static closeDropdown({bel}) {
    bel.classList.remove("b_dw--active")
  }

  static toggleSelect({bel}) {
    const disabled = bel.classList.contains("b_sel--disabled")
    if(disabled) return
    bel.classList.toggle("b_sel--active")
  }

  static closeSel({bel}) {
    bel.classList.remove("b_sel--active")
  }

  static selectItem({bel, selItem}) {
    // In select element
    const selTitle = bel.getElementsByClassName("b_sel__title")[0]
    selTitle.innerHTML = selItem.innerHTML
    bel.dataset.bselId = selItem.dataset.itemId
  }

  static selectRadio({bel}) {
    if(bel.classList.contains("b_rad--active")) return
    
    const radioGroup = bel.dataset.bRadGroup
    const radios = document.querySelectorAll(`[data-b-rad-group="${radioGroup}"]`)
    radios.forEach((radio) => {
      radio.classList.remove("b_rad--active")
    })
    bel.classList.add("b_rad--active")
  }

  static toggleCheckbox({bel}) {
    if(bel.classList.contains("b_chx--active")) {
      bel.classList.remove("b_chx--active")
    } else {
      bel.classList.add("b_chx--active")
    }
  }

  static selectCheckbox({bel}) {
    if (bel.classList.contains("b_chx--active")) return
    bel.classList.add("b_chx--active")
  }

  static unselectCheckbox({bel}) {
    if (!bel.classList.contains("b_chx--active")) return
    bel.classList.remove("b_chx--active")
  }

  static toggleModal({bel}) {
    bel.classList.toggle("b_modal--active")
  }
}