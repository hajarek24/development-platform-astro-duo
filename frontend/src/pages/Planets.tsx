import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  VStack,
  Spinner,
  Center,
  SimpleGrid
} from '@chakra-ui/react'

interface Planet {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const Planets: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        // Updated port to 8080 which is Spring Boot's default port
        const response = await fetch('http://localhost:3000/api/planets')
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setPlanets(data)
      } catch (err) {
        setError('Failed to fetch planets')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlanets()
  }, [])

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
        <Text ml={4}>Loading planets...</Text>
      </Center>
    )
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500" fontSize="xl">{error}</Text>
      </Center>
    )
  }

  return (
    <Box p={8}>
      <VStack spacing={8} mb={10}>
        <Heading as="h1" size="2xl">Our Solar System</Heading>
        <Text fontSize="xl">Explore the planets of our solar system</Text>
      </VStack>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {planets.map((planet) => (
          <Card key={planet.id} overflow="hidden" variant="outline">
            <Image
              src={planet.imageUrl || 'https://via.placeholder.com/300'}
              alt={planet.name}
              objectFit="cover"
              height="200px"
            />
            <CardBody>
              <Heading size="md" mb={2}>{planet.name}</Heading>
              <Text>{planet.description}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Planets