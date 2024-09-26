import React, { useState } from 'react';
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
import { AddIcon } from '@chakra-ui/icons';

interface ICourse {
  title: string;
  description: string;
  endDate: Date;
}

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Omit<ICourse, '_id'>) => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const modalSize = useBreakpointValue({ base: 'full', md: 'md' });

  const modalBgColor = useColorModeValue('background.light.card', 'background.dark.default');
  const modalFooterBgColor = useColorModeValue('background.light.sidebar', 'background.dark.sidebar');
  const textColor = useColorModeValue('text.light', 'text.dark');
  const inputBgColor = useColorModeValue('background.light.default', 'background.dark.card');
  const inputBorderColor = useColorModeValue('border.light', 'border.dark');
  const errorTextColor = useColorModeValue('accent.800', 'accent.800');


  const handleSubmit = () => {
    if (!title || !description || !endDate) {
      setError('Todos os campos são obrigatórios e pelo menos um vídeo deve ser adicionado');
      return;
    }

    const newCourse: Omit<ICourse, '_id'> = {
      title,
      description,
      endDate: new Date(endDate)
    };

    onSave(newCourse);
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
          <FormControl id="endDate" mb={4} isRequired>
            <FormLabel fontWeight="bold" color={textColor}>Data de Término</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Data de término"
              bg={inputBgColor}
              borderColor={inputBorderColor}
              color={textColor}
            />
          </FormControl>

          <Divider my={4} />
          <Text fontWeight="bold" mb={2} color={textColor}>Adicionar Vídeos</Text>
          <Button
            leftIcon={<AddIcon />}
            onClick={handleSubmit}
            colorScheme="teal"
            mb={4}
            width="100%"
          >
            Adicionar Vídeo
          </Button>

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
