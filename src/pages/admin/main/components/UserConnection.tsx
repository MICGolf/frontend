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
      label: '어제기준',
      borderColor: 'rgb(111, 233, 24)',
      borderWidth: 2,
      data: [300, 300, 300, 300, 300, 800, 300, 200, 100, 600, 500, 300],
    },
  ],
};
export const UserConnection = () => {
  return (
    <SectionBox title='고객유입'>
      <Chart type='line' data={data} />
    </SectionBox>
  );
};
