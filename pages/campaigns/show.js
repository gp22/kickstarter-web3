import React from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

const CampaignShow = (props) => {
  const { address } = props;

  const renderCards = () => {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (Wei)',
        description:
          'You must contribute at least this much Wei to be an approver.',
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:
          'Number of people who have already donated to this campaign.',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (Ether)',
        description:
          'The balance is the amount of money this campaign has left to spend.',
      },
    ];

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h2 style={{ overflowWrap: 'break-word' }}>
        Showing Details For Campaign: {address}
      </h2>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

CampaignShow.getInitialProps = async (props) => {
  const campaign = Campaign(props.query.address);

  const summary = await campaign.methods.getSummary().call();

  return {
    address: props.query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export default CampaignShow;
