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
  Center
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

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
        const response = await fetch('http://localhost:3000/api/articles')
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setArticles(data)
      } catch (err) {
        setError('Failed to fetch articles')
        console.error(err)
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
    // Implement search functionality here
    console.log('Searching for:', searchQuery)
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
        <Text color="red.500">{error}</Text>
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
                isLoading={loading}
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        {/* Articles Grid */}
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={6}
          width="100%"
        >
          {filteredArticles.map((article) => (
            <Card key={article.id} bg={cardBg} color="black">
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
                  <Text fontSize="sm" color="gray.500">
                    By {article.author} • {new Date(article.date).toLocaleDateString()}
                  </Text>
                  <Text noOfLines={3}>{article.content}</Text>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </VStack>
    </Container>
  )
}

export default Articles 