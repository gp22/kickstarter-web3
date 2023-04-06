import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  '0x6Afc1529fc9F5dbE4f1cb8A0757c11C05d91F293'
);

export default instance;
