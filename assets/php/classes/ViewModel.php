<?php
class ViewModel
{

     public static function GetViewsOfWeek($id){
        $sql = "SELECT `id_stop_station`,`date_viewed`,COUNT(id) FROM `views` where `id_stop_station` = ".$id." and `date_viewed` > DATE_SUB(NOW(), INTERVAL 1 DAY)  GROUP BY CAST(`date_viewed` AS DATE) ";
        $res = MyDB::query($sql);
        return $res;
    }

}