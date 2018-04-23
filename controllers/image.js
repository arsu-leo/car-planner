const
fs   = require('fs'),
log  = require('@superhero/debug').log,
Path = require('path'),
path = Path.dirname(require.main.filename),
mimes = {
    html: 'text/html',
    txt : 'text/plain',
    css : 'text/css',
    gif : 'image/gif',
    jpg : 'image/jpeg',
    png : 'image/png',
    svg : 'image/svg+xml',
    js  : 'application/javascript'
};

module.exports = class extends require('@superhero/core/controller/dispatcher')
{
  async dispatch()
  {
    const resource = this.request.url.pathname.replace(/\.\.\//g, '');
    log(resource);
    return new Promise((ok, ko) => {
      const realPath = `${path}/views${resource}`;
      if(!fs.existsSync(realPath))
      {
        log('404', error, resource);
        return ok({ 
            status    : 404,
            body      : 'Resource Not Found'
        });
      }
      const ret = {
        status  : 200,
        headers : {
          'Content-Type' : mimes[Path.extname(realPath).slice(1)] || 'text/plain'
        },
        body : fs.readFileSync(realPath)
      };
      ok(ret);
    });
  }
}

