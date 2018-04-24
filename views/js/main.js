require(
[
 '//cdn.adamo.es/js/material.ui.js',
 '//cdn.adamo.es/js/service/observer.js',
 '//cdn.adamo.es/js/gateway/dom.js',
 'actions/load-current-state',
 'actions/build-menu'
], function(u,o, dom, loadCurrentState, buildMenu){
  var data = loadCurrentState();
  if(data.id)
    dom.select('#hidden-data input[name="id"]').setValue(data.id);
  
  buildMenu(data, function(){
    console.log("Menu built");
  });
});