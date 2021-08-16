import React, { useState } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = ({address}) => {
    const [error, setError] = useState('');
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        const campaign = Campaign(address);
        setLoading(true);
        setError('')

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            })

            Router.replaceRoute(`/campaigns/${address}`)
        } catch(err) {
            setError(err.message)
        }
        setLoading(false);
        setValue('');

    }
    return (
        <Form onSubmit={onSubmit} error={!!error}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input 
                    label="ether"
                    labelPosition="right"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Form.Field>
            <Message error header="Oops, something went wrong" content={error} />
            <Button primary type="submit" loading={loading} >Contribute!</Button>
        </Form>
    )
}

export default ContributeForm