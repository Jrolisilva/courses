import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

interface EditCourseModalProps {
  show: boolean;
  handleClose: () => void;
  course: { id: number; title: string; description: string, start_date: string, end_date: string };
  handleSave: (course: { id: number; name: string; description: string }) => void;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({ show, handleClose, course, handleSave }) => {
  const [name, setName] = useState(course.title);
  const [description, setDescription] = useState(course.description);

  const onSave = () => {
    handleSave({ ...course, name, description });
    handleClose();
  };

  useEffect(() => {
    setName(course.title);
    setDescription(course.description);
  }, [course]);

  if (!course) {
    return null;
  }

  return (
    <Modal isOpen={show} onClose={handleClose}>
      <ModalHeader>Editar </ModalHeader>
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditCourseModal;