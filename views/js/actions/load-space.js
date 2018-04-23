define(
[
 'domain/state',
 'domain/base-state',
 'domain/padded-date',
  'domain/padded-time'
], function(state, getBaseState, getPaddedDate, getPaddedTime)
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
        data.id = randomId();
        state.store(data);
      }
    }
    else
    {
      data = getBaseState();
      data.id = randomId();
      state.store(data);
    }
    return data;
  }
});