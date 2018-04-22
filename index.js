const 
core = require('@superhero/core'),
config = require('./domain/config');

await core.bootstrap(config.core.init);
core.http(config.core.routes);