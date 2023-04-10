import web3 from './web3';
import campaignFactory from './build/CampaignFactory.json';

const contractAddress = '0x40C4B36e577cf7970E389c7d9F1cD31297066d4f';

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  contractAddress
);

export default instance;
