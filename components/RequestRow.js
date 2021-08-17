import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

const RequestRow = ({request, address, id, approversCount}) => {
    const { Row, Cell} = Table;
    const {description, value, recipient, approvalCount, complete} = request;
    const readyToFinalize = approvalCount > approversCount / 2;

    async function onApprove() {
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(address);
        await campaign.methods.approveRequest(id).send({
            from: accounts[0]
        })
        Router.replaceRoute(`/campaigns/${address}/requests`)

    };

    async function onFinalize() {
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(address);
        await campaign.methods.finalizeRequest(id).send({
            from: accounts[0]
        })
        Router.replaceRoute(`/campaigns/${address}/requests`)
    }

    return (
        <Row disabled={complete} positive={readyToFinalize && !complete}>
            <Cell>{id}</Cell>
            <Cell>{description}</Cell>
            <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
            <Cell>{recipient}</Cell>
            <Cell>{approvalCount}/{approversCount}</Cell>
            <Cell>
                {complete ? null : (
                    <Button color="green" basic onClick={onApprove}>
                        Approve
                    </Button>
                )}
            </Cell>
            <Cell>
                {complete ? null : (
                    <Button color="teal" basic onClick={onFinalize}>
                        Finalize
                    </Button>
                )}
            </Cell>
        </Row>
    )
}

export default RequestRow;
