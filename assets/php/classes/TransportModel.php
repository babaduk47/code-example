<?php
class TransportModel
{
    public static function GetAllTransport($start,$limit){
        $sql = "SELECT * FROM `transport` ORDER BY ID LIMIT ".$start.", ".$limit;
        $res = MyDB::query($sql);
        return $res;
    }

    //for ajax table
    public static function GetAllTransport2(){
        $sql = "SELECT * FROM `transport` ORDER BY ID";
        $res = MyDB::query($sql);
        return $res;
    }

    public static function countTransport(){
        $sql = "SELECT COUNT(id) as count FROM `transport`";
        $res = MyDB::query($sql);
        return $res[0]['count'];
    }

    public static function add($name,$start_time,$finish_time,$frequency,$id_type){
        $sql= "INSERT INTO `transport` (`name`, `start_time`, `finish_time`, `frequency`, `id_type`) VALUES ('".addslashes($name)."','".$start_time."','".$finish_time."','".$frequency."','".$id_type."')";

        MyDB::execute($sql);
    }

    public static function edit($name,$start_time,$finish_time,$frequency,$id_type,$id){
        $sql = "UPDATE `transport` SET `name`='".addslashes($name)."', `start_time`='".addslashes($start_time)."', `finish_time`='".addslashes($finish_time)."', `frequency`='".addslashes($frequency)."', `id_type`='".addslashes($id_type)."'  WHERE id=".$id;
        MyDB::execute($sql);
    }

    public static function delete($id){
        $sql = "DELETE FROM `transport` where id=".addslashes($id);
        MyDB::execute($sql);
    }

    public static function getTranportList() {
        $sql = "SELECT `id`,`name` FROM `transport`";
        $res = MyDB::query($sql);
        return $res;
    }

}
