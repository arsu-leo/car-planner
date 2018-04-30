define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/state',
  'actions/circular-require',
  'classes/helpers/get-parent-in-scenario',
  'classes/helpers/get-element-in-scenario',
  'actions/domain/get-element-data-pane'
], function(dom, state, ciruclarRequire, getParent, getElement, getElementDataPane)
{
  function renderMain(...p){
    ciruclarRequire('actions/render-main', ...p);
  }
  return function(e)
  {
    e.preventDefault();

    var status        = state.get();
    var scenarioId    = dom.select('.scenario-pane > .data-pane input[name="id"]').getValue();
    if(!scenarioId)
      return;
    
    var scenario      = status.getScenario(scenarioId);
    
    //Identify destination
    var domTargetDestination  = dom.from(e.currentTarget);
    var targetDestinationPane = getElementDataPane(domTargetDestination);
    var destinationId         = targetDestinationPane.select('input[name="id"]').getValue();
    var destinationType       = targetDestinationPane.select('input[name="type"]').getValue();
    var destination           = scenario.id ==  destinationId ? scenario : getElement(scenario, destinationType, destinationId);

    //Identify source
    var id        = e.dataTransfer.getData('id');
    var type      = e.dataTransfer.getData('type');
    var fromMenu  = e.dataTransfer.getData('fromMenu');
    var element   = false;

    if(!fromMenu)
    {
      var elementParent = getParent(scenario, type, id);
      switch(type){
        case 'Person':
          element = elementParent.getPerson(id);
          elementParent.removePerson(id);
          break;
        case 'Car':
          element = elementParent.getCar(id);
          elementParent.removeCar(id);
          break;
        case 'Place':
          element = elementParent.getPlace(id);
          elementParent.removePlace(id);
          break;
      }
    } 
    else 
    {
      switch(type){
        case 'Person':
          element = status.copyPerson(id);
          break;
        case 'Car':
          element = status.copyCar(id);
          break;
        case 'Place':
          element = status.copyPlace(id);
          break;
      }
    }

    switch(type){
      case 'Person':
        destination.addPerson(element);
        break;
      case 'Car':
        destination.addCar(element);
        break;
      case 'Place':
        destination.addPlace(element);
        break;
    }

    renderMain();
  }
});