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
}

interface SpaceEvent {
  title: string
  date: string
  description: string
  type: string
}

const Explore = () => {
  const [missions, setMissions] = useState<SpaceMission[]>([])
  const [events, setEvents] = useState<SpaceEvent[]>([])
  const bgColor = useColorModeValue('gray.800', 'gray.900')
  const cardBg = useColorModeValue('gray.700', 'gray.800')

  useEffect(() => {
    // Fetch space missions (mock data for now)
    const fetchMissions = async () => {
      try {
        // This would be replaced with actual API calls
        const mockMissions: SpaceMission[] = [
          {
            name: 'Artemis II',
            status: 'Upcoming',
            launch_date: '2024-11-01',
            description: 'First crewed mission of the Artemis program',
            agency: 'NASA',
          },
          {
            name: 'James Webb Space Telescope',
            status: 'Active',
            launch_date: '2021-12-25',
            description: 'Next-generation space telescope',
            agency: 'NASA/ESA',
          },
          {
            name: 'Starship',
            status: 'Development',
            launch_date: 'TBD',
            description: 'Fully reusable launch vehicle',
            agency: 'SpaceX',
          },
        ]
        setMissions(mockMissions)
      } catch (error) {
        console.error('Error fetching missions:', error)
      }
    }

    // Fetch space events (mock data for now)
    const fetchEvents = async () => {
      try {
        // This would be replaced with actual API calls
        const mockEvents: SpaceEvent[] = [
          {
            title: 'Total Solar Eclipse',
            date: '2024-04-08',
            description: 'Visible across North America',
            type: 'Eclipse',
          },
          {
            title: 'Perseid Meteor Shower',
            date: '2024-08-12',
            description: 'Annual meteor shower',
            type: 'Meteor Shower',
          },
          {
            title: 'Mars Opposition',
            date: '2025-01-16',
            description: 'Mars will be at its closest approach to Earth',
            type: 'Planetary Event',
          },
        ]
        setEvents(mockEvents)
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