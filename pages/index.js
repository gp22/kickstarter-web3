import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

const Index = (props) => {
  const renderCampaigns = () => {
    const items = props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <Link route="/campaigns/new">
        <a>
          <Button
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          />
        </a>
      </Link>
      {renderCampaigns()}
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { campaigns };
};

export default Index;
