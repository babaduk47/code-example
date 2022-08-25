$(document).ready(function(){

    $alert = $('#toast-alert');



    const sign_in_btn = document.querySelector("#signin__btn");
    const about_btn = document.querySelector("#about__btn");
    const container = document.querySelector(".container__main");

    sign_in_btn.addEventListener('click', () => {
        container.classList.remove("about__mode");
    });

    about_btn.addEventListener('click', () => {
     container.classList.add("about__mode");
    });

    $("#form__autorization").on('submit',(function(e) {
        e.preventDefault();
        console.log("ds");
        var formD=new FormData(this);
        formAjax(formD);
    }));

    function formAjax(data){
        $.ajax({
        url: "./viewMode.php",
        type: "POST",
        data:  data,
        contentType: false,
        processData: false,
        success: function (response) {
            var popupContent='';
            var result = JSON.parse(response);
            console.log(result['msg'][0]);
            if (result['status'] === 'ok') {
                for (let key in result['msg']){
                    popupContent+=result['msg'][key];
                }
                if(result['viewMode']=="login"){
                    window.location.href = "./statistics.php";
                    return;
                }


            } else {
                for (let key in result['msg']){
                    popupContent+=result['msg'][key];
                }
            }
            showAlert($alert,popupContent,"Ошибка","error");
        }
        });
    };

    
    function showAlert(alert, msg, header, class_color) {

        if(alert.hasClass("show")){
                alert.stop(true).animate({ opacity: "0" }, 100).animate({ opacity: "1" }, 100 );
        }
        alert.removeClass("hide");
        alert.toast('show');
        alert.find('.toast-body').html(msg);
        alert.find('#toast-alert-msg').html(header);
        alert.find('.toast-circle').removeClass().addClass('toast-circle '+class_color);
    }

});