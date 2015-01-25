var map = L.map('map').setView([45, -93.2], 11);

		L.control.locate({
                      strings: {
                                 title: "Zoom to your current location"
                               }
               ,locateOptions: {
                                 maxZoom: 16
                               }
                     }).addTo(map);

var baselayer = new L.StamenTileLayer("toner-lite");
baselayer.addTo(map);

var beerIcon = L.Icon.extend({
	                             options: {
		                                 	iconUrl: 'js/images/beer-24.png',
			                                iconRetinaUrl: 'js/images/beer-24@2x.png',
			                                iconSize: [24, 24],
		                                	iconAnchor: [12, 12],
	                                		popupAnchor: [0, -12]}
	                          	});

var beerPin = L.MakiMarkers.icon({
    icon: "beer",
    color: "#23344c",
    size: "m"
});

var tapLayer = new L.GeoJSON.AJAX("js/things.geojson",{
		    pointToLayer: function (feature, latlng) {
		    	
				 var html = '';
               if (feature.properties.web) {
                      html += '<h3><a href="'+ feature.properties.web + '">' + feature.properties.title + '</a></h3>';
                                           } 
               else {
                      html += '<h3>' + feature.properties.title + '</h3>';
                    }
               if (feature.properties.address) {
                      html += '<p>'+ feature.properties.address + '</p>';
                                               }
      html += '<div class="put"></div>';
      var popup = new L.popup({closeButton:false}).setContent(html);

      var marker = new L.marker(latlng);
      marker.setIcon(beerPin);          
		  marker.bindPopup(popup);
	   
		  return marker;		        
		    }
		});

tapLayer.addTo(map);

