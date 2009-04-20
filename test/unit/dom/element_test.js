/**
 * The Element class unit-test
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
var ElementTest = TestCase.create({
  name: 'ElementTest',
  
  testInstance: function() {
    this.assertEqual('DIV',   new Element('div').tagName);
    this.assertEqual('TABLE', new Element('table').tagName);
  },
  
  testInstanceWithClass: function() {
    this.assertEqual(new Element('div', {
      'class': 'foo bla'
    }).className, 'foo bla');
    
    this.assertEqual(new Element('div', {
      className: 'foo bla'
    }).className, 'foo bla');
  },
  
  testInstanceWithStyle: function() {
    var style = {
      fontSize:   '12px',
      borderSize: '12px',
      display:    'none'
    }
    this.assertStyle(new Element('div', {
      style: style
    }), style);
  },
  
  testInstanceWithAttributes: function() {
    var el = new Element('div', {
      id: 'el-id',
      name: 'el-name',
      title: 'el-title'
    });
    
    this.assertEqual('el-id', el.id);
    this.assertEqual('el-name', el.name);
    this.assertEqual('el-title', el.title);
  },
  
  testInstanceWithEvents: function() {
    var el = new Element('div', {
      observe: {
        click: function() {}
      }
    });
    
    this.assert(el.observes('click'));
  },
  
  testInstanceWithHtml: function() {
    var el = new Element('div', {
      html: "inner html<script>self['__test'] = 1;</script>"
    });
    
    this.assertEqual('inner html', el.innerHTML);
    this.assertEqual(1, self['__test']);
  },
  
  
  testElement_createFragment: function() {
    var string = '<div><p></p></div><span></span>';
    
    
    var block  = document.createElement('div');
    
    block.appendChild(Element.createFragment(string));
    
    this.assertEqual(string, block.innerHTML.toLowerCase().replace(/\s+/mg, "")); // IE tries to wrap the elements
    
    // trying with a list of elements
    var block  = document.createElement('div');
    
    var div    = document.createElement('div');
    var p      = document.createElement('p');
    var span   = document.createElement('span');
    
    div.appendChild(p);
    
    block.appendChild(Element.createFragment([div, span]));
    
    this.assertEqual(string, block.innerHTML.toLowerCase().replace(/\s+/mg, "")); // IE tries to wrap the elements
    
    // trying a single unit
    var block  = document.createElement('div');
    
    block.appendChild(Element.createFragment(div));
    
    this.assertEqual('<div><p></p></div>', block.innerHTML.toLowerCase().replace(/\s+/mg, "")); // IE tries to wrap the elements
  }
});