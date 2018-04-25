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
    var element = undefined;
    switch(type)
    {
      case 'car':
        element = new Car(map.name, map.capacity);
        data.cars.push(element)
        break;
      case 'person':
        element = new Person(map.name);
        data.persons.push(element);
        break;
      case 'scenario':
        element = new Scenario(map.name);
        data.scenarios.push(element);
        break;
      case 'place':
        element = new Place(map.name);
        data.places.push(element);
      default:
        throw new Error("Unknown type '" + type + "'");
    };
    state.store();
    return element;
  };
});