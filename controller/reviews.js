const  Review = require('../models/reviews');
const Campground = require('../models/campground');


module.exports.reviewPost =async(req,res,next)=>{  
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Added a new Review !');
    res.redirect(`/campgrounds/${campground._id}`);
}
module.exports.reviewDelete =async(req,res,next)=>{
    const {id,reviewId} = req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}
