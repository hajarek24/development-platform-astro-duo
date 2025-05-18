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
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Image,
  Spinner,
  Center,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import { Link } from 'react-router-dom'

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

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/articles/spaceflight-news');
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setArticles(response.data.articles);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (article.content && article.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
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
              bg="gray.800"
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
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} width="100%">
            {filteredArticles.map((article) => (
              <Link
                to={`/articles/${encodeURIComponent(article.url)}`}
                state={{ article }}
                key={article.url}
                style={{ textDecoration: 'none' }}
              >
                <Card bg="gray.700" color="white" _hover={{ transform: 'scale(1.02)', transition: '0.2s' }}>
                  <CardBody>
                    <Image
                      src={article.urlToImage || 'https://via.placeholder.com/300'}
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
                        {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}
                      </Text>
                      <Text noOfLines={3}>{article.description}</Text>
                    </VStack>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
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