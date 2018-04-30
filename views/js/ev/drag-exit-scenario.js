define([
  '//cdn.adamo.es/js/gateway/dom.js'
], function(dom)
{
  return function(e)
  {
    e.preventDefault();
    e.stopPropagation();
    /*var t = dom.from(e.target);
    if(!t.hasClass('scenario-pane'))
      return;*/
    console.log("Dragexit",e.target);
    /*The target  property is broken for this event (dragenter)  
    Instead of pointing on "The element underneath the element being dragged. "  
    it points to itself which explains why people use dragover to allow the drop (found on chrome)
    */
    //var target = dom.from(e.target).parent('.scenario-pane', true);
    var target = dom.select('.scenario-pane');
    target.removeClass('dragover'); 
    target.select('.placeholder.active').removeClass('active');
  }
});