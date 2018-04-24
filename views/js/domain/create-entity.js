define([
  'classes/Car',
  'classes/Person',
  'classes/Place',
  'classes/Scenario',
  'domain/state'
], function(Car, Person, Place, Scenario, state){
  return function(type, map)
  {
    var data = state.get();
    switch(type)
    {
      case 'car':
        data.cars.push(new Car(map.name, map.capacity))
        break;
      case 'person':
        data.persons.push(new Person(map.name));
        break;
      case 'scenario':
        data.scenarios.push(new Scenario(map.name));
        break;
      case 'place':
        data.places.push(new Place(map.name));
      default:
        throw new Error("Unknown type '" + type + "'");
    };
    debugger;
    state.store();
  };
});