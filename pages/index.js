import React from 'react';
import factory from '../ethereum/factory';
import { Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

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
        <div>
            <link
                async
                rel="stylesheet"
                href="//cdn.jsdelivr.net/npm/semantic-ui@$2.0.3/dist/semantic.min.css"
            />
            {renderCampaigns()}
        </div>
    )
}

Index.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {campaigns};
}

export default Index;