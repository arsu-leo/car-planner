define([
  'classes/helpers/compose-id',
  'classes/Person',
  'classes/Car',
  'classes/Place',
  'classes/Scenario'
], function(composeId){
    var typeName = 'st';
  
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
      }
    
      getName()
      {
        return this.name;
      }
  
      getId()
      {
        return this.id;
      }
  
      setName(n)
      {
        this.name = n;
        return this;
      }

      __getElement(list, id, attr)
      {
        attr = attr || 'id';
        for(var a = 0; a < list.length; a++)
        {
          if(list[a][attr] == id)
            return list[a];
        }
        return false; 
      }

      getScenario(id)
      {
        return getElement(this.scenarios, id, 'id');
      }

      getPlace(id)
      {
        return getElement(this.places, id, 'id');
      }
      
      getCar(id) {
        return getElement(this.cars, id, 'id');
      }
      
      getPerson(id) {
        return getElement(this.persons, id, 'id');
      }

      loadFromObjectState(state)
      {
        this.scenarios = [];
        this.places = [];
        this.cars = [];
        this.persons = [];

        this.id = state.id;
        this.name = state.name;
        this.type = state.type;

        for(var a = 0; a < state.persons.length; ++a)
          this.persons.push(new Person(state.persons[a].name, state.persons[a].id));

        var buildCar = function(c)
        {
          var car = new Car(c.name, c.capacity, c.id);
          
          for(var b = 0; b < c.persons.length; ++b)
          {
            var p = this.getPerson(c.persons[b].id);
            if(p)
              car.addPerson(p);
          }
          return car;
        }

        for(var a = 0; a < state.cars.length; ++a)
          this.cars.push(buildCar(state.cars[a]));
        
        var buildPlace = function(p)
        {
          var place = new Place(p.name, p.id);
          for(var b = 0; b < p.cars.length; ++b)
          {
            var car = this.getCar(p.cars[b].id);
            if(car)
              place.addCar(car);
          }
          for(var b = 0; b < p.persons.length; ++b)
          {
            var p = this.getPerson(p.persons[b].id);
            if(p)
              place.addPerson(p);
          }
          return place;
        }

        for(var a = 0; a < state.places.length; ++a)
          this.places.push(buildPlace(state.places[a]));

        var buildScenario = function(s)
        {
          var scenario = new Scenario(s.name, s.id);
          for(var b = 0; b < s.places.length; ++b)
          {
            var place = this.getPlace(s.places[b].id);
            if(place)
              scenario.addPlace(place);
          }
          for(var b = 0; b < s.cars.length; ++b)
          {
            var car = this.getCar(s.cars[b].id);
            if(car)
              scenario.addCar(car);
          }
          for(var b = 0; b < s.persons.length; ++b)
          {
            var p = this.getPerson(s.persons[b].id);
            if(p)
              scenario.addPerson(p);
          }
          return scenario;
        };

        for(var a = 0; a < state.scenarios.length; ++a)
          this.scenarios.push(buildScenario(state.scenarios[a]));
      }
    }
  });