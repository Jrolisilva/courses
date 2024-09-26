import React from 'react';
import { Flex, IconButton, Box, Image, useTheme, useColorMode } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '../../assets/twygo.png';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import AddCourseModal from '../modal/addCourseModal';

interface TopbarProps {
  onOpen: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onOpen }) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const [addCourseModalOpen, setAddCourseModalOpen] = useState(false);

  const topbarBg = colorMode === 'light' ? theme.colors.background.light.sidebar : theme.colors.background.dark.sidebar;

  return (
    <Flex
      as="header"
      width="100%"
      height={{ base: '60px', md: '80px' }}
      align="center"
      justify="space-between"
      padding={{ base: '0 20px', md: '0 40px' }}
      bg={topbarBg}
      color={colorMode === 'light' ? theme.colors.neutral.dark : theme.colors.neutral.light}
      position="fixed"
      boxShadow="md"
      zIndex="1001"
    >
      <Flex align="center">
      <IconButton
        aria-label="Open Sidebar"
        icon={<HamburgerIcon />}
        size={{ base: 'md', md: 'lg' }}
        colorScheme={"primary.500"}
        onClick={onOpen}
        variant="outline"
        borderColor={colorMode === 'light' ? theme.colors.primary[500] : theme.colors.primary[500]}
        color={colorMode === 'light' ? theme.colors.primary[500] : theme.colors.primary[500]}
        mr={2} // Add margin-right to create space between the buttons
      />
      <IconButton
        aria-label="Add Course"
        icon={<AddIcon />}
        size={{ base: 'md', md: 'lg' }}
        colorScheme={"primary.500"}
        onClick={() => setAddCourseModalOpen(true)}
        variant="outline"
        borderColor={colorMode === 'light' ? theme.colors.primary[500] : theme.colors.primary[500]}
        color={colorMode === 'light' ? theme.colors.primary[500] : theme.colors.primary[500]}
      />
      </Flex>
      {addCourseModalOpen && (
      <AddCourseModal
        isOpen={addCourseModalOpen}
        onClose={() => setAddCourseModalOpen(false)}
        onSave={() => {
        setAddCourseModalOpen(false);
        }}
      />
      )}

      <Box maxW={{ base: '100px', md: '150px' }} height="auto">
      <Image src={Logo} alt="Logo" objectFit="contain" width="100%" height="100%" />
      </Box>
    </Flex>
  );
};

export default Topbar;