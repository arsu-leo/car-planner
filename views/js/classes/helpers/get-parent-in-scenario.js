define(function()
{
  return function (scenario, type, id)
  {
    switch(type)
    {
      case 'Place':
        return scenario.getPlace(id) ? scenario : false;
      case 'Car':
        if(scenario.getCar(id)) 
          return scenario;
        for(var a = 0; a < scenario.places.length; a++)
          if(scenario.places[a].getCar(id))
            return scenario.places[a];
        return false;
      case 'Person':
        if(scenario.getPerson(id)) 
          return scenario;
        for(var a = 0; a < scenario.places.length; a++){
          if(scenario.places[a].getPerson(id))
            return scenario.places[a];
          for(var b = 0; b < scenario.places[a].cars.length; ++b)
            if(scenario.places[a].cars[b].getPerson(id))
              return scenario.places[a].cars[b];
        }
        for(var a = 0; a < scenario.cars.length; a++){
          if(scenario.cars[a].getPerson(id))
            return scenario.cars[a];
        }
        return false;
    }
    return false;
  }
});