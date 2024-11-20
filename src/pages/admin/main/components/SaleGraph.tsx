import { SectionBox } from '../../components/SectionBox';
import { Chart } from 'react-chartjs-2';
import {
  ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const data: ChartData<'line'> = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  datasets: [
    {
      type: 'line',
      label: '결제건수',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      data: [500, 300, 800, 800, 300, 200, 100, 600, 500, 300],
    },
    {
      type: 'line',
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
      <Chart type='line' data={data} />
    </SectionBox>
  );
};
