import DomFactory from './utils/domFactory.js';

import hljs from 'highlight.js/';
import javascript from 'highlight.js/lib/languages/javascript';



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
  
  #createDialog() {
    
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
    
    const copyButton = DomFactory.create('button', {
      setStyles: {
        'border-radius': '0.5rem',
        margin: '0.5rem 0',
      },
      appendChildren: [
        DomFactory.create('p', {
          textContent: 'copy',
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
      appendChildren: [
        closeButton,
        wrapper,
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
              const codeStr = document.querySelector(this.#querySel).innerText;
              this.#hljsValue = hljs.highlightAuto(codeStr).value

              this.#preTag.innerHTML = this.#hljsValue;
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


