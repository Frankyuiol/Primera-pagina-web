/* ---------- Apliación de la API de maps ---------- */
// Función para mostrar el cuadro de diálogo y solicitar el consentimiento del usuario
function requestLocationPermission() {
  var consent = confirm("Este sitio web desea acceder a tu ubicación. ¿Deseas permitir el acceso?");

  if (consent) {
    // El usuario dio su consentimiento, obtener la ubicación
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showMap, handleError);
    } else {
      alert("La geolocalización no es compatible en este navegador.");

    }
  } else {
    // El usuario negó el consentimiento, mostrar mapa predeterminado sin la ubicación
    var mymap = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(mymap);
  }
}

// Función para mostrar el mapa con la ubicación del usuario
function showMap(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // Crear un mapa en el elemento div con id "map"
  var mymap = L.map('map').setView([latitude, longitude], 15)

  // Agregar una capa de mosaico de OpenStreetMap al mapa
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(mymap);

  // Agregar un círculo en la ubicación del usuario con un radio de 15 metros
  var circle = L.circle([latitude, longitude], {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.5,
    radius: 5000 // Radio en metros
  }).addTo(mymap);
  //Lista que contienen información de las escuelas
  var schools = [
    { name: "Escuela 1", lat: -34.833152, lng: -58.473748, note: "EES N°11" },
    { name: "Escuela 2", lat: -34.847763, lng: -58.464955, note: "EES N°24" },
    { name: "Escuela 3", lat: -34.814256, lng: -58.458431, note: "EES N°1" },
    { name: "Escuela 4", lat: -34.818852, lng: -58.472117, note: "EES N°18" },
    { name: "Escuela 5", lat: -34.811463, lng: -58.429958, note: "EES N°51" },
    { name: "Escuela 6", lat: -34.840413, lng: -58.464453, note: "EEST N°1" },
    { name: "Escuela 7", lat: 34.786553, lng: -58.421813, note: "EES N°52" },
    { name: "Escuela 8", lat: -34.844724, lng: -58.473382, note: "EES N°22" },
    { name: "Escuela 9", lat: -34.845004, lng: -58.502918, note: "EES N°41" },
    { name: "Escuela 10", lat: -34.838828, lng: -58.407346, note: "EES N°42" },
    { name: "Escuela 11", lat: -34.711613, lng: -58.383370, note: "EES N°3" }
  ];

  // Agregar un marcador en la ubicación del usuario con su nombre al hacer clic
  var userMarker = L.marker([latitude, longitude]).addTo(mymap);
  userMarker.bindPopup("Tu ubicación").on('click', function (e) {
    this.openPopup();
  });

  // Agregar puntos que representen escuelas dentro del radio de 5000 metros con notas al hacer clic
  for (var i = 0; i < schools.length; i++) {
    var school = schools[i];
    var schoolLocation = L.latLng(school.lat, school.lng);
    var userLocation = L.latLng(latitude, longitude);
    var distance = userLocation.distanceTo(schoolLocation); // Calcular la distancia

    // Si la distancia es menor o igual a 5000 metros, agrega un marcador con una nota
    if (distance <= 5000) {
      var schoolMarker = L.marker(schoolLocation).addTo(mymap);
      schoolMarker.bindPopup(school.note).on('click', function (e) {
        this.openPopup();
      });
    }
  }
}

// Función para manejar errores
function handleError(error) {
  // Mostrar un mensaje de error en el mapa
  var errorMessage = "No se pudo obtener la ubicación del usuario.";
  if (error.code === 1) {
    errorMessage = "El usuario ha denegado el acceso a la ubicación.";
  }
  alert(errorMessage);

  // Mostrar un mapa predeterminado sin la ubicación del usuario
  var mymap = L.map('map').setView([0, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(mymap);
}

// Solicitar consentimiento del usuario
requestLocationPermission();