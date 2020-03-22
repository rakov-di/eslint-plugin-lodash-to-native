let arr = [1,2,3];
const otherArr = ['array', 'for', 'test'];
const fn = elem => elem * 4;

const _ = {
  map: (arr, fn) => {
    return arr.map((elem, idx, arr) => {
      return fn(elem, idx, arr);
    });
  }
};

// Valid
$.map([], fn);
const newArr = map([1, 2, 3, 4], fn);
const f1 = () => _map([1, 2, 3, 4], fn);
const f2 = () => _.some([null, 0, 'yes', false], Boolean);
const result1 = _.map({a: 1, b: 2}, fn);
const result2 = _.map({a: 1, b: 2}, elem => elem + 4);
Array.isArray(arr) ? arr.map(fn) : _.map(arr,fn);
if (Array.isArray(arr)) {
  arr.map(fn);
}
else {
  _.map(arr,fn);
}


// Invalid. Replace to map
const result3 = _.map([], fn);
const result4 = _.map([1, 2, 3, 4], fn);
const result5 = _.map([1, 2, 3, 4], elem => elem * 2);
const result6 =  _.map([1, 2, 3, 4], (elem, idx, arr) => {
  return arr[arr.length - 1];
});
const foo = () => {
  return _.map([1, 2, 3, 4], fn);
};

// Invalid. Replace to condition
const result7 = _.map(arr, fn);
Array.isArray(otherArr) ? otherArr.map(fn) : _.map(arr,fn);
if (arr.length > 5) {
  arr = _.map(arr,fn);
}
else {
  arr = [];
}


