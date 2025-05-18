import { Box, Heading, Text, VStack, List, ListItem, Divider, Link, Image, SimpleGrid, Code } from '@chakra-ui/react'
import logo from '../assets/logo.svg'

const About = () => (
  <Box maxW="900px" mx="auto" p={8}>
    <VStack spacing={8} align="stretch">
      <Heading as="h1" size="2xl" color="blue.300" textAlign="center">
        Space Gateway
      </Heading>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image src={logo} alt="Space Gateway Logo" boxSize="74px" />
      </Box>
      <Text fontSize="lg" color="gray.200" textAlign="center">
        Space Gateway is a modern full-stack web application that brings the wonders of space exploration to your fingertips. It provides real-time data on planets, missions, astronomical events, news, and high-res imagery — all powered by live APIs and wrapped in an engaging, responsive UI.
      </Text>
      <Divider />

      <Heading as="h2" size="lg" color="blue.200">✨ Features</Heading>
      <List spacing={2} color="gray.100" pl={4}>
        <ListItem>• Planet details: stats, images, and composition</ListItem>
        <ListItem>• NASA Picture of the Day</ListItem>
        <ListItem>• Space missions & launches</ListItem>
        <ListItem>• Astronomical events</ListItem>
        <ListItem>• Latest space news</ListItem>
        <ListItem>• High-res image gallery</ListItem>
        <ListItem>• Powerful search functionality</ListItem>
      </List>

      <Divider />

      <Heading as="h2" size="lg" color="blue.200">🧭 Pages Overview</Heading>
      <List spacing={2} color="gray.100" pl={4}>
        <ListItem><b>Home:</b> NASA’s Astronomy Picture of the Day, featured news & missions</ListItem>
        <ListItem><b>Planets:</b> Interactive planetary grid with detailed stats</ListItem>
        <ListItem><b>Explore:</b> Missions, events, and news in one place</ListItem>
        <ListItem><b>Articles:</b> Space science articles with search</ListItem>
        <ListItem><b>Images:</b> Curated high-res gallery</ListItem>
        <ListItem><b>About:</b> Project overview, credits, and contact</ListItem>
      </List>

      <Divider />

      <Heading as="h2" size="lg" color="blue.200">🌐 APIs Used</Heading>
      <SimpleGrid columns={[1, 2]} spacing={4} color="gray.100">
        <Box>
          <b>Le Systeme Solaire API</b>
          <Text fontSize="sm">Planetary data</Text>
        </Box>
        <Box>
          <b>NewsAPI & Spaceflight News API</b>
          <Text fontSize="sm">Space news & articles</Text>
        </Box>
        <Box>
          <b>Launch Library 2 API</b>
          <Text fontSize="sm">Upcoming missions & events</Text>
        </Box>
        <Box>
          <b>NASA Media API</b>
          <Text fontSize="sm">Daily pictures & gallery</Text>
        </Box>
        <Box>
          <b>Wikipedia API</b>
          <Text fontSize="sm">Supplemental info & images</Text>
        </Box>
      </SimpleGrid>

      <Divider />

      <Heading as="h2" size="lg" color="blue.200">🛠️ Tech Stack</Heading>
      <SimpleGrid columns={[1, 2]} spacing={4} color="gray.100">
        <Box>
          <b>Frontend:</b>
          <Text fontSize="sm">React, TypeScript, Chakra UI, Axios, Vite</Text>
        </Box>
        <Box>
          <b>Backend:</b>
          <Text fontSize="sm">Spring Boot, Java, RestTemplate, Maven</Text>
        </Box>
        <Box>
          <b>Deployment:</b>
          <Text fontSize="sm">Docker-ready setup</Text>
        </Box>
      </SimpleGrid>

      <Divider />


      <Heading as="h2" size="lg" color="blue.200">🚀 Perspectives & Improvements</Heading>
      <List spacing={2} color="gray.100" pl={4}>
        <ListItem>• Move to microservices for scalability</ListItem>
        <ListItem>• Docker/Kubernetes deployment</ListItem>
        <ListItem>• CI/CD pipelines</ListItem>
        <ListItem>• OAuth2/JWT authentication for secure login</ListItem>
        <ListItem>• A 3D exploration map to enhance spatial navigation and interactivity.</ListItem>
      </List>

      <Box textAlign="center" mt={8} color="gray.400">
        <Text fontSize="md">
          Project by: <b>Hiba El Ouerkhaoui & Hajar Elkasiri</b>
        </Text>
        <Text fontSize="sm">
          Visit{' '}
          <Link href="https://github.com/m-elhamlaoui/development-platform-astro-duo" color="blue.300" isExternal>
            our GitHub repository
          </Link>
        </Text>
      </Box>
    </VStack>
  </Box>
)

export default About