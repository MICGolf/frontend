import { SectionBox } from '../../components/SectionBox';
import { Chart } from 'react-chartjs-2';
import {
  ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const data: ChartData<'bar' | 'line'> = {
  labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  datasets: [
    {
      type: 'line' as const,
      label: '결제건수',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      data: [500, 300, 800, 800, 300, 200, 100, 600, 500, 300],
    },
    {
      type: 'line' as const,
      label: '결제금액',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      data: [500, 300, 800, 800, 300, 200, 100, 600, 500, 300],
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
