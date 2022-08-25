<?php
class StopStationTransportModel
{
    public static function GetAllStopStationTransport($start,$limit){
        $sql = "SELECT * FROM `stop_station-transport` ORDER BY ID LIMIT ".$start.", ".$limit;
        $res = MyDB::query($sql);
        return $res;
    }

    public static function countStopStationTransport(){
        $sql = "SELECT COUNT(id) as count FROM `stop_station-transport`";
        $res = MyDB::query($sql);
        return $res[0]['count'];
    }

    public static function add($id_stop,$id_transport,$sequence,$distance,$time_interval){
        $sql= "INSERT INTO `stop_station-transport` (`id_stop`, `id_transport`, `sequence`, `distance`, `time_interval`) VALUES ('".addslashes($id_stop)."','".$id_transport."','".$sequence."','".$distance."','".$time_interval."')";

        MyDB::execute($sql);
    }
    public static function edit($id_stop,$id_transport,$sequence,$distance,$time_interval,$id){
         $sql = "UPDATE `stop_station-transport` SET `id_stop`='".addslashes($id_stop)."', `id_transport`='".addslashes($id_transport)."', `sequence`='".addslashes($sequence)."', `distance`='".addslashes($distance)."', `time_interval`='".addslashes($time_interval)."'  WHERE id=".$id;
        MyDB::execute($sql);
    }

    public static function delete($id){
        $sql = "DELETE FROM `stop_station-transport` where id=".addslashes($id);
        MyDB::execute($sql);
    }

    public static function updateRoute($data,$id){
        $sql = "DELETE FROM `stop_station-transport` where id_transport  =".addslashes($id);
        MyDB::execute($sql);
        $countData = count($data);
        if($countData > 0) {
            $str_del= "";
            for($i=0;$i< $countData; $i++){
                $str_del.= "(";
                $str_del.=$id;
                $str_del.= ",";
                $str_del.= $data[$i];
                $str_del.= ",";
                $str_del.= $i;
                $str_del.= ")";
                if($i!=$countData-1)$str_del.=",";
            }
            $sql = "INSERT INTO `stop_station-transport` (`id_transport`,`id_stop`,`sequence`) VALUES ".$str_del;
            MyDB::execute($sql);
        }
    }

}
