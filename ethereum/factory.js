import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const contract = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x2aa79A379e1f52d3CCD8f4a3C497E39c14054656'
)

export default contract;
