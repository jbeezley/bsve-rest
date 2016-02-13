var path = require('path');
function browser(b) {
    return b.toLowerCase().split(/[ /-]/)[0];
}

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        coverageReporter: {
            reporters: [
                {type: 'lcovonly', dir: 'coverage', subdir: browser},
                {type: 'text'}
            ]
        },
        reporters: ['progress', 'coverage'],
        frameworks: ['jasmine'],
        files: [
            'test/*.js'
        ],
        preprocessors: {
            'test/*.js': ['webpack', 'sourcemap']
        },
        webpack: {
            cache: true,
            devtool: 'inline-source-map',
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        include: path.resolve('js/'),
                        loader: 'istanbul-instrumenter'
                    }
                ]
            }
        }
    });
};
