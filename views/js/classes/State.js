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
        return this.getScenario(this.activeScenario);
      }

      setActiveScenario(sId)
      {
        var s = this.getScenario(sId);
        if(s)
          this.activeScenario = sId;
        return this;
      }

      setName(n)
      {
        this.name = n;
        return this;
      }
      __getNewElement(type, name)
      {
        switch(type)
        {
          case 'Person':
            return new Person(name);
          case 'Car':
            return new Car(name);
          case 'Place':
            return new Place(name);
          case 'Scenario':
            return new Scenario(name);
        }
      }

      __copyElement(list, id, attr)
      {
        var e = this.__getElement(list, id, attr);
        if(e)
        {
          var r = this.__getNewElement(e.type, e.getName());
          var k = Object.keys(e);
          for(var a = 0; a < k.length; ++a)
          {
            r[k[a]] = e[k[a]];
          }
        }
        return r;
      }

      __getElementIndex(list, id, attr)
      {
        attr = attr || 'id';
        for(var a = 0; a < list.length; a++)
        {
          if(list[a][attr] == id)
            return a;
        }
        return false; 
      }

      __getElement(list, id, attr)
      {
        var index = this.__getElementIndex(list, id, attr);
        return index !== false ? list[index] : false;
      }

      getElement(type, id){
        switch(type){
          case 'Person':
            return this.getPerson(id);
          case 'Car':
            return this.getCar(id);
          case 'Place':
            return this.getPlace(id);
          case 'Scenario':
            return this.getScenario(id);
        }
        return false;
      }

      getElement(type, id)
      {
        switch(type)
        {
          case 'scenario':
            return this.getScenario(id);
          case 'place':
            return this.getPlace(id);
          case 'car':
            return this.getCar(id);
          case 'person':
            return this.getPerson(id);
          default:
            return false;
        }
      }

      getElement(type, id)
      {
        switch(type)
        {
          case 'scenario':
            return this.getScenario(id);
          case 'place':
            return this.getPlace(id);
          case 'car':
            return this.getCar(id);
          case 'person':
            return this.getPerson(id);
          default:
            return false;
        }
      }
      
      getScenario(id)
      {
        return this.__getElement(this.scenarios, id, 'id');
      }

      getPlace(id)
      {
        return this.__getElement(this.places, id, 'id');
      }

      getCar(id) {
        return this.__getElement(this.cars, id, 'id');
      }

      getPerson(id) {
        return this.__getElement(this.persons, id, 'id');
      }

      copyPlace(id)
      {
        return this.__copyElement(this.places, id, 'id');
      }
      
      copyScenario(id)
      {
        return this.__copyElement(this.scenarios, id, 'id'); 
      }
      
      copyCar(id) {
        return this.__copyElement(this.cars, id, 'id');
      }

      copyPerson(id) {
        return this.__copyElement(this.persons, id, 'id');
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

        if(state.activeScenario && this.__getScenarioIndex(state.activeScenario))
          this.setActiveScenario(state.activeScenario);

        return this;
      }

      edit(type, map)
      {
        var element = this.getElement(type, map.id);
        element.setName(map.name);
        if(type == 'car')
          element.setCapacity(map.capacity);
        return element;
      }

      create(type, map)
      {
        var element = undefined;
        switch(type)
        {
          case 'car':
            element = new Car(map.name, map.capacity);
            this.cars.push(element)
            break;
          case 'person':
            element = new Person(map.name);
            this.persons.push(element);
            break;
          case 'scenario':
            element = new Scenario(map.name);
            this.scenarios.push(element);
            break;
          case 'place':
            element = new Place(map.name);
            this.places.push(element);
          default:
            throw new Error("Unknown type '" + type + "'");
        };
        return element;
      }

      __getPersonIndex(id)
      {
        return this.__getElementIndex(this.persons, id, 'id');
      }

      __getCarIndex(id)
      {
        return this.__getElementIndex(this.cars, id, 'id');
      }

      __getPlaceIndex(id)
      {
        return this.__getElementIndex(this.places, id, 'id');
      }

      __getScenarioIndex(id)
      {
        return this.__getElementIndex(this.scenarios, id, 'id');
      }

      deletePerson(pId)
      {
        for(var a = 0; a < this.scenarios.length; ++a)
          this.scenarios[a].deletePerson(pId);
        for(var a = 0; a < this.places.length; ++a)
          this.places[a].deletePerson(pId);
        for(var a = 0; a < this.cars.length; ++a)
          this.cars[a].removePerson(pId);

        var index = this.__getPersonIndex(pId);
        if(index !== 0)
          this.persons.splice(index, 1);
      }

      deleteCar(cId)
      {
        for(var a = 0; a < this.scenarios.length; ++a)
          this.scenarios[a].deleteCar(cId);
        for(var a = 0; a < this.places.length; ++a)
          this.places[a].removeCar(cId, true);

        var index = this.__getCarIndex(cId);
        if(index !== 0)
          this.cars.splice(index, 1);
      }

      deletePlace(pId)
      {
        for(var a = 0; a < this.scenarios.length; ++a)
          this.scenarios[a].removePlace(cId, true, true);

        var index = this.__getPlaceIndex(pId);
        if(index !== 0)
          this.places.splice(index, 1);
      }

      deleteScenario(sId)
      {
        var index = this.__getScenarioIndex(sId);
        if(index !== 0)
          this.scenarios.splice(index, 1);
      }

      delete(type, map)
      {
        var id = map.id;
        if(!id)
          return;
        switch(type)
        {
          case 'person':
            this.deletePerson(id);
            break;
          case 'car':
            this.deleteCar(id);
            break;
          case 'place':
            this.deletePlace(id);
            break;
          case 'scenario':
            this.deleteScenario(id);
            break;
        }
      }
    }
  });