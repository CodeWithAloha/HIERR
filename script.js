// This is uuidv4 function is for generating decently random ids, sufficient for the uses of identitification in a polis conversation

// This uuid function is from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid 👀
function uuidv4() {
	// It depends on the crypto API, which is supported by 97.4% of browsers
	if (window.crypto) {
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
			(
				c ^
				(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
			).toString(16)
		)
		// fallback which uses timestamp and ms since browser opened to come up with a uuid
	} else {
		var d = new Date().getTime() //Timestamp
		var d2 = (performance && performance.now && performance.now() * 1000) || 0 //Time in microseconds since page-load or 0 if unsupported
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
			/[xy]/g,
			function (c) {
				var r = Math.random() * 16 //random number between 0 and 16
				if (d > 0) {
					//Use timestamp until depleted
					r = (d + r) % 16 | 0
					d = Math.floor(d / 16)
				} else {
					//Use microseconds since page-load if supported
					r = (d2 + r) % 16 | 0
					d2 = Math.floor(d2 / 16)
				}
				return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
			}
		)
	}
}

// a function for dynamically building a polis container div based on the random uuid

function buildEmbedDiv(xid) {
	return (
		"<div class='polis' data-conversation_id='5szsz2uxay' data-xid='" +
		xid +
		"'></div>"
	)
}

// check to see if there is already a polisUserXID in localStorage, and assign one if there isn't

if (localStorage.polisUserXID) {
	console.log('Existing polisUserXID found:', localStorage.polisUserXID)
} else {
	var userXID = uuidv4()
	console.log('Assigning new polisUserXID:', userXID)
	localStorage.polisUserXID = userXID
}

// create the embed script tag which will trigger the embedding

var embedScript = document.createElement('script')
embedScript.setAttribute('src', 'https://pol.is/embed.js')

// Attach the embed div based on localStorage.polisUserXID, and execute embed script by embedding it in the page

var polisContainer = document.getElementById('polis-container')
polisContainer.innerHTML = buildEmbedDiv(localStorage.polisUserXID)
polisContainer.appendChild(embedScript)

//!!------ Leaflet map ------!!//

// create the map & set the default location the map will load to
var map = L.map('map').setView([21.4862, -157.9916], 10)

// add OSM basemap with attributionq
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

// fetch the GIS data (can be local file or remote URL) 
async function addCensusTracts() {
	const response = await fetch('/census-tracts_min.geojson')
	const data = await response.json()

	// create a layer from the response 
	L.geoJson(data, {
		style: function (feature) {
			// conditionally color each tract based on the ['pop20'] t (population 2020)
			// more info Census Blocks ['pop20'] here: http://proximityone.com/geo_blocks.html

			// TODO: add more conditions
			var color
			if (feature.properties['pop20'] <= 2500) {
				color = '#bd93f9'
			} else if (feature.properties['pop20'] < 5000 && feature.properties['pop20'] > 2500) {
				color = '#ffb86c'
			} else if (feature.properties['pop20'] < 10000 && feature.properties['pop20'] > 5000) {
				color = '#8be9fd'
			}
			//
			return {
				fillColor: color,
				color: '#44475a',
				weight: 0.5,
				opacity: 1,
				fillOpacity: 0.5,
			}
		},

		// change opacity on mouse in and out
		onEachFeature: function (feature, layer) {
			layer.on({
					mouseover: function (e) {
							var layer = e.target;
							layer.setStyle({
									fillOpacity: 0.8,
							});
					},
					mouseout: function (e) {
							var layer = e.target;var layer = e.target;
							layer.setStyle({
									fillOpacity: 0.5,
							});
					},
			});
		}
	}).addTo(map)
}

addCensusTracts()


// popup on click that shows lat/long
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick)
