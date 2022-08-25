<?php
class CityModel
{

     public static function GetAllCity(){
        $sql = "SELECT * FROM `cities`";
        $res = MyDB::query($sql);
        return $res;
    }

    public static function GetAllCityAndDistrict(){
        $sql = "SELECT d.*, c.`Name` FROM `districts` d, `cities` c where d.`id_сity`=c.`id` ORDER by d.`id_сity`,c.`Name`";
        $res = MyDB::query($sql);
        return $res;
    }

    public static function countCity(){
        $sql = "SELECT COUNT(id) as count FROM `cities`";
        $res = MyDB::query($sql);
        return $res[0]['count'];
    }

    public static function add($name){
        $sql= "INSERT INTO `cities` (Name) VALUES ('".addslashes($name)."')";
        MyDB::execute($sql);
    }

    public static function edit($name,$id){

        $sql = "UPDATE `cities` SET Name='".addslashes($name)."' WHERE id=".$id;
        echo $sql;
        MyDB::execute($sql);
    }

    public static function delete($id){
        $sql = "DELETE FROM `cities` where id=".addslashes($id);
        MyDB::execute($sql);
    }

}
