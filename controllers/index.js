const log = require('@superhero/debug').log;

module.exports = class extends require('@superhero/core/controller/dispatcher/rest') 
{
  get()
  {
    log("Home page");
    return {
      status  : 200,
      body    : { 'id' : this.request.url.query.mode == 'test' ? 'test' : ''}
    }
  }
} 