define(function()
{
  return function (scenario, type, id)
  {
    var r = false;
    switch(type)
    {
      case 'Place':
        return scenario.getPlace(id);
      case 'Car':
        r = scenario.getCar(id);
        if(r) 
          return r;
        for(var a = 0; a < scenario.places.length; a++){
          r = scenario.places[a].getCar(id);
          if(r)
            return r;
        }
        return false;
      case 'Person':
        r = scenario.getPerson(id);
        if(r) 
          return r;
        for(var a = 0; a < scenario.places.length; a++){
          r = scenario.places[a].getPerson(id);
          if(r)
            return r;
          for(var b = 0; b < scenario.places[a].cars.length; ++b)
            r = scenario.places[a].cars[b].getPerson(id);
            if(r)
              return r;
        }
        for(var a = 0; a < scenario.cars.length; a++){
          r = scenario.cars[a].getPerson(id);
          if(r)
            return r;
        }
        return false;
    }
    return false;
  }
});