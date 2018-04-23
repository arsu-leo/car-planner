define(
[], function(){
  return function(str, width, z) 
  {
    z = z || '0';
    str = str + '';
    return str.length >= width ? str : new Array(width - str.length + 1).join(z) + str;
  };
});
