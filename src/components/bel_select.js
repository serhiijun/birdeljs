export class BelSelect {
  constructor({bel}) {
    this.bel = bel;
    this.head = this.bel.querySelector(".bsel__head");
    this.list = this.bel.querySelector(".bsel__list");
    this.items = this.list.querySelectorAll(".bsel__list__item");
  }

  toggle() {
    this.bel.classList.toggle("active");
  }

  select({item, highlight}) {
    this.head.innerHTML = item.outerHTML;
    if (highlight) {
      this.items.map((item) => item.classList.remove("active"));
      item.classList.add("active");
    }
    this.toggle();
  }

  currentValue() {
    const currentItem = this.bel.querySelector(".bsel__head .bsel__list__item");
    return currentItem.dataset.value;
  }
};
