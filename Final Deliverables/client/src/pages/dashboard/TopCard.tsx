import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { values as valueAtom } from '../../state/state'

const TopCard = ({icon, text}: {icon: any, text: any}) => {
  const value = useRecoilValue(valueAtom)
  return (
    <Flex flexDir="row" alignItems="center" justifyContent="center" width="30%" bg="#232323" px={10} py={8}>
        {icon}
        <Flex flexDir="column" justifyContent="center" ml={5}>
            <Text fontSize="lg" color="whiteAlpha.600">{text}</Text>
            <Text fontSize="xl" fontWeight="bold">{text === 'Income' ? value.income : text === 'Expense' ? value.expense : value.availableBalance}</Text>
        </Flex>
    </Flex>
  )
}

export default TopCard