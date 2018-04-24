define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/template'
], function(dom, templater){
  return function(e){
    var target = dom.from(e.target).parent('a', true);
    var type = target.getData('type');
  }
});