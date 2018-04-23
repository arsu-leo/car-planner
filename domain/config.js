
module.exports = {
    core : {
        init : {

        },
        routes : [
            {
                policy      : '/', //Can be regex
                dispatcher  : 'controllers/index',
                view        : 'template',
                template    : 'views/index'
            },
            // any resource such as js, css or an template..
            {
              policy     : /.+\.(js|css|hbs)$/,
              dispatcher : 'controllers/resource',
              view       : 'raw'
            },
            // image..
            {
              policy     : /\/img\/.*/,
              dispatcher : 'controllers/image',
              view       : 'raw'
            },
        ]
    }

};