define([
  'classes/helpers/compose-id',
  'classes/Person',
  'classes/Car',
  'classes/Place',
  'classes/Scenario'
], function(composeId, Person, Car, Place, Scenario){
    var typeName = 'st';
    var classes = {
      'Person'  : Person,
      'Car'     : Car,
      'Place'   : Place,
      'Scenario': Scenario
    };

    return class {
      constructor(name, id)
      {
        this.id = id || composeId(typeName, name);
        this.name = name;
        this.type = 'State';
        this.scenarios = [];
        this.places = [];
        this.cars = [];
        this.persons = [];
        this.activeScenario = undefined;
      }
    
      getName()
      {
        return this.name;
      }
  
      getId()
      {
        return this.id;
      }
      
      getActiveScenario()
      {
        return this.activeScenario;
      }

      setActiveScenario(sId)
      {
        var s = this.getScenario(sId);
        if(s)
          this.activeScenario = s;
        return this;
      }
      setName(n)
      {
        this.name = n;
        return this;
      }


      __copyElement(e)
      {
        var r = new classes[e.constructor.name](e.getName());
        var k = Object.keys(e);
        for(var a = 0; a < k.length; ++a)
        {
          r[k[a]] = e[k[a]];
        }
        return r;
      }

      __getElement(list, id, attr, copy)
      {
        attr = attr || 'id';
        for(var a = 0; a < list.length; a++)
        {
          if(list[a][attr] == id)
            return copy ? this.__copyElement(list[a]) : list[a];
        }
        return false; 
      }

      getScenario(id)
      {
        return getElement(this.scenarios, id, 'id');
      }

      copyScenario(id)
      {
        return getElement(this.scenarios, id, 'id', true); 
      }

      getPlace(id)
      {
        return getElement(this.places, id, 'id');
      }

      copyPlace(id)
      {
        return getElement(this.places, id, 'id', true);
      }
      
      getCar(id) {
        return getElement(this.cars, id, 'id');
      }
      
      copyCar(id) {
        return getElement(this.cars, id, 'id', true);
      }

      getPerson(id) {
        return getElement(this.persons, id, 'id');
      }

      copyPerson(id) {
        return getElement(this.persons, id, 'id', true);
      }

      loadFromObjectState(state)
      {
        if(!state)
          return this;
        this.scenarios = [];
        this.places = [];
        this.cars = [];
        this.persons = [];

        this.id = state.id;
        this.name = state.name;
        this.type = state.type;


        //Set the base data
        for(var a = 0; a < state.persons.length; ++a)
          this.persons.push(new Person(state.persons[a].name, state.persons[a].id));

        for(var a = 0; a < state.cars.length; ++a)
          this.cars.push(new Car(state.cars[a].name, state.cars[a].capacity, state.cars[a].id));

        for(var a = 0; a < state.places.length; ++a)
          this.places.push(new Place(state.places[a].name, state.places[a].id));



        var fillCar = function(car, stateCar)
        {
          for(var b = 0; b < stateCar.persons.length; ++b)
          {
            var p = this.copyPerson(stateCar.persons[b].id);
            if(p)
              car.addPerson(p);
          }
          return car;
        }
        
        var fillPlace = function(place, statePlace)
        {
          for(var b = 0; b < statePlace.cars.length; ++b)
          {
            var car = this.copyCar(statePlace.cars[b].id);
            fillCar(car, statePlace.cars[b])
            place.addCar(car);
          }
          for(var b = 0; b < statePlace.persons.length; ++b)
          {
            var person = this.copyPerson(statePlace.persons[b].id);
            if(person)
              place.addPerson(person);
          }
          return place;
        }

        var buildScenario = function(s)
        {
          var scenario = new Scenario(s.name, s.id);
          for(var b = 0; b < s.places.length; ++b)
          {
            var place = this.copyPlace(s.places[b].id);
            if(place)
            {
              fillPlace(place, s.places[b]);
              scenario.addPlace(place);
            }
          }
          for(var b = 0; b < s.cars.length; ++b)
          {
            var car = this.copyCar(s.cars[b].id);
            if(car)
            {
              fillCar(car, s.cars[b]);
              scenario.addCar(car);
            }
          }
          for(var b = 0; b < s.persons.length; ++b)
          {
            var p = this.copyPerson(s.persons[b].id);
            if(p)
              scenario.addPerson(p);
          }
          return scenario;
        };

        for(var a = 0; a < state.scenarios.length; ++a)
          this.scenarios.push(buildScenario(state.scenarios[a]));

        return this;
      }
    }
  });