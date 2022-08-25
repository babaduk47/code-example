$(document).ready(function(){

    cheackAlert();

    //не отправлять форму по нажатию ENTER
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
    });

    //активный пункт меню
    $('.sidebar-menu [href]').each(function() {
        if (this.href == window.location.href) {
            $(this).children('.sidebar-menu-item').addClass('active');
        }
    });

    

    //Выход
    $("#logout").on("click", function(event) {
        event.preventDefault();
        let form = document.createElement('form');
        form.action = './index.php';
        form.method = 'POST';
        form.innerHTML = '<input name="action" value="logout">';
        document.body.append(form);
        form.submit();
    });



    // ADD
    $('#add-city').on("click",function (e) {

        $alert = $('#toast-alert');
        let nameCity = $('#name-city-add').val();

        if(nameCity.length<=0) {
            showAlert($alert,"Заполните поля","Ошибка","error");
            return;
        }
        //Допустимость символов в названии
        if ( nameCity.search(/\d/) != -1 ) {
            showAlert($alert,"Недопустимый символ","Ошибка","error");
            return;
        }

        ajaxPost("action=0&param="+nameCity,'./getAjaxResponse.php', function(jdata){
            if(jdata){
                let dataUser = JSON.parse(jdata);
                if((dataUser.length==0)){
                    $('#form-city-add').append('<input type="hidden" name="curURL" value="'+window.location.href +'" />');
                    $('#form-city-add').submit();
                    return;
                }
                else {
                    showAlert($alert,"Город с таким именем существует","Ошибка","error");
                    return;
                }
            }
        });
    });

    $('#add-district').on("click",function (e) {

        $alert = $('#toast-alert');
        let nameDistrict = $('#newname-district-add').val();

        if(nameDistrict.length<=0) {
            showAlert($alert,"Заполните поля","Ошибка","error");
            return;
        }
        //Допустимость символов в названии
        if ( nameDistrict.search(/\d/) != -1 ) {
            showAlert($alert,"Недопустимый символ","Ошибка","error");
            return;
        }

        let choiceCity = $('#select-add-district').val()

        if(!choiceCity) {
            showAlert($alert,"Выберете город для добавления","Ошибка","error");
            return;
        }

        let param = {nameDistrict: nameDistrict, choiceCity:choiceCity};


        ajaxPost("action=1&param="+JSON.stringify(param),'./getAjaxResponse.php', function(jdata){
            if(jdata){
                let dataUser = JSON.parse(jdata);
                if((dataUser.length==0)){
                    $('#form-district-add').append('<input type="hidden" name="curURL" value="'+window.location.href +'" />');
                    $('#form-district-add').submit();
                    return;
                }
                else {
                    showAlert($alert,"Район с таким названием уже существет","Ошибка","error");
                    return;
                }
            }
        });
    });

    // EDIT

    $('#edit-city').on("click",function (e) {

        $alert = $('#toast-alert');
        let curIdCity = $("#select-edit-city").val();
        if(!curIdCity) return;

        let curNameCity = $("#select-edit-city").text();
        curNameCity= curNameCity.replace(/[^A-Za-zА-Яа-яЁё]+/g,'');
        let newNameCity = $("#newname-city-edit").val();

        if(newNameCity.length<=0) {
            showAlert($alert,"Заполните поля","Ошибка","error");
            return;
        }

        if(curNameCity.toUpperCase()==newNameCity.toUpperCase()) {
            showAlert($alert,"Названия совпадают","Ошибка","error");
            return;
        }

        ajaxPost("action=0&param="+newNameCity,'./getAjaxResponse.php', function(jdata){
            if(jdata){
                let dataUser = JSON.parse(jdata);
                if((dataUser.length==0)){
                    $('#form-city-edit').append('<input type="hidden" name="curURL" value="'+window.location.href +'" />');
                    $('#form-city-edit').submit();
                    return;
                }
                else {
                    showAlert($alert,"Город с таким именем существует","Ошибка","error");
                    return;
                }
            }
        });
    });

    $('#edit-district').on("click",function (e) {

        $alert = $('#toast-alert');
        let choiceCity = $("#select_city-edit-district").val();
        if(!choiceCity) return;

        if(!$("#select_district-edit-district").val()){
            showAlert($alert,"Выберете район для редактирования","Ошибка","error");
            return;
        }
        let curNameDistrict = $("#select_district-edit-district").text();
        curNameDistrict= curNameDistrict.replace(/[^A-Za-zА-Яа-яЁё]+/g,'');
        let newNameDistrict = $("#newname-district-edit").val();

        if(newNameDistrict.length<=0) {
            showAlert($alert,"Заполните поля","Ошибка","error");
            return;
        }
        let UpperName = (newNameDistrict.substr(0,1).toUpperCase()+newNameDistrict.substr(1));
      
        param = {choiceCity:choiceCity, nameDistrict:UpperName};

        if(curNameDistrict.toUpperCase()==newNameDistrict.toUpperCase()) {
            showAlert($alert,"Названия совпадают","Ошибка","error");
            return;
        }

        console.log(JSON.stringify(param));
    

        ajaxPost("action=1&param="+JSON.stringify(param),'./getAjaxResponse.php', function(jdata){
            if(jdata){
                let dataUser = JSON.parse(jdata);
                if((dataUser.length==0)){
                    $('#form-district-edit').append('<input type="hidden" name="curURL" value="'+window.location.href +'" />');
                    $('#form-district-edit').submit();
                    return;
                }
                else {
                    showAlert($alert,"Район с таким именем существует","Ошибка","error");
                    return;
                }
            }
        });
    });

    // DELETE

    $('#delete-city').on("click",function (e) {

        $alert = $('#toast-alert');
        $selectDel = $('#select-delete-city').val();

        if(!$selectDel) {
            showAlert($alert,"Выберете город для удаления","Ошибка","error");
            return;
        }
        $('#form-city-delete').append('<input type="hidden" name="curURL" value="'+window.location.href +'" />');
        $('#form-city-delete').submit();

    });

    $('#delete-district').on("click",function (e) {

        $alert = $('#toast-alert');
        $selectDel = $('#select-delete-district').val();

        if($selectDel.length==0) {
            showAlert($alert,"Выберете район для удаления","Ошибка","error");
            return;
        }
        $('#form-district-delete').append('<input type="hidden" name="curURL" value="'+window.location.href +'" />');
        $('#form-district-delete').submit();

    });

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

    $("#select_city-edit-district,#select_stop-add-city").change(function() {
        $temp = $(this);
        let hidenSelect =$temp.parent().parent().find('.hide-inputs');
        if(!$(this).val()){
            hidenSelect.fadeOut(297);
            return;
        } 
        $alert = $('#toast-alert');
        
        ajaxPost("action=2&param="+$(this).val(),'./getAjaxResponse.php', function(jdata){
            if(jdata){
                let dataUser = JSON.parse(jdata);
                
                if((dataUser.length>0)){

                    hidenSelect.fadeIn(297);
                    
                    // hidenSelect.children().first().children().first().selectize()[0].selectize.destroy();
                    // hidenSelect.children().first().children().first().selectize({
                    //     valueField: 'id',
                    //     labelField: 'name',
                    //     searchField: 'name',
                    //     options: dataUser,
                    //     create: false
                    // });
                    let sel = hidenSelect.children().first().children().first().children().first();
                    sel.empty();
                    dataUser.forEach(element =>  sel.append('<option value="'+element.id+'">['+element.id+'] '+element.name+'</option>'));
                    sel.selectpicker('refresh');
                    
                    return;
                }
                else {
                    showAlert($alert,"В выбраном городе не существет райнов","Ошибка","error");
                    hidenSelect.fadeOut(297);
                    return;
                }
            }
        });
    });

    $("#select-add-district, #select-edit-city, #select-edit-district").change(function() {
        console.log("select-edit-city");
        console.log( $(this).selectpicker('val'));
        console.log( $(this).val());
        if($(this).val()){
            console.log("true");
            $(this).parent().parent().find('.hide-inputs').fadeIn(297);
        }
        else $(this).parent().parent().find('.hide-inputs').fadeOut(297);
        console.log("false");
    });

    $("#select-city-for-district").change(function() {
        if($(this).val()>0){
            var html = $.ajax({
            type: "POST",
            url: "./assets/php/getDistrictAjax.php",
            data: "city_id=" +$(this).val(),
            async: false
            }).responseText;
            if(html){
                $("#select-delete-districts").empty();
                $("#select-delete-districts").html(html);
                $("#select-delete-districts").selectize();
            }
        }
    });
    if ($('#select-delete-district').length) $('#select-delete-district').select2();

    if ($('#tree').length) {
        ajaxPost("action=3",'./getAjaxResponse.php', function(jdata){
            if(jdata){
                let dataUser = JSON.parse(jdata);
                if((dataUser.length!=0)){
                    let str ='[';
                    let curId_c=dataUser[0].id_c;
                    let curId_d=dataUser[0].id_d;
                    let first = true;
                    str+='{"id":"-'+curId_c+'", "text" :"'+dataUser[0].name_c+ '", "children": [ {' + '"id":"-'+curId_d+'", "text":"'+dataUser[0].name_d+'", "children": [ {' + '"id":"'+dataUser[0].id+'" , "text": "'+dataUser[0].address+'" } ';
                    for(let i = 1;i<dataUser.length;i++){
                        if(dataUser[i].id_c!=curId_c){
                            curId_c=dataUser[i].id_c;
                            if(first) first=false;
                            str+=']}]},{"id":"-'+curId_c+'", "text" :"'+dataUser[i].name_c+ '"';
                            if(curId_d!=dataUser[i].id_d){
                                curId_d=dataUser[i].id_d;
                                str+=', "children": [{'+'"id":"-'+curId_d+'", "text":"'+dataUser[i].name_d+'", "children": [';
                                first_c=true;
                            }
                            str+='{' + '"id":"'+dataUser[i].id+'" , "text": "'+dataUser[i].address+'" }';
                        }else{
                            if(curId_d!=dataUser[i].id_d){
                                curId_d=dataUser[i].id_d;
                                str+=']},{'+'"id":"-'+curId_d+'", "text":"'+dataUser[i].name_d+'", "children": [';
                                first_c=true;
                                str+='{' + '"id":"'+dataUser[i].id+'" , "text": "'+dataUser[i].address+'" }';
                            }
                            else {
                                str+=',{' + '"id":"'+dataUser[i].id+'" , "text": "'+dataUser[i].address+'" }';
                            }
                        }
                    }
                    str+="]}]}]";

                    var tree =  $('#tree').tree({
                        primaryKey: 'id',
                        uiLibrary: 'bootstrap',
                        dataSource: JSON.parse(str),
                        checkboxes: true
                    }).collapseAll();

                    $('#tree').each(function() {
                        $( "li" ).each(function() {
                            let curID= $( this ).data("id")
                            if(curID>0){
                                $( this ).find("div").append('<a href="./statistics.php?id='+curID+'" title="Посмотреть статистику"><div class="stastistic-img"></div></a>');
                            }
                          });
                       
                      });

                   console.log();

                    tree.on('checkboxChange', function (e, $node, record, state) {
                        let countSelect = 0;
                        let checkedIds = tree.getCheckedNodes();
                        for( let i = 0;i<checkedIds.length;i++){
                            //если id отрицательный, то это остановка
                            if(checkedIds[i]>0){
                                countSelect++;
                            }
                        }
                        let spanDelete = $('#stop-station-count-delete');
                        spanDelete.html("Выбрано остановок : "+countSelect);
                    });

                    $('#stop-station-button-delete').on('click', function () {
                        //получение всех выделеных остановок
                        let checkedIds = tree.getCheckedNodes();
                        if(checkedIds.length<1) {
                            $alert = $('#toast-alert');
                            showAlert($alert,"Выберете хотя бы одну остановку","Ошибка","error");
                            return;
                        }

                        let DeleteData=[];
                        let index=0;
                        for( let i = 0;i<checkedIds.length;i++){
                            //если id отрицательный, то это остановка
                            if(checkedIds[i]>0){
                               // let tmp = checkedIds[i] * -1;
                                //поиск по id остановке, для озадания массива {id,adress}
                                for(let j = 0;j<dataUser.length;j++){

                                    if(dataUser[j].id==checkedIds[i]){
                                        DeleteData[index++] ={
                                            id: dataUser[j].id,
                                        }
                                       // console.log("id: "+dataUser[j].id+" adress: "+dataUser[j].address)
                                        break;
                                    }
                                }
                            }
                        }
                        let selectIds = $('#stop-station-delete-ids');
                        selectIds.empty();
                        $.each(DeleteData, function(key,value) {
                            selectIds.append('<option value="' + value.id + '">' + value.id + '</option>');
                        });
                        $('#stop-station-delete-ids option').prop('selected', true);
                        let curForm = $('#form-stop-delete');
                        curForm.append('<input type="hidden" name="curURL" value="'+window.location.href +'" />');
                        curForm.submit();
                    });

                    $('#add-stop').on('click', function () {
                        $alert = $('#toast-alert');
                        let nameStop = $('#newname-stop-add').val();

                        if(nameStop.length<=0) {
                            showAlert($alert,"Заполните поля","Ошибка","error");
                            return;
                        }

                        let choiceCity = $('#select_stop-add-city').val()

                        if(!choiceCity) {
                            showAlert($alert,"Выберете город в который хотитте добавить","Ошибка","error");
                            return;
                        }

                        let choiceDistrict = $('#select_stop-add-district').val()

                        if(!choiceDistrict) {
                            showAlert($alert,"Выберете нужный район для добавления","Ошибка","error");
                            return;
                        }

                        let curForm = $('#form-stop-add');
                        curForm.append('<input type="hidden" name="curURL" value="'+window.location.href +'" />');
                        curForm.submit();
                    });



                    $('#cheakIds').on('click', function () {
                        //получение всех выделеных остановок
                        let checkedIds = tree.getCheckedNodes();
                        if(checkedIds.length<1) {
                            $alert = $('#toast-alert');
                            showAlert($alert,"Выберете хотя бы одну остановку","Ошибка","error");
                            return;
                        }
                        let AjaxData=[];
                        console.log(JSON.parse(str));
                        console.log(checkedIds);
                        let index=0;
                        for( let i = 0;i<checkedIds.length;i++){
                            //если id отрицательный, то это остановка
                            if(checkedIds[i]>0){
                               // let tmp = checkedIds[i] * -1;
                                //поиск по id остановке, для озадания массива {id,adress}
                                for(let j = 0;j<dataUser.length;j++){

                                    if(dataUser[j].id==checkedIds[i]){
                                        AjaxData[index++] ={
                                            id: dataUser[j].id,
                                            city:dataUser[j].name_c,
                                            dis:dataUser[j].name_d,
                                            adress: dataUser[j].address
                                        }
                                       // console.log("id: "+dataUser[j].id+" adress: "+dataUser[j].address)
                                        break;
                                    }
                                }
                            }
                        }

                        let folderStructure = 0;
                        if ($('#folder-structure').is(':checked')){
                            folderStructure = 1;
                        }

                        $.ajax({
                            url: './qr.php',
                            data: "param="+JSON.stringify(AjaxData)+"&folderStructure="+folderStructure,
                            dataType: 'binary',
                            method: "POST",
                            xhrFields: {
                                'responseType': 'blob'
                            },
                            success: function(data, status, xhr) {
                                var link = document.createElement('a'),
                                   filename = 'test.txt';
                                let aftrDoc;
                                if(xhr.getResponseHeader('Content-Disposition')){//имя файла
                                    filename = xhr.getResponseHeader('Content-Disposition');
                                    aftrDoc = filename.substr(filename.length - 3);
                                    console.log(aftrDoc);
                                }
                                link.href = URL.createObjectURL(data);
                                link.download = "Stop Station."+aftrDoc;
                                link.click();
                            }
                        });
                    });
                    return;
                }
                else {
                    showAlert($alert,"Остновок не существует","Ошибка","error");
                    return;
                }
            }
        });
    }

    if ($('#table-transport').length) {
        let tableContainer = $('#table-container');
        let table = $('#table-transport').DataTable({
            "paging": true,
            "dom": '<".top-table-flex"<"top-left">f>rt<"bottom"p><"clear">',
            "language": {
                // "lengthMenu": "Display _MENU_ records per page",
                "zeroRecords": "Ничего не найдено",
                "search":         "Поиск :",
                "paginate": {
                    "first":      "First",
                    "last":       "Last",
                    "next":       ">",
                    "previous":   "<"
                },
                // "infoFiltered": "(filtered from _MAX_ total records)"
            }
            });
        $('.dataTables_length').addClass('bs-select');

        tableContainer.on('click',"#transport-add-modal", function () { 
            
            $('.modal-title').html("Добавление");
            $('#input-viewMode').val("add");
            $('#input-curID').val("");
            $('#input-name').val("");
            $('#input-start_time').val("");
            $('#input-finish_time').val("");
            $('#input-frequency').val("");
            $('input[name="id_type"][value="1"]').prop('checked', true);
            $('#transport-add').html("Добавить").removeClass().addClass('btn btn-success');
            $('#transport-delete').hide();
            $('#modal-transport').modal('show'); 
        });

        $('.clockpicker').clockpicker({
            placement: 'bottom',
            align: 'left',
            autoclose: true,
            'default': 'now'
        });

        $('#transport-add').on('click', function () { 
            let curForm = $('#form-add-transport');
            curForm.append('<input type="hidden" name="curURL" value="'+window.location.href +'" />');
            curForm.submit();
        });

        $('#transport-delete').on('click', function () { 
            $('#input-viewMode').val("delete");
            let curForm = $('#form-add-transport');
            curForm.append('<input type="hidden" name="curURL" value="'+window.location.href +'" />');
            curForm.submit();
            
        });

        $("div.top-left").html('<button type="button" id="transport-add-modal" class="form__button">Новый транспорт</button>');
    
        $('#table-transport tbody').on('click', 'tr', function () {

            var id = table.row(this).data()[0];
            $('.modal-title').html("Изменения");
            $('#input-viewMode').val("edit");
            $('#input-curID').val(id);
            
            $('#transport-add').html("Редактировать").removeClass().addClass('btn btn-dark');
            $('#transport-delete').show();

          ajaxPost("action=4&param="+id,'./getAjaxResponse.php', function(jdata){
            if(jdata){
                let dataUser = JSON.parse(jdata);
                if((dataUser.length>0)){
                    $('#input-name').val(dataUser[0].name);
                    $('#input-start_time').val(dataUser[0].start_time);
                    $('#input-finish_time').val(dataUser[0].finish_time);
                    $('#input-frequency').val(dataUser[0].frequency);
                    $('input[name="id_type"][value="'+dataUser[0].id_type+'"]').prop('checked', true);
                    $('#modal-transport').modal('show'); 
                    return;
                }
                else {
                    showAlert($alert,"Ошибка получения информации о транспорте","Ошибка","error");
                    return;
                }
            }
        });
        });
    }


    if ($('#chart-statistic').length) { 
        let ctx = document.getElementById('chart-statistic').getContext('2d');
        let myChart = new Chart(ctx);
        $alert = $('#toast-alert');
        
        $("input[type=radio][name=id_select-period], #cur_stop").change(function() {
            let cur_stop = $("#cur_stop");
 
            if(!cur_stop.val()) {
                showAlert($alert,"Выберете остановку","Уведомление","msg");
                return;
            }
          //  console.log(cur_stop.val());

            let cur_perio = parseInt($('input[name="id_select-period"]:checked').val());
            let ac = 5;
            console.log(cur_perio);
            if(cur_perio==1) ac = 6;
            else if(cur_perio==4) ac = 7;
            else if(cur_perio==3) ac = 12;
            if (cur_stop[0].selectedIndex <= 0) { 
                //console.log("")
                cur_perio=5;
            }
            console.log(ac);
            $.ajax({
                url: './getAjaxResponse.php',
                data: "param="+cur_stop.val()+"&action="+ac,
                method: "POST",
                success: function(data, status, xhr) {
                    // получает значение выбраного периода для отображения статистики
                   // let cur_perio = parseInt($('input[name="id_select-period"]:checked').val());
                    // по умолчанию тип графика линия, если выбрана статистика за 1 год, то производится смена типа диаграмы
                    let type_d = 'line';
                    // ответ от бд
                    let dataUser = JSON.parse(data);
                    console.log(dataUser);
                    // данные для отображения
                    let daysSorted = [];
                    let daysCount = [];
                    // выполнение необхидимых преобразований для вывода разных периодов
                    
                    switch(cur_perio) {
                        case 1:
                            for(let i = 0; i < 24; i++)
                            {
                                daysSorted.push(formatHour(i));
                            }
                            
                            daysCount = new Array(daysSorted.length).fill(0);

                            for( let i = 0; i<dataUser.length;i++){
                                daysCount[dataUser[i].hour_v]= parseInt(dataUser[i].count_v);
                            }
                            break;
                        case 2:
                        case 3:
                            let endF = 7;
                            if(cur_perio==3) endF = 30; 
                            let today = new Date();
                            daysSorted.push(formatDate(today));

                            for(let i = 0; i < endF-1; i++)
                            {
                                let newDate = new Date(today.setDate(today.getDate() - 1));
                                daysSorted.push(formatDate(newDate));
                            }
                            daysCount = new Array(daysSorted.length).fill(0);

                            for( let i = 0; i<dataUser.length;i++){
                                daysCount[daysSorted.indexOf(dataUser[i].date_v)]= parseInt(dataUser[i].count_v);
                            }

                            daysSorted.reverse();
                            daysCount.reverse();
                            break;
                        case 4:
                            type_d ='bar';

                            var days =[
                                'Январь',
                                'Февраль',
                                'Март',
                                'Апрель',
                                'Май',
                                'Июнь',
                                'Июль',
                                'Август',
                                'Сентябрь',
                                'Ноябрь',
                                'Декабрь',
                            ];

                            let curM = new Date().getMonth() + 1;
                            
                            daysCount = new Array(days.length).fill(0);

                            for( let i = 0; i<dataUser.length;i++){
                                daysCount[dataUser[i].month_v-1]= parseInt(dataUser[i].count_v);
                            }

                             daysSorted=days.splice(curM).concat(days);
                             daysCount=daysCount.splice(curM).concat(daysCount);

                            break;
                        case 5:
                            daysSorted = new Array(24).fill(0);
                            daysCount = new Array(24).fill(0);
                            break;
                    }
                   
    
                    function formatDate(date) {
    
                        let dd = date.getDate();
                        if (dd < 10) dd = '0' + dd;
                      
                        let mm = date.getMonth() + 1;
                        if (mm < 10) mm = '0' + mm;
                      
                        let yy = date.getFullYear();
                      
                        return yy + '-' + mm + '-' + dd;
                    }

                    function formatHour(date) {
    
                        let hh = date;
                        if (hh < 10) hh = '0' + hh;
                      
                        return hh + ':00' ;
                    }

                 myChart.destroy();
                 myChart = new Chart(ctx, {
                        type: type_d,
                        data: {
                            labels: daysSorted,
                            datasets: [{
             
                                data: daysCount,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(110, 166, 91, 0.2)',
                                    'rgba(165, 91, 171, 0.2)',
                                    'rgba(230, 214, 76, 0.2)',
                                    'rgba(52, 75, 227, 0.2)',
                                    'rgba(224, 52, 52, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                    'rgba(110, 166, 91, 1)',
                                    'rgba(165, 91, 171, 1)',
                                    'rgba(230, 214, 76, 1)',
                                    'rgba(52, 75, 227, 1)',
                                    'rgba(224, 52, 52, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            plugins: {
                                legend: false
                            },
                            animations: {
                                y: {
                                  easing: 'linar',
                                  duration: 300,
                                  from: (ctx) => {
                                    if (ctx.type === 'data') {
                                      if (ctx.mode === 'default' && !ctx.dropped) {
                                        ctx.dropped = true;
                                        return 0;
                                      }
                                    }
                                  }
                                }},
                                responsive: true,
                            
                            scales: {
                                y: {
                                    stacked: true,
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                }
            });
        });

        let queryDict = {};
        location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
        if(queryDict.id) {
            $('#cur_stop').selectpicker('val', queryDict.id);
            console.log($('#cur_stop option:selected').length);
            if($('#cur_stop option:selected').val()!=queryDict.id)
                showAlert($alert,"Ошибка параметра остановки остановки","Ошибка","error"); 
        }
        
        $('input[name=id_select-period][value="1"]').trigger('click');;
    }

    function ajaxINStop(_idR){
        $alert = $('#toast-alert');
        ajaxPost("action=8&param="+JSON.stringify(_idR),'./getAjaxResponse.php', function(jdata){
            if(jdata){
                let dataUser = JSON.parse(jdata);
                
                if((dataUser.length>0)){
                    let sel = $("#list-add-stop-station");
                    sel.empty();
                    dataUser.forEach(element =>  sel.append('<div data-id="'+element.id+'" class="list-group-item nested-1">'+element.address+'</div>'));
                    return;
                }
                else {
                    showAlert($alert,"В выбраном городе не существет райнов","Ошибка","error");
                    return;
                }
            }
        });
    }

    function ajaxINStopAllDistring(param){
        $alert = $('#toast-alert');
        ajaxPost("action=11&param="+JSON.stringify(param),'./getAjaxResponse.php', function(jdata){
            if(jdata){
                
                let dataUser = JSON.parse(jdata);
                console.log(dataUser);
                let sel = $("#list-add-stop-station");
                sel.empty();
                if((dataUser.length>0)){
                    dataUser.forEach(element =>  sel.append('<div data-id="'+element.id+'" class="list-group-item nested-1">'+element.address+'</div>'));
                }
            }
        });
    }

    $("#cur_route").change(function() {
        console.log( $(this).val());
        if($(this).val()){
            $("#tip-for-select-route").fadeOut(400);
        }
        $("#block-drag-stop-station").fadeIn(1500);
        $('#cur_city').selectpicker('val', -1);
        // $("#lock-drag-stop-station-select-districts").fadeOut(400);
        ajaxPost("action=9&param="+$(this).val(),'./getAjaxResponse.php', function(jdata){
            if(jdata){
                let dataUser = JSON.parse(jdata);
                let sel = $("#list-save-stop-station");
                sel.empty();
                if((dataUser.length>0)){
                    dataUser.forEach(element =>  sel.append('<div data-id="'+element.id+'" class="list-group-item nested-1">'+element.address+'</div>'));
                }
                ajaxINStop($('#list-save-stop-station').sortable('toArray'));
                
            }
        });
    });

    $('#cur_city').change(function() {
        if($(this).val()==-1){
            $("#lock-drag-stop-station-select-districts").fadeOut(300);
            ajaxINStop(Array.from($("#cur_route").val()));
            console.log("");
            return;
        }
        
        $alert = $('#toast-alert');
        let param = {stop_starion: $('#list-save-stop-station').sortable('toArray'), curCity :$(this).val() }
        ajaxINStopAllDistring(param);

        ajaxPost("action=2&param="+$(this).val(),'./getAjaxResponse.php', function(jdata){
            if(jdata){
                let dataUser = JSON.parse(jdata);
                
                if((dataUser.length>0)){
                    $("#lock-drag-stop-station-select-districts").fadeIn(300);
                    let sel = $("#cur_districts");
                    sel.empty();
                    sel.append('<option select value="-1">Все районы</option>');
                    dataUser.forEach(element =>  sel.append('<option value="'+element.id+'">['+element.id+'] '+element.name+'</option>'));
                    sel.selectpicker('refresh');
                    sel.selectpicker('val', -1);
                    return;
                }
                else {
                    $("#lock-drag-stop-station-select-districts").fadeOut(300);
                    showAlert($alert,"В выбраном городе не существет райнов","Ошибка","error");
                    return;
                }
            }
        });
    });

    $('#cur_districts').change(function() {
        if($(this).val()==-1){
            let param = {stop_starion: $('#list-save-stop-station').sortable('toArray'), curCity : $('#cur_city').val() }
            ajaxINStopAllDistring(param);
            return;
        }
        let param = {stop_starion: $('#list-save-stop-station').sortable('toArray'), curDistrict : $(this).val() }
        ajaxPost("action=10&param="+JSON.stringify(param),'./getAjaxResponse.php', function(jdata){
            if(jdata){
                let dataUser = JSON.parse(jdata);
                let sel = $("#list-add-stop-station");
                sel.empty();
                if((dataUser.length>0)){
                    dataUser.forEach(element =>  sel.append('<div data-id="'+element.id+'" class="list-group-item nested-1">'+element.address+'</div>'));
                }
            }
        });
    });

    // List 1
    $('#list-add-stop-station').sortable({
        group: 'list',
        animation: 200,
        ghostClass: 'ghost'
    });

    // List 2
    $('#list-save-stop-station').sortable({
        group: 'list',
        animation: 200,
        ghostClass: 'ghost'
    });

    $('#route-update').on("click",function (e) {
        let choiceTransport = $("#cur_route").val();

        if(!choiceTransport) {
            showAlert($alert,"Выберете транспорт для изменения","Ошибка","error");
            return;
        }
        $('#form-update-route').append('<input type="hidden" name="curURL" value="'+window.location.href +'" />');
        $('#form-update-route').append('<input type="hidden" name="curTransport" value="'+ choiceTransport +'" />');
        $('#form-update-route').append('<input type="hidden" name="TransportName" value="'+ $("#cur_route option:selected").text() +'" />');
        $('#form-update-route').append('<input type="hidden" name="newStop" value="'+Array.from($('#list-save-stop-station').sortable('toArray')) +'" />');
        $('#form-update-route').submit();
    });

    function cheackAlert(){
        if($('#toast-alert').length){
            if(!($('#toast-alert-msg').is(':empty'))){
                $('#toast-alert').toast('show');
            }
        //console.log($('#toast-alert-msg').html);
        }
    };

    function ajaxPost(param,url,callback) {
        let f = callback || function(jdata){};

        let request2 = new XMLHttpRequest();
        request2.onreadystatechange= function () {

            if(request2.readyState==4 && request2.status==200){
                if(!this.responseText=="0") {
                    f(this.responseText);
                } else f(null);
            }

        };
        request2.open('POST', url);
        request2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        request2.send(param);
    }

});
