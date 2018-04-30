require(
[
 '//cdn.adamo.es/js/material.ui.js',
 '//cdn.adamo.es/js/service/observer.js',
 '//cdn.adamo.es/js/gateway/dom.js',
 'actions/load-current-state',
 'actions/build-menu',
 'actions/render-main'
], function(u,o, dom, loadCurrentState, buildMenu, renderMain){
  var data = loadCurrentState();
  if(data.id){
    dom.select('#hidden-data input[name="id"]').setValue(data.id);
    dom.select('.adamo-home-container a').setAttribute('href', '/?id=' + data.id);
  }
  
  buildMenu(function(){
    renderMain(function(){
      console.log("Menu built");
    });
  });
});