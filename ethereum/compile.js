const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); //remove the directory;

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const sourceCode = fs.readFileSync(campaignPath, 'utf8');

const output = solc.compile(sourceCode, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}
