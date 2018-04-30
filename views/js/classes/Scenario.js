define(
['classes/helpers/compose-id'], function(composeId){
  var typeName = 's';

  return class {
    constructor(name, id)
    {
      this.id = id || composeId(typeName, name);
      this.name = name;
      this.persons = [];
      this.cars = [];
      this.places = [];
      this.type = 'Scenario';
    }

    getId()
    {
      return this.id;
    }

    getName()
    {
      return this.name;
    }

    setName(n)
    {
      this.name = n;
      return this;
    }

    getId()
    {
      return this.id;
    }

    getName()
    {
      return this.name;
    }

    setName(n)
    {
      this.name = n;
      return this;
    }

    getCars()
    {
      return this.cars;
    }

    addCar(c)
    {
      if(!this.getCar(c.id))
        this.cars.push(c);
      return this;
    }

    removeCar(cId, stayPeople)
    {
      var index = this.getCarIndex(cId);
      if(index >= 0)
      {
        var car = this.cars.splice(index, 1)[0];
        if(stayPeople){
          var pers = car.getPersons();
          for(var a = 0; a < pers.length; ++a)
          {
            this.addPerson(pers[a]);
            car.removePerson(pers[a].id);
          }
        }
      }
      return this;
    }

    deleteCar(cId)
    {
      for(var a = 0; a < this.places.length; ++a)
        this.places[a].removeCar(cId, true);
      this.removeCar(cId, true);
    }

    getPersons()
    {
      return this.persons;
    }

    addPerson(p)
    {
      if(!this.getPerson(p.id))
      {
        this.persons.push(p);
      }
      return this;
    }

    removePerson(pId)
    {
      var index = this.getPersonIndex(pId);
      if(index >= 0){
        this.persons.splice(index, 1);
      }
      return this;
    }

    deletePerson(pId)
    {
      for(var a = 0; a < this.cars.length; ++a)
        this.cars[a].removePeson(pId);
      for(var a = 0; a < this.places.length; ++a)
        this.places[a].deletePerson(pId);
      this.removePerson(pId);
    }

    getPlaces()
    {
      return this.places;
    }

    addPlace(p)
    {
      if(!this.getPlace(p.id))
      {
        this.places.push(p);
      }
      return this;
    }

    removePlace(pId, stayPeople, stayCars)
    {
      var index = this.getPlaceIndex(pId);
      if(index >= 0)
      {
        var place = this.places.splice(index, 1)[0];
        if(stayCars){
          var cars = place.getCars();
          for(var a = 0; a < cars.length; ++a)
          {
            this.addCar(cars[a]);
            place.removeCar(cars[a].id, false);
          }
        }
        if(stayPeople){
          var pers = place.getPersons();
          for(var a = 0; a < pers.length; ++a)
          {
            this.addPerson(pers[a]);
            place.removePerson(pers[a].id);
          }
        }
        
      }
      return this;
    }

    getCar(cId)
    {
      for(var a = 0; a < this.cars.length; ++a)
      {
        if(this.cars[a].id == cId)
        {
          return this.cars[a];
        }
      }
      return false;
    }

    getCarIndex(cId)
    {
      for(var a = 0; a < this.cars.length; ++a)
      {
        if(this.cars[a].id == cId)
        {
          return a;
        }
      }
      return -1;
    }

    getPerson(pId)
    {
      for(var a = 0; a < this.persons.length; ++a)
      {
        if(this.persons[a].id == pId)
        {
          return this.persons[a];
        }
      }
      return false;
    }

    getPersonIndex(pId)
    {
      for(var a = 0; a < this.persons.length; ++a)
      {
        if(this.persons[a].id == pId)
        {
          return a;
        }
      }
      return -1;
    }

    getPlace(pId)
    {
      for(var a = 0; a < this.places.length; ++a)
      {
        if(this.places[a].id == pId)
        {
          return this.places[a];
        }
      }
      return false;
    }

    getPlaceIndex(pId)
    {
      for(var a = 0; a < this.places.length; ++a)
      {
        if(this.places[a].id == pId)
        {
          return a;
        }
      }
      return -1;
    }

    removeElement(type, id)
    {
      switch(type){
        case 'Person':
          this.removePerson(id);
          break;
        case 'Car':
          this.removeCar(id);
          break;
        case 'Place':
          this.removePlace(id);
          break;
      }
      return this;
    }

    getContext()
    {
      var r = {
        id      : this.id,
        type    : this.type,
        name    : this.name,
        persons : this.persons.map(function(person){ return person.getContext() }),
        cars    : this.cars.map(function(car){ return car.getContext() }),
        places  : this.places.map(function(place){ return place.getContext() })
      };
      return r;
    }
  }
});