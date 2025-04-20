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
    <Box p={8} maxW="1200px" mx="auto">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" color="white">
          Our Solar System
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} width="100%">
          {planets.map((planet) => (
            <Card key={planet.id} bg="white" color="black">
              <CardBody>
                <Image
                  src={planet.imageUrl}
                  alt={planet.name}
                  borderRadius="lg"
                  mb={4}
                  height="200px"
                  objectFit="cover"
                  width="100%"
                />
                <VStack align="start" spacing={2}>
                  <Heading size="md">{planet.name}</Heading>
                  <Text noOfLines={3}>{planet.description}</Text>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  )
}

export default Planets 