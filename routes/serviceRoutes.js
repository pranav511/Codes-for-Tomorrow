const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const { createService,
    getServices,
    deleteServices,
    updateService
 } = require('../controller/serviceController');


router.post('/category/:categoryId',auth,createService);
router.get('/category/:categoryId',auth,getServices);
router.delete('/category/:categoryId/service/:serviceId',auth,deleteServices);
router.put('/category/:categoryId/service/:serviceId',auth,updateService);

module.exports = router;