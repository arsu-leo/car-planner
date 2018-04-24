define(
[
  '//cdn.adamo.es/js/driver/http.js',
  '//cdn.adamo.es/js/service/handlebars.js'
],
function(http, handlebars)
{
  handlebars.registerHelper('format_float', function(value, dec){
    if(value === undefined || value === null){
      return '';
    }
    if(typeof value == "string"){
      value = parseFloat(value);
    }
    return value.toFixed(typeof dec == "object" || dec === undefined ? 2 : dec);
  });

  var templates = {};
  return {
    compile : function(template, context, callback){
      context = context || {};

      templates[template]
      ? callback(templates[template](context))
      : http('get', template + '.hbs')
        .send()
        .success(function(str)
        {
          templates[template] = handlebars.compile(str);
          callback(templates[template](context));
        });
    },
    handlebars : handlebars
  };
});
