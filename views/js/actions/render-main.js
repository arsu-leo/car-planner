define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/state',
  'actions/domain/no-scenario-selected',
  'domain/template',
  'ev/drop'
], function(dom, state, noScenarioSelected, templater, dropEvent)
{

  function bindMainDragEnter()
  {
    var pane = dom.select('.scenario-pane');
    if(pane.length <= 0)
      return;

    var fn = function(e) {
      e.preventDefault();
    };
    //pane.on('dragleave',  fn);
    
    //pane.on('dragexit',  fn);
    
    pane
      .select('.placeholder')
      .each(function(domPlaceholder)
    {
      domPlaceholder.on('dragenter', fn);
      domPlaceholder.on('dragover', fn);
      
      domPlaceholder.on('drop', dropEvent);
      domPlaceholder.on('dragdrop', dropEvent);
    });
  };

  return function(cb)
  {
    var status = state.get();
    templater.registerPartials(function(){
      if(!status)
        return noScenarioSelected(cb);
      var scenario = status.getActiveScenario();
      if(!scenario)
        return noScenarioSelected(cb);
      var context = scenario.getContext();
      templater.compile('/hbs/main/main', context, function(html){
        var pane = dom.select('.main-pane');
        pane.clear();
        pane.setContent(html);

        bindMainDragEnter();
       
        cb && cb();
      });
    });
  };
});