define(
[
  'domain/lpadd'
], function(lpadd){
  return function(date, sep)
  {
    sep   = sep   || '';
    date  = date  || new Date();
    return date.getHours() 
      + sep 
      + lpadd(date.getMinutes(), 2, '0') 
      + sep
      + lpadd(date.getSeconds(), 2, '0')
      + sep
      + lpadd(date.getMilliseconds(), 3, '0');
  };
});