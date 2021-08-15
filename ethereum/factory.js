import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const contract = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xf6AD981840988f338cc01085d292F05fC67C6b5f'
)

export default contract;
