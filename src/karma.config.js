// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function (config) {
  process.env.CHROME_BIN = require('puppeteer').executablePath()
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
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
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--remote-debugging-port=9222']
      }
    },
    reporters: ['progress', 'kjhtml','coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessNoSandbox'],
    singleRun: false,
    restartOnFileChange: true
  });
};
