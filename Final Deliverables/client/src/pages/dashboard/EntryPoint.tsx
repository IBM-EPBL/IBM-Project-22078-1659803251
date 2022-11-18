import { Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useRecoilValue } from 'recoil';
import { baseUrl } from '../../utils/constants';
import { user as userAtom } from '../../state/state'
import { useNavigate } from 'react-router-dom';

const EntryPoint = ({ refresher }: { refresher: any }) => {
  const user = useRecoilValue(userAtom);
  const category = [
    'food',
    'entertainment',
    'medicine',
    'transport',
    'utlities',
    'bills',
    'subscription',
    'others'
  ];
  const date = new Date();
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

  const toast = useToast();
  const navigate = useNavigate();

  const [cdetails, setcDetails] = React.useState({
    amount: '',
    category: 'income',
    description: 'income',
    date: dateString,
    type: 'C',
    currency: 'INR',
  });

  const [ddetails, setdDetails] = React.useState({
    amount: '',
    category: '',
    description: '',
    date: dateString,
    type: 'D',
    currency: 'INR',
  });

  const handleClick = async () => {
    if (tabIndex === 0) {
      const res = await axios.post(
        baseUrl + '/api/transaction', 
        ddetails,
        {
          headers: {
            Authorization: 'Token ' + user.token
          }
        }
      );
      if (res.data.status === 'Success') {
        toast({
          title: 'Transaction created.',
          description: "We've created your transaction for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        refresher((p: any) => p + 1);
      } else {
        toast({
          title: 'Transaction creation failed.',
          description: "Your request to add this transaction failed due to some error. Try again later",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      const res = await axios.post(
        baseUrl + '/api/transaction', 
        cdetails,
        {
          headers: {
            Authorization: 'Token ' + user.token
          }
        }
      );
      if (res.data.status === 'Success') {
        toast({
          title: 'Transaction created.',
          description: "We've added your income for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        refresher((p: any) => p + 1);
      } else {
        toast({
          title: 'Transaction creation failed.',
          description: "Your request to add this income failed due to some error. Try again later",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }

  const [tabIndex, setTabIndex] = React.useState(0) 

  const handleTabsChange = (index: any) => {
    setTabIndex(index)
  }

  return (
    <Flex flexDir="column" width="49%" bg="#242424"  px={5} py={1}>
        <Tabs mt={6} isFitted index={tabIndex} onChange={handleTabsChange}>
          <TabList>
            <Tab><Text fontSize="lg" fontWeight="bold">Expense</Text></Tab>
            <Tab><Text fontSize="lg" fontWeight="bold">Income</Text></Tab>
          </TabList>

          <TabPanels>
            <TabPanel>

              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input type="text" value={ddetails.amount} onChange={(e) => setdDetails((p) => ({...p, amount: e.target.value}))}/>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Category</FormLabel>
                <Select placeholder='Select option' value={ddetails.category !== '' ? ddetails.category : 'Select option'} onChange={(e) => setdDetails((p) => ({...p, category: e.target.value}))}>
                    {category.map((item, ind) => {
                        return <option value={item} key={ind}>{item}</option>
                    })}
                </Select>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder='Describe your transaction' value={ddetails.description} onChange={(e) => setdDetails((p) => ({...p, description: e.target.value}))} />
              </FormControl>
              <Flex width="100%" alignItems="center" justifyContent="end" mt={6}>
                <Button size='md' colorScheme="blue" onClick={handleClick}>
                  Add Expense
                </Button>
              </Flex>

            </TabPanel>
            <TabPanel>

              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input type='text' value={cdetails.amount} onChange={(e) => setcDetails((p) => ({...p, amount: e.target.value}))} />
              </FormControl>
              <Flex width="100%" alignItems="center" justifyContent="end" mt={6}>
                <Button size='md' colorScheme="blue" onClick={handleClick}>
                  Add Income
                </Button>
              </Flex>
              
            </TabPanel>
          </TabPanels>
        </Tabs>
    </Flex>
  )
}

export default EntryPoint