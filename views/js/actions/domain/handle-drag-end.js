define([
  '//cdn.adamo.es/js/gateway/dom.js'
], function(dom)
{
  return function(e){
    console.log("DRag end", e)
    var target = dom.select('.scenario-pane');
    target.removeClass('dragover'); 
    target.select('.placeholder.active').removeClass('active');
  }

});

