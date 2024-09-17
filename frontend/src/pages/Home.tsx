import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Stack, Heading, useColorModeValue } from '@chakra-ui/react';
import Layout from '../components/layout/Layout';
import { getCourses } from '../api/api';

interface Course {
  id: number;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    getCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar os cursos:', error);
      });
  }, []);

  const cardBg = useColorModeValue('background.light.card', 'background.dark.card');
  const textColor = useColorModeValue('text.light', 'text.dark');
  const borderColor = useColorModeValue('border.light', 'border.dark');

  return (
    <Layout>
      <Box p={{ base: 2, md: 4 }}>
        <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 6 }}>
            {courses.map((course) => (
              <Box key={course.id} p={4} shadow="md" borderWidth="1px" bg={cardBg} borderColor={borderColor}>
                <Heading size={{ base: 'md', md: 'lg' }} mb={2} color="primary.500">
                  {course.title}
                </Heading>
                <Text fontSize={{ base: 'sm', md: 'md' }} mb={4} color={textColor}>
                  {course.description}
                </Text>
              </Box>
            ))}
          </Stack>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Home;