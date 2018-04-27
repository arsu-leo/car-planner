define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/state',
  'actions/domain/no-scenario-selected',
  'domain/template'
], function(dom, state, noScenarioSelected, templater)
{
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
        cb && cb();
      });
    });
  };
});