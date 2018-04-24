define(
[
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/template'
], function(dom, templater){
  function buildList(list, type, icon, template, cb)
  {
    var outputHtml = [];
    var fn = function(i)
    {
      if(i >= list.length)
        return cb(outputHtml.join('\n'));
      else
        buildElement(list[i], type, icon, template, function(html){ 
          outputHtml.push(html); 
          fn(i + 1);
        });
    };
    fn(0);
  }

  function buildElement(e, type, icon, template, cb)
  {
    templater.compile(template, { name : e.getName(), type : type, id : e.getId(), icon : icon }, cb);
  }
  var model = {
    person : {
      template  : '/hbs/menu/menu-item',
      field     : 'persons',
      icon      : '<i class="fa fa-user-o"></i>'
    },
    car : {
      template  : '/hbs/menu/menu-item',
      field     : 'cars',
      icon      : '<i class="fa fa-car"></i>'
    },
    place : {
      template  : '/hbs/menu/menu-item',
      field     : 'places',
      icon      : '<i class="fa fa-home"></i>'
    },
    scenario : {
      template  : '/hbs/menu/menu-item',
      field     : 'scenarios',
      icon      : '<i class="fa fa-picture-o"></i>'
    }
  };

  return function(state, cb) {
    dom.select('.data-menu').remove();
    var nav = dom.select('.menu-available-elements').parent('nav', true);
    templater.compile('/hbs/menu/menu',{}, function(html){
      nav.append(html);
      nav = nav.select('.data-menu');
      var keys = Object.keys(model);
      var cbFinal = function(){

      };
      var fn = function(i)
      {
        if(i >= keys.length)
          return cb && cb();
        
        var key = keys[i];
        var mod = model[key];
        buildList(state[mod.field], key, mod.icon, mod.template, function(html){
          var menuType = nav.select('.menu-item-type.menu-' + key)
          menuType.getSiblings('ul').append(html);
          fn(i + 1);
        });
      };
      fn(0);
    });
    
  }
});