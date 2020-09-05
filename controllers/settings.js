'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const memberStore = require('../models/member-store');

const settings = {
  index(request, response) {
    logger.info('settings rendering');
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: 'Settings',
      member: memberStore.getMemberById(loggedInMember.id),
    };
    response.render('settings', viewData);
  },

  updateSettings(request, response)
  {
    const loggedInMember = accounts.getCurrentMember(request);
    const member = request.body;
    
    loggedInMember.name = member.name,
    loggedInMember.gender = member.gender,
    loggedInMember.email = member.email,
    loggedInMember.password = member.password,
    loggedInMember.address = member.address,
    loggedInMember.height = member.height,
    loggedInMember.startweight = member.startweight,

    memberStore.store.save();

    logger.info(`updating ${member.name} ${member.email}`);
    response.redirect("/dashboard");
  }
};

module.exports = settings;