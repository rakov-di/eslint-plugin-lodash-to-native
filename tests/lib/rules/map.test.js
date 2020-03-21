"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/map");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018 } });

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run("map", rule.map, {
  valid: [
    "$.map([], fn);",
    "const newArr = map([1, 2, 3, 4], fn);",
    "const f1 = () => _map([1, 2], fn);",
    "const f2 = () => _.some([null, 0, 'yes', false], Boolean);",
    "const result1 = _.map({a: 1, b: 2}, fn);",
    "const result2 = _.map({a: 1, b: 2}, elem => elem + 4);",
    "Array.isArray(arr) ? arr.map(fn) : _.map(arr,fn);",
    `if (Array.isArray(arr)) {
      arr.map(fn);
    }
    else {
      _.map(arr,fn);
    }`
  ],

  invalid: [
    {
      code: "const b = _.map([], fn);",
      output: "const b = [].map(fn);",
      errors: [
        {
          message: 'Этот map можно заменить на нативный map',
          line: 1,
          column: 11
        }]
    },
    {
      code: 'const a = _.map([1, 2, 3, 4], fn)',
      output: 'const a = [1, 2, 3, 4].map(fn)',
      errors: [
        {
          message: 'Этот map можно заменить на нативный map',
          line: 1,
          column: 11
        }]
    },
    {
      code: 'const a = _.map([1, 2, 3, 4], elem => elem * 2)',
      output: 'const a = [1, 2, 3, 4].map(elem => elem * 2)',
      errors: [
        {
          message: 'Этот map можно заменить на нативный map',
          line: 1,
          column: 11
        }]
    },
    {
      code: `const a = _.map([1, 2, 3, 4], (elem, idx, arr) => {
        return arr[arr.length - 1];
      })`,
      output: `const a = [1, 2, 3, 4].map((elem, idx, arr) => {
        return arr[arr.length - 1];
      })`,
      errors: [
        {
          message: 'Этот map можно заменить на нативный map',
          line: 1,
          column: 11
        }]
    },
    {
      code: `const foo = () => {
        return _.map([1, 2, 3, 4], fn);
      };`,
      output: `const foo = () => {
        return [1, 2, 3, 4].map(fn);
      };`,
      errors: [
        {
          message: 'Этот map можно заменить на нативный map',
          line: 2,
          column: 16
        }]
    },
    {
      code: `const a = _.map(arr, fn);`,
      output: `const a = Array.isArray(arr) ? arr.map(fn) : _.map(arr, fn);`,
      errors: [
        {
          message: 'Этот map можно заменить на нативный map через условие',
          line: 1,
          column: 11
        }]
    }
  ]
});
