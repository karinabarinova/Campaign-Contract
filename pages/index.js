import React from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';

function Index({campaigns}) {

    function renderCampaigns() {
        const items = campaigns.map((item, i) => {
            return {
                header: item,
                description: <a>View Campaign</a>,
                fluid: true
            }
        })

        return <Card.Group items={items} />;
    }
    
    return (
        <Layout>
            <div>
                <h3>Open campaigns</h3>
                <Button 
                    content="Create campaign" 
                    icon="add circle"
                    primary
                    floated="right"
                />
                {renderCampaigns()}
            </div>
        </Layout>
    )
}

Index.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {campaigns};
}

export default Index;