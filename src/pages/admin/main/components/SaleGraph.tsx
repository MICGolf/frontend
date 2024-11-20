import { SectionBox } from '../../components/SectionBox';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import './chartSetup';

const data: ChartData<'line'> = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  datasets: [
    {
      label: '결제건수',
      borderColor: 'rgb(54, 162, 235)', // 파란색
      borderWidth: 2,
      data: [500, 300, 800, 800, 300, 200, 100, 600, 500, 300],
    },
    {
      label: '결제금액',
      borderColor: 'rgb(228, 74, 22)',
      borderWidth: 2,
      data: [700, 400, 900, 700, 400, 300, 200, 500, 600, 400],
    },
  ],
};

export const SaleGraph = () => {
  return (
    <SectionBox title='매출통계'>
      <Line data={data} />
    </SectionBox>
  );
};
