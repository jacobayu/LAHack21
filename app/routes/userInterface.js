const express = require('express');
const router = express.Router();
const model = require('../models/dbmodels');

router.get('/calendar', async function(req, res, next) {
    res.render('userInterface/calendar');
});

router.get('/getCalendar', async function(req, res, next){
    const assignments = await model.getAllAssignments();
    res.send(assignments);
});

module.exports = router;

