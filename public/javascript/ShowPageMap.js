mapboxgl.accessToken=mapboxtoken;
const map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/dark-v10', // style URL
center: campgrounds.geometry.coordinates, // starting position [lng, lat]
zoom: 12 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campgrounds.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
        .setHTML(
            `<h6>${campgrounds.title}</h6>
            <p>${campgrounds.location}</p>`
        )
    )
    .addTo(map)
