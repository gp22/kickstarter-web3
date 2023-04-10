import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = (props) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { address } = props;

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(address);
    setErrorMessage('');
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });

      Router.replaceRoute(`/campaigns/${address}`);
    } catch (e) {
      setErrorMessage(e.message);
    }

    setLoading(false);
    setValue('');
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Form.Field>
      <Message
        error
        header="Oh oh!"
        content={errorMessage}
        onDismiss={() => setErrorMessage('')}
      />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
