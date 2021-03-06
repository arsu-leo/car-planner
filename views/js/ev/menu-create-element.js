define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'ev/domain/show-edit-popup'
], function(dom, showEditPopup)
{
  return function(e)
  {
    var target = dom.from(e.target).parent('a', true);
    var type = target.getData('type');
    showEditPopup(e, 'create', type, {}, function()
    {
      var input = dom.select('.dialog input[name="name"]');
      setTimeout(function()
      {
        input.get(0).focus();
      }, 100);
    });
  };
});