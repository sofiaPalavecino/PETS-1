'use strict';

const firebase = require('../db');
const Student = require('../models/student');
const firestore = firebase.firestore();


const addStudent = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('students').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllStudents = async (req, res, next) => {
    try {config
        const students = await firestore.collection('students');
        const data = await students.get();
        const studentsArray = [];
        if(data.empty) {
            res.status(404).send('No student record found');
        }else {
            data.forEach(doc => {
                const student = new Student(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().fatherName,
                    doc.data().class,
                    doc.data().age,
                    doc.data().phoneNumber,
                    doc.data().subject,
                    doc.data().year,
                    doc.data().semester,
                    doc.data().status
                );
                studentsArray.push(student);
            });
            res.send(studentsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id);
        const data = await student.get();
        if(!data.exists) {
            res.status(404).send('Student with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const student =  await firestore.collection('students').doc(id);
        await student.update(data);
        res.send('Student record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('students').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const mascotasPorLocalidad = async (req, res, next) =>{
    try{
        const barrio=req.params.id;
        const tipos=new Map();
        await firebase.collection("users").where("barrio","==",barrio).get().then((querySnapshot)=>{
            if(querySnapshot.size>0){
                querySnapshot.forEach((doc)=>{
                    console.log(doc.data()["barrio"])
                    if(doc.data()["barrio"]==barrio){
                        firebase.collection("users").doc(doc.id).collection("mascota").get().subscribe((querySnapshot)=>{
                            if(querySnapshot.size>0){
                                tipos.set(doc.id,doc.data()["barrio"])
                            }
                        })
                    }
                    
                })
            }
        })
        res.send(a);
    }catch (error){
        res.status(400).send(error.message);
    }
}

const serviciosPorBarrio= async (req,res,next) =>{
    try{
        const servicio=req.params.id;
        res.send()
    }catch(error){
        res.status(400).send(error.message);
    }
} 

const organizacionesMasTrancitadas =async (req,res,next)=>{
    try{
        res.send();
    }catch(error){
        res.status(400).send(error.message);
    }
}

module.exports={
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    mascotasPorLocalidad,
    serviciosPorBarrio,
    organizacionesMasTrancitadas,
}