export default class SourceCodeElement {
  #getItemId;
  #codeStr;
  #preTag;
  #dialog;
  #showButton;

  constructor(getItemId) {
    this.#getItemId = getItemId;
    this.#codeStr = '';
    this.#preTag = DomFactory.create('pre', {
      setStyles: {
        'font-family':
          'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace',
        'font-size': '0.6rem',
        'white-space': 'pre-wrap',
      },
    });
    this.#showButton = this.#createShowButton();
    this.#dialog = this.#createDialog();
  }

  get dialog() {
    return this.#dialog;
  }

  get showButton() {
    return this.#showButton;
  }

