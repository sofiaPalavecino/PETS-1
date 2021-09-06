const express = require('express');
const {addStudent, 
       getAllStudents, 
       getStudent,
       updateStudent,
       deleteStudent,
       mascotasPorLocalidad,
       serviciosPorBarrio,
       organizacionesMasTrancitadas,
      } = require('../controllers/studentController');

const router = express.Router();

/*router.post('/student', addStudent);
router.get('/students', getAllStudents);
router.get('/student/:id', getStudent);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);*/
router.get('/pets/:barrio',  mascotasPorLocalidad);
router.get('/pets/:barrio',  serviciosPorBarrio);
router.get('/pets/organizaciones',  organizacionesMasTrancitadas);


module.exports = {
    routes: router
}