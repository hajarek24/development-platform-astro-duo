import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Card,
  CardBody,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'

interface APODData {
  date: string
  explanation: string
  hdurl: string
  media_type: string
  service_version: string
  title: string
  url: string
}

const Home = () => {
  const [apod, setApod] = useState<APODData | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const bgColor = useColorModeValue('gray.800', 'gray.900')
  const cardBg = useColorModeValue('gray.700', 'gray.800')

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3000/api/apod')
        setApod(response.data)
        setError(null)
      } catch (error) {
        console.error('Error fetching APOD:', error)
        setError('Failed to fetch the Astronomy Picture of the Day. Please make sure the backend server is running.')
      } finally {
        setLoading(false)
      }
    }

    fetchAPOD()
  }, [])

  return (
    <Container maxW="1200px" py={8}>
      <VStack spacing={8} align="stretch">
        {/* NASA Picture of the Day */}
        <Box>
          <Heading mb={4}>NASA Picture of the Day</Heading>
          {loading ? (
            <Box textAlign="center" py={8}>
              <Spinner size="xl" />
            </Box>
          ) : error ? (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          ) : apod && (
            <Card bg={cardBg}>
              <CardBody>
                {apod.media_type === 'image' ? (
                  <Image
                    src={apod.url}
                    alt={apod.title}
                    borderRadius="lg"
                    w="100%"
                    h="400px"
                    objectFit="cover"
                  />
                ) : (
                  <Box
                    as="iframe"
                    src={apod.url}
                    w="100%"
                    h="400px"
                    borderRadius="lg"
                    allowFullScreen
                  />
                )}
                <VStack align="start" mt={4} spacing={2}>
                  <Heading size="md">{apod.title}</Heading>
                  <Text>{apod.explanation}</Text>
                  <Text fontSize="sm" color="gray.400">
                    Date: {apod.date}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          )}
        </Box>

        {/* Search Bar */}
        <Box>
          <InputGroup size="lg">
            <Input
              placeholder="Search space-related content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg={bgColor}
              color="white"
            />
            <InputRightElement>
              <IconButton
                aria-label="Search"
                icon={<FaSearch />}
                colorScheme="blue"
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        {/* Featured Articles */}
        <Box>
          <Heading size="lg" mb={4}>
            Featured Articles
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {/* Sample featured articles - will be replaced with actual data */}
            {[1, 2, 3].map((item) => (
              <Card key={item} bg={cardBg}>
                <CardBody>
                  <VStack align="start" spacing={3}>
                    <Heading size="sm">Featured Article {item}</Heading>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Text>
                    <Button colorScheme="blue" size="sm">
                      Read More
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  )
}

export default Home 