define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/template',
  'domain/get-type-name'
], function(dom, templater, getTypeName)
{
  function getTemplate(type)
  {
    switch(type)
    {
      case 'car':
        return 'edit-car-element';
      default:
        return 'edit-name-element';
    }
  };

  function getHeader(action, element, type)
  {
    var name = element.getName ? element.getName() : getTypeName(type);
    switch(action)
    {
      case 'edit':
        return "Edit " + name;
      case 'create':
        return 'Create ' + name;
      default: 
        return "Unknow action(" + action + ") for " + name;
    }
  };

  return function(e, action, type, element, cb)
  {
    dom.select('.dialog, .overlay').remove();
    var copy = {};
    var keys = Object.keys(element);
    for(var a = 0; a < keys.length; ++a){
      copy[keys[a]] = element[keys[a]];
    }
    copy.type = type;
    copy.mode = action;
    templater.compile('/hbs/popup/' + getTemplate(type), copy, function(html)
    {
      templater.compile('/hbs/popup/base-popup', { header : getHeader(action, element, type), content : html}, function(html)
      {
        dom.select('body').append(html);  
        cb && cb();
      });
    });
  };
});