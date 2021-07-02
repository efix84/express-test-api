var express = require('express');
var router = express.Router();
var request = require('request');
var { insertItem, getItems, deleteItem, updateItem } = require('../modules/mongodb');

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});

router.get('/api',async function(req, res, next) {
  const customers = await getItems()
  res.json(customers)
});

router.post('/input',async function(req, res, next) {
  await insertItem(req.body)
  res.json({success: true})
});

router.delete('/delete/:id', async function (req, res) {
  console.log(req.params.id)
  const deleted = await deleteItem(req.params.id)
  res.json({deleted})
});

router.post('/item/:id',async function(req, res, next) {
  const id  = req.params.id
  const {name, geburtsort, alter} = req.body
  if(id.length === '60ddea05b4b2912053b53955'.length){
    const updated = await updateItem(id, {name, geburtsort, alter})
    console.log('updated')
    res.json({success: true, updated})
  } else {
    res.status(500).json({success: false})
  }
});




module.exports = router;
