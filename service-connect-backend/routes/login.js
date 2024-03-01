var express = require('express');
var {client} = require('../mongoclient');
var router = express.Router();

/* GET users listing. */
router.post('/auth/spSignIn', function(req, res, next) {
    //await client.db("users");
    const email = req.body.email;
    const password = req.body.password;
  res.send('respond with a resource');
});

module.exports = router;
