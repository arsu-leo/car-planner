
module.exports = new class extends require('@superhero/core/controller/dispatcher/rest') {
    get()
    {
        return {
            status : 200,
            body : { 'id' : this.request.url.query.mode == 'test' ? 'test' : ''}
        }
    }
} 