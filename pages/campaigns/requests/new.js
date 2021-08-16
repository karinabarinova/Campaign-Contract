import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { Form, Button, Menu, Input } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import { Router, Link } from '../../../routes';

const NewRequest = ({address}) => {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [recipient, setRecipient] = useState('');

    return (
        <Layout>
            <h3>Create a Request</h3>
            <Form>
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
                <Button primary>Create</Button>
            </Form>
        </Layout>
    )
}

NewRequest.getInitialProps = async (props) => {
    const {address} = props.query;
    return {address};
}
export default NewRequest;
