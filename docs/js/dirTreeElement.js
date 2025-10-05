import DomFactory from './utils/domFactory.js';

export default class DirTreeElement {
  #dialog;
  #showButton;
  #createShowButton;
  #createDialog;

  constructor() {
    this.#showButton = this.#createShowButton();
    this.#dialog = this.#createDialog();
  }

  get dialog() {
    return this.#dialog;
  }

  get showButton() {
    return this.#showButton;
  }
}
