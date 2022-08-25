<?php
    include './inc/init.php';
    $districtsModel = new DistrictsModel();
    $districtsList = $districtsModel -> GetAllDistrictsWhereCity($_REQUEST['city_id']);
    $result="<option value=""></option>";
    if(count($districtsList)<=0){
        //exit();
    }
    else {
        for($i=0;$i< count($districtsList); $i++){
            $result.='<option value="'.$districtsList[$i]['id'].'">'.$districtsList[$i]['name'].'</option>';

        }
        echo $result;
    }
?>
