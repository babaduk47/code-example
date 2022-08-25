<?php
class TransportTypeModel
{
    public static function GetAllTransportType($start,$limit){
        $sql = "SELECT * FROM `transport_type` ORDER BY ID LIMIT ".$start.", ".$limit;
        $res = MyDB::query($sql);
        return $res;
    }

    public static function countTransportType(){
        $sql = "SELECT COUNT(id) as count FROM `transport_type`";
        $res = MyDB::query($sql);
        return $res[0]['count'];
    }

    public static function add($name,$cost){
        $sql= "INSERT INTO `transport_type` (`name`,`cost`) VALUES ('".addslashes($name)."','".$cost."')";

        MyDB::execute($sql);
    }

    public static function edit($name,$cost,$id){
        $sql = "UPDATE `transport_type` SET `name`='".addslashes($name)."', `cost`=".addslashes($cost)." WHERE id=".$id;
        MyDB::execute($sql);
    }

    public static function delete($id){
        $sql = "DELETE FROM `transport_type` where id=".addslashes($id);
        MyDB::execute($sql);
    }
}
