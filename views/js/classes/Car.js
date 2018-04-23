define(
['classes/helpers/compose-id'], function(composeId){
  var typeName = 'c';

  return class {
    constructor(name, capacity, id)
    {
      this.id = composeId(typeName, name);
      this.name = name;
      this.capacity = parseInt(capacity);
      this.persons = [];
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

    getCapacity()
    {
      return this.getCapacity;
    }

    setCapacity(c)
    {
      if(isNaN(parseInt(c))){
        var e = new Error(`Could not convert ${c} into number`);
        e.name = 'ParseError';
        throw e;
      }
      this.capacity = parseInt(c);
      return this;
    }

    getPersons()
    {
      return this.persons;
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
    }
    addPerson(p)
    {
      if(this.persons.length == this.capacity)
      {
        var e = new Error(`Car is full (Capacity: ${this.capacity}`);
        e.name = "ModelError";
        throw e;
      }
      if(!this.getPerson(p.id))
        this.persons.push(p);
      return this;
    }

    removePerson(pId)
    {
      for(var a = 0; a < this.persons.length; ++a)
      {
        if(this.persons[a].id == pId)
        {
          this.persons.splice(a, 1);
          break;
        }
      }
      return this;
    }
  }
});