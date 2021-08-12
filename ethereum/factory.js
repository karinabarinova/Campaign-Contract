import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const contract = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x806115bb2Aba64260f9B44762d9e95b2f83c3F91'
)

export default contract;
