import { Box, Flex, Link, Button, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaRocket, FaNewspaper, FaGlobe, FaImage, FaCompass, FaInfoCircle, FaUser } from 'react-icons/fa'

const Navbar = () => {
  const bgColor = useColorModeValue('gray.800', 'gray.900')
  const hoverColor = useColorModeValue('blue.400', 'blue.300')

  const navItems = [
    { path: '/', label: 'Home', icon: FaRocket },
    { path: '/articles', label: 'Articles', icon: FaNewspaper },
    { path: '/planets', label: 'Planets', icon: FaGlobe },
    { path: '/images', label: 'Images', icon: FaImage },
    { path: '/explore', label: 'Explore', icon: FaCompass },
    { path: '/about', label: 'About', icon: FaInfoCircle },
  ]

  return (
    <Box bg={bgColor} px={0} py={3} borderBottom="1px solid" borderColor="gray.700" w="100vw">
      <Flex align="center" justify="space-between" px={8}>
        <Link
          as={RouterLink}
          to="/"
          fontSize="2xl"
          fontWeight="bold"
          color="white"
          _hover={{ textDecoration: 'none', color: hoverColor }}
        >
          Space Gateway
        </Link>

        <Flex gap={4} align="center">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                color="white"
                _hover={{ textDecoration: 'none', color: hoverColor }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Icon />
                {item.label}
              </Link>
            )
          })}

          <Button
            as={RouterLink}
            to="/login"
            colorScheme="blue"
            variant="outline"
            leftIcon={<FaUser />}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar 