import { Button, Flex, Image, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { user as userAtom } from '../../state/state';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import axios from 'axios';
import { baseUrl } from '../../utils/constants'

const Authenticate = () => {
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const toast = useToast()

  const [show, setShow] = React.useState(false)
  const [loginCred, setLoginCred] = React.useState({
    email: '',
    password: '',
  });
  const [joinCred, setJoinCred] = React.useState({
    name: '',
    email: '',
    password: '',
    currency: 'INR',
  })
  const handleClick = () => setShow(!show)

  const handleLogin = async () => {
    const res = await axios.post(
      baseUrl + '/api/login', {
        email: loginCred.email,
        password: loginCred.password,
    });
    console.log(res.data)
    setUser({
      name: res.data.data.name,
      email: res.data.data.email,
      currency: res.data.data.currency,
      token: res.data.data.token,
    });
    localStorage.setItem('login', JSON.stringify(res.data.data));
    navigate('/');
  }

  const handleJoin = async () => {
    const res = await axios.post(
      baseUrl + '/api/register', {
        name: joinCred.name,
        email: joinCred.email,
        password: joinCred.password,
        currency: joinCred.currency,
    });
    console.log(res)
    setJoinCred({
      name: '',
      email: '',
      password: '',
      currency: 'INR',
    });
    toast({
      title: 'Verify Account',
      description: "Check your email for verification mail",
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  }

  useEffect(() => {
    const getUserIfExist = () => {
      const storage = localStorage.getItem('login');
      if (storage !== null) {
        const data = JSON.parse(storage);
        setUser({
          name: data.name,
          email: data.email,
          currency: data.currency,
          token: data.token,
        });
        navigate('/');
      }
    }

    getUserIfExist()
  }, []);

  return (
    <Flex flexDir="column" width="100%" height="100%" mt={40} alignItems="center">
      <Flex flexDir="column" width="50%" rounded="lg" bgColor="#242424" px={10} py={10}>
        <Text fontSize="2xl" fontWeight="bold">Expense Tracker</Text>
        <Text fontSize="sm" color="whiteAlpha.600">Tracking your expense and starting smart way to spend money is just one click ahead</Text>
        <Tabs mt={6} isFitted>
          <TabList>
            <Tab><Text  fontSize="lg" fontWeight="bold">Sign In</Text></Tab>
            <Tab><Text  fontSize="lg" fontWeight="bold">Sign Up</Text></Tab>
          </TabList>

          <TabPanels>
            <TabPanel>

              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type='email' value={loginCred.email} onChange={(e) => setLoginCred((p) => ({...p, email: e.target.value}))} />
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    value={loginCred.password}
                    onChange={(e) => setLoginCred((p) => ({...p, password: e.target.value}))}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick} colorScheme="white">
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Flex width="100%" alignItems="center" justifyContent="end" mt={6}>
                <Button size='md' colorScheme="blue" onClick={handleLogin}>
                  Get in
                </Button>
              </Flex>

            </TabPanel>
            <TabPanel>

                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input type='text' value={joinCred.name} onChange={(e) => setJoinCred((p) => ({...p, name: e.target.value}))} />
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>Email address</FormLabel>
                  <Input type='email' value={joinCred.email} onChange={(e) => setJoinCred((p) => ({...p, email: e.target.value}))} />
                </FormControl>
                
                <FormControl mt={3}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Enter password'
                      value={joinCred.password}
                      onChange={(e) => setJoinCred((p) => ({...p, password: e.target.value}))}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick} colorScheme="white">
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Flex width="100%" alignItems="center" justifyContent="end" mt={6} onClick={handleJoin}>
                  <Button size='md' colorScheme="blue">
                    Get in
                  </Button>
                </Flex>
              
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  )
}

export default Authenticate