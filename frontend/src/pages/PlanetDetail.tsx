import React, { useEffect, useState } from 'react'
import { 
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Badge,
  Spinner,
  Center,
  Button,
  Divider,
  useColorModeValue
} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'

// Planet response interface
interface PlanetResponse {
  id: string;
  name: string;
  description: string;
  diameter: number;
  distanceFromSun: number;
  numberOfMoons: number;
  imageUrl?: string;
  type: string;
}

const PlanetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [planet, setPlanet] = useState<PlanetResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlanetDetails = async () => {
      if (!id) return
      
      try {
        // Direct API call to the backend
        const response = await fetch(`http://localhost:3000/api/planets/${id}`)
        
        if (response.status === 404) {
          setError('Planet not found')
          setLoading(false)
          return
        }
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Planet detail received:', data)
        setPlanet(data)
      } catch (err) {
        setError('Failed to fetch planet details')
        console.error('Error fetching planet details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlanetDetails()
  }, [id])

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    )
  }

  if (error || !planet) {
    return (
      <Center h="100vh" flexDirection="column" gap={4}>
        <Text color="red.500">{error || 'Planet not found'}</Text>
        <Button colorScheme="blue" onClick={() => navigate('/planets')}>
          Back to Planets
        </Button>
      </Center>
    )
  }

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Button mb={8} colorScheme="blue" onClick={() => navigate('/planets')}>
        ← Back to Planets
      </Button>
      
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center" color="white">
          {planet.name}
        </Heading>
        
        <Box borderRadius="lg" overflow="hidden" boxShadow="xl">
          {planet.imageUrl ? (
            <Image
              src={planet.imageUrl}
              alt={planet.name}
              w="100%"
              maxH="500px"
              objectFit="cover"
            />
          ) : (
            <Box 
              bg="gray.700" 
              h="300px" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
            >
              <Text color="gray.400">No image available</Text>
            </Box>
          )}
        </Box>
        
        <Box bg="gray.800" p={6} borderRadius="md">
          <Text color="gray.300" fontSize="lg" whiteSpace="pre-line">
            {planet.description}
          </Text>
        </Box>
        
        <Divider />
        
        <Box>
          <Heading as="h3" size="md" color="blue.300" mb={4}>
            Planet Facts
          </Heading>
          
          <VStack spacing={4} align="stretch" bg="gray.800" p={6} borderRadius="md">
            <HStack justify="space-between">
              <Text color="gray.300">Type:</Text>
              <Badge colorScheme="purple" fontSize="md">{planet.type}</Badge>
            </HStack>
            
            <HStack justify="space-between">
              <Text color="gray.300">Diameter:</Text>
              <Text color="white">{planet.diameter.toLocaleString()} km</Text>
            </HStack>
            
            <HStack justify="space-between">
              <Text color="gray.300">Distance from Sun:</Text>
              <Text color="white">{planet.distanceFromSun.toLocaleString()} km</Text>
            </HStack>
            
            <HStack justify="space-between">
              <Text color="gray.300">Number of Moons:</Text>
              <Text color="white">{planet.numberOfMoons}</Text>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

export default PlanetDetail