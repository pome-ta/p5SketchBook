import DomFactory from './utils/domFactory.js';
import dirTree from 'dirTree' with {type: 'json'};


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
                  codeDiv.innerText = codeStr;
                  sandbox.contentWindow.postMessage(codeStr, '*');
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

const dirTreeWrap = DomFactory.create('div', {
  setStyles: {
    'font-family':
      'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace',
    'font-size': '0.8rem',
    //width: '100%',
  },
});

dirTreeDetails(dirTree, dirTreeWrap);


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
    height: '88%',
    border: 'none',
    'border-radius': '0.5rem',
    'box-shadow': '0 4px 16px rgba(0 0 0 / 16%)',
  },
  appendChildren: [closeDirTreeButton, dirTreeWrap],
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
        },
      },
    },
  ],
});


const createDirTreeDialog = () => {
}


// export {dirTreeDialog, showDirTreeButton};
