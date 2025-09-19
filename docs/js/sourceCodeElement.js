import DomFactory from './utils/domFactory.js';

import hljs from 'highlight.js/';
import javascript from 'highlight.js/lib/languages/javascript';


hljs.registerLanguage('javascript', javascript);

export default class SourceCodeElement {
  #dialog;
  #showButton;
  #getItemId;
  #codeStr;
  #preTag;

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

  #createDialog() {
    const closeButton = DomFactory.create('button', {
      setAttrs: {
        autofocus: true,
      },
      setStyles: {
        'border-radius': '0.5rem',
      },
      appendChildren: [
        DomFactory.create('p', {
          textContent: 'close',
        }),
      ],
    });

    const copyButton = DomFactory.create('button', {
      setStyles: {
        'border-radius': '0.5rem',
      },
      appendChildren: [
        DomFactory.create('p', {
          textContent: 'copy',
        }),
      ],

      addEventListeners: [
        {
          type: 'click',
          listener: {
            handleEvent: (e) => {
              console.log('copy');
              navigator.clipboard.writeText(this.#codeStr);
            },
          },
        },
      ],
    });

    const wrapper = DomFactory.create('div', {
      addClassList: ['dialog-container',],
      appendChildren: [
        DomFactory.create('div', {
          setStyles: {
            margin: '0.5rem 0',
            'display': 'flex',
            'justify-content': 'space-between',
          },
          appendChildren: [
            closeButton,
            copyButton,
          ]
        }),
        DomFactory.create('code', {
          appendChildren: [
            this.#preTag,
          ],
        }),
      ]
    });


    const dialog = DomFactory.create('dialog', {
      setStyles: {
        width: '88%',
        height: '72%',
        border: 'none',
        'border-radius': '0.5rem',
        'box-shadow': '0 4px 16px rgba(0 0 0 / 16%)',
      },
      appendChildren: [
        wrapper
      ],

      addEventListeners: [
        {
          type: 'click',
          listener: {
            handleEvent: function (event) {
              if (event.target.closest('.dialog-container') === null) {
                dialog.close();
              }
            }
          },
        },
      ],

      targetAddEventListeners: [
        {
          target: this.#showButton,
          type: 'click',
          listener: {
            handleEvent: (event) => {
              const codeStr = sessionStorage.getItem(this.#getItemId);
              if (codeStr === null) {
                return;
              }
              this.#codeStr = codeStr;
              this.#preTag.innerHTML = hljs.highlightAuto(codeStr).value;
              dialog.showModal();
            },
          },
        },
        {
          target: closeButton,
          type: 'click',
          listener: {
            handleEvent: (event) => {
              dialog.close();
            },
          },
        },
      ],
    });
    return dialog;
  }

  #createShowButton() {
    const showButton = DomFactory.create('button', {
      setAttrs: {
        autofocus: true,
      },
      setStyles: {
        'border-radius': '0.5rem',
        margin: '0.5rem 0',
      },
      appendChildren: [
        DomFactory.create('p', {
          textContent: 'show directly tree',
        }),
      ],
    });
    return showButton;
  }
}


