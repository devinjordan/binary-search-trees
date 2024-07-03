import Node from "./node.js";
import clean from "./clean.js";

export default class Tree {
  constructor (array) {
    const cleanedArray = clean(array);
    this.root = this.buildTree(cleanedArray, 0, cleanedArray.length - 1);
  };

  buildTree(array, start, end) {
    if (start > end) return null;
    else {
      const mid = Math.floor((start + end) / 2);
      const root = new Node(array[mid]);
      root.left = this.buildTree(array, start, mid - 1);
      root.right = this.buildTree(array, mid + 1, end);
      return root;
    }
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

  remove(value) {
    let current = this.root;
    let previous = null;
    while (current != null) {
      if (current.data == value) {
        if (value > previous.data) {
          previous.right = null;
        } else {
          previous.left = null;
        };
        current = null;
        return true;
      } else {
        if (value > current.data) {
          previous = current;
          current = current.right;
        } else {
          previous = current;
          current = current.left;
        }
      }
    }
    return false;
  }
}
