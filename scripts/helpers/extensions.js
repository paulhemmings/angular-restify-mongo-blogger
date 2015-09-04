'use strict';

/*
 * Nifty little method to ensure that allows you to
 * bind a method to a desired scope.
 * Very similar to JQuery $.proxy
 * http://howtonode.org/what-is-this
 *
 * Used like this obj.onEventHandler = bind(HandlerClass.method, HandlerClass);
 *
 * When the handler calls the method, the method will run within the scope
 * of the HandlerClass
 */

exports.bind = function(fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
};

exports.curry = function(foo, b) {
   return function(c) {
       return foo(b, c);
   }
};

exports.combine = function(a, b) {
  return function(c) {
    return a(b(c));
  }
};

exports.Contain = function(v) {
  function Container(value) {
      this.pipe = function(foo) {
        return foo(value);
      };
      this.thru = function(foo) {
        return new Container(foo(value));
      }
  }
  return new Container(v);
};

exports.chain = function(scope, start, error) {
    return function(success) {
        return function() {
            start.apply(scope, arguments).then(success, error);
        }
    }
};
