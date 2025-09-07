import dirTree from 'dirTree' with {type: 'json'};

console.log(dirTree.length);


for (let [key, value] of Object.entries(dirTree.children)) {
  // console.log('#################');
  // console.log(key, value);

}



const walk = (treeNode, parent) => {
  const li = document.createElement('li');
  li.textContent = treeNode.name;
  if (treeNode.type === 'dir') {
    const ulSub = document.createElement('ul');
    walk(treeNode.children, ulSub);
    li.appendChild(ulSub);
  }
  parent.appendChild(li);
}

const ul = document.createElement('ul');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  document.body.appendChild(ul);
  walk(dirTree, ul);
});