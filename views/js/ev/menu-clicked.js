define([
  '//cdn.adamo.es/js/gateway/dom.js'
], function(dom)
{
  return function(e)
  {
    dom.select('body > nav').toggleClass('active');
  }
});