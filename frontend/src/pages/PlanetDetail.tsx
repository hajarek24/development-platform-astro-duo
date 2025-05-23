import React, { useEffect, useState } from 'react'
import { 
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Spinner,
  Center,
  Button
} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'

// Planet response interface
interface PlanetResponse {
  id: string;
  name: string;
  description: string;
  mass: number;
  radius: number;
  semiMajorAxis: number;
  orbitalPeriod: number;
  imageUrl?: string;
  hasRings: boolean;
  moonCount: number;
  type: string;
  surfaceGravity: number;
  surfaceTemperature: number;
  composition: string;
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
      <Text color="gray.300">Mass:</Text>
      <Text color="white">{planet.mass.toLocaleString()} Earth masses</Text>
    </HStack>
    <HStack justify="space-between">
      <Text color="gray.300">Radius:</Text>
      <Text color="white">{planet.radius.toLocaleString()} Earth radii</Text>
    </HStack>
    <HStack justify="space-between">
      <Text color="gray.300">Semi-Major Axis:</Text>
      <Text color="white">{planet.semiMajorAxis.toLocaleString()} AU</Text>
    </HStack>
    <HStack justify="space-between">
      <Text color="gray.300">Orbital Period:</Text>
      <Text color="white">{planet.orbitalPeriod.toLocaleString()} days</Text>
    </HStack>
    <HStack justify="space-between">
      <Text color="gray.300">Moons:</Text>
      <Text color="white">{planet.moonCount}</Text>
    </HStack>
    <HStack justify="space-between">
      <Text color="gray.300">Has Rings:</Text>
      <Text color="white">{planet.hasRings ? 'Yes' : 'No'}</Text>
    </HStack>
    <HStack justify="space-between">
      <Text color="gray.300">Surface Gravity:</Text>
      <Text color="white">{planet.surfaceGravity} g</Text>
    </HStack>
    <HStack justify="space-between">
      <Text color="gray.300">Surface Temperature:</Text>
      <Text color="white">{planet.surfaceTemperature} K</Text>
    </HStack>
    <HStack justify="space-between">
      <Text color="gray.300">Composition:</Text>
      <Text color="white">{planet.composition}</Text>
    </HStack>
  </VStack>
</Box>
  )
}

export default PlanetDetail