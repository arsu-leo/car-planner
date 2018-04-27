define([
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/change-entity',
  'actions/build-menu',
  'actions/render-main'
], function(dom, changeEntity, buildMenu, renderMain){
  return function(e){
    var form = dom.from(e.target).parent('form', true);
    var values = form.select('input').valueMap();

    changeEntity('delete', values.type, values);
    
    var done = 0;
    var tasks = 2;
    var finish = function(){
      done++;
      if(done >= tasks)
        dom.select('.dialog, .overlay').remove();    
    }
    buildMenu(finish);
    renderMain(finish);
  };
});