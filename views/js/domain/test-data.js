define(
[
  'domain/base-state',
  'classes/Car',
  'classes/Person',
  'classes/Place',
  'classes/Scenario',
], function(getBaseState, Car, Person, Place, Scenario){
  var basePersons = ['Alicia', 'Leo', 'Encarni', 'Manolo', 'Elena', 'Rosa', 'Nerea', 'Jenny', 'Jana', 'German', 'Francesc', 'Kaka'];
  var baseCars = ['AliCar', 'TorresCar', 'RosaCar', 'NereaCar', 'JennyCar',  'FranCar'];
  var basePlaces = ['CasaPapis', 'CasaAli'];
  var baseScenarios = ['ViajeIglesia', 'ViajeConvite', 'Salida'];

  return function()
  {
    var state = getBaseState();
    var created = {
      cars : {},
      persons : {},
      places : {},
      scenarios : {}
    };
    for(var a = 0; a < basePersons.length; ++a){
      var p = new Person(basePersons[a]);
      created.persons[basePersons[a]] = p;
      state.persons.push(p);
    }

    for(var a = 0; a < baseCars.length; ++a){
      var p = new Car(baseCars[a], 5);
      created.cars[baseCars[a]] = p;
      state.cars.push(p);
    }

    for(var a = 0; a < basePlaces.length; ++a){
      var p = new Place(basePlaces[a]);
      created.places[basePlaces[a]] = p;
      state.places.push(p);
    }

    for(var a = 0; a < baseScenarios.length; ++a){
      var p = new Scenario(baseScenarios[a]);
      created.persons[baseScenarios[a]] = p;
      state.scenarios.push(p);
    }
    return state;
  }

});