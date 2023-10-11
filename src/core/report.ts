const report = require("multiple-cucumber-html-reporter");
const projectInfo = require('../../package.json');
const os = require('os');

const platform = os.platform();
const platformVersion = os.release();

const projectName = projectInfo.name;
const projectVersion = projectInfo.version;

report.generate({
  jsonDir: "test-results",
  reportPath: "./",
  metadata: {
    browser: {
      name: "chrome"
    },
    device: "Local test machine",
    platform: {
        name: platform,
        version: platformVersion
    },
  },
  customData: {
    title: "Run info",
    data: [
        { label: "Project", value: projectName },
        { label: "Release", value: projectVersion },
    ],
  },
});