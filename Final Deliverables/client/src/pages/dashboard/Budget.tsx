import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { baseUrl } from '../../utils/constants';
import { user as userAtom } from '../../state/state'
import { useRecoilValue } from 'recoil';

ChartJS.register(ArcElement, Tooltip, Legend);

const Budget = () => {
  const user = useRecoilValue(userAtom);

  const data1 = {
    labels: ['Target', 'Spend', 'Still'],
    datasets: [
      {
        label: 'Weekly Budget',
        data: [20000, 15000, 5000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: ['Target', 'Spend', 'Still'],
    datasets: [
      {
        label: 'Monthly Budget',
        data: [1500000, 1000000, 500000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        baseUrl + '/api/budget',
        {
          headers: {
            Authorization: 'Token ' + user.token
          }
        }
      );
      console.log(res);
    }

    fetch()
  }, []);

  return (
   <Flex flexDir="column" width="49%" bg="#242424"  px={5} py={3}>
        <Text fontSize="xl" fontWeight="bold" mt={5} mb={3}>Budgets</Text>

        <Flex flexDir="row" width="90%" alignItems="center" justifyContent="space-evenly" pt={5}>
          <Flex flexDir="column" alignItems="center" justifyContent="center">
            <Box boxSize="250">
              <Doughnut data={data1} />
            </Box>
            <Text fontSize="md" color="whiteAlpha.500" mt={3}>Weekly Budget</Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" justifyContent="center" mb={3}>
            <Box boxSize="250">
              <Doughnut data={data2} />
            </Box>
            <Text fontSize="md" color="whiteAlpha.500" mt={3}>Monthly Budget</Text>
          </Flex>
        </Flex>
    </Flex>
  )
}

export default Budget