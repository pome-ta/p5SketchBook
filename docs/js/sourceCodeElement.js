import DomFactory from './utils/domFactory.js';

import hljs from 'highlight.js/';
import javascript from 'highlight.js/lib/languages/javascript';

import 'highlight.js/styles/default.css';


hljs.registerLanguage('javascript', javascript);

export default class SourceCodeElement {
  #dialog;
  #showButton;
  #querySel;
  #hljsValue;
  #preTag;
  constructor(querySel) {
    this.#querySel = querySel;
    this.#hljsValue = '';
    this.#preTag = DomFactory.create('pre');
    this.#showButton = this.#createShowButton();
    this.#dialog = this.#createDialog();
  }
  
  #createDialog() {
    /*
    const wrap = DomFactory.create('div', {
      setStyles: {
        'font-family':
          'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace',
        'font-size': '0.8rem',
        //width: '100%',
      },
      addClassList: ['dialog-container', ],
    });
    */
    
    const wrapper = DomFactory.create('div', {
      addClassList: ['dialog-container', ],
      appendChildren: [
        DomFactory.create('code', {
          appendChildren: [
            this.#preTag,
          ],
        }),
      ],
    });
    
    


    const closeButton = DomFactory.create('button', {
      setAttrs: {
        autofocus: true,
      },
      setStyles: {
        'border-radius': '0.5rem',
        margin: '0.5rem 0',
      },
      appendChildren: [
        DomFactory.create('p', {
          textContent: 'close',
        }),
      ],
    });
    
    const dialog = DomFactory.create('dialog', {
      setStyles: {
        width: '88%',
        height: '72%',
        border: 'none',
        'border-radius': '0.5rem',
        'box-shadow': '0 4px 16px rgba(0 0 0 / 16%)',
      },
      appendChildren: [closeButton, wrapper],
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
              const codeStr = document.querySelector(this.#querySel).innerText;
              const highlightedCode = hljs.highlightAuto(codeStr).value

              this.#preTag.innerHTML = highlightedCode;
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
              //console.log(document.querySelector(this.#querySel).innerText)
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
  
  get dialog() {
    return this.#dialog;
  }
  get showButton() {
    return this.#showButton;
  }
}


