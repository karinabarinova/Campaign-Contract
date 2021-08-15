import React from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

function Index({campaigns}) {

    function renderCampaigns() {
        const items = campaigns.map((address, i) => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            }
        })

        return <Card.Group items={items} />;
    }
    
    return (
        <Layout>
            <div>
                <h3>Open campaigns</h3>
                <Link route="/campaigns/new">
                    <a>
                        <Button 
                            content="Create campaign" 
                            icon="add circle"
                            primary
                            floated="right"
                        />
                    </a>
                </Link>
                
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