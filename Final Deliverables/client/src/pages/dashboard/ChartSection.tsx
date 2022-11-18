import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { useRecoilValue } from 'recoil';
import { transaction as transactionAtom } from '../../state/state';

const ChartSection = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Report',
      },
    },
  };

  const labels = ['2022-11-17', '2022-11-18', '2022-11-19', '2022-11-20', '2022-11-21']
  const [ex, setEx] = React.useState([0, 0, 0, 0, 0])
  const [inc, setInc] = React.useState([0, 0, 0, 0, 0])

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Expense',
        data: ex,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        fill: true,
        label: 'Income',
        data: inc,
        borderColor: '#FF6484',
        backgroundColor: '#FFB2C2',
      },
    ],
  };

  const transaction = useRecoilValue(transactionAtom);

  useEffect(() => {
    const prepare = () => {
      for(let i = 0; i < transaction.length; i++) {
        const ind = labels.indexOf(transaction[i].date)
        if (transaction[i].type === 'D') {
          const temp = ex
          temp[ind] += parseInt(transaction[i].amount)
          setEx(temp)
        } else {
          const temp = inc
          temp[ind] += parseInt(transaction[i].amount)
          setInc(temp)
        }
      }
    }

    prepare()
  }, [transaction]);

  return (
    <Flex flexDir="column" width="49%" bg="#242424"  px={5} py={3}>
        <Text fontSize="xl" fontWeight="bold" mt={5} mb={3}>Analytics</Text>
        <Line options={options} data={data} />
    </Flex>
  )
}

export default ChartSection