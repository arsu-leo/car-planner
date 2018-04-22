const 
core    = require('@superhero/core'),
config  = require('./domain/config'),
log     = require('@superhero/debug').log;

core.bootstrap(config.core.init).then(function() 
{
    core.http(config.core.routes)
    .listen(80);
    log("READY!");
});
