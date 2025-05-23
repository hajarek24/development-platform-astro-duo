import { useLocation, Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Heading,
  Text,
  VStack,
  Image,
  Button
} from '@chakra-ui/react'

// ...existing imports...

const ArticleDetail: React.FC = () => {
  const location = useLocation()
  const { article } = location.state || {}

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
          src={article.urlToImage || 'https://via.placeholder.com/300'}
          alt={article.title}
          borderRadius="md"
          width="100%"
          objectFit="cover"
        />
        <Heading>{article.title}</Heading>
        <Text fontSize="sm" color="gray.500">
          {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}
        </Text>
        <Text mt={4}>{article.content || article.description}</Text>
        <Button as="a" href={article.url} target="_blank" rel="noopener noreferrer" colorScheme="teal" mt={2}>
          Read Full Article
        </Button>
      </VStack>
    </Container>
  )
}

export default ArticleDetail