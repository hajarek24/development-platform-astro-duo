import { Box, SimpleGrid, VStack, Heading, Text, Link, HStack, Icon } from '@chakra-ui/react';
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => (
  <Box as="footer" bg="gray.900" color="gray.200" pt={12} pb={4} mt={16} w="100vw">
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8} mb={8} px={8}>
      <Box maxW="320px" pr={8} pl={12} textAlign="left">
        <Heading as="h3" size="md" mb={2} color="white">Space Gateway</Heading>
        <Text fontSize="sm">
          Your portal to space exploration, featuring NASA data, planetary information, and the latest in space science.
        </Text>
      </Box>
      <VStack align="start" spacing={2}>
        <Heading as="h3" size="md" mb={2} color="white">Quick Links</Heading>
        <Link href="/">Home</Link>
        <Link href="/articles">Articles</Link>
        <Link href="/planets">Planets</Link>
        <Link href="/images">Images</Link>
        <Link href="/explore">Explore</Link>
        <Link href="/about">About</Link>
      </VStack>
      <VStack align="start" spacing={2}>
        <Heading as="h3" size="md" mb={2} color="white">API Resources</Heading>
        <Link href="https://www.nasa.gov/" isExternal>NASA Official Site</Link>
        <Link href="https://apod.nasa.gov/apod/astropix.html" isExternal>Astronomy Picture of the Day</Link>
        <Link href="https://api.nasa.gov/" isExternal>NASA Open APIs</Link>
        <Link href="https://api.le-systeme-solaire.net/" isExternal>Le Systeme Solaire API</Link>
        <Link href="https://spaceflightnewsapi.net/" isExternal>Spaceflight News API</Link>
        <Link href="https://newsapi.org/" isExternal>NewsAPI</Link>
        <Link href="https://thespacedevs.com/llapi" isExternal>Launch Library 2 API (The Space Devs)</Link>
        <Link href="https://www.mediawiki.org/wiki/API:Main_page" isExternal>Wikipedia API</Link>
      </VStack>
      <VStack align="start" spacing={2} pr={12}>
        <Heading as="h3" size="md" mb={2} color="white">Connect With Us</Heading>
        <HStack spacing={4} pt={1}>
          <Link href="#" aria-label="Twitter"><Icon as={FaTwitter} boxSize={5} /></Link>
          <Link href="#" aria-label="Facebook"><Icon as={FaFacebook} boxSize={5} /></Link>
          <Link href="#" aria-label="Instagram"><Icon as={FaInstagram} boxSize={5} /></Link>
          <Link href="https://github.com/m-elhamlaoui/development-platform-astro-duo.git" aria-label="GitHub"><Icon as={FaGithub} boxSize={5} /></Link>
        </HStack>
      </VStack>
    </SimpleGrid>
    <Text textAlign="center" fontSize="sm" color="gray.500">
      © 2025 Space Gateway. All data provided by NASA and other APIs.
    </Text>
  </Box>
);

export default Footer; 