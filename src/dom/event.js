/**
 * represents some additional functionality for the Event class
 *
 * NOTE: there more additional functionality for the Event class in the rightjs-goods project
 *
 * Credits:
 *   The additional method names are inspired by
 *     - Prototype (http://prototypejs.org)   Copyright (C) Sam Stephenson
 *
 * Copyright (C) 2008-2010 Nikolay Nemshilov
 */
var Event = RightJS.Event = new Class(Wrapper, {
  // predefining the keys to spped up the assignments
  type:          null,

  which:         null,
  keyCode:       null,

  target:        null,
  currentTarget: null,
  relatedTarget: null,

  pageX:         null,
  pageY:         null,

  /**
   * the class constructor
   *
   * @param raw dom-event
   * @param HTMLElement the bound element
   * @return void
   */
  initialize: Event_Klass, // the actual initialization happens in the Klass function

  /**
   * Stops the event bubbling process
   *
   * @return RightJS.Event this
   */
  stopPropagation: function() {
    if ('stopPropagation' in this._) {
      this._.stopPropagation();
    } else {
      this._.cancelBubble = true;
    }
    this.stopped = true;
    return this;
  },

  /**
   * Prevents the default browser action on the event
   *
   * @return RightJS.Event this
   */
  preventDefault: function() {
    if ('preventDefault' in this._) {
      this._.preventDefault();
    } else {
      this._.returnValue = false;
    }
    return this;
  },

  /**
   * Fully stops the event
   *
   * @return RightJS.Event this
   */
  stop: function() {
    return this.stopPropagation().preventDefault();
  },

  /**
   * Returns the event position
   *
   * @return Object {x: ..., y: ...}
   */
  position: function() {
    return {x: this.pageX, y: this.pageY};
  },

  /**
   * Returns the event's offset relative to the target element
   *
   * @return Object {x: ..., y: ...}
   */
  offset: function() {
    var element_position = this.target.position();

    return {
      x: this.pageX - element_position.x,
      y: this.pageY - element_position.y
    };
  },

  /**
   * Finds the element between the event target
   * and the boundary element that matches the
   * css-rule
   *
   * @param String css-rule
   * @return Element element or null
   */
  find: function(css_rule) {
    if (this.target instanceof Wrapper && this.currentTarget instanceof Wrapper) {
      var target = this.target._,
          search = this.currentTarget.find(css_rule, true);

      while (target) {
        if (search.indexOf(target) !== -1) {
          return target;
        }
        target = target.parentNode;
      }
    }

    return undefined;
  }
}, Event_Klass),

Event_delegation_shortcuts = [];

/**
 * Event's own Klass function, we don't need to check
 * nothing in here, don't need to hit the wrappers cache and so one
 *
 * @param raw dom-event or an event-name
 * @param bounding element or an object with options
 */
function Event_Klass(event, bound_element) {
  if (typeof event === 'string') {
    event = Object.merge({type: event}, bound_element);
    this.stopped = event.bubbles === false;

    if (isHash(bound_element)) {
      $ext(this, bound_element);
    }
  }

  this._             = event;
  this.type          = event.type;

  this.which         = event.which;
  this.keyCode       = event.keyCode;

  this.target        = $(event.target);
  this.currentTarget = $(event.currentTarget);
  this.relatedTarget = $(event.relatedTarget);

  this.pageX         = event.pageX;
  this.pageY         = event.pageY;

  if ('srcElement' in event) {
    // grabbin the IE properties
    this.which = event.button == 2 ? 3 : event.button == 4 ? 2 : 1;

    // faking the target property
    this.target = $(event.srcElement) || bound_element;

    // faking the relatedTarget, currentTarget and other targets
    this.relatedTarget = this.target._ === event.fromElement ? $(event.toElement) : this.target;
    this.currentTarget = bound_element;

    // faking the mouse position
    var scrolls = this.target.window().scrolls();

    this.pageX = event.clientX + scrolls.x;
    this.pageY = event.clientY + scrolls.y;
  } else if (event.target && 'nodeType' in event.target && event.target.nodeType === 3) {
    // Safari fix
    this.target = $(event.target.parentNode);
  }
}