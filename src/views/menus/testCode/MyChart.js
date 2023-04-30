import React from 'react';
import Chart from 'react-apexcharts';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';

function MyChart(props) {
  const chartOptions = {
    title: {
      text: props.title
    },
    xaxis: {
      categories: props.data.map((item) => item.category)
    }
  };

  const chartSeries = [{
    name: props.seriesName,
    data: props.data.map((item) => item.value)
  }];

  return (
    <CCard>
      <CCardHeader>
        <strong>{props.title}</strong>
      </CCardHeader>
      <CCardBody>
        <Chart options={chartOptions} series={chartSeries} type={props.type} height={props.height} />
      </CCardBody>
    </CCard>
  );
}

export default MyChart;
