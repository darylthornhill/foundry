const makedir = require('make-dir');
const ncp = require('ncp').ncp;
const gitDownload = require('download-git-repo');
const rimraf = require('rimraf');

const downloadGitRepo = (tempDir, outputDir) => {
    console.log('Downloading foundry-css git repository...');

    gitDownload('element-studio/foundry-css', tempDir, function(err) {
        if (err) {
            removeTempdir(tempDir);
            console.error(err);
            return;
        }

        console.log('Completed the download of foundry-css git repository...');

        scaffoldCss(tempDir, outputDir);
    });
};

const scaffoldCss = async (tempDir, outputDir) => {
    await makedir(outputDir);
    ncp(tempDir + '/templates', outputDir, function(err) {
        if (err) {
            console.error(err);
            removeTempdir(tempDir);
            return;
        }
        console.log('Scaffolded out the css!');
        removeTempdir(tempDir);
    });
};

const removeTempdir = (tempDir) => {
    rimraf(tempDir, function() {
        console.log('Removed temp directory');
    });
};

module.exports = async (tempDir, outputDir) => {
    downloadGitRepo(tempDir, outputDir);
};
