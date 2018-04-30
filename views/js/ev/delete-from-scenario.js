define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/state',
  'actions/domain/get-element-data-pane',
  'actions/render-main'
], function(dom, state, getPane, renderMain)
{
  return function(e)
  {
    var status        = state.get();
    var scenarioId    = dom.select('.scenario-pane > .data-pane input[name="id"]').getValue();
    if(!scenarioId)
      return;

    var scenario  = status.getScenario(scenarioId);
    var target    = dom.from(e.target);
    var pane      = getPane(target);

    var id        = pane.select('input[name="id"]').getValue();
    var type      = pane.select('input[name="type"]').getValue();

    switch(type){
      case 'Person':
        scenario.deletePerson(id);
        break;
      case 'Car':
        scenario.deleteCar(id);
        break;
      case 'Place':
        scenario.removePlace(id, true, true);
        break;
    }
    state.store()
    renderMain();
  }
});