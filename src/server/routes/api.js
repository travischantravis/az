const express = require("express");
const axios = require('axios');
const router = express.Router();

// TODO put in .env
const apiKey = "GDO7eRT4ffc1yBWc9UPwVW3Lk2asQrerndUPUI9v"
const basic64 = "Basic Y2hhbmNoZXVreWluNDQ2M0BnbWFpbC5jb20vdG9rZW46R0RPN2VSVDRmZmMxeUJXYzlVUHdWVzNMazJhc1FyZXJuZFVQVUk5dg"
const baseUrl = "https://zendeskcodingchallenge5252.zendesk.com"


router.get("/tickets", async function(req, res, next) {
  console.log('get "tickets" route hit');
  const tickets = await axios.get(`${baseUrl}/api/v2/tickets.json?page[size]=25`, {
    headers: {
      'Authorization': basic64
    }
  });

  const count = await axios.get(`${baseUrl}/api/v2/tickets/count.json`, {
    headers: {
      'Authorization': basic64
    }
  });

  res.send({"tickets":tickets.data, "count": count.data})
});

// TODO use side loading
router.get("/ticket", async function(req, res, next) {
  const ticketID = req.query.id;
  console.log('get "ticket" route hit', ticketID);

  const ticket = await axios.get(`${baseUrl}/api/v2/tickets/${ticketID}`, {
    headers: {
      'Authorization': basic64
    }
  });

  const requesterID = await ticket.data.ticket.requester_id
  const requester = await axios.get(`${baseUrl}/api/v2/users/${requesterID}`, {
    headers: {
      'Authorization': basic64
    }
  });
  
  res.send({"ticket": ticket.data, "requester": requester.data})
});


module.exports = router;
