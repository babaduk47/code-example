<?php
class DistrictsModel
{

     public static function GetAllDistrictsWhereCity($id_city){
        $sql = "SELECT * FROM `districts` where id_сity=".addslashes($id_city);
        $res = MyDB::query($sql);
        return $res;
    }

    public static function countDistricts(){
        $sql = "SELECT COUNT(id) as count FROM `districts`";
        $res = MyDB::query($sql);
        return $res[0]['count'];
    }

    public static function add($name,$id_city){
        $sql= "INSERT INTO `districts` (`name`,`id_сity`) VALUES ('".addslashes($name)."','".$id_city."')";

        MyDB::execute($sql);
    }

    public static function edit($name,$id_city,$id){
        $sql = "UPDATE `districts` SET `name`='".addslashes($name)."', `id_сity`=".addslashes($id_city)." WHERE id=".$id;
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
            $sql = "DELETE FROM `districts` where id IN".$str_del;
           // echo $sql;
            MyDB::execute($sql);
        }
    }

}
