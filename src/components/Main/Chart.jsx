import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea, ResponsiveContainer } from 'recharts';
import { updateGraficAction, updateRerAreaLeftAction, updateRerAreaRigthAction, updateRerAreasAction } from '../../store/Grafic/actions';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Paper elevation={3} sx={{ backgroundColor: 'white', p: 1, border: '1px solid black' }}>
        <Typography >{`${payload[0].payload.date}`}</Typography>
        <Typography >{`New Cases: ${payload[0].value}`}</Typography>
      </Paper>
    );
  }

  return null;
};

export default function Chart() {
  const grafic = useSelector(state => state.grafic);
  const dispatch = useDispatch();

  const getAxisYDomain = (from, to, column) => {
    const betweenData = grafic.data.slice(from - 1, to);
    let top = betweenData[0][column];
    betweenData.forEach(item => {
      if (item[column] > top) top = item[column];
    });

    return [0, Math.round((top | 0) + top / 10)];
  };

  const zoom = () => {
    let left = grafic.refAreaLeft;
    let right = grafic.refAreaRight;

    if (left === right || right === '') {
      dispatch(updateRerAreasAction({
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    // xAxis domain
    if (left > right) 
      [left, right] = [right, left];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(left, right, 'newCases');

    dispatch(updateGraficAction({
      refAreaLeft: '',
      refAreaRight: '',
      data: grafic.data.slice(),
      left,
      right,
      bottom,
      top,
    }));
  }

  const zoomOut = () => {
    dispatch(updateGraficAction({
      data: grafic.data.slice(),
      left: 'dataMin',
      right: 'dataMax',
      refAreaLeft: '',
      refAreaRight: '',
      top: 'dataMax+500',
      bottom: 0,
    }));
  }

  const onMove = (e) => {
    if (grafic.refAreaLeft && e?.activePayload) {
      dispatch(updateRerAreaRigthAction(e.activePayload[0].payload.id))
    }
  }

  return (
    <Paper elevation={7} sx={{
      p: 3
    }}>
      {
        grafic.data.length !== 0 ?
          <>
            <Box sx={{ mb: 3, width: 1 }}>
              <Button sx={{ width: 1 }} onClick={zoomOut} variant='contained' >Zoom Out</Button>
            </Box>
            <Box sx={{ userSelect: 'none' }}>
              <ResponsiveContainer width="100%" height={600}>
                <LineChart
                  data={grafic.data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 10,
                    bottom: 0,
                  }}
                  onMouseDown={(e) => dispatch(updateRerAreaLeftAction(e.activePayload[0].payload.id))
                  }
                  onMouseMove={(e) => onMove(e)}
                  onMouseUp={zoom}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    orientation='top'
                    dataKey="id"
                    allowDataOverflow
                    domain={[grafic.left, grafic.right]}
                    type="number"
                  />
                  <XAxis
                    dataKey="date"
                    allowDataOverflow
                    domain={[grafic.left, grafic.right]}
                    type="category"
                    xAxisId='2'
                  />
                  <YAxis
                    allowDataOverflow
                    domain={[grafic.bottom, grafic.top]}
                    type="number"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="newCases"
                    stroke="red"
                    animationDuration={500}
                  />

                  {grafic.refAreaLeft !== '' && grafic.refAreaRight !== '' ? (
                    <ReferenceArea
                      x1={grafic.refAreaLeft}
                      x2={grafic.refAreaRight}
                      strokeOpacity={0.3}
                    />
                  ) : null}
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </>
          : <Typography sx={{ textAlign: 'center' }} variant='h3'>Данные еще не получены</Typography>
      }
    </Paper>
  );

}
