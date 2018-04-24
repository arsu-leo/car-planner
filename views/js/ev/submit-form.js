define([
  '//cdn.adamo.es/js/gateway/dom.js'
], function(dom){
  return function(e){
    var form = dom.from(e.target).parent('form', true);
    form.get(0).submit();
  }
});