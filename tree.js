import Node from "./node.js";
import clean from "./clean.js";

export default class Tree {
  constructor (array) {
    const cleanedArray = clean(array);
    this.root = this.buildTree(cleanedArray, 0, cleanedArray.length - 1);
  };

  buildTree(array, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }

  insert(value) {
    let current = this.root;
    let previous = null;
    while (current != null) {
      if (current.data == value) {
        return;
      }
      if (value > current.data) {
        previous = current;
        current = current.right;
      } else {
        previous = current;
        current = current.left;
      };
    };
    current = new Node(value);
    if (current.data > previous.data) {
      previous.right = current;
    } else {
      previous.left = current;
    }
  }

  // credit to TYLPHE -- github.com/TYLPHE/binary-search-trees
  delete(value, root = this.root) {
    // Base case
    if (root === null) {
      return root;
    }

    // Traverse down the tree
    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } 

    // Value matches -> delete node and update pointers
    else {
      // option 1: root(child) has only one child
      if (root.left === null) {
        // return the child's right so new parent can point to it
        return root.right;
      } else if (root.right === null) {
        // return child's left so new parent can point to it
        return root.left;
      }
      // option 2: Node has two children
      else {
        // Replace node with next smallest value
        const minData = function findNextSmallestRightData(root) {
          let min = root.data;
          let newRoot = root;

          // Search for a left node with no left children. 
          while (newRoot.left !== null) {
            min = root.left.data;
            newRoot = root.left;
          }

          return min;
        }

        root.data = minData(root.right);

        // Delete the copied node from minData()
        root.right = this.delete(root.data, root.right)
      }
    }

    return root;
  }

  find(value) {
    let temp = this.root;
    while (temp != null) {
      if (value > temp.data) {
        temp = temp.right;
      } else if (value < temp.data) {
        temp = temp.left;
      } else {
        return temp;
      }
    }
    return null;
  }

  // iterative
  // levelOrder(callback) {
  //   if (this.root === null) return;
  //   let queue = [];
  //   let data = [];
  //   queue.push(this.root);

  //   // while there is at least one discovered node
  //   while (!queue.length == 0) {
  //     let current = queue[0];

  //     if (current.left != null) queue.push(current.left);
  //     if (current.right != null) queue.push(current.right);

  //     if (callback) data.push(callback(queue.shift().data));

  //     else data.push(queue.shift().data);
  //   }
  //   return data;
  // }

  // recursive
  levelOrder(callback, root = this.root, queue = [], data = []) {
    if (root === null) return;
    if (callback) data.push(callback(root.data));
    else data.push(root.data);
    queue.push(root.left);
    queue.push(root.right);

    while (queue.length) {
      const level = queue[0];
      queue.shift();
      this.levelOrder(callback, level, queue, data);
    }
    return data;
  }

  inOrder(callback, root = this.root, data = []) {
    if (root === null) return;
    if (root.left) {
      this.inOrder(callback, root.left, data);
    }
    if (callback) data.push(callback(root.data));
    else  data.push(root.data);
    if (root.right) {
      this.inOrder(callback, root.right, data);
    }
    return data;
  };

  preOrder(callback, root = this.root, data = []) {
    if (root === null) return;
    if (callback) data.push(callback(root.data));
    else  data.push(root.data);
    if (root.left) {
      this.preOrder(callback, root.left, data);
    }
    if (root.right) {
      this.preOrder(callback, root.right, data);
    }
    return data;
  };

  postOrder(callback, root = this.root, data = []) {
    if (root === null) return;
    if (root.left) {
      this.postOrder(callback, root.left, data);
    }
    if (root.right) {
      this.postOrder(callback, root.right, data);
    }
    if (callback) data.push(callback(root.data));
    else  data.push(root.data);
    return data;
  };

  height(node) {
    if (node === null) return;
    let leftHeight = 0;
    let rightHeight = 0;
    if (node.left) {
      leftHeight = this.height(node.left);
      leftHeight++;
    };
    if (node.right) {
      rightHeight = this.height(node.right);
      rightHeight++;
    };
    if (leftHeight >= rightHeight) return leftHeight;
    else return rightHeight;
  }

  // // cheesy way...
  // depth(node) {
  //   if (node === null) return null;
  //   return this.height(this.root) - this.height(node);
  // }

  depth(node, root = this.root, depth = 0) {
    if (root === null || node === null) return null;
    if (node.data === root.data) return depth;
    if (node.data < root.data) {
      return this.depth(node, root.left, depth += 1);
    } else {
      return this.depth(node, root.right, depth += 1);
    }
  }

  isBalanced(root = this.root) {
    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);
    if (Math.abs(leftHeight - rightHeight) > 1) return false;
    else return true;
  }

  rebalance(root = this.root) {
    let array = this.inOrder(false, root);
    this.root =  this.buildTree(array, 0, array.length - 1);
  }
}