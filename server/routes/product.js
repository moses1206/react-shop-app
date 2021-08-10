const express = require('express');
const router = express.Router();
const multer = require('multer');
// const { Product } = require('../models/Product');

const { auth } = require('../middleware/auth');

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
  // 어디에 파일이 저장되는지
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single('file');

router.post('/image', auth, (req, res) => {
  //  가져온 이미지를 저장
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
