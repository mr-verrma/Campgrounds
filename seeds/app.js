// const mongoose = require('mongoose');
// const cities =require('./cities')
// const Campground =require('../models/campground');


// mongoose.connect('mongodb://localhost:27017/campData',{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true
// });
// const db= mongoose.connection;
// db.on('error',console.error.bind(console,"Connection error"));
// db.once('open',()=>{
//     console.log('Database Connected')
// });

// const seed= async()=>{
//     await Campground.deleteMany({});
//     const camp = new Campground({
//         author:'601b8edd0045704b4045fc19',
//         title:'Manali',
//         images: [{
//             url:'https://www.wetravel.com/blog/wp-content/uploads/2017/06/Group-Around-Fire-Travel-700x466.jpg',
//             filename:'xyz'
//         },
//     {
//         url:'https://www.wetravel.com/blog/wp-content/uploads/2017/07/Group-Travel-700x465.jpg',
//         filename:'abc'
//     }],
//         price: '52',
//         // geometry:{
//         //     type:"Point",
//         //     coordinates:[cities.longitude,
//         //     cities.latitude]
//         // },
//         geometry: {
//             type: "Point",
//             coordinates: [
//                 cities.longitude,
//                 cities.latitude,
//             ]
//         },
//         description: 'zyxz',
//         location: `${cities.city}, ${cities.state}`
//     })
//     await camp.save();
// }


// seed().then(() => {
//     mongoose.connection.close();
// })
const mongoose = require('mongoose');
const cities = require('./cities');
// const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 1; i++) {
        // const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '601f8d9797855d344ca2d540',
            location: `${cities[i].city}, ${cities[i].state}`,
            title:'Manali',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[i].longitude,
                    cities[i].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/mrverrma/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
                {
                    url: 'https://res.cloudinary.com/mrverrma/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})