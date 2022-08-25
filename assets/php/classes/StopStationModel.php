<?php
class StopStationModel
{
    public static function GetAllStopStation($start,$limit){
        $sql = "SELECT * FROM `stop_station` ORDER BY ID LIMIT ".$start.", ".$limit;
        $res = MyDB::query($sql);
        return $res;
    }

    public static function GetAllStopStationStatistic(){
        $sql = "SELECT ss.`id`,ss.`address`, c.`Name`, c.`id` as 'id_сity' FROM `districts` d, `cities` c, `stop_station` ss where ss.`id_district`=d.`id`and c.`id`=d.`id_сity`  ORDER by c.`id`,c.`Name`";
        $res = MyDB::query($sql);
        return $res;
    }

    public static function countStopStation(){
        $sql = "SELECT COUNT(id) as count FROM `stop_station`";
        $res = MyDB::query($sql);
        return $res[0]['count'];
    }

    public static function add($id_district,$address){
        $sql= "INSERT INTO `stop_station` (`id_district`,`address`) VALUES ('".$id_district."','".addslashes($address)."')";
        MyDB::execute($sql);
    }

    public static function delete($id){

        $countId = count($id);
        if($countId>0){
            $str_del = "(";
            for($i=0;$i< $countId; $i++){
                $str_del.=$id[$i];
                if($i!=$countId-1)$str_del.=",";
            }
            $str_del.=")";
            $sql = "DELETE FROM `stop_station` where id IN".$str_del;
            MyDB::execute($sql);
        }
    }
}
