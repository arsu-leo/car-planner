define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/state',
  'classes/helpers/get-parent-in-scenario',
  'actions/domain/get-element-data-pane'
], function(dom, state, getParent, getElementDataPane)
{
  return function(event, id, type)
  {
    event.dataTransfer.setData('id', id);
    event.dataTransfer.setData('type', type);
    event.dataTransfer.setDragImage(dom.select('img.draggable-image-' + type).get(0),0 ,0);

    window.dragElement = { id : id, type : type };
    var target = dom.select('.scenario-pane');
    target.addClass('dragover');
    
    var status        = state.get();
    var scenarioId    = dom.select('.scenario-pane > .data-pane input[name="id"]').getValue();
    if(!scenarioId)
      return;
    
    var scenario      = status.getScenario(scenarioId);
    var elementParent = getParent(scenario, type, id);
    
    var locations = target.select('.placeholder');
    
    locations.each(function(droppableTarget, index)
    {
      var acceptable = droppableTarget.getData('acceptedDrops') == type.toLowerCase();
      if(acceptable)
      {
        if(elementParent)
        {
          var dataPane = getElementDataPane(droppableTarget);
          var id = dataPane.select('input[name="id"]').getValue();
          acceptable = acceptable && elementParent.getId() != id;
        }
      }
      if(acceptable)
        droppableTarget.addClass('active');
      else 
        droppableTarget.removeClass('active');
    });
  }
});