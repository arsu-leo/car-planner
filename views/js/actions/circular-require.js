define([
  'require'
],
function(require){
  return function(path, ...p){
    return require(path)(...p);
  };
});
