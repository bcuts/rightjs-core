/**
 * The Number class extentions
 *
 * Credits:
 *   Some methods inspired by
 *     - Ruby      (http://www.ruby-lang.org) Copyright (C) Yukihiro Matsumoto
 *
 * Copyright (C) 2008-2010 Nikolay V. Nemshilov
 */
Number.include({
  /**
   * executes the given callback the given number of times
   *
   * @param Function callback
   * @param Object optional callback execution scope
   * @return void
   */
  times: function(callback, scope) {
    for (var i=0; i < this; i++) {
      callback.call(scope, i);
    }
    return this;
  },

  upto: function(number, callback, scope) {
    if (callback === undefined) {
      var numbers = [];
      for (var i=this+0; i <= number; i++) {
        numbers.push(i);
      }
      return numbers;
    } else {
      for (var i=this+0; i <= number; i++) {
        callback.call(scope, i);
      }
      return this;
    }
  },

  downto: function(number, callback, scope) {
    if (callback === undefined) {
      var numbers = [];
      for (var i=this+0; i >= number; i--) {
        numbers.push(i);
      }
      return numbers;
    } else {
      for (var i=this+0; i >= number; i--) {
        callback.call(scope, i);
      }
      return this;
    }
  },

  abs: function() {
    return Math.abs(this);
  },

  round: function(size) {
    return size ? parseFloat(this.toFixed(size)) : Math.round(this);
  },

  ceil: function() {
    return Math.ceil(this);
  },

  floor: function() {
    return Math.floor(this);
  },

  min: function(value) {
    return this < value ? value : this + 0;
  },

  max: function(value) {
    return this > value ? value : this + 0;
  }
});
