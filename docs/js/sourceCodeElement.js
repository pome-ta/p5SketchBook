import DomFactory from './utils/domFactory.js';

export default class SourceCodeElement {
  #dialog;
  #showButton
  constructor(codeID) {
  }
  
  get dialog() {
    return this.#dialog;
  }
  get showButton() {
    return this.#showButton;
  }
}


