<?php
class UserModel
{
    public function __construct(){
       //
    }

    public function GetAllUser($myId=0,$start,$limit){
        $sql = "SELECT * FROM ".TABLE_USERS." where id!=".addslashes($myId)." ORDER BY id LIMIT ".$start.", ".$limit;
        $res = MyDB::query($sql);
        return $res;
    }

    public function countUser(){
        $sql = "SELECT COUNT(id) as count FROM ".TABLE_USERS;
        $res = MyDB::query($sql);
        return $res[0]['count'];
    }

    public function add($login,$password,$name){
        $sql= "INSERT INTO ".TABLE_USERS." (login,password,name) VALUES ('".addslashes($login)."', PASSWORD('".addslashes($password)."'),'".addslashes($name)."')";
        MyDB::execute($sql);
    }

    public function edit($name,$newPass,$id){
        $p = "";

        if($newPass != "") {
            $p = ", password=PASSWORD('".$newPass."')";
        }

        $sql = "UPDATE ".TABLE_USERS." SET name='".addslashes($name)."' ".$p." WHERE id=".$id;

        MyDB::execute($sql);
    }

    public function delete($id){
        $sql = "DELETE FROM ".TABLE_USER_AUTH." where user_id=".addslashes($id);
        MyDB::execute($sql);

        $sql = "DELETE FROM ".TABLE_USERS." where id=".addslashes($id);
        MyDB::execute($sql);
    }

    public function loginExist($login){
        $sql = "SELECT * FROM ".TABLE_USERS." where login='".addslashes($login)."'";
        $res = MyDB::query($sql);
        if( count($res)>0) return true;

        return false;

    }
}
