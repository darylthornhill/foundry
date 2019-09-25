#!/usr/bin/env node

const program = require('commander');

program
    .version('0.0.1')
    .option('-p, --path [path]', 'An optional path to scaffold Foundry into.')
    .option('-c, --css', 'Scaffold only css framework.')
    .option('-r, --react', 'Scaffold only react framework.')
    .parse(process.argv);

const temporarydir = 'tmp'; // This is for the git repository download.
const outputDir = program.path || './src';
const css = !!program.css;
const react = !!program.react;

const foundryCssScaffold = require('../src/foundry-css');
const foundryReactScaffold = require('../src/foundry-react');

if (css) {
    foundryCssScaffold(temporarydir, outputDir + '/scss');
}

if (react) {
    foundryReactScaffold(temporarydir, outputDir + '/react');
}

if (!css && !react) {
    foundryCssScaffold(temporarydir, outputDir + '/scss');
    foundryReactScaffold(temporarydir, outputDir + '/react');
}
