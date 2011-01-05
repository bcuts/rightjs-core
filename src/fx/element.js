/**
 * This block contains additional Element shortcuts for effects easy handling
 *
 * Credits:
 *   Some ideas are inspired by
 *     - MooTools  (http://mootools.net)      Copyright (C) Valerio Proietti
 *
 * Copyright (C) 2008-2010 Nikolay V. Nemshilov
 */
var methods    = Element.prototype,
    old_hide   = methods.hide,
    old_show   = methods.show,
    old_remove = methods.remove,
    old_scroll = methods.scrollTo;

/**
 * Calls the visual effect on the element
 *
 * @param Element context
 * @param String fx-name
 * @param Object fx-options
 * @return Element context
 */
function call_fx(element, name, params) {
  var args    = $A(params).compact(),
      options = isHash(args.last()) ? args.pop() : {},
      fx      = new Fx[name.capitalize()](element, options);

  fx.start.apply(fx, args);

  return element;
}

Element.include({
  /**
   * Stops all the visual effects on the element
   *
   * @return Element this
   */
  stop: function() {
    (Fx.cr[$uid(this)] || []).each('cancel');
    return this;
  },

  /**
   * hides the element with given visual effect
   *
   * @param String fx name
   * @param Object fx options
   * @return Element this
   */
  hide: function(fx, options) {
    return (fx && this.visible()) ? call_fx(this, fx, ['out', options]) : old_hide.call(this);
  },

  /**
   * shows the element with the given visual effect
   *
   * @param String fx name
   * @param Object fx options
   * @return Element this
   */
  show: function(fx, options) {
    return (fx && !this.visible()) ? call_fx(this, fx, ['in', options]) : old_show.call(this);
  },

  /**
   * Removes the element out of the DOM structure
   *
   * @param String fx name
   * @param Object fx options
   * @return Element this
   */
  remove: function(fx, options) {
    return (fx && this.visible()) ? call_fx(this, fx, ['out', Object.merge(options, {
      onFinish: old_remove.bind(this)
    })]) : old_remove.call(this);
  },

  /**
   * runs the Fx.Morth effect to the given style
   *
   * @param style Object style
   * @param options Object optional effect options
   * @return Element self
   */
  morph: function(style, options) {
    return call_fx(this, 'morph', [style, options || {}]); // <- don't replace with arguments
  },

  /**
   * highlights the element
   *
   * @param start String start color
   * @param end String optional end color
   * @param Object effect options
   * @return Element self
   */
  highlight: function() {
    return call_fx(this, 'highlight', arguments);
  },

  /**
   * runs the Fx.Fade effect on the element
   *
   * @param mixed fade direction 'in' 'out' or a float number
   * @return Element self
   */
  fade: function() {
    return call_fx(this, 'fade', arguments);
  },

  /**
   * runs the Fx.Slide effect on the element
   *
   * @param String 'in' or 'out'
   * @param Object effect options
   * @return Element self
   */
  slide: function() {
    return call_fx(this, 'slide', arguments);
  },

  /**
   * Starts the smooth scrolling effect
   *
   * @param position Object {x: NNN, y: NNN} where to scroll
   * @param options Object fx-options
   * @return Element this
   */
  scroll: function(value, options) {
    return call_fx(this, 'scroll', [value, options||{}]);
  },

  /**
   * wraps the old scroll to be able to run it with fxes
   *
   * If you send two hashes then will start a smooth scrolling
   * otherwise will just jump over with the usual method
   *
   * @return Element this
   */
  scrollTo: function(value, options) {
    return isHash(options) ? this.scroll(value, options) : old_scroll.apply(this, arguments);
  }
});
