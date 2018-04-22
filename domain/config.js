
module.exports = {
    core : {
        init : {

        },
        routes : [
            {
                policy : '/', //Can be regex
                dispatcher : 'controllers/index',
                view : 'views/index'
            }
        ]
    }

};