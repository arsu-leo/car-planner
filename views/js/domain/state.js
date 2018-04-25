define(
[
 'domain/local-storage',
 'domain/test-data',
 'domain/base-state',
 //Api store?
], function(storage, getTestData, getBaseState){
  var prefix = 'car-planner-';

  class Storage {
    constructor(prefix, stg)
    {
      this.storage      = stg;
      this.prefix       = prefix;
      this.currentState = undefined;
    }

    get()
    {
      return this.currentState;
    }

    __getStoredData(id)
    {
      var data = this.storage.getItem(id);
            //parse
      var st = getBaseState();
      st.loadFromObjectState(data);
      return st;
    }
    getLastStored()
    {
      return this.__getStoredData(this.prefix + 'last');
    }

    load(id)
    {
      //Storage
      var data;
      if(id == 'test')
      {
        data = getTestData();
      }
      else if(id) 
      {
        data = this.__getStoredData(this.prefix + id);
        if(!data)
        {
          data = this.getLastStored();
          if(!data || data.id != id)  
            data = undefined;
        }
      }
      else 
      {
        data = this.getLastStored();
      }
      
      this.currentState = data;
      return this.currentState;
    }
    
    store(data)
    {
      data = data || this.currentState;
      this.currentState = data;
      this.storage.setItem(this.prefix + data.id, data);
      this.storage.setItem(this.prefix + 'last' , data);
    }
  }
  return new Storage(prefix, storage);
});

