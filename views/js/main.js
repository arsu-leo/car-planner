require(
[
 '//cdn.adamo.es/js/material.ui.js',
 '//cdn.adamo.es/js/service/observer.js',
 'actions/load-current-state',
 'actions/build-menu'
], function(u,o, loadCurrentState, buildMenu){
  var data = loadCurrentState();
  buildMenu(data, function(){
    console.log("Menu built");
  });
});