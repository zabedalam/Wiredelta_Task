import React, { useEffect, useState } from 'react';
import Proposals from '../Proposals/Proposals';

const Dashboard = () => {

    return (
        <section style={{ backgroundColor: '#82d7f8' }}>
            <h1>Dashboard</h1>

            <Proposals />

        </section >

    );
};

export default Dashboard;