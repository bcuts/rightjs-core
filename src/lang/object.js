/**
 * The Object class extentions
 *
 * Credits:
 *   Some functionality is inspired by
 *     - Prototype (http://prototypejs.org)   Copyright (C) Sam Stephenson
 *
 * Copyright (C) 2008-2011 Nikolay V. Nemshilov
 */
$ext(Object, {
  /**
   * extracts the list of the attribute names of the given object
   *
   * @param Object object
   * @return Array keys list
   */
  keys: function(object) {
    var keys = [], key;
    for (key in object) {
      keys.push(key);
    }
    return keys;
  },

  /**
   * extracts the list of the attribute values of the given object
   *
   * @param Object object
   * @return Array values list
   */
  values: function(object) {
    var values = [], key;
    for (key in object) {
      values.push(object[key]);
    }
    return values;
  },

  /**
   * Calls the function with every key/value pair on the hash
   *
   * @param in Object the data hash
   * @param Function the callback
   * @param scope Object an optional scope
   * @return Object the original hash
   */
  each: function(object, callback, scope) {
    for (var key in object) {
      callback.call(scope, key, object[key]);
    }

    return object;
  },

  /**
   * checks if the object-hash has no keys
   *
   * @param Object object
   * @return check result
   */
  empty: function(object) {
    for (var key in object) { return false; }
    return true;
  },

  /**
   * A simple cloning method
   * NOTE: does not clone the things recoursively!
   *
   * @param Object object
   * @return Object clone
   */
  clone: function(object) {
    return Object.merge(object);
  },

  /**
   * returns a copy of the object which contains
   * all the same keys/values except the key-names
   * passed the the method arguments
   *
   * @param Object object
   * @param String key-name to exclude
   * .....
   * @return Object filtered copy
   */
  without: function() {
    var filter = $A(arguments), object = filter.shift(), copy = {}, key;

    for (key in object) {
      if (!filter.include(key)) {
        copy[key] = object[key];
      }
    }

    return copy;
  },

  /**
   * returns a copy of the object which contains all the
   * key/value pairs from the specified key-names list
   *
   * NOTE: if some key does not exists in the original object, it will be just skipped
   *
   * @param Object object
   * @param String key name to exclude
   * .....
   * @return Object filtered copy
   */
  only: function() {
    var filter = $A(arguments), object = filter.shift(), copy = {},
        i=0, length = filter.length;

    for (; i < length; i++) {
      if (filter[i] in object) {
        copy[filter[i]] = object[filter[i]];
      }
    }

    return copy;
  },

  /**
   * merges the given objects and returns the result
   *
   * NOTE this method _DO_NOT_ change the objects, it creates a new object
   *      which conatins all the given ones.
   *      if there is some keys introspections, the last object wins.
   *      all non-object arguments will be omitted
   *
   * @param first Object object
   * @param second Object mixing
   * ......
   * @return Object merged object
   */
  merge: function() {
    var object = {}, i=0, args=arguments, l=args.length, key;
    for (; i < l; i++) {
      if (isHash(args[i])) {
        for (key in args[i]) {
          object[key] = isHash(args[i][key]) && !(args[i][key] instanceof Class) ?
            Object.merge(key in object ? object[key] : {}, args[i][key]) : args[i][key];
        }
      }
    }
    return object;
  },

  /**
   * converts a hash-object into an equivalent url query string
   *
   * @param Object object
   * @return String query
   */
  toQueryString: function(object) {
    var entries = to_query_string_map(object), i=0, result = [];

    for (; i < entries.length; i++) {
      result.push(encodeURIComponent(entries[i][0]) + "=" + encodeURIComponent(''+entries[i][1]));
    }

    return result.join('&');
  }
}, true);

// private

/**
 * pre-converts nested objects into a flat key-value structure
 *
 * @param {Object} data-hash
 * @param {String} key-prefix
 * @return {Array} key-value pairs
 */
function to_query_string_map(hash, prefix) {
  var result = [], key, value, i;

  for (key in hash) {
    value = hash[key];
    if (prefix) {
      key = prefix + "["+ key + "]";
    }

    if (typeof(value) === 'object') {
      if (isArray(value)) {
        if (key.substr(-2) !== '[]') {
          key += "[]";
        }
        for (i=0; i < value.length; i++) {
          result.push([key, value[i]]);
        }
      } else if (value) { // assuming it's an object
        value = to_query_string_map(value, key);
        for (i=0; i < value.length; i++) {
          result.push(value[i]);
        }
      }
    } else {
      result.push([key, value]);
    }
  }

  return result;
}