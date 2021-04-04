x = navigator.geolocation;

x.getCurrentPosition(success, failure);

function success(position){

    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    var coords = new google.maps.LatLng(myLat, myLong);

    var mapOptions = {

        zoom:9,
        center: coords,
        mapTypeId: google.maps.MapTypeId.ROADMAP

    }

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({map:map, position:coords});

    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Atualizar localização atual";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent("Estás aqui!");
            infoWindow.open(map);
            map.setCenter(pos);
            var marker1 = new google.maps.Marker({map:map, position:pos});
            },
            () => {
                swal({
                    icon: 'images/v237_21.png',
                    title: 'Erro',
                    text: 'Ativa a tua localização',
                    button: 'OK',
                    className: "swalAlert"
                    
                });
            }
        );
        } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function failure(){

    swal({
        icon: 'images/v237_21.png',
        title: 'Erro',
        text: 'Ativa a tua localização',
        button: 'OK',
        className: "swalAlert"
        
    }).then(function(isConfirm) {
        location.reload();
    });

    

};


