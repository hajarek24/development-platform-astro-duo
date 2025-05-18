import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import axios from 'axios'

interface SpaceMission {
  name: string
  status: string
  launch_date: string
  description: string
  agency: string
  imageUrl?: string // <-- Add this line
}

interface SpaceEvent {
  title: string
  date: string
  description: string
  type: string
  imageUrl?: string // <-- Add this line
}

const Explore = () => {
  const [missions, setMissions] = useState<SpaceMission[]>([])
  const [events, setEvents] = useState<SpaceEvent[]>([])
  const bgColor = useColorModeValue('gray.800', 'gray.900')
  const cardBg = useColorModeValue('gray.700', 'gray.800')

  useEffect(() => {
    // Fetch space missions from backend
    const fetchMissions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/explore/missions')
        setMissions(response.data)
      } catch (error) {
        console.error('Error fetching missions:', error)
      }
    }

    // Fetch space events from backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/explore/events')
        setEvents(response.data)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }

    fetchMissions()
    fetchEvents()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green'
      case 'upcoming':
        return 'blue'
      case 'development':
        return 'yellow'
      default:
        return 'gray'
    }
  }

  return (
    <Container maxW="1200px" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Explore Space</Heading>

        <Tabs variant="enclosed">
          <TabList>
            <Tab>Current Missions</Tab>
            <Tab>Upcoming Events</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {missions.map((mission, index) => (
                  <Card key={index} bg={cardBg}>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        {mission.imageUrl && (
                          <img
                            src={mission.imageUrl}
                            alt={mission.name}
                            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                        )}
                        <HStack justify="space-between" w="100%">
                          <Heading size="md">{mission.name}</Heading>
                          <Badge colorScheme={getStatusColor(mission.status)}>
                            {mission.status}
                          </Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.400">
                          Launch: {mission.launch_date}
                        </Text>
                        <Text>{mission.description}</Text>
                        <Text fontSize="sm" color="gray.400">
                          Agency: {mission.agency}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {events.map((event, index) => (
                  <Card key={index} bg={cardBg}>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        {event.imageUrl && (
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                        )}
                        <HStack justify="space-between" w="100%">
                          <Heading size="md">{event.title}</Heading>
                          <Badge colorScheme="purple">{event.type}</Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.400">
                          Date: {event.date}
                        </Text>
                        <Text>{event.description}</Text>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}

export default Explore