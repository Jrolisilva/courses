import React from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Icon,
  Switch,
  useColorMode,
  useTheme,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  const sidebarWidth = "30vh";

  const handleToggleColorMode = () => {
    toggleColorMode();
    window.location.reload();
  };

  return (
    <Box
      position="fixed"
      left={isOpen ? "0" : `-${sidebarWidth}`}
      top={{ base: "60px", md: "80px" }}
      w={sidebarWidth}
      h="calc(100vh - 60px)"
      bg={colorMode === 'light' ? theme.colors.background.light.sidebar : theme.colors.background.dark.sidebar}
      color={colorMode === 'light' ? theme.colors.text.light : theme.colors.text.dark}
      p={4}
      transition="left 0.3s ease-in-out"
      zIndex="1000"
      display="flex"
      flexDirection="column"
      overflowY="auto"
      height={{ base: 'calc(100% - 60px)', md: 'calc(100vh - 60px)' }}
    >
      <VStack align="start" spacing={6} flex="1">
        <Box w="100%">
          <VStack align="start" spacing={3} ml={6}>
            <Text
              as={NavLink}
              to="/"
              _hover={{ textDecoration: 'none' }}
              _activeLink={{ color: theme.colors.primary[500], fontWeight: 'bold' }}
              onClick={onClose}
              fontSize="lg"
            >
              Meus cursos
            </Text>
          </VStack>
        </Box>
      </VStack>

      <Flex align="center" justify="center" mt={8} mb={4}>
        <Icon
          as={colorMode === 'light' ? MoonIcon : SunIcon}
          w={5}
          h={5}
          color={colorMode === 'light' ? theme.colors.text.light : theme.colors.text.dark}
        />
        <Switch
          isChecked={colorMode === 'dark'}
          onChange={handleToggleColorMode}
          size="lg"
          colorScheme="teal"
          ml={2}
        />
      </Flex>
    </Box>
  );
};

export default Sidebar;