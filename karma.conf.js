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
        thresholdReporter: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100
        },
        reporters: ['progress', 'coverage', 'threshold'],
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
