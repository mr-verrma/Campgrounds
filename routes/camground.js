const express = require('express');
const router = express.Router();
const catchAsync = require('../utilis/catchAsync');
const multer = require('multer');
const {storage} = require('../cloudinary')
const upload = multer({storage});

const campController = require('../controller/campground')
const {isloggedIn,validCampground,isAuthor} = require('../middleware');


router.get('/',catchAsync(campController.index));
router.get('/new',isloggedIn,catchAsync(campController.new));
router.post('/',isloggedIn,upload.array('image'),validCampground,catchAsync(campController.Form))
router.get('/:id',catchAsync(campController.campId));
router.get('/:id/edit',isloggedIn,isAuthor,catchAsync(campController.campIdEdit))
router.put('/:id',isloggedIn,isAuthor,upload.array('image'),validCampground,catchAsync(campController.editFrom))
router.delete('/:id',isloggedIn,catchAsync(campController.delFrom));

module.exports =router;