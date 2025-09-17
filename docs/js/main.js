import DomFactory from './utils/domFactory.js';
import SourceCodeElement from './sourceCodeElement.js';

import hljs from 'highlight.js/';
import javascript from 'highlight.js/lib/languages/javascript';
import dirTreeJson from 'dirTree' with {type: 'json'};

console.log(hljs);
console.log(javascript);

let filePath;
let codeStr;

const getSource = async (path) => {
  const res = await fetch(path);
  codeStr = await res.text();
};

const dirTreeDetails = (treeNodes, parent, indent = 0) => {
  indent++;
  treeNodes.forEach((treeNode) => {
    if (treeNode.type === 'dir') {
      const dirSummary = DomFactory.create('summary', {
        textContent: `📁 ${treeNode.name}`,
        setStyles: {
          'text-indent': `${indent}rem`,
        },
      });

      const detailDir = DomFactory.create('details', {
        setAttrs: {
          open: `${true}`,
        },
        appendChildren: [dirSummary],
      });
      parent.appendChild(detailDir);
      dirTreeDetails(treeNode.children, detailDir, indent);
    } else if (treeNode.type === 'file') {
      // wip: もうちょっとスマートに書きたい
      if (treeNode.suffix === '.md') {
        return;
      }
      const fileName = DomFactory.create('p', {
        textContent: `📄 ${treeNode.name}`,
        setStyles: {
          'text-indent': `${indent + 1}rem`,
          //margin: 0,
          //overflow: 'hidden',
          //'text-overflow': 'ellipsis',
          'white-space': 'nowrap',
        },
      });
      const fileDiv = DomFactory.create('div', {
        appendChildren: [fileName],
        addEventListeners: [
          {
            type: 'click',
            listener: {
              handleEvent: (e) => {
                filePath = treeNode.path;
                getSource(`./${filePath}`).then((res) => {
                  // console.log(codeStr);
                  codeDiv.innerText = codeStr;
                  sandbox.contentWindow.postMessage(codeStr, '*');
                  // console.log(sandbox);
                  dirTreeDialog.close();


                });
              },
            },
          },
        ],
      });
      parent.appendChild(fileDiv);
    }
  });
};

const wrap = DomFactory.create('div', {
  setStyles: {
    'font-family':
      'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace',
    'font-size': '0.8rem',
    //width: '100%',
  },
  addClassList: ['dialog-container', ],
});

dirTreeDetails(dirTreeJson, wrap);

// xxx: iframe 生成時と書き換え時と併用
const reloadSketchHandleEvent = function (e) {
  this.targetSandbox = this.targetSandbox ? this.targetSandbox : e.target;
  this.targetSandbox.contentWindow.postMessage(codeStr, '*');
};

/* --- iframe */
const sandbox = DomFactory.create('iframe', {
  setAttrs: {
    id: 'sandbox',
    sandbox: 'allow-same-origin allow-scripts',
    allow:
      'accelerometer; ambient-light-sensor; autoplay; bluetooth; camera; encrypted-media; geolocation; gyroscope;  hid; microphone; magnetometer; midi; payment; usb; serial; vr; xr-spatial-tracking',
    loading: 'lazy',
    src: './js/sandboxes/sandbox.html',
  },
  setStyles: {
    width: '100%',
    height: '100dvh',
    'border-width': '0',
    position: 'fixed',
    top: '0',
    left: '0',
    'z-index': '0',
    //'background-color': 'lightgray',
    'background-color': 'darkgray',
  },
  addEventListeners: [
    {
      type: 'load',
      listener: {
        targetSandbox: null,
        handleEvent: reloadSketchHandleEvent,
      },
    },
    /*
    {
      type: 'visibilitychange',
      listener: {
        handleEvent: function (e) {
          console.log('visibilitychange');
        },
      },
    },
    */
  ],
});

const callButton = DomFactory.create('button', {

  setStyles: {
    'border-radius': '0.5rem',
    margin: '0.5rem 0',
  },
  appendChildren: [
    DomFactory.create('p', {
      textContent: '🔄',
    }),
  ],
  addEventListeners: [
    {
      type: 'click',
      listener: {
        targetSandbox: sandbox,
        handleEvent: reloadSketchHandleEvent,
      },
    },

  ],
});

const showDirTreeButton = DomFactory.create('button', {
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



const closeDirTreeButton = DomFactory.create('button', {
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

const dirTreeDialog = DomFactory.create('dialog', {
  setStyles: {
    width: '88%',
    height: '72%',
    border: 'none',
    'border-radius': '0.5rem',
    'box-shadow': '0 4px 16px rgba(0 0 0 / 16%)',
  },
  //addClassList: ['dialog-container', ],
  appendChildren: [closeDirTreeButton, wrap],
  addEventListeners: [
    {
      type: 'click',
      listener: {
        handleEvent: function (e) {
          if (e.target.closest('.dialog-container') === null) {
            dirTreeDialog.close();
          }
        }
      },
    },
  ],
  targetAddEventListeners: [
    {
      target: showDirTreeButton,
      type: 'click',
      listener: {
        handleEvent: (event) => {
          dirTreeDialog.showModal();
        },
      },
    },
    {
      target: closeDirTreeButton,
      type: 'click',
      listener: {
        handleEvent: (event) => {
          dirTreeDialog.close();
          console.log(this)
        },
      },
    },
  ],
});




const codeDiv = DomFactory.create('div', {
  setStyles: {
    'font-family':
      'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace',
    'font-size': '0.8rem',
    //width: '100%',
  },
});


const sc = new SourceCodeElement(codeStr);


const buttonLayout = DomFactory.create('div', {
  setStyles: {
    'display': 'flex',
    'justify-content': 'space-around',
    position: 'sticky',
    width: '100%',
    top: '0',
    'z-index': '1',
  },
  appendChildren: [showDirTreeButton, callButton, sc.showButton,],
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  document.body.appendChild(sandbox);
  document.body.appendChild(buttonLayout);
  document.body.appendChild(dirTreeDialog);
  document.body.appendChild(sc.dialog);

});

