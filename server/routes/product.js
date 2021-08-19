const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

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

router.post('/', auth, (req, res) => {
  // 클라이언트 정보를 DB에 저장한다.
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });

    return res.status(200).json({ success: true });
  });
});

router.post('/getproducts', auth, (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 30;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  console.log('findArgs', findArgs);

  // product collection의 모든 상품정보를 가져오기
  Product.find(findArgs)
    .populate('writer')
    .skip(skip)
    .limit(limit)
    .exec((err, productsInfo) => {
      if (err) return res.status(400).json({ success: false, err });

      return res
        .status(200)
        .json({ success: true, productsInfo, postLength: productsInfo.length });
    });
});

module.exports = router;
