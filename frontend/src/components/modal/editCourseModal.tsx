import React, { useState, useEffect } from "react";
import { updateCourse } from "../../api/api";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

interface EditCourseModalProps {
  show: boolean;
  handleClose: () => void;
  course: { id: number; title: string; description: string, start_date: string, end_date: string };
  handleSave: (course: { id: number; name: string; description: string }) => void;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({ show, handleClose, course, handleSave }) => {
  const [name, setName] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const textColor = useColorModeValue("text.light", "text.dark");
  const modalBgColor = useColorModeValue('background.light.card', 'background.dark.default');

  useEffect(() => {
    setName(course.title);
    setDescription(course.description);
  }, [course]);

  const onSave = () => {
    updateCourse(course.id.toString(), { title: name, description })
      .then(() => {
        handleSave({ ...course, name, description });
        handleClose();
      })
      .catch(error => {
        console.error("Failed to update course:", error);
      });
  };

  if (!course) {
    return null;
  }

  return (
    <Modal isOpen={show} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent bg={modalBgColor}>
        <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center" color={textColor}>Editar </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="formCourseName">
            <FormLabel htmlFor="courseName">Titulo do Curso</FormLabel>
            <Input
              id="courseName"
              name="courseName"
              type="text"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="formCourseDescription">
            <FormLabel htmlFor="courseDescription">Descrição</FormLabel>
            <Textarea
              id="courseDescription"
              name="courseDescription"
              autoComplete="off"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" bg="red.700" mr={3} onClick={handleClose}>
            Fechar
          </Button>
          <Button colorScheme="purple" bg="purple.700" onClick={onSave}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCourseModal;