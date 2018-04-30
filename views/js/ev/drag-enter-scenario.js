define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/state',
  'classes/helpers/get-parent-in-scenario'
], function(dom, state, getParent)
{
  return function(e)
  {
    e.preventDefault();
    e.stopPropagation();
    var t = dom.from(e.target);
    /*if(!t.hasClass('scenario-pane'))
      return;
    */
    console.log("Dragenter", e.target);
    /*The target  property is broken for this event (dragenter)  
    Instead of pointing on "The element underneath the element being dragged. "  
    it points to itself which explains why people use dragover to allow the drop (found on chrome)
    */
    //var target = dom.from(e.target).parent('.scenario-pane', true);
    var target = dom.select('.scenario-pane');
    target.addClass('dragover');

    var ev = window.draggingevent;
    var id = ev.id; //.dataTransfer.getData('id');
    var type = ev.type; //.dataTransfer.getData('type');

    var scenarioId = dom.select('.scenario-pane > .data-pane input[name="id"]').getValue();
    var status = state.get();
    var scenario = status.getScenario(scenarioId);
    var elementParent = getParent(scenario, type, id);
    
    var locations = target.select('.placeholder');
    
    locations.each(function(droppableTarget, index){
      var acceptable = droppableTarget.getData('acceptedDrops') == type.toLowerCase();
      if(acceptable){

        if(elementParent)
        {
          droppableTarget.parent('.element-pane', true).children().each(function(div, i){
            if(div.hasClass('data-pane'))
            {
              var id = div.select('input[name="id"]').getValue();
              acceptable = acceptable && elementParent.getId() != id;
            } 
          });
        }
      }
      if(acceptable){
        droppableTarget.addClass('active');
      }
      else 
        droppableTarget.removeClass('active');
    });
  }
});