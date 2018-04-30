define(
['classes/helpers/compose-id'], function(composeId){
  var typeName = 'p';

  return class {
    constructor(name, id)
    {
      this.id = id || composeId(typeName, name);
      this.name = name;
      this.type = 'Person';
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

    getContext()
    {
      return {
        id   : this.id,
        type : this.type,
        name : this.name
      };
    }
  }
});