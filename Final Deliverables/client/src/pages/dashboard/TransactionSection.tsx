import { Avatar, Divider, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { transaction as transactionAtom } from '../../state/state'

const SingleTrans = (props: any) => {
    return (
        <Flex flexDir="row" alignItems="center" justifyContent="space-between" mt={3} mb={3} px={3}>
            <Flex flexDir="row" alignItems="center" justifyContent="space-between">
                <Avatar name={props.type} width="8" height="8"/>
                <Flex flexDirection="column" alignItems="start" justifyContent="center" ml={3}>
                    <Text fontSize="lg" fontWeight="bold">{props.date}</Text>
                    <Text fontSize="md" color="whiteAlpha.500">{props.category}</Text>
                </Flex>
            </Flex>
            <Text fontSize="lg" fontWeight="bold" color={props.type === "Credit" ? "green" : "red"}>{props.amount}</Text>
        </Flex>
    )
}

const TransactionSection = () => {
  const transaction = useRecoilValue(transactionAtom)
  return (
    <Flex flexDir="column" width="49%" bg="#242424"  px={5} py={3}>
        <Text fontSize="xl" fontWeight="bold" mt={5} mb={3}>Transactions</Text>
        {transaction.slice(0,5).map((t: any, ind: any) => {
            return <div key={ind}>
              <SingleTrans type={t.type === 'C' ? 'Credit': 'Debit'} date={t.date} amount={t.amount} category={t.type === 'D' ? t.category : ''} />
              <Divider color="whiteAlpha.500"/>
            </div>
        })}
    </Flex>
  )
}

export default TransactionSection