define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/template'
], function(dom, templater)
{
  return function(cb)
  {
    templater.compile('/hbs/main/no-scenario-selected', {}, function(html){
      var pane = dom.select('.main-pane');
      pane.clear();
      pane.setContent(html);
      cb && cb();
    });
  };
});