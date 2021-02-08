
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });


const { cloudinary } = require('../cloudinary');
const Campground = require('../models/campground');
// const { cloudinary } = require("../cloudinary");

module.exports.index = async(req,res,next)=>{
    const campground = await Campground.find({});
    res.render('campground/index',{campground})
}

module.exports.new =async(req,res,next)=>{
    res.render('campground/new')
}


module.exports.Form=async(req,res,next)=>{
    const geoData = await geocoder.forwardGeocode({
        query:req.body.campground.location,
        limit: 1
    })
    .send()
    const campground = new Campground(req.body.campground);
    campground.geometry=geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    req.flash('success','Successfully made a new Campground');
    res.redirect(`/campgrounds`)
}


module.exports.campId=async(req,res,next)=>{
    const{id} = req.params;
    const campground = await Campground.findById(id)
            .populate({
                path:'reviews',
                populate:{
                    path:'author'
                }
            }).populate('author');
    if(!campground){
        req.flash('error','Cannot find the campground');
        return res.redirect('/campground')
    }
    res.render('campground/show',{campground})
}
module.exports.campIdEdit = async(req,res,next)=>{
    const{id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error','Cannot find the campground');
        return res.redirect('/campground')
    }
    res.render('campground/edit',{campground})
}
module.exports.editFrom = async(req,res,next)=>{
    const { id } = req.params;
    console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}
module.exports.delFrom = async(req,res,next)=>{
    const{id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
}