const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utilis/catchAsync');

const {validReview,isloggedIn,isReviewAuthor} = require('../middleware');
const reviewController= require('../controller/reviews');

router.post('/',isloggedIn,validReview,catchAsync(reviewController.reviewPost));
router.delete('/:reviewId',isloggedIn,isReviewAuthor,catchAsync(reviewController.reviewDelete))


module.exports =router;