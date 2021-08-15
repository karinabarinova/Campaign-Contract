import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Button, Form, Input } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';


const NewCampaign = () => {
    const [contribution, setContribution] = useState('');


    const onSubmit = async (e) => {
        e.preventDefault();
        const accounts = await web3.eth.getAccounts();
        await factory.methods
        .createCampaign(contribution)
        .send({
            from: accounts[0]
        });
    }
    
    return(
        <Layout>
            <h3>Create a Campaign</h3>

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
                <Button primary type="submit">Create</Button>
            </Form>
        </Layout>
    )
}

export default NewCampaign;
