define(
[
 '//cdn.adamo.es/js/gateway/dom.js'
], function(dom){
  return function() {
    var input = dom.select('#hidden-data input[name="id"]');
    return input.length ? input.getValue() : '';
  }
});