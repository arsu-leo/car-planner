define([
  '//cdn.adamo.es/js/gateway/dom.js'
], function(dom)
{
  return function(domElement)
  {
    var r = false;
    domElement
      .parent('.element-pane', true)
      .children()
      .each(function(div, i)
    {
      if(div.hasClass('data-pane'))
        r = div;
    });

    return r || dom.from([]);
  }
});

