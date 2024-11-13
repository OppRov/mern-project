import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const LoginPage = () => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const toast = useToast()

    const handleLogin = async (loginData) => {
        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })
            const data = await res.json()
            if (data.success) {
                localStorage.setItem("token", data.token)
                window.location.href = "/"
                toast({
                    title: "Success",
                    description: data.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true
                })
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true
                })
            }
        } catch (error) {
            console.log(error)
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
    }




    return (
        <Container maxW={"container.xl"} py={12}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Login
                </Heading>

                <Box w={"md"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} placeholder={"Email"} name='email' />
                        <Input onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} placeholder={"Password"} type={"password"} name='password' />
                        <Button type='submit' colorScheme='blue' onClick={() => handleLogin(loginData)}>Submit</Button>
                    </VStack>
                </Box>

            </VStack>
        </Container>
    )
}

export default LoginPage