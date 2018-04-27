define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'ev/domain/show-edit-popup',
  'domain/state'
], function(dom, showEditPopup, state)
{
  return function(e)
  {
    var target = dom.from(e.target).parent('a', true);
    var type = target.getData('type');
    var element = state.get().getElement(type, target.getData('id'));
    showEditPopup(e, 'edit', type, element, function()
    {
      var input = dom.select('.dialog input[name="name"]');
      setTimeout(function()
      {
        input.get(0).focus();
      }, 100);
    });
  };
});