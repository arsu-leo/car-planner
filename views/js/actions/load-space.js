define(
[
 'domain/state',
 'domain/base-state',
 'classes/helpers/compose-id'
], function(state, getBaseState, composeId)
{
  return function(id) {
    //Storage
    var data = undefined;
    if(id)
    {
      data = state.load(id);
      if(!data)
      {
        console.log(`Data for id ${id} not found, loading a base state`);
        data = getBaseState();
        data.id = composeId('','','');
        state.store(data);
      }
    }
    else
    {
      data = getBaseState();
      data.id = composeId('','','');
      state.store(data);
    }
    return data;
  }
});