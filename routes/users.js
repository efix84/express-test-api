var express = require('express');
var router = express.Router();
var { insertUser, checkUser } = require('../modules/mongo-user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/input',async function(req, res, next) {
  await insertUser(req.body)
  res.json({success: true})
});

router.post('/checkuser',async function(req, res, next) {
  const {email, password} = req.body

  try {
    res.json(await checkUser(email, password))
  } catch(error){
    console.error(error.message)
    res.status(403).json({success: false, message: error.message})
  }
});

module.exports = router;
