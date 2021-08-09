const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');

const { auth } = require('../middleware/auth');

//=================================
//             Product
//=================================

router.post('/image', auth, (req, res) => {
  //  가져온 이미지를 저장
});

module.exports = router;
