// karma.conf.js
process.env.CHROME_BIN = '/usr/bin/chromium-browser';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    browsers: ['ChromeHeadlessNoSandbox','Chrome','ChromeHeadless'], // IMPORTANT! You can list & use multiple browsers
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox','--disable-gpu','--headless']
        }
      },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        timeoutInterval: 20000
      }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/men-cave'),
      reports: ['html', 'lcovonly','text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml','coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    restartOnFileChange: true
  })
}
