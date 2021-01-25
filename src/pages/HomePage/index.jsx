import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Heading, Text, Input, Container, Center, VStack, Box, StackDivider
} from "@chakra-ui/react"
import { useEffect } from "react";
import axios from "axios";

const HomePage = () => {
    
    return (
        <>
            <Container>
                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" placeholder="Enter email" />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>password</FormLabel>
                    <Input type="password" placeholder="Enter password" />
                </FormControl>
            </Container>
            <Text m={10}>Or, you can use...</Text>
            <Center>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </Center>
        </>
    )
}
export default HomePage;