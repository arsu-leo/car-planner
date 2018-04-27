define([
  'domain/state'
], function(state){
  
  return function(mode, type, map)
  {
    var status = state.get();
    var ret = undefined;
    debugger;
    switch(mode)
    {
      case 'create':
        ret = status.create(type, map);
        break;
      case 'edit':
        ret = status.edit(type, map);
        break;
      case 'delete':
        status.delete(type, map);
        break;
      default:
        ret = false;
    }
    state.store();
    return ret;
  };
});