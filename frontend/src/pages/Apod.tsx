import React, { useEffect, useState } from 'react'
import { Box, Heading, Text, Image, VStack, Spinner, Center, AspectRatio } from '@chakra-ui/react'

// Define the response type directly in this file
interface ApodResponse {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
}

const Apod: React.FC = () => {
  const [apod, setApod] = useState<ApodResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApod = async () => {
      try {
        console.log('Attempting to fetch APOD from:', import.meta.env.VITE_API_BASE_URL + '/api/apod');
        
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/apod`);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        setApod(data);
      } catch (err: any) {
        console.error('Error fetching APOD:', err);
        // More specific error message based on error type
        if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
          setError('Cannot connect to the backend server. Is it running?');
        } else {
          setError(`Failed to fetch the Astronomy Picture of the Day: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchApod();
  }, []);

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
        <Heading as="h1" size="2xl" textAlign="center" color="white">
          Astronomy Picture of the Day
        </Heading>
        
        {apod && (
          <>
            <Heading as="h2" size="xl" color="white">
              {apod.title}
            </Heading>
            
            <Box borderRadius="lg" overflow="hidden" boxShadow="xl">
              {apod.media_type === 'video' ? (
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    src={apod.url}
                    title={apod.title}
                    allowFullScreen
                  />
                </AspectRatio>
              ) : (
                <Image
                  src={apod.hdurl || apod.url}
                  alt={apod.title}
                  w="100%"
                  objectFit="cover"
                />
              )}
            </Box>
            
            <Text color="gray.300" fontSize="lg">
              {apod.explanation}
            </Text>
            
            <Text color="gray.400" fontSize="sm">
              Date: {apod.date}
            </Text>
          </>
        )}
      </VStack>
    </Box>
  )
}

export default Apod