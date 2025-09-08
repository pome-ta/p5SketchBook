import DomFactory from './utils/domFactory.js';
import dirTree from 'dirTree' with {type: 'json'};


const dirTreeDetails = (treeNodes, parent, indent = 0) => {
  indent++;
  treeNodes.forEach((treeNode) => {
    if (treeNode.type === 'dir') {

      const dirSummary = DomFactory.create('summary', {
        textContent: `📁 ${treeNode.name}`,
        setStyles: {
          'text-indent': `${indent}rem`,
        }
      });

      const detailDir = DomFactory.create('details', {
        setAttrs: {
          open: `${true}`,
        },
        appendChildren: [dirSummary],
      });
      dirTreeDetails(treeNode.children, detailDir, indent);
      parent.appendChild(detailDir);

    } else if (treeNode.type === 'file') {
      const fileName = DomFactory.create('p', {
        textContent: `📄 ${treeNode.name}`,
        setStyles: {
          'text-indent': `${indent + 1}rem`,
          //margin: 0,
          //overflow: 'hidden',
          //'text-overflow': 'ellipsis',
          'white-space': 'nowrap',
          //width: '100%'
        }
      });
      const fileDiv = DomFactory.create('div', {
        appendChildren: [fileName,]
      });
      // const fileDiv = DomFactory.create('div', {
      //     textContent: `📄 ${treeNode.name}`,
      //     setStyles: {
      //       'text-indent': `${indent + 1}rem`,
      //       // margin: 0,
      //       // overflow: 'hidden',
      //       // 'text-overflow': 'ellipsis',
      //       // 'white-space': 'nowrap',
      //       // width: '100%'
      //     }
      // });
      parent.appendChild(fileDiv);
    }
  });

};

const wrap = DomFactory.create('div', {
  setStyles: {
    'font-family':
      'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace',
    'font-size': '0.8rem',
    // width: '100%',
  },

});

dirTreeDetails(dirTree, wrap);


const closeButton = DomFactory.create('button', {
  setAttrs: {
    autofocus: true,
  },
  setStyles: {
    'border-radius': '0.5rem',
    margin: '1rem',
  },
  appendChildren: [DomFactory.create('p', {
    textContent: 'close',
  })]
});


const dialog = DomFactory.create('dialog', {
  setStyles: {
    'width': '88%',
    'height': '88%',
    border: 'none',
    'border-radius': '0.5rem',
    'box-shadow': '0 4px 16px rgba(0 0 0 / 16%)',
  },
  appendChildren: [closeButton, wrap,],
  targetAddEventListeners: [
    {
      target: closeButton,
      type: 'click',
      listener: {
        handleEvent: event => {
          dialog.close();
        }
      }
    }

  ]
});
const showButton = DomFactory.create('button', {
  textContent: 'show',
  addEventListeners: [
    {
      type: 'click',
      listener: {
        handleEvent: event => {
          dialog.showModal();
        }
      }
    }
  ]
});


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  document.body.appendChild(showButton);
  document.body.appendChild(dialog);


});


/*
const walk = (treeNodes, parent) => {
  treeNodes.forEach((treeNode) => {
    // wip: もうちょっとスマートに書きたい
    if (treeNode.suffix === '.md') {
      return;
    }

    //const li = document.createElement('li');
    const li = DomFactory.create('li', {
      setStyles: {
        width: 'auto',
        //overflow: 'hidden',
        //'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      },
    });
    li.textContent = `${treeNode.type === 'file' ? '📄' : '📁'} ${treeNode.name}`;
    if (treeNode.type === 'dir') {
      const ulSub = document.createElement('ul');
      walk(treeNode.children, ulSub);
      li.appendChild(ulSub);
    }
    parent.appendChild(li);
  });
};

// const ul = document.createElement('ul');
const ul = DomFactory.create('ul', {
  setStyles: {
    'font-family':
      'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace',
    'font-size': '0.8rem',    
    //padding: '0.5rem 1rem',
    //overflow: 'hidden',
  },
});

walk(dirTree, ul);


document.addEventListener('DOMContentLoaded', () => {
  //console.log('DOMContentLoaded');
  document.body.appendChild(ul);
  

});
*/


/*
const summary1 = DomFactory.create('summary', {
  textContent: 'fuga'
});

const details1 = DomFactory.create('details', {
  appendChildren: [summary1]
});

const summary = DomFactory.create('summary', {
  textContent: 'hoge'
});

const details = DomFactory.create('details', {
  appendChildren: [summary]
});


details.appendChild(details1);


*/




