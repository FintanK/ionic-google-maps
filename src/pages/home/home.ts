import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  iconBase: string;
  icons: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

    this.iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    this.icons = {
      parking: {
        name: 'Happy Hour',
        icon: 'https://cdn2.iconfinder.com/data/icons/food-warriors/100/beer-48.png'
      },
      library: {
        name: 'Library',
        icon: this.iconBase + 'library_maps.png'
      },
      info: {
        name: 'Info',
        icon: this.iconBase + 'info-i_maps.png'
      }
    };

  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
              {
                "color": "#ff7000"
              },
              {
                "lightness": "69"
              },
              {
                "saturation": "100"
              },
              {
                "weight": "1.17"
              },
              {
                "gamma": "2.04"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#cb8536"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
              {
                "color": "#ffb471"
              },
              {
                "lightness": "66"
              },
              {
                "saturation": "100"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "gamma": 0.01
              },
              {
                "lightness": 20
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "saturation": -31
              },
              {
                "lightness": -33
              },
              {
                "weight": 2
              },
              {
                "gamma": 0.8
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "lightness": "-8"
              },
              {
                "gamma": "0.98"
              },
              {
                "weight": "2.45"
              },
              {
                "saturation": "26"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              {
                "lightness": 30
              },
              {
                "saturation": 30
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "saturation": 20
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "lightness": 20
              },
              {
                "saturation": -20
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "lightness": 10
              },
              {
                "saturation": -30
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "saturation": 25
              },
              {
                "lightness": 25
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                "lightness": -20
              },
              {
                "color": "#ecc080"
              }
            ]
          }
        ]
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let legend = document.getElementById('legend');
      for (let key in this.icons) {
        let type = this.icons[key];
        let name = type.name;
        let icon = type.icon;
        let div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '"> ' + name;
        legend.appendChild(div);
      }

      this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

    }, (err) => {
      console.log(err);
    });

  }

  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      icon: 'https://cdn2.iconfinder.com/data/icons/food-warriors/100/beer-48.png',
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4><p>Moes Tavern</p><p>Average Rating: 4/5</p>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}
