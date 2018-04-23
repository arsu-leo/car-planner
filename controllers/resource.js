const
fs   = require('fs'),
log     = require('@superhero/debug').log,
path = require('path').dirname(require.main.filename);

module.exports = class extends require('@superhero/core/controller/dispatcher')
{
  async dispatch()
  {
    const resource = this.request.url.pathname.replace(/\.\.\//g, '');
    log(resource);
    return new Promise((ok, ko) => {
      fs.readFile(`${path}/views${resource}`, 'utf-8', (error, source) =>
      {
        error && log('404', error);
        ok(error
          ? { 
              status    : 404,
              body      : 'Page Not Found'
            }
          : { 
              status    : 200,
              body      : source,
              headers   : resource.endsWith('.css') 
                ? { 'Content-Type' :  'text/css' } 
                : resource.endsWith('.js')
                  ? { 'Content-Type' : 'application/javascript' }
                  : {}
            }
        );
      });
    });
  }
}

