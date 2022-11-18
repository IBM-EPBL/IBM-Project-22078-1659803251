import { Avatar, Button, Flex, FormControl, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal, Select, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { user as userAtom, values as valueAtom, transaction as transactionAtom } from '../../state/state'
import TopCard from './TopCard'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { GiMoneyStack, GiPayMoney } from 'react-icons/gi';
import EntryPoint from './EntryPoint'
import ChartSection from './ChartSection'
import TransactionSection from './TransactionSection'
import Budget from './Budget'
import { baseUrl } from '../../utils/constants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const user = useRecoilValue(userAtom);
  const [value, setValue] = useRecoilState(valueAtom);
  const [transaction, setTransaction] = useRecoilState(transactionAtom)
  const navigate = useNavigate();
  const [fetchThings, setFetchThings] = React.useState(0);

  const date = new Date();
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

  const [budget, setBudget] = React.useState({
    name: '',
    range: '',
    limit: '',
    date: dateString
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        baseUrl + '/api/transaction',
        {
          headers: {
            'Authorization': 'Token ' + user.token,
          }
        }
      );
      if (res.data.message !== 'No Transaction Availabele') {
        const result = res.data.data
        result.reverse();
        setTransaction(result);
      }
    };

    fetch();
  }, [fetchThings]);

  useEffect(() => {
    const update = () => {
      let inc = 0;
      let exp = 0;
      for(let i = 0; i < transaction.length; i++) {
        if (transaction[i].type === 'D') {
          exp += parseInt(transaction[i].amount);
        } else {
          inc += parseInt(transaction[i].amount);
        }
      }
      setValue({
        income: inc,
        expense: exp,
        availableBalance: inc - exp
      })
    }

    update()
  }, [transaction])

  const handleLogout = () => {
    localStorage.removeItem('login')
    navigate('/authenticate');
  }

  const toast = useToast();

  const handleClick = async () => {
    const res = await axios.post(
      baseUrl + '/api/budget',
      {
        name: budget.name,
        range: budget.range,
        limit: budget.limit,
        date: budget.date,
      },
      {
        headers: {
          Authorization: 'Token ' + user.token
        }
      }
    );
    toast({
      title: 'Budget created.',
      description: "Your request to add this budget succedded",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    onClose();
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex flexDir="column" width="100%" alignItems="center" justifyContent="center" pb={10}>
      <Flex flexDir="row" width="90%" alignItems="center" justifyContent="space-between" mt={10}>
        <Text fontSize="2xl" fontWeight="bold">Welcome back, {user.name}</Text>
        <Menu>
          <MenuButton><Avatar name={user.name} /></MenuButton>
          <Portal>
            <MenuList color='black'>
              <MenuItem onClick={onOpen}>Budgets</MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
      <Flex flexDir="row" width="90%" alignItems="center" justifyContent="space-between" mt={10}>
        <TopCard icon={<MdOutlineAccountBalanceWallet size={35} />} text="Available Balance" />
        <TopCard icon={<GiMoneyStack size={35} />} text="Income" />
        <TopCard icon={<GiPayMoney size={35} />} text="Expense" />
      </Flex>
      <Flex flexDir="row" width="90%" justifyContent="space-between" mt={10}>
        <ChartSection />
        <EntryPoint refresher={setFetchThings}/>
      </Flex>
      <Flex flexDir="row" width="90%" justifyContent="space-between" mt={10}>
        <Budget />
        <TransactionSection />
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        onCloseComplete={() => {
          setBudget({
            name: '',
            range: '',
            limit: '',
            date: dateString
          });
        }}
      >
        <ModalOverlay />
        <ModalContent  bg="#242424">
          <ModalHeader>Create your budget</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name of the budget</FormLabel>
              <Input value={budget.name} onChange={(e) => setBudget((p) => ({...p, name: e.target.value}))} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Range</FormLabel>
              <Select placeholder='Select option' value={budget.range !== '' ? budget.range : 'Select option'} onChange={(e) => setBudget((p) => ({...p, range: e.target.value}))}>
                <option value="W">Week</option>
                <option value="M">Month</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Limit</FormLabel>
              <Input value={budget.limit} onChange={(e) => setBudget((p) => ({...p, limit: e.target.value}))}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClick}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default Dashboard