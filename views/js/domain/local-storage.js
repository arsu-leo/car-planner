define(
[
], function(){
return window.localStorage || {
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