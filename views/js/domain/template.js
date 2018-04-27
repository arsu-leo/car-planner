define(
[
  '//cdn.adamo.es/js/driver/http.js',
  '//cdn.adamo.es/js/service/handlebars.js'
],
function(http, handlebars)
{     
  var templates = {};
  function getTemplate(path, cb)
  {
    http('get', path + '.hbs')
    .send()
    .success(cb);
  }

  handlebars.registerHelper('format_float', function(value, dec){
    if(value === undefined || value === null){
      return '';
    }
    if(typeof value == "string"){
      value = parseFloat(value);
    }
    return value.toFixed(typeof dec == "object" || dec === undefined ? 2 : dec);
  });

  function registerPartial(name, path, cb)
  {
    var template = getTemplate(path, function(str){
      handlebars.registerPartial(name, str);
      cb();
    });
  };

  var partialsReady = false;
  return {
    compile : function(template, context, callback){
      context = context || {};

      if(templates[template])
        callback(templates[template](context))
      else
        getTemplate(template, function(str)
        {
          templates[template] = handlebars.compile(str);
          callback(templates[template](context));
        });
    },
    registerPartials : function(cb)
    {
      if(partialsReady)
        return cb();
      var partials = {
        'scenario' : '/hbs/main/scenario',
        'place'    : '/hbs/main/place',
        'car'      : '/hbs/main/car',
        'person'   : '/hbs/main/person'
      };
      var keys = Object.keys(partials);
      var fn = function(i){
        if(i >= keys.length){
          partialsReady = true;
          return cb();
        }
        var name = keys[i];
        registerPartial(name, partials[name], function(){
          fn(i + 1);
        });
      }
      fn(0);
    },
    handlebars : handlebars
  };
});
