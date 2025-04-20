import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Card,
  CardBody,
  Image,
} from '@chakra-ui/react'
import { FaUser, FaBookmark, FaImage } from 'react-icons/fa'

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0)
  const bgColor = useColorModeValue('gray.800', 'gray.900')
  const cardBg = useColorModeValue('gray.700', 'gray.800')

  // Mock data for saved content
  const savedArticles = [
    {
      id: 1,
      title: 'The Future of Space Exploration',
      excerpt: 'Exploring the next frontier of human space travel...',
    },
    {
      id: 2,
      title: 'Mars Colonization Plans',
      excerpt: 'Latest developments in Mars settlement initiatives...',
    },
  ]

  const savedImages = [
    {
      id: 1,
      title: 'Hubble Deep Field',
      url: 'https://example.com/image1.jpg',
    },
    {
      id: 2,
      title: 'Saturn\'s Rings',
      url: 'https://example.com/image2.jpg',
    },
  ]

  return (
    <Container maxW="1200px" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Profile Header */}
        <Box
          p={6}
          borderRadius="lg"
          bg={cardBg}
          color="white"
          textAlign="center"
        >
          <VStack spacing={4}>
            <Avatar size="xl" name="User Name" />
            <Heading size="lg">User Name</Heading>
            <Text color="gray.400">user@example.com</Text>
            <Button colorScheme="blue" size="sm">
              Edit Profile
            </Button>
          </VStack>
        </Box>

        {/* Content Tabs */}
        <Tabs
          variant="enclosed"
          index={activeTab}
          onChange={setActiveTab}
          colorScheme="blue"
        >
          <TabList>
            <Tab>
              <HStack>
                <FaUser />
                <Text>Profile</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack>
                <FaBookmark />
                <Text>Saved Articles</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack>
                <FaImage />
                <Text>Saved Images</Text>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            {/* Profile Settings */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Box p={6} borderRadius="lg" bg={cardBg}>
                  <Heading size="md" mb={4}>
                    Account Settings
                  </Heading>
                  <Text>Manage your account preferences and settings here.</Text>
                </Box>
              </VStack>
            </TabPanel>

            {/* Saved Articles */}
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {savedArticles.map((article) => (
                  <Card key={article.id} bg={cardBg}>
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <Heading size="sm">{article.title}</Heading>
                        <Text fontSize="sm" color="gray.400">
                          {article.excerpt}
                        </Text>
                        <Button colorScheme="blue" size="sm">
                          Read More
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </TabPanel>

            {/* Saved Images */}
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {savedImages.map((image) => (
                  <Card key={image.id} bg={cardBg}>
                    <CardBody>
                      <VStack spacing={3}>
                        <Image
                          src={image.url}
                          alt={image.title}
                          borderRadius="lg"
                          objectFit="cover"
                          h="200px"
                          w="100%"
                        />
                        <Text fontSize="sm">{image.title}</Text>
                        <Button colorScheme="blue" size="sm">
                          View Full Size
                        </Button>
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

export default Profile 