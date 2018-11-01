const express = require('express');
const path = require('path');

const router = express.Router();

/* GET map page. */
router.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/map.html`));
});

module.exports = router;
