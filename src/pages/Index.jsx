import { useState } from 'react';
import {
  Box, Button, Container, Flex, FormControl, FormLabel, Input, Modal,
  ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Text, Textarea, useDisclosure, VStack
} from '@chakra-ui/react';
import { FaTrash, FaRegSmile } from 'react-icons/fa';

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    // Placeholder for login logic
    setUser({ name: 'User', id: '1' });
    onClose();
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handlePost = () => {
    const newPost = {
      id: Date.now(),
      title,
      body,
      date: new Date().toISOString(),
      author: user.name,
      reactions: {}
    };
    setPosts([newPost, ...posts]);
    setTitle('');
    setBody('');
  };

  const handleDeletePost = postId => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const addReaction = (postId, emoji) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newReactions = post.reactions;
        newReactions[emoji] = (newReactions[emoji] || 0) + 1;
        return { ...post, reactions: newReactions };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex justifyContent="space-between" mb={4}>
        <Text fontSize="2xl">Public Post Board</Text>
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={onOpen}>Login</Button>
        )}
      </Flex>
      {user && (
        <VStack spacing={4} mb={4}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={e => setTitle(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Body</FormLabel>
            <Textarea value={body} onChange={e => setBody(e.target.value)} />
          </FormControl>
          <Button onClick={handlePost}>Post</Button>
        </VStack>
      )}
      <VStack spacing={4}>
        {posts.map(post => (
          <Box key={post.id} p={4} shadow="md" borderWidth="1px">
            <Flex justifyContent="space-between">
              <Text fontSize="xl">{post.title}</Text>
              {user && user.name === post.author && (
                <Button onClick={() => handleDeletePost(post.id)}><FaTrash /></Button>
              )}
            </Flex>
            <Text mt={2}>{post.body}</Text>
            <Text mt={2} fontSize="sm">By {post.author} on {new Date(post.date).toLocaleDateString()}</Text>
            <Flex mt={2}>
              <Button onClick={() => addReaction(post.id, 'smile')}><FaRegSmile /></Button>
              <Text ml={2}>{post.reactions['smile'] || 0}</Text>
            </Flex>
          </Box>
        ))}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Enter username" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleLogin}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;