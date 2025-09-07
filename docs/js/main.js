import dirTree from 'dirTree' with {type: 'json'};

const walk = (treeNodes, parent) => {
  treeNodes.forEach((treeNode) => {
    // wip: もうちょっとスマートに書きたい
    if (treeNode.suffix === '.md') {
      return;
    }
    
    const li = document.createElement('li');
    li.textContent = treeNode.name;
    if (treeNode.type === 'dir') {
      const ulSub = document.createElement('ul');
      walk(treeNode.children, ulSub);
      li.appendChild(ulSub);
    }
    parent.appendChild(li);
  });
}

const ul = document.createElement('ul');
walk(dirTree, ul);

document.addEventListener('DOMContentLoaded', () => {
  //console.log('DOMContentLoaded');
  document.body.appendChild(ul);
  
});
