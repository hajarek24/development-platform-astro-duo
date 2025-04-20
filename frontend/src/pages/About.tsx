import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Link,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa'

const About = () => {
  const bgColor = useColorModeValue('gray.800', 'gray.900')
  const textColor = useColorModeValue('gray.300', 'gray.400')

  return (
    <Container maxW="1200px" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={4}>About Space Gateway</Heading>
          <Text fontSize="lg" color={textColor}>
            Space Gateway is a comprehensive web application that brings the wonders
            of space exploration to your fingertips. Our mission is to make space
            science accessible and engaging for everyone, from casual enthusiasts
            to dedicated astronomers.
          </Text>
        </Box>

        <Divider />

        <Box>
          <Heading size="lg" mb={4}>
            Features
          </Heading>
          <VStack align="start" spacing={4}>
            <Text>
              • Real-time NASA Astronomy Picture of the Day
              <br />
              • Interactive 3D Solar System Visualization
              <br />
              • Comprehensive Space Mission Tracking
              <br />
              • High-Resolution Space Image Gallery
              <br />
              • Up-to-date Space News and Articles
              <br />
              • Astronomical Event Calendar
            </Text>
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Heading size="lg" mb={4}>
            Technology Stack
          </Heading>
          <Text color={textColor}>
            Space Gateway is built using modern web technologies:
            <br />
            • Frontend: React, TypeScript, Chakra UI
            <br />
            • 3D Visualization: Three.js
            <br />
            • Backend: Spring Boot
            <br />
            • APIs: NASA Open APIs, SpaceX API
          </Text>
        </Box>

        <Divider />

        <Box>
          <Heading size="lg" mb={4}>
            Connect With Us
          </Heading>
          <HStack spacing={4}>
            <Link
              href="https://github.com/yourusername/space-gateway"
              isExternal
              _hover={{ color: 'blue.400' }}
            >
              <Icon as={FaGithub} boxSize={6} />
            </Link>
            <Link
              href="https://twitter.com/spacegateway"
              isExternal
              _hover={{ color: 'blue.400' }}
            >
              <Icon as={FaTwitter} boxSize={6} />
            </Link>
            <Link
              href="mailto:contact@spacegateway.com"
              _hover={{ color: 'blue.400' }}
            >
              <Icon as={FaEnvelope} boxSize={6} />
            </Link>
          </HStack>
        </Box>

        <Divider />

        <Box>
          <Heading size="lg" mb={4}>
            Credits
          </Heading>
          <Text color={textColor}>
            Space Gateway is made possible by the following:
            <br />
            • NASA's Open APIs for space data and imagery
            <br />
            • SpaceX API for mission information
            <br />
            • The open-source community for their invaluable tools and libraries
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}

export default About 