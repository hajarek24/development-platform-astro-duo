import React, { useEffect, useState } from 'react'
import { 
  Box, 
  Heading, 
  Text, 
  SimpleGrid, 
  Card, 
  CardBody, 
  CardHeader, 
  CardFooter, 
  Button, 
  Image, 
  Spinner, 
  Center,
  useColorModeValue,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Badge,
  HStack,
  Divider
} from '@chakra-ui/react'

// Define the planet response interface
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

const Planets: React.FC = () => {
  const [planets, setPlanets] = useState<PlanetResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetResponse | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const cardBgColor = useColorModeValue('gray.700', 'gray.700')
  const cardTextColor = useColorModeValue('gray.100', 'gray.100')

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
        setError('Failed to fetch planets data')
      } finally {
        setLoading(false)
      }
    }
    fetchPlanets()
  }, [])

  const openModal = (planet: PlanetResponse) => {
    setSelectedPlanet(planet)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPlanet(null)
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
    <Box p={8} maxW="1200px" mx="auto">
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center" color="white" mb={8}>
          Explore Our Solar System
        </Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {planets.map((planet) => (
            <Card key={planet.id} bg={cardBgColor} color={cardTextColor} overflow="hidden">
              <CardHeader>
                <Heading size="md">{planet.name}</Heading>
              </CardHeader>
              {planet.imageUrl && (
                <Image 
                  src={planet.imageUrl} 
                  alt={planet.name}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                />
              )}
              <CardBody>
                <Text noOfLines={3}>{planet.description}</Text>
              </CardBody>
              <CardFooter>
                <Button 
                  colorScheme="blue"
                  onClick={() => openModal(planet)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>

      {/* Modal for planet details */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent
          bg="gray.800" 
          color="white" 
          maxW="600px"    // wider
          maxH="650px"    // shorter
          minH="300px"
          overflowY="auto"
        >
          <ModalHeader>
            {selectedPlanet?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPlanet && (
              <VStack spacing={4} align="stretch">
                {selectedPlanet.imageUrl && (
                  <Image 
                    src={selectedPlanet.imageUrl}
                    alt={selectedPlanet.name}
                    height="200px"
                    width="100%"
                    objectFit="cover"
                    borderRadius="md"
                  />
                )}
                <Text>{selectedPlanet.description}</Text>
                <Divider />
                <HStack justify="space-between">
                  <Text color="gray.300">Type:</Text>
                  <Badge colorScheme="purple" fontSize="md">{selectedPlanet.type}</Badge>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.300">Mass:</Text>
                  <Text color="white">{selectedPlanet.mass.toLocaleString()} Earth masses</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.300">Radius:</Text>
                  <Text color="white">{selectedPlanet.radius.toLocaleString()} Earth radii</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.300">Semi-Major Axis:</Text>
                  <Text color="white">{selectedPlanet.semiMajorAxis.toLocaleString()} AU</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.300">Orbital Period:</Text>
                  <Text color="white">{selectedPlanet.orbitalPeriod.toLocaleString()} days</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.300">Moons:</Text>
                  <Text color="white">{selectedPlanet.moonCount}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.300">Has Rings:</Text>
                  <Text color="white">{selectedPlanet.hasRings ? 'Yes' : 'No'}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.300">Surface Gravity:</Text>
                  <Text color="white">{selectedPlanet.surfaceGravity} g</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.300">Surface Temperature:</Text>
                  <Text color="white">{selectedPlanet.surfaceTemperature} K</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.300">Composition:</Text>
                  <Text color="white">{selectedPlanet.composition}</Text>
                </HStack>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Planets