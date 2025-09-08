import DomFactory from './utils/domFactory.js';
import dirTree from 'dirTree' with {type: 'json'};



const dirTreeDetails = (treeNodes, parent) => {
  treeNodes.forEach((treeNode) => {
    if (treeNode.type === 'dir') {
      
    } else if (treeNode.type === 'file') {
      
    }
  });
}

const wrap = DomFactory.create('div', {
  setStyles: {
    'font-family':
      'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace',
    'font-size': '0.8rem',
  },
  
});


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  document.body.appendChild(wrap);

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




