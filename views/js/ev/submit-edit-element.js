define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/create-entity',
  'actions/build-menu',
  'domain/state',
  'domain/state',
], function(dom, createEntity, buildMenu, state){
  return function(e){
    debugger;
    var form = dom.from(e.target).parent('form', true);
    var values = form.select('input').valueMap();
    createEntity(values.type, values);
    var data = state.get();
    buildMenu(data);
    dom.select('.dialog, .overlay').remove();
  };
});