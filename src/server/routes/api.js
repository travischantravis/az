const express = require("express");
const axios = require('axios');
const router = express.Router();
require('dotenv').config()

// TODO put in .env
const baseUrl = "https://zendeskcodingchallenge5252.zendesk.com"
const pageSize = 25

// const header = {"Authorization": "Basicx " + process.env.BASIC}
const header = {"Authorization": "Basic " + process.env.BASIC}

router.get("/tickets", async function(req, res, next) {
  console.log('get "tickets" route hit');
  try{
  
    const tickets = await axios.get(`${baseUrl}/api/v2/tickets.json?page[size]=${pageSize}`, {
      headers: header
    });

    const count = await axios.get(`${baseUrl}/api/v2/tickets/count.json`, {
      headers: header
    });

    res.send({"tickets":tickets.data, "count": count.data, "error": null})
  }catch(err){
    res.send({"error": err})
  }
});

router.get("/tickets/prev", async function(req, res, next) {
  const before = req.query.before;
  const beforeTrimmed = before.substring(0, before.indexOf('='));
  console.log('get "tickets prev" route hit');
  const tickets = await axios.get(`${baseUrl}/api/v2/tickets.json?page[size]=${pageSize}&page[before]=${beforeTrimmed}`, {
    headers: header
  });
  
  res.send({"tickets":tickets.data})
});


router.get("/tickets/next", async function(req, res, next) {
  const after = req.query.after;
  const afterTrimmed = after.substring(0, after.indexOf('='));
  console.log('get "tickets next" route hit');
  const tickets = await axios.get(`${baseUrl}/api/v2/tickets.json?page[size]=${pageSize}&page[after]=${afterTrimmed}`, {
    headers: header
  });

  res.send({"tickets":tickets.data})
});


// TODO use side loading
router.get("/ticket", async function(req, res, next) {
  const ticketID = req.query.id;
  console.log('get "ticket" route hit', ticketID);

  const ticket = await axios.get(`${baseUrl}/api/v2/tickets/${ticketID}`, {
    headers: header
  });

  const requesterID = await ticket.data.ticket.requester_id
  const requester = await axios.get(`${baseUrl}/api/v2/users/${requesterID}`, {
    headers: header
  });
  
  res.send({"ticket": ticket.data, "requester": requester.data})
});


module.exports = router;
