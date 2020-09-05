"use strict";
const uuid = require('uuid');
const logger = require('../utils/logger');

const accounts = require ('./accounts.js');
const assessmentStore = require('../models/assessment-store.js');
const memberStore = require('../models/member-store');
const goalStore = require('../models/goal-store.js');



const dashboard = {
  index: function(request, response) {
    logger.info("Member dashboard rendering");
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: "Member Dashboard",
      assessments: assessmentStore.getMemberAssessments(loggedInMember.id),
      member: memberStore.getMemberById(loggedInMember.id),
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("dashboard", viewData);
  },

  deleteAssessment(request,response) {
    const id = request.params.id;
    logger.debug('Deleting assessment ${id}');
    assessmentStore.removeAssessment(id);
    response.redirect('/dashboard');
  },

  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);

    const newAssessment = {
      id: uuid.v1(),
      memberid: loggedInMember.id,
      date: new Date().toUTCString(),
      weigth: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,

    };

    logger.debug('Creating a new Assessment', newAssessment);
    assessmentStore.addAssessment(newAssessment);
    response.redirect('/dashboard');
  },

  addGoal(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const newGoal = {
      id: uuid.v1(),
      memberid: loggedInMember.id,
      date: new Date().toUTCString(),
      measurement: request.body.measurement,
      weigth: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,
    };

    logger.debug('Creating a new Goal', newGoal);
    goalStore.addGoal(newGoal);
    response.redirect('/dashboard');
  },

};

module.exports = dashboard;
