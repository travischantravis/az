const express = require("express");
const axios = require('axios');
const router = express.Router();

// TODO put in .env
const apiKey = "GDO7eRT4ffc1yBWc9UPwVW3Lk2asQrerndUPUI9v"
const basic64 = "Basic Y2hhbmNoZXVreWluNDQ2M0BnbWFpbC5jb20vdG9rZW46R0RPN2VSVDRmZmMxeUJXYzlVUHdWVzNMazJhc1FyZXJuZFVQVUk5dg"

/* GET users testing. */
router.get("/users", function(req, res, next) {
  console.log('get "users" route hit');
  res.send({ users: ["joe", "bernie", "tulsi", "donald", "bill"] });
});

router.get("/tickets", async function(req, res, next) {
  console.log('get "tickets" route hit');
  const resZendesk = await axios.get('https://zendeskcodingchallenge5252.zendesk.com/api/v2/tickets.json', {
  headers: {
    'Authorization': basic64
  }
});
  res.send(resZendesk.data)
  // res.send({ users: ["joe", "bernie", "tulsi", "donald", "bill"] });
});


module.exports = router;
