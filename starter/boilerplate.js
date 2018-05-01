// Boilerplate code that you don't have to worry about, unless you are extra
// curious :)

"use strict";

class VisualElement {
  constructor(htmlElement) {
    this.element = htmlElement;

    if (this.whenClicked !== VisualElement.prototype.whenClicked) {
      this.element.addEventListener("click", () => {
        this.whenClicked();
      });
    }
  }

  whenClicked() {
    throw new TypeError("You haven\'t created a whenClicked function for " +
                        `your ${this.constructor.name} class!`);
  }

  setText(newText) {
    this.element.innerText = newText;
  }

  insertVisualElement(visualElement) {
    this.element.appendChild(visualElement.element);
  }
}
