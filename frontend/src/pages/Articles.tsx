import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  VStack,
  Button,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Grid,
  Image,
  Spinner,
  Center,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'

// Updated interface to match the expected response from /api/images/articles
interface ArticleItem {
  data: {
    title: string;
    description: string;
    date_created: string;
    center: string;
    nasa_id: string;
  }[];
  links: {
    href: string;
    rel: string;
  }[];
}

interface ImageLibraryResponse {
  collection: {
    items: ArticleItem[];
  };
}

// Transformed article to match your UI
interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const bgColor = useColorModeValue('gray.800', 'gray.900')
  const cardBg = useColorModeValue('gray.700', 'gray.800')

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Updated to use the correct endpoint from your ImageLibraryController
        const response = await axios.get('http://localhost:3000/api/images/articles')
        
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        
        // Transform the NASA API response to match our Article interface
        const data: ImageLibraryResponse = response.data;
        const transformedArticles: Article[] = data.collection.items.map(item => ({
          id: item.data[0]?.nasa_id || Math.random().toString(),
          title: item.data[0]?.title || 'Untitled Article',
          content: item.data[0]?.description || 'No content available',
          author: item.data[0]?.center || 'NASA',
          date: item.data[0]?.date_created || new Date().toISOString(),
          imageUrl: item.links[0]?.href || 'https://via.placeholder.com/300'
        }));
        
        setArticles(transformedArticles)
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError('Failed to fetch articles')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Local filtering is already implemented with filteredArticles
    console.log('Filtering articles for:', searchQuery)
  }

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    )
  }

  if (error) {
    return (
      <Center h="100vh">
        <Alert status="error" variant="solid">
          <AlertIcon />
          {error}
        </Alert>
      </Center>
    )
  }

  return (
    <Container maxW="1200px" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Space News & Articles</Heading>

        {/* Search Bar */}
        <Box as="form" onSubmit={handleSearch}>
          <InputGroup size="lg">
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg={bgColor}
              color="white"
              _placeholder={{ color: 'gray.500' }}
            />
            <InputRightElement>
              <IconButton
                aria-label="Search"
                icon={<FaSearch />}
                colorScheme="blue"
                variant="ghost"
                type="submit"
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={6}
            width="100%"
          >
            {filteredArticles.map((article) => (
              <Card key={article.id} bg={cardBg} color="white">
                <CardBody>
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    borderRadius="lg"
                    mb={4}
                    height="200px"
                    objectFit="cover"
                    width="100%"
                  />
                  <VStack align="start" spacing={2}>
                    <Heading size="md">{article.title}</Heading>
                    <Text fontSize="sm" color="gray.400">
                      By {article.author} • {new Date(article.date).toLocaleDateString()}
                    </Text>
                    <Text noOfLines={3}>{article.content}</Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </Grid>
        ) : (
          <Center py={10}>
            <Text>No articles found matching your search.</Text>
          </Center>
        )}
      </VStack>
    </Container>
  )
}

export default Articles