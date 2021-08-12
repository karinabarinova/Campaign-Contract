require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');

const provider = new HDWalletProvider(
    process.env.ACCOUNT_MNEMONIC,
    "https://rinkeby.infura.io/v3/4c33b91839c244eea4646daf92e34f72"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    console.log(await web3.eth.getBalance(accounts[0]));
    const campaign = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0] });
    console.log('Contract deployed to ', campaign.options.address);
};

deploy();