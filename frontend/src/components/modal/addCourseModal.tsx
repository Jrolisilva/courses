import React, { useState, useEffect } from 'react';
import { createCourse } from '../../api/api';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Divider,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

interface ICourse {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
}

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Omit<ICourse, '_id'>) => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [end_date, setEndDate] = useState('');
  const [start_date, setStartDate] = useState(new Date().toISOString());
  const [error, setError] = useState('');

  const modalSize = useBreakpointValue({ base: 'full', md: 'md' });

  const modalBgColor = useColorModeValue('background.light.card', 'background.dark.default');
  const modalFooterBgColor = useColorModeValue('background.light.sidebar', 'background.dark.sidebar');
  const textColor = useColorModeValue('text.light', 'text.dark');
  const inputBgColor = useColorModeValue('background.light.default', 'background.dark.card');
  const inputBorderColor = useColorModeValue('border.light', 'border.dark');
  const errorTextColor = useColorModeValue('accent.800', 'accent.800');

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDescription('');
      setStartDate(new Date().toISOString());
      setEndDate('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!title || !description || !end_date) {
      setError('Todos os campos são obrigatórios');
      return;
    }
    createCourse({ title, description, end_date: new Date(end_date), start_date: new Date(start_date) })
      .then((response) => {
        onSave(response.data);
      })
      .catch((error) => {
        console.error('Erro ao criar o curso:', error);
      });

    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setEndDate('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent bg={modalBgColor}>
        <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center" color={textColor}>
          Adicionar Novo Curso
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={6} overflowY="auto">
          <Divider mb={6} />
          <FormControl id="title" mb={4} isRequired>
            <FormLabel fontWeight="bold" color={textColor}>Título</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do curso"
              bg={inputBgColor}
              borderColor={inputBorderColor}
              color={textColor}
            />
          </FormControl>
          <FormControl id="description" mb={4} isRequired>
            <FormLabel fontWeight="bold" color={textColor}>Descrição</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do curso"
              bg={inputBgColor}
              borderColor={inputBorderColor}
              color={textColor}
            />
          </FormControl>
          <FormControl id="end_date" mb={4} isRequired>
            <FormLabel fontWeight="bold" color={textColor}>Data de Término</FormLabel>
            <Input
              type="date"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Data de término"
              bg={inputBgColor}
              borderColor={inputBorderColor}
              color={textColor}
            />
          </FormControl>
          {error && (
            <Text color={errorTextColor} mb={4}>
              {error}
            </Text>
          )}
        </ModalBody>
        <ModalFooter position="sticky" bottom="0" bg={modalFooterBgColor} zIndex="10">
          <Button colorScheme="accent" bg="accent.700" mr={3} onClick={handleSubmit}>
            Salvar
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCourseModal;
