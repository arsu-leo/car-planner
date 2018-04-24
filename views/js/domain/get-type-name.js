define([], function(){
  return function(type)
  {
    switch(type)
    {
      case 'car':
        return 'Car';
      case 'person':
        return 'Person';
      case 'scenario':
        return 'Scenario';
      case 'place':
        return 'Place';
      default:
        return 'Unkown';
    };
  };
});