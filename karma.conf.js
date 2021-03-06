// Karma configuration
// Generated on Wed Mar 26 2014 14:33:30 GMT+0000 (GMT)

module.exports = function( config ){
    config.set( {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [ 'jasmine' ],


        // list of files / patterns to load in the browser
        files: [
            'src/public/lib/bower-components/angular/angular.js',
            'src/public/lib/bower-components/angular-mocks/angular-mocks.js',
            'src/public/lib/bower-components/angular-route/angular-route.js',
            'src/public/lib/bower-components/angular-resource/angular-resource.js',

            'src/public/webapp/gamesApp.js',

            'src/public/webapp/index/Index.controller.js',
            'src/public/webapp/signin/Signin.controller.js',
            'src/public/webapp/navigation/Navigation.controller.js',
            'src/public/webapp/user/User.controller.js',
            'src/public/webapp/register/Register.controller.js',

            'src/public/webapp/app/directive/ShowPassword.directive.js',
            'src/public/webapp/app/directive/FlashMessage.directive.js',
            'src/public/webapp/app/directive/Throbber.directive.js',

            'src/public/webapp/app/interceptor/Http.interceptor.js',

            'src/public/webapp/app/service/FlashMessage.service.js',
            'src/public/webapp/app/service/User.service.js',
            'src/public/webapp/app/service/HttpStatus.service.js',
            'src/public/webapp/api/Api.service.js',

            'src/public/webapp/app/filter/CamelCaseToUppercaseWords.filter.js',
            'src/public/webapp/app/filter/PreserveObjectOrder.filter.js',

            'src/test/js/spec/*.spec.js',

            'src/public/views/templates/*.html'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {

            'src/public/views/templates/*.html': 'html2js'
        },

        // strip the unnecessary from the template url to create the template url as the app requires it
        ngHtml2JsPreprocessor: {

            stripPrefix: 'src/public'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [ 'progress' ],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [ 'Chrome' ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    } );
};
