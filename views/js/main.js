require(
[
 '//cdn.adamo.es/js/material.ui.js',
 '//cdn.adamo.es/js/service/observer.js',
 'actions/get-current-id',
 'actions/load-space'
], function(u,o, getCurrentId, loadSpace){
  var id = getCurrentId();
  loadSpace(id);
});