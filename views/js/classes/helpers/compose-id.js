define(
[
'domain/padded-date',
'domain/padded-time'
], function(getPaddedDate, getPaddedTime){
  var separator = '-';
  return function(type, name, sep)
  {
    sep = sep || separator;
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