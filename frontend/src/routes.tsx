import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseList from './components/courseList';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Define a rota para a lista de cursos */}
        <Route path="/" element={<CourseList />} />
        {/* Define a rota para o formulário de cadastro/edição de curso */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;