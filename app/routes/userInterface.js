const express = require('express');
const router = express.Router();
const model = require('../models/dbmodels');

router.get('/calendar', async function(req, res, next) {
    res.render('userInterface/calendar');
});

router.get('/getCalendar', async function(req, res, next){
    const courses = await model.getAllCourses();
    const assignments = await model.getAllAssignments();
    res.send(jobs);
});