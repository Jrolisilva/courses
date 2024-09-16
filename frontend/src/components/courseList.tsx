import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/courses')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar os cursos:', error);
      });
  }, []);

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
      {courses.map((course: any) => (
        <Box key={course.id} p={4} shadow="md" borderWidth="1px">
          <Heading fontSize="xl">{course.title}</Heading>
          <Text mt={4}>{course.description}</Text>
        </Box>
      ))}
    </Grid>
  );
};

export default CourseList;