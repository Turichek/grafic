import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetStatistics } from '../../hooks/useGetStatistics';
import { useFormattedData } from '../../hooks/useFormattedData';
import { updateDataAction } from '../../store/Grafic/actions';

export default function GetDataFromApi() {
    const dispatch = useDispatch();
    const [url, setUrl] = useState('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","newCases":"newCasesByPublishDate"}');
    const { data, request } = useGetStatistics();
    const { addNewAttr } = useFormattedData();

    useEffect(() => {
        addNewAttr(data);
        dispatch(updateDataAction(data));
    }, [data, dispatch, addNewAttr])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <TextField disabled sx={{ width: 0.79 }} value={url} onChange={(e) => setUrl(e.target.value)} label='Введите url для запроса' />
            <Button sx={{ width: 0.19 }} onClick={() => request(url)} variant='contained' >Получить данные</Button>
        </Box>
    )
}