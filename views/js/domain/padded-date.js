define(
[
  'domain/lpadd'
], function(lpadd){
  return function(date, sep)
  {
    sep   = sep   || '';
    date  = date  || new Date();
    return date.getFullYear() 
      + sep 
      + lpadd(date.getMonth() + 1, 2, '0') 
      + sep
      + lpadd(date.getDate(), 2, '0');
  };
});