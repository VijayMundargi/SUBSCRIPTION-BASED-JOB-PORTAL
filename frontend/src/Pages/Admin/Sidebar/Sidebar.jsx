import { VStack, Button } from '@chakra-ui/react';
import React from 'react';
import { RiDashboardFill, RiUser3Fill, RiBriefcaseFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <VStack
      spacing="8"
      p="6"
      minH="100vh"
      boxShadow="-2px 0 10px rgba(107, 70, 193, 0.5)"
      alignItems="stretch"
      bg="gray.50"
    >
      <Link to="/admin/dashboard">
        <Button
          variant="ghost"
          width="100%"
          justifyContent="flex-start"
          leftIcon={<RiDashboardFill />}
        >
          Dashboard
        </Button>
      </Link>

      <Link to="/admin/jobs">
        <Button
          variant="ghost"
          width="100%"
          justifyContent="flex-start"
          leftIcon={<RiBriefcaseFill />}
        >
          Jobs
        </Button>
      </Link>

      <Link to="/admin/users">
        <Button
          variant="ghost"
          width="100%"
          justifyContent="flex-start"
          leftIcon={<RiUser3Fill />}
        >
          Users
        </Button>
      </Link>
    </VStack>
  );
};

export default Sidebar;
