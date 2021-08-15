import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

const CampaignShow = ({campaignInfo}) => {
    return (
        <Layout>
            <h3>Campaign Show</h3>
        </Layout>
    )
}

CampaignShow.getInitialProps = async (props) => {
    console.log(props.query.address)
    const campaign = Campaign(props.query.address);
    const campaignInfo = await campaign.methods.getSummary().call()
    console.log(campaignInfo)
    return {campaignInfo};
}

export default CampaignShow;
