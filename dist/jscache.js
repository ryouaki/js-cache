(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('src')) :
typeof define === 'function' && define.amd ? define(['src'], factory) :
(global = global || self, global.JSCache = factory(global.test));
}(this, function (test) { 'use strict';

test = test && test.hasOwnProperty('default') ? test['default'] : test;



return test;

}));
