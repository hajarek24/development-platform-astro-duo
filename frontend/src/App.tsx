import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import StarryBackground from './components/StarryBackground'
import Home from './pages/Home'
import Articles from './pages/Articles'
import Planets from './pages/Planets'
import PlanetDetail from './pages/PlanetDetail' // ← Add this line
import Images from './pages/Images'
import Explore from './pages/Explore'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" position="relative" bg="black">
          <StarryBackground />
          <Box position="relative" zIndex={1}>
            <Navbar />
            <Box as="main" p={4} position="relative" zIndex={1}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/planets" element={<Planets />} />
                <Route path="/planets/:id" element={<PlanetDetail />} /> {/* ← This is the new route */}
                <Route path="/images" element={<Images />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App