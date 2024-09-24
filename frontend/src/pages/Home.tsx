import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Stack, Heading, useColorModeValue, Button } from '@chakra-ui/react';
import Layout from '../components/layout/Layout';
import { getCourses } from '../api/api';
import EditCourseModal from '../components/modal/editCourseModal';
import DeleteCourseModal from '../components/modal/deleteCourseModal';

interface Course {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [couseToDelete, setCouseToDelete] = useState<Course | null>(null);

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  const sortedCourses = [...courses].sort((a, b) => {
    const endDateA = new Date(a.end_date).getTime();
    const endDateB = new Date(b.end_date).getTime();
    return endDateA - endDateB;
  });

  const handleDeleteCourse = (course: Course) => {
    setCouseToDelete(course);
  }

  return (
    <Layout>
      <Box p={{ base: 2, md: 4 }}>
        <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 6 }}>
            {sortedCourses.map((course) => (
              <Box key={course.id} p={4} shadow="md" borderWidth="1px" bg={cardBg} borderColor={borderColor}>
                <Heading size={{ base: 'md', md: 'lg' }} mb={2} color="primary.500">
                  {course.title}
                </Heading>
                <Text fontSize={{ base: 'sm', md: 'md' }} mb={4} color={textColor}>
                  {course.description}
                </Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color={textColor}>
                  Inicio em: {formatDate(course.start_date)}
                </Text>
                <Text fontSize={{ base: 'sm', md: 'md' }} color={textColor}>
                  Término em: {formatDate(course.end_date)}
                </Text>
                <Button mt={3} mr={3} onClick={() => handleEditCourse(course)}>
                  Editar
                </Button>
                <Button colorScheme="red" bg="red.700" mt={3} mr={3} onClick={() => handleDeleteCourse(course)}>
                  Excluir
                </Button>
              </Box>
            ))}
          </Stack>
        </VStack>
      </Box>
      {selectedCourse && (
        <EditCourseModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          course={selectedCourse}
          handleSave={(course) => {
            console.log('Salvando curso:', course);
          }}
        />
      )}
      <DeleteCourseModal
        isOpen={Boolean(couseToDelete)}
        onClose={() => setCouseToDelete(null)}
        onConfirm={() => setCouseToDelete(null)}
        courseTitle={couseToDelete ? couseToDelete.id.toString() : ''}
      />
    </Layout>
  );
};

export default Home;