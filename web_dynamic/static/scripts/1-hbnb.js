// waiting to exec jquery code when ready
$('document').ready(function () {
  // initializing the amenities object
  const amenities = {};
  // check for change in checkbox input
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    // Updating text of the <h4> element to display the selected amenities
    $('.amenities H4').text(Object.values(amenities).join(', '));
  });
});
