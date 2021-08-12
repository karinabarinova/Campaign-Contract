import React, { useEffect, useState } from 'react';
import factory from '../ethereum/factory';

export default () => {
    const [campaigns, setCampaigns] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const campaigns = await factory.methods.getDeployedCampaigns().call();
            setCampaigns(campaigns);
            console.log(campaigns);
        }
        fetchData();
    }, [])
    return (
        <h1>Campaign List page</h1>
    )
}
