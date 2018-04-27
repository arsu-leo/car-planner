define(
[
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/template',
  'domain/state'
], function(dom, templater, stat){
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
  };

  function buildElement(e, type, icon, template, cb)
  {
    templater.compile(template, { name : e.getName(), type : type, id : e.getId(), icon : icon }, cb);
  };

  var model = {
    person : {
      template  : '/hbs/menu/menu-item',
      field     : 'persons',
      icon      : '<i draggable="true" class="fa fa-user-o"></i>',
      draggable : true
    },
    car : {
      template  : '/hbs/menu/menu-item',
      field     : 'cars',
      icon      : '<i draggable="true" class="fa fa-car"></i>',
      draggable : true
    },
    place : {
      template  : '/hbs/menu/menu-item',
      field     : 'places',
      icon      : '<i draggable="true" class="fa fa-home"></i>',
      draggable : true
    },
    scenario : {
      template  : '/hbs/menu/menu-item',
      field     : 'scenarios',
      icon      : '<i class="fa fa-picture-o" data-on-click="ev/scenario-selected"></i>'
    }
  };

  function bindDrag(domElement, element)
  {
    console.log("Bind drag");
    domElement.on('dragstart', function(ev){
      var target = ev.target;
      
      ev.dataTransfer.setDragImage(dom.select('img.draggable-image-' + element.type).get(0),0 ,0);
      //domElement;

      ev.dataTransfer.setData('id', element.id);
      ev.dataTransfer.setData('type', element.type);
    });
    domElement.on('dragend', function(ev){
      //domElement.removeClass('dragging');
    });
  };

  return function(cb) {
    var state = stat.get();
    dom.select('.data-menu').remove();
    var nav = dom.select('.menu-available-elements').parent('nav', true);
    templater.compile('/hbs/menu/menu',{}, function(html){
      nav.append(html);
      nav = nav.select('.data-menu');
      var keys = Object.keys(model);
      var fn = function(i)
      {
        if(i >= keys.length)
          return cb && cb();
        
        var key = keys[i];
        var mod = model[key];
        buildList(state[mod.field], key, mod.icon, mod.template, function(html){
          var menuType = nav.select('.menu-item-type.menu-' + key)
          var ul = menuType.getSiblings('ul');
          ul.append(html);
          if(mod.draggable)
            ul.select('li i[draggable="true"]').each(function(domElement, index){
              bindDrag(domElement, state[mod.field][index]);
            });
          fn(i + 1);
        });
      };
      fn(0);
    });
    
  }
});