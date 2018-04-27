define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/state',
  'actions/render-main'
], function(dom, state, renderMain)
{
  return function(e)
  {
    var target = dom.from(e.target).parent('a', true);
    var type = target.getData('type');

    if(type != 'scenario')
      return;

    var id = target.getData('id');
    if(!id)
      return;

    var status = state.get();
    status.setActiveScenario(id);
    renderMain();
  };
});