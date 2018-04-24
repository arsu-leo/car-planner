define(
[
], function(){
return window.localStorage 
  ? {
    setItem : function(id, val)
    {
      return window.localStorage.setItem(id, JSON.stringify(val));
    },

    getItem : function(id)
    {
      var r = window.localStorage.getItem(id);
      return r !== null && r !== undefined
      ? JSON.parse(r)
      : r;
    },

    removeItem : function(id)
    {
      return window.localStorage.removeItem(id);
    },

    clear : function()
    {
      return window.localStorage.clear();
    }
  } 
  : {
    /**
     * @private
     */
    data : {},

    setItem : function(id, val)
    {
      return this.data[id] = String(val);
    },

    getItem : function(id)
    {
      return this.data.hasOwnProperty(id)
        ? data[id]
        : undefined;
    },

    removeItem : function(id)
    {
      return delete this.data[id];
    },

    clear : function()
    {
      return this.data = {};
    }
  };
});