import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Link,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const bgColor = useColorModeValue('gray.800', 'gray.900')
  const cardBg = useColorModeValue('gray.700', 'gray.800')

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    }

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle login logic here
      console.log('Login submitted:', { email, password })
    }
  }

  return (
    <Container maxW="md" py={8}>
      <Box
        p={8}
        borderRadius="lg"
        bg={cardBg}
        boxShadow="lg"
        color="white"
      >
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center">Login to Space Gateway</Heading>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg={bgColor}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg={bgColor}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="100%"
                mt={4}
              >
                Login
              </Button>
            </VStack>
          </form>

          <Text textAlign="center">
            Don't have an account?{' '}
            <Link as={RouterLink} to="/signup" color="blue.400">
              Sign up
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  )
}

export default Login 