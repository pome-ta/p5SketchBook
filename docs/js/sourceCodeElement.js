import DomFactory from './utils/domFactory.js';

import {EditorState} from '@codemirror/state';
import {EditorView, highlightWhitespace} from '@codemirror/view';
import {javascript} from '@codemirror/lang-javascript';
import {oneDark} from '@codemirror/theme-one-dark';

import { basicSetup} from 'codemirror';


const customTheme = EditorView.theme(
  {
    '&': {
        fontSize: '0.6rem', //fontSize: '1rem',
    },
    '.cm-scroller': {
      fontFamily:
        'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace',
    },
    // `highlightWhitespace` 調整
    '.cm-highlightSpace': {
      backgroundImage:
        'radial-gradient(circle at 50% 55%, #ababab 4%, transparent 24%)',
      opacity: 0.2,
    },

      
  },
  {dark: false},  // wip: ?
);

const extensions = [
  basicSetup,
  EditorView.lineWrapping,
  EditorState.readOnly.of(true),
  EditorView.editable.of(false),
  highlightWhitespace(),
  javascript(),
  customTheme,
  oneDark,
];





export default class SourceCodeElement {
  #getItemId;
  #codeStr;
  #editorWrap;
  #editorView;
  #dialog;
  #showButton;

  constructor(getItemId) {
    this.#getItemId = getItemId;
    this.#codeStr = '';
    
    this.#editorWrap = DomFactory.create('div');
    
    this.#editorView = this.#createEditor();
    this.#showButton = this.#createShowButton();
    this.#dialog = this.#createDialog();
  }

  get dialog() {
    return this.#dialog;
  }

  get showButton() {
    return this.#showButton;
  }
  
  #createEditor() {
    const state = EditorState.create({
      extensions: extensions,
    });
    
    const view = new EditorView({
      state: state,
      parent: this.#editorWrap,
    });
    
    return view;
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
            //margin: '0.5rem 0',
            'display': 'flex',
            'justify-content': 'space-between',
            position: 'sticky',
            top: 0,
          },
          appendChildren: [
            closeButton,
            copyButton,
          ]
        }),
        this.#editorWrap,
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
              this.#editorView.dispatch({
                changes: {from: 0, to:this.#editorView.state.doc.length, insert: this.#codeStr},
              });
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


