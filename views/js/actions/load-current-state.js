define(
[
 'actions/get-current-id',
 'actions/load-state'
], function(getCurrentId, loadState){
  return function(){
    var id = getCurrentId();
    return loadState(id);  
  };
});