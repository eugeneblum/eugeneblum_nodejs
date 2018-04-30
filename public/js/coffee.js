
(function () {
    var latitude;
    var longitude;    
    $(document)
        .ready(function() {
        
    var searchField = $('#magicSearch');
    var icon = $('#search-btn');

    // Focus Event Handler
    $(searchField).on('focus', function() {
        $(this).animate({
            width: '100%'
        }, 400);
        $(icon).animate({
           right: '6px' 
        }, 400);
    });

    //BLur Event Handler
    $(searchField).on('blur', function () {
        if (searchField.val() === '') {
            $(searchField).animate({
                width: '60%'
            }, 400, function () { });
            $(icon).animate({
                right: '230px'
            }, 400, function () { });
        }
    });

    $('#search-form').submit(function(e) {
        e.preventDefault();
    });    

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
            } else {
                alert("Sorry, this browser doesn't support geolocation");
            }

            $("#location").text("ready");

            function successCallback(position){
                console.log(position);
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                displayLocation(latitude,longitude);                
              };

            function displayLocation(latitude,longitude){
                var request = new XMLHttpRequest();

                var method = 'GET';
                var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude;
                var async = true;

                request.open(method, url, async);
                request.onreadystatechange = function(){
                  if(request.readyState == 4 && request.status == 200){
                    var data = JSON.parse(request.responseText);
                    console.log(data);
                    //var city = data.results[1].address_components[1].long_name;
                    var address = data.results[0].formatted_address;
                if(address)
                    $("#location").text(address);
                else if (latitude && longitude)
                    $("#location").text("Your latitude: " + latitude + " | Your longitude: " + longitude);
                else
                    $("#location").text('Unable to retrieve your address');                    
                  }
                };
                request.send();
              };

            function errorCallback(){
                $("#location").text('An error occured. Try to enable location on your device or switch to another browser.');
              };            
            
            var options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
              };             

            $("#tblResultList")
                .on("click",
                    "img",
                    function() {
                        var id = $(this).data("id");
                        var url = "https://okyelpapi.azurewebsites.net/api/YelpCoffee/" + id;
                        var promise = $.ajax({
                            url: url,
                            dataType: "json"
                        });
                        promise.done(function(data) {
                            var business = JSON.parse(data);
                            var weblink = business.name;
                            $("#title").text(business.name);                            
                            $('#picture').attr('src', business.image_url);
                            $('#rating').attr('src', business.rating_img_url_large);
                            $("#phone").text(business.display_phone);
                            $("#review").text(business.snippet_text);
                            $("#categories").text(business.categories);
                            $("#website").html(weblink.link(business.url));
                            $('#website a').attr('target', '_blank');

                            $("#details").modal('show');                            
                        });
                    });

            $("#search")
                .on("click",
                    function() {
                        var url = "https://okyelpapi.azurewebsites.net/api/YelpCoffee/?sort_by=distance";
                        var coffeePromise = $.ajax({
                            url: url,
                            //The data to send (will be converted to a query string)
                            data: {
                                page: 1,                               
                                lat: latitude,
                                lon: longitude,                                                     
                                open_now: true
                            },
                            type: "GET", //Whether this is a POST or GET request
                            dataType: "json" // The type of data we expect back                            
                        });
                        coffeePromise.done(afterSearchCoffee);
                        coffeePromise.fail(function(error) {
                                console.log(error);
                            }
                        );
                        $(this).hide();
                        $('.btn-info').removeClass('hidden');
                    });

                $('.btn-info').on('click', function() {                    
                    opener.window.focus();
                    close();                    
                });

            
            $('#search-form').on('submit', function(e){
                   
                     var parameters = { term: $('#magicSearch').val(), 
                                        latitude: latitude,
                                        longitude: longitude,
                                        open_now: true,
                                        sort_by: 'distance'
                                    };
                       $.get( '/searching', parameters, function(data) {
                        data = JSON.parse(data);
                        afterSearch(data);
                     });
                    
                });
                

                function afterSearch(data) {
                var myTable = $('#tblResultList tbody');
                myTable.empty();
                for (var i = 0; i < data.total; i++) {
                    var business = data.businesses[i];
                    var row = $("<tr></tr>");
                    var image = $('<img/>').attr({
                        'src': business.image_url,
                        onMouseOver: "this.style.cursor='pointer'", 
                        width: "150"
                        }).addClass('thumbnail').data('id', business.id);
                    var td = $("<td/>").append(image);
                    row.append(td);
                    row.append($("<td/>").append($('<span/>').text(business.name).addClass('badge')));

                    var address = business.location.display_address;
                    row.append($("<td/>").html("<a href='https://www.google.com/maps/place/" + address + "' target='_blank'>" + address + "</a>"));
                                   
                    row.append($("<td/>").append($('<span/>').text(Math.round(business.distance/1000*0.621371) + ' mi').addClass('badge')));
                    row.append($("<td/>").append($('<span/>').text(business.rating).addClass('badge')));
                    row.append($("<td/>").append($('<span/>').text(business.review_count).addClass('badge')));
                    $('#tblResultList').removeClass('hidden');                    
                    myTable.append(row);

                    $("th,td").addClass('text-center');                   

                    $("#alert").html("Click an image for more information...<br>If you're on a phone, scroll the table left and right...");

                    $('#tblResultList th').addClass('bg-primary');
                    $('#tblResultList tr:even:not(th)').addClass('bg-warning');
                    $('#tblResultList tr:odd').addClass('bg-success'); 
                    $('#tblResultList tr:not(th)').parents('table').addClass('table-hover');                   
                    $('table').stickyTableHeaders();
                    var name = "";                    
                } 

            }            

            function afterSearchCoffee(data) {
                var myTable = $('#tblResultList tbody');
                myTable.empty();
                for (var i = 0; i < data.businesses.length; i++) {
                    var business = data.businesses[i];
                    var row = $("<tr></tr>");
                    var image = $('<img/>').attr({'src': business.image_url, onMouseOver: "this.style.cursor='pointer'"}).data('id', business.id);
                    var td = $("<td/>").append(image);
                    row.append(td);
                    row.append($("<td/>").append($('<span/>').text(business.name).addClass('badge')));

                    var address = business.location.display_address;
                    row.append($("<td/>").html("<a href='https://www.google.com/maps/place/" + address + "' target='_blank'>" + address + "</a>"));
                                   
                    row.append($("<td/>").append($('<span/>').text(Math.round(business.distance/1000*0.621371) + ' mi').addClass('badge')));
                    row.append($("<td/>").append($('<span/>').text(business.rating).addClass('badge')));
                    row.append($("<td/>").append($('<span/>').text(business.review_count).addClass('badge')));
                    $('#tblResultList').removeClass('hidden');                    
                    myTable.append(row);

                    $("th,td").addClass('text-center');                   

                    $("#alert").html("Click an image for more information...<br>If you're on a phone, scroll the table left and right...");

                    $('#tblResultList th').addClass('bg-primary');
                    $('#tblResultList tr:even:not(th)').addClass('bg-warning');
                    $('#tblResultList tr:odd').addClass('bg-success'); 
                    $('#tblResultList tr:not(th)').parents('table').addClass('table-hover');                   
                    $('table').stickyTableHeaders();
                    var name = "";                    
                } 

            }            
            

            $('#tblResultList').on('click', 'td', function (event)
            	{
            		$('.bg-danger').removeClass();
            		$(this).parents('tr').removeClass();
            		$(this).parents('tr').addClass('bg-danger');            		
            	});            
        });
}());