import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

const NewCampaign = () => {
    const [contribution, setContribution] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(contribution)
            .send({
                from: accounts[0]
            });
            Router.pushRoute('/');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);

    }
    
    return(
        <Layout>
            <h3>Create a Campaign</h3>
            {error && 
            <Message error header="Oops, something went wrong" content={error} />}
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <label>Minimum contribution</label>
                    <Input 
                        type="number" 
                        label="wei" 
                        labelPosition="right"
                        value={contribution}
                        min="1"
                        onChange={(e) => setContribution(e.target.value)}
                    />
                </Form.Field>
                <Button primary type="submit" loading={loading} >Create</Button>
            </Form>
        </Layout>
    )
}

export default NewCampaign;
