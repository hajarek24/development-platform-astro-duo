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
import { useNavigate } from 'react-router-dom'

interface APODData {
  date: string
  explanation: string
  hdurl: string
  media_type: string
  service_version: string
  title: string
  url: string
}

interface Article {
  title: string;
  url: string;
  urlToImage?: string;
  source: { id?: string; name: string };
  description?: string;
  publishedAt: string;
  author?: string;
  content?: string;
}

const Home = () => {
  const [apod, setApod] = useState<APODData | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const bgColor = useColorModeValue('gray.800', 'gray.900')
  const cardBg = useColorModeValue('gray.700', 'gray.800')
  const navigate = useNavigate()

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

  useEffect(() => {
  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/articles/spaceflight-news')
      // Pick the first 3 articles as "featured"
      setArticles(response.data.articles.slice(0, 3))
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
  }

  fetchArticles()
}, [])



  return (
    <Container maxW="1200px" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" py={16} position="relative" zIndex={1}>
          <Heading as="h1" size="2xl" fontWeight="bold" color="white" mb={4}>
            Explore the <Box as="span" color="blue.400">Wonders</Box> of Space
          </Heading>
          <Text fontSize="xl" color="gray.200" mb={6}>
            Your portal to cosmic discovery featuring NASA data, planetary exploration, and the latest in astronomical research.
          </Text>
          <Box display="flex" justifyContent="center" gap={4}>
            <Button colorScheme="blue" size="lg" leftIcon={<span role='img' aria-label='rocket'>🚀</span>} onClick={() => navigate('/explore')}>
              Start Exploring
            </Button>
            <Button variant="outline" colorScheme="whiteAlpha" size="lg" leftIcon={<span role='img' aria-label='info'>ℹ️</span>} onClick={() => navigate('/about')}>
              Learn More
            </Button>
          </Box>
        </Box>

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
        {/* <Box>
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
        </Box> */}

        {/* Featured Articles */}
          <Box>
    <Heading size="lg" mb={4}>
      Featured Articles
    </Heading>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
  {articles.length > 0 ? (
    articles.map((article) => (
      <Card key={article.url} bg={cardBg}>
        <CardBody>
          <VStack align="start" spacing={3}>
            <Image
              src={article.urlToImage || 'https://via.placeholder.com/300'}
              alt={article.title}
              borderRadius="lg"
              mb={2}
              height="180px"
              objectFit="cover"
              width="100%"
            />
            <Heading size="sm">{article.title}</Heading>
            <Text fontSize="sm" color="gray.400">
              {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}
            </Text>
            <Text noOfLines={3}>{article.description}</Text>
            <Button
              colorScheme="blue"
              size="sm"
              as="a"
              href={article.url}
              target="_blank"
            >
              Read More
            </Button>
          </VStack>
        </CardBody>
      </Card>
    ))
  ) : (
    <Box textAlign="center" py={8}>
      <Spinner size="xl" />
    </Box>
  )}
</SimpleGrid>
  </Box>
      </VStack>
    </Container>
  )
}

export default Home