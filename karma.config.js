// karma.conf.js
process.env.CHROME_BIN = require('puppeteer').executablePath() // IMPORTANT!

module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadless', 'Firefox','Chrome'], // IMPORTANT! You can list & use multiple browsers
    customLaunchers: {
        ChromeHeadlessCI: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox']
        }
      },
    plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'), // IMPORTANT
    ],
  })
}
