define([
'classes/State'
  ], function(State){
  return function(){
    return new State('base');
  }
});