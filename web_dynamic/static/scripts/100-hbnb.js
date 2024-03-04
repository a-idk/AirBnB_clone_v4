$(document).ready(function () {
  const api = 'http://' + window.location.hostname;
  const $apiStatus = $('#api_status');
  const $placesSection = $('SECTION.places');
  const $locations = $('.locations');
  const $amenities = $('.amenities');

  // Function to update locations based on checkboxes
  function locationUpdate () {
    const states = {};
    const cities = {};
    $locations.find('input[type="checkbox"]').each(function () {
      const locationType = $(this).closest('ul').prev().find('input').data('id');
      const location = locationType === 'state' ? states : cities;
      if ($(this).is(':checked')) {
        location[$(this).data('id')] = $(this).data('name');
      } else {
        delete location[$(this).data('id')];
      }
    });
    const locations = Object.assign({}, states, cities);
    const locationsText = Object.values(locations).join(', ');
    $locations.find('h4').html(locationsText || '&nbsp;');
  }

  // Event handler for location checkboxes
  $locations.find('input[type="checkbox"]').change(locationUpdate);

  // Event handler for amenity checkboxes
  $amenities.find('input[type="checkbox"]').change(function () {
    const amenities = {};
    $(this).is(':checked') ? amenities[$(this).data('id')] = $(this).data('name') : delete amenities[$(this).data('id')];
    const amenitiesText = Object.values(amenities).join(', ');
    $amenities.find('h4').html(amenitiesText || '&nbsp;');
  });

  // Event handler for when search button is clicked
  $('BUTTON').click(function () {
    const states = $locations.find('input[data-id="state"]:checked').map(function () { return $(this).data('id'); }).get();
    const cities = $locations.find('input[data-id="city"]:checked').map(function () { return $(this).data('id'); }).get();
    const amenities = $amenities.find('input[type="checkbox"]:checked').map(function () { return $(this).data('id'); }).get();

    // Send AJAX request
    $.ajax({
      url: `${api}:5001/api/v1/places_search/`,
      type: 'POST',
      data: JSON.stringify({ states, cities, amenities }),
      contentType: 'application/json',
      dataType: 'json',
      success: displayPlaces
    });
  });

  // Function to append places to the section
  function displayPlaces (data) {
    $placesSection.empty();
    $placesSection.append(data.map(place => {
      return `<article>
                <div class="title">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">
                    <i class="fa fa-users fa-3x" aria-hidden="true"></i><br>
                    ${place.max_guest} Guests
                  </div>
                  <div class="number_rooms">
                    <i class="fa fa-bed fa-3x" aria-hidden="true"></i><br>
                    ${place.number_rooms} Bedrooms
                  </div>
                  <div class="number_bathrooms">
                    <i class="fa fa-bath fa-3x" aria-hidden="true"></i><br>
                    ${place.number_bathrooms} Bathrooms
                  </div>
                </div>
                <div class="description">${place.description}</div>
              </article>`;
    }));
  }
  // Initial API status check
  $.get(api + ':5001:/api/v1/status/', function (response) {
    $apiStatus.toggleClass('available', response.status === 'OK');
  });
});
