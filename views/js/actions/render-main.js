define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/state',
  'actions/render-main'
], function(dom, state, renderMain)
{
  return function(cb)
  {
    cb && cb();
  };
});