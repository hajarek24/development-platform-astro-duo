import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
  Card,
  CardBody,
  Text,
  Button,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { FaSearch, FaDownload } from 'react-icons/fa'
import axios from 'axios'

interface NASAImage {
  data: {
    title: string
    description: string
    nasa_id: string
    media_type: string
    date_created: string
  }[]
  links: {
    href: string
  }[]
}

const Images = () => {
  const [images, setImages] = useState<NASAImage[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bgColor = useColorModeValue('gray.800', 'gray.900')
  const cardBg = useColorModeValue('gray.700', 'gray.800')

  const searchImages = async (query: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/images/search?q=${query}`
      )
      setImages(response.data)
    } catch (error) {
      console.error('Error fetching images:', error)
      setError('Failed to fetch images. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial search for space images
    searchImages('space')
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchImages(searchQuery)
    }
  }

  return (
    <Container maxW="1200px" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>NASA Image Gallery</Heading>

        {/* Search Form */}
        <Box as="form" onSubmit={handleSearch}>
          <InputGroup size="lg">
            <Input
              placeholder="Search for space images..."
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
                type="submit"
                isLoading={loading}
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Loading Spinner */}
        {loading && (
          <Box textAlign="center" py={8}>
            <Spinner size="xl" />
          </Box>
        )}

        {/* Image Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {images.map((image, index) => (
            <Card key={index} bg={cardBg}>
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <Image
                    src={image.links[0].href}
                    alt={image.data[0].title}
                    borderRadius="lg"
                    objectFit="cover"
                    h="200px"
                    w="100%"
                  />
                  <VStack align="start" spacing={2}>
                    <Heading size="sm">{image.data[0].title}</Heading>
                    <Text fontSize="sm" color="gray.400">
                      {image.data[0].date_created}
                    </Text>
                    <Text noOfLines={3}>{image.data[0].description}</Text>
                    <Button
                      leftIcon={<FaDownload />}
                      colorScheme="blue"
                      size="sm"
                      as="a"
                      href={image.links[0].href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </Button>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default Images 