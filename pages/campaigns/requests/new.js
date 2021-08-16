import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import { Router, Link } from '../../../routes';

const NewRequest = ({address}) => {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [recipient, setRecipient] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();

        const campaign = Campaign(address);

        setError('');
        setLoading(true);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, 'ether'),
                    recipient
                )   
                .send({from: accounts[0]})
            Router.pushRoute(`/campaigns/${address}/requests`)
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
        setValue('');
        setDescription('');
        setRecipient('');
    }

    return (
        <Layout>
            <Link route={`/campaigns/${address}/requests`}>
                <a>
                    Go back
                </a>
            </Link>
            <h3>Create a Request</h3>
            <Form onSubmit={onSubmit} error={!!error}>
                <Message error header="Oops, something went wrong" content={error} />
                <Form.Field>
                    <label>Description</label>
                    <Input 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input 
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input 
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </Form.Field>
                <Button primary loading={loading}>Create</Button>
            </Form>
        </Layout>
    )
}

NewRequest.getInitialProps = async (props) => {
    const {address} = props.query;
    return {address};
}
export default NewRequest;
