import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea, ResponsiveContainer, } from 'recharts';
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

  const getAxisYDomain = (from, to, ref) => {
    const refData = grafic.data.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((item) => {
      if (item[ref] > top) top = item[ref];
      if (item[ref] < bottom) bottom = item[ref];
    });

    return [0, (top | 0) + top / 10];
  };

  const zoom = () => {
    let { refAreaLeft, refAreaRight } = grafic;
    const { data } = grafic;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      dispatch(updateRerAreasAction({
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'newCases');

    dispatch(updateGraficAction({
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    }));
  }

  const zoomOut = () => {
    dispatch(updateGraficAction({
      data: grafic.data,
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
