import prettyPrint from "./print.js";
import Tree from "./tree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
console.log(tree.isBalanced());

// inserting
(function (array = randomArray(10)) {
  for (let i = 0; i < array.length; i++) {
    tree.insert(array[i]);
  }
})();
prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());



function randomArray(size) {
  let array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
};