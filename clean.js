export default function clean(array) {
  array = mergeSort(array);
  array = removeDuplicates(array);
  return array;
}

function mergeSort(array) {
  // error handling
  if (!Array.isArray(array)) {
    throw console.error("Error: This function requires an array.");;
  } else if (array.length == 0) {
    return console.log("This function requires an array");

    // base case
  } else if (array.length == 1) {
    return array;
  }

  // recursive case
  let mid = Math.round(array.length / 2);
  let firstHalf = mergeSort(array.slice(0, mid));
  let lastHalf = mergeSort(array.slice(mid, array.length));
  let sorted = merge(firstHalf, lastHalf);
  return sorted;
}

function merge(left, right) {
  let sorted = [];
  let i= 0;
  let j = 0;
  let k = 0;
  do {
    //stuff
    if (left[i] <= right[j] || isNaN(right[j])) {
      sorted[k] = left[i];
      i++;
      k++;
    } else {
      sorted[k] = right[j];
      j++;
      k++;
    };
  } while (k < left.length + right.length);
  return sorted;
}

function removeDuplicates(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (!newArray.includes(array[i])) {
      newArray.push(array[i]);
    };
  };
  return newArray;
}
