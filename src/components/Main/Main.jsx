import { Container } from '@mui/material';
import React from 'react';
import Chart from './Chart';
import GetDataFromApi from './GetDataFromApi';

export default function Main() {
    return (
        <Container>
            <GetDataFromApi />
            <Chart />
        </Container>
    )
}