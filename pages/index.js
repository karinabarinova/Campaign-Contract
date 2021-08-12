import React from 'react';
import factory from '../ethereum/factory';

function Index({campaigns}) {
    
    return (
        <div>{campaigns}</div>
    )
}

Index.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {campaigns};
}

export default Index;