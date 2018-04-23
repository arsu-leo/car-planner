define(
[
'domain/padded-date',
'domain/padded-time'
], function(getPaddedDate, getPaddedTime){
  var sep = '-';
  return function(type, name)
  {
    var a = new Date();
    return type 
      + sep 
      + name 
      + sep 
      + getPaddedDate(a) 
      + sep 
      + getPaddedTime(a);
  };
});