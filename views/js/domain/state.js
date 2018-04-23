define(
[
 'domain/local-storage',
 'domain/test-data'
 //Api store?
], function(storage, getTestData, getPaddedDate, getPaddedTime){
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
        data = this.storage.getItem(this.prefix + id);
        if(!data)
        {
          data = this.storage.getItem(this.prefix + 'last');
          if(!data || data.id != id)  
            data = undefined;
        }
      }
      
      this.currentState = data;
      return this.currentState;
    }
    
    store(data)
    {
      this.currentState = data;
      this.storage.setItem(this.prefix + data.id, data);
      this.storage.setItem(this.prefix + 'last' , data);
    }
  }
  return new Storage(prefix, storage);
});

