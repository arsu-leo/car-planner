define(
[], function(){
  return function(){
    var base = {
      id : undefined,
      scenarios : [],
      places : [],
      cars : [],
      persons : [],
    };
    
    function getElement(b, container, id, attr)
    {
      attr = attr || 'id';
      for(var a = 0; a < b[container].length; a++)
      {
        if(b[container][a][attr] == id)
          return b[container][a];
      }
      return false; 
    }

    base.getScenario = function(id)
    {
      return getElement(base,'scenarios', id, 'id');
    };
    base.getPlace = function(id)
    {
      return getElement(base,'places', id, 'id');
    };
    base.getCar = function(id) {
      return getElement(base, 'cars', id, 'id');
    };
    base.getPerson = function(id) {
      return getElement(base, 'persons', id, 'id');
    };
    return base;
  }
});