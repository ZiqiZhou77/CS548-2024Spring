const express = require('express');
const data = require('../database/student-info.json');
// console.log(data, "this is our data")

const students = express.Router();
const fs = require('fs');


//Get / all the student-info
students.get('/', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userDevice = req.headers['User-agent'];
    res.json({students: data, IP: userIp, deviceType: userDevice});
});

//POST / to retrieve your information based on 'student-id'
students.post('/', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userDevice = req.headers['User-agent'];
    const {student_id} = req.body;

    if (!student_id) {
        return res.status(400).json({IP: userIp, deviceType: userDevice,  message: 'Need a student id to retrieve'});
    }

    const result = data.find(c => c["student_id"] === student_id);

    if (result) {
        res.json({IP: userIp, deviceType: userDevice, result: result});
    } else {
        res.status(404).json({IP: userIp, deviceType: userDevice, message: 'Student_id not found'});
    }
});

//POST /to retrieve student's info who has taken CS548 -> the result should be all students ( return student-id only)
students.post('/course', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userDevice = req.headers['User-agent'];
    const {course_id} = req.body;

    const result_students_id = data.filter(student => student.courses.some(c => c.course_id === course_id)).map(student => student.student_id);

    if (result_students_id.length == 0) {
        return res.status(404).json({IP: userIp, deviceType: userDevice, message: 'No result'});
    }         
    
    res.json({IP: userIp, deviceType: userDevice, result:result_students_id});

});

//POST /to retrieve who has taken the courses you have taken except CS548.
students.post('/coursesWithoutCS548', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userDevice = req.headers['User-agent'];
    const {student_id} = req.body;

    if (!student_id) {
        return res.status(400).json({IP: userIp, deviceType: userDevice, message: 'Need a student id as example'});
    }

    const student = data.find(c => c["student_id"] === student_id);

    if (!student) {
        return res.status(404).json({IP: userIp, deviceType: userDevice, message: 'Student not found'});
    }

    courses_ids = student.courses.filter(c => c.course_id !== "CS548")
    .map(c => c.course_id);

    const result = data.filter(student => {return student.student_id != student_id && student.courses.some(course => courses_ids.includes(course.course_id))});


    if (result.length === 0) {
        return res.status(404).json({IP: userIp, deviceType: userDevice, message: 'No result'});
    }
    
    res.json({IP: userIp, deviceType: userDevice, result: result});
});



module.exports = students;