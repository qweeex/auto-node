

$(document).ready(function () {

    let URL = document.URL;
    let hours = '';

    $.ajax({
       url: URL + 'vendor',
       success: function (res) {
            $('#vendor').append(`<option>Выберите марку</option>`);
            for (let i = 0; i < res.length; i++){
                $('#vendor').append(`<option value="${res[i]['id_car_mark']}">${res[i]['name']}</option>`);
            }
       }
    });

    $('#vendor').on('change', function (e) {
        let val = e.target.value;
        $.ajax({
            url: URL + 'vendor/' + val,
            success: function (res) {
                $('#mo').html('');
                $('#mo').append(`<option>Выберите модификацию</option>`);
                for (let i = 0; i < res.length; i++){
                    $('#mo').append(`<option value="${res[i]['id_car_mark']}">${res[i]['name']}</option>`);
                }
            }
        });
    });

    $('#mo').on('change', function (e) {
        let val = e.target.value;
        $.ajax({
            url: URL + 'modify/' + val,
            success: function (res) {
                $('#modify').html('');
                $('#modify').append(`<option>Выберите комплектацию</option>`);
                for (let i = 0; i < res.length; i++){
                    $('#modify').append(`<option value="${res[i]['id_car_modification']}">${res[i]['name']}</option>`);
                }
            }
        });
    });

    $('#modify').on('change', function (e) {

        let val = e.target.value;
        $.ajax({
            url: URL + 'modify/hours/' + val,
            success: function (res) {
                hours = Number(res);
            }
        });
        /*$.ajax({
            url: URL + 'modify/fuel/' + val,
            success: function (res) {
                document.querySelector('.oil').value = res;
            }
        });*/
    });

    $('.calc').on('click', function () {

        calculateFuelYear();
        InsTax(hours);
    });


    function calculateFuelYear() {

        let fuel = Number($('.oil').val().replace(',', '.'));
        let price = Number($('.fuel').val().replace(',', '.'));
        let mileage = Number($('.mileage').val().replace(',', '.'));

        let total = (fuel * 10) * (mileage / 1000) * price;
        $('.fuel-total').text(total + ' руб');
    }

    function InsTax(hour){
        let carid = Number(hour);//опять же
        let ins = 0;//страховка
        let tax = 0;//налог
        if (carid < 101){
            ins = 10800;
            tax= carid* 12;
        }
        else if (carid < 121){
            ins = 11800;
            tax= carid * 25;
        }
        else if (carid < 151){
            ins = 13800;
            tax = carid* 35;
        }
        else {
            ins = 15800;
            tax= carid * 75;
        }
        $('.osago-total').text(ins + ' руб');
        $('.nalog-total').text(tax + ' руб');
    }

});

