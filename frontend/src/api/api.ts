import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCourses = () => {
  return api.get('/courses');
}

export const createCourse = (courseData: any) => {
  return api.post('/courses', courseData);
}

export const updateCourse = (courseId: string, courseData: any) => {
  return api.put(`/courses/${courseId}`, courseData);
}

export const deleteCourse = (courseId: string) => {
  return api.delete(`/courses/${courseId}`);
}