define(
[
  '//cdn.adamo.es/js/gateway/dom.js',
  'domain/template',
  'domain/state',
  'actions/domain/handle-drag-start',
  'actions/domain/handle-drag-end',
  'ev/scenario-selected'
], function(dom, templater, stat, handleDragStart, handleDragEnd, scenarioSelected){
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
      icon      : '<i class="fa fa-user-o"></i>',
      draggable : true
    },
    car : {
      template  : '/hbs/menu/menu-item',
      field     : 'cars',
      icon      : '<i class="fa fa-car"></i>',
      draggable : true
    },
    place : {
      template  : '/hbs/menu/menu-item',
      field     : 'places',
      icon      : '<i class="fa fa-home"></i>',
      draggable : true
    },
    scenario : {
      template  : '/hbs/menu/menu-item',
      field     : 'scenarios',
      icon      : '<i class="fa fa-picture-o"></i>'
    }
  };

  function bindDrag(domElement, element)
  {
    domElement.on('dragstart', function(ev){
      //ev.stopPropagation();
      //var target = ev.target;
      ev.dataTransfer.setData('fromMenu', 1);
      var target = dom.select('.scenario-pane');

      var input = dom.select('input[name="id"]');
      var found = false;
      input.each(function(i){
        if(i.getValue() == element.getId())
          found = true;
      });
      if(found){
        ev.stopImmediatePropagation(); ev.stopPropagation(); ev.preventDefault();
        return true;
      }

      handleDragStart(ev, element.id, element.type);
    });
    domElement.on('dragend', handleDragEnd);
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
            ul.select('li span').each(function(domElement, index){
              domElement.setAttribute("draggable","true");
              bindDrag(domElement, state[mod.field][index]);
            });
          ul.select('a[data-type="scenario"] span').on('click', scenarioSelected)
          fn(i + 1);
        });
      };
      fn(0);
    });
    
  }
});