const express = require('express');
const router = express.Router();
const { createCategory,
    getCategories,
    updateCategory,
    deleteCategory
 } = require('../controller/cartegoryController');


router.post('/category',createCategory);
router.get('/categories',getCategories);
router.put('/category/:id',updateCategory);
router.delete('/category/:id',deleteCategory);

module.exports = router;