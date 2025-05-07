import { useLocation, useParams, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  Button
} from '@chakra-ui/react'

const ArticleDetail: React.FC = () => {
  const location = useLocation()
  const { article } = location.state || {}
  const { id } = useParams()

  if (!article) {
    return (
      <Container py={10}>
        <Text>Article not found. Try going back to the articles page.</Text>
        <Button as={RouterLink} to="/articles" mt={4} colorScheme="blue">
          Back to Articles
        </Button>
      </Container>
    )
  }

  return (
    <Container maxW="800px" py={8}>
      <VStack align="start" spacing={4}>
        <Image
          src={article.imageUrl}
          alt={article.title}
          borderRadius="md"
          width="100%"
          objectFit="cover"
        />
        <Heading>{article.title}</Heading>
        <Text fontSize="sm" color="gray.500">
          By {article.author} • {new Date(article.date).toLocaleDateString()}
        </Text>
        <Text mt={4}>{article.content}</Text>
        <Button as={RouterLink} to="/articles" mt={6} colorScheme="blue">
          ← Back to Articles
        </Button>
      </VStack>
    </Container>
  )
}

export default ArticleDetail
