define(
['classes/helpers/compose-id'], function(composeId){
  var typeName = 's';

  return class {
    constructor(name, id)
    {
      this.id = composeId(typeName, name);
      this.name = name;
      this.persons = [];
      this.cars = [];
      this.places = [];
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

    removePlace(cId, stayPeople, stayCars)
    {
      var index = this.getCarIndex(cId);
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
  }
});