// waiting to exec jquery code when ready
$('document').ready(function () {
  // TASK 3
  const web = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(web, function (response) {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
  // Task 4
  // initializing the amenities object
  const amenities = {};
  // check for change in checkbox input
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    // additional
    if (Object.values(amenities).length === 0) {
      $('.amenities H4').html('&nbsp;');
    } else {
    // Updating text of the <h4> element to display the selected amenities
      $('.amenities H4').text(Object.values(amenities).join(', '));
    }
  });
});
