require(
[
 '//cdn.adamo.es/js/material.ui.js',
 '//cdn.adamo.es/js/service/observer.js',
 'actions/get-current-id',
 'actions/load-space',
 'actions/build-menu'
], function(u,o, getCurrentId, loadSpace, buildMenu){
  debugger;
  var id = getCurrentId();
  var data = loadSpace(id);
  buildMenu(data, function(){
    console.log("Menu built");
  });
});