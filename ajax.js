var api = 'http://localhost:3000';
console.log('hey');

$('#test-getShifts').click(function() {
    $.ajax({
            method: 'GET',
            url: api + '/shifts'
        })
        .success(function(result) {
            var shifts = result.shifts;
            shifts.forEach(function(shift) {
                console.log(shift);
            });
        })
        .error(function(err) {
            console.log(err);
        });
});


$('#shifts-submit').click(function() {
    var shifts = {};
    var date = new Date($('.year').html() + ' ' + $('.month').html());
    var year = date.getFullYear();
    var month = date.getMonth();
    shifts.name = $('.name').html();
    shifts.user_id = '1234';
    shifts.year = year;
    shifts.pay_period = month;
    shifts.shifts = [];
    $('.calendar-form-wrapper:not(.template)').each(function() {
        if ($(this).hasClass('inactive') && $(this).find('.hours').val() == 0) {
            return;
        }
        shifts.shifts.push({
            shift_date: $(this).find('.calendar-date').html(),
            type: $(this).find('.work-type-selected').html(),
            hours: $(this).find('.hours').val()
        });
    });
    var data = JSON.stringify({
        timesheet: shifts
    });
    $.ajax({
            method: 'POST',
            url: api + '/shifts',
            contentType: 'application/json',
            data: data
        })
        .success(function(result) {
            console.log(result.shift);
        })
        .error(function(err) {
            console.log(err);
        });
});
