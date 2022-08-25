<?php
class UserSession extends Session
{
    protected $dbo;
    protected $userId = 0;
    protected $userName = "";
    protected $userLogin = "";

    public function __construct($path = ""){

        parent::__construct($path);

        $this->dbo = MyDB::get_db_instance();
        $this->cheakUserAuth();

    }

    public function isLogged(){
        return ($this->userId != 0);
    }

    public function GetUserId(){
        return $this->userId;
    }

    public function GetUserName(){
        return $this->userName;
    }

    public function GetUserLogin(){
        return $this->userLogin;
    }

    public function logout(){
        $sql = "DELETE FROM ".TABLE_USER_AUTH. " WHERE session_id='".$this->getSessionID()."'";
        MyDB::execute($sql);
        $this->userId = 0;
        $this->userName = "";
        $this->userLogin = "";
    }

    public function login($login, $password){

        if($this->isLogged()){
            return true;
            exit();
        }

        $sql = "SELECT login,name,id FROM ".TABLE_USERS." WHERE login='".addslashes($login)."' AND password=PASSWORD('".addslashes($password)."')";

        $res = MyDB::query($sql);

        if( count($res) > 0 ){
            if( $this->addUserSession($res[0]['id']) ){
                $this->userId = $res[0]['id'];

                $this->userName = $res[0]['name'];
                $this->userLogin = $res[0]['login'];
                return true;
            }
        }
        return false;
    }

    public function cheakUserLogin($login, $password){

        $sql = "SELECT id FROM ".TABLE_USERS." WHERE login='".addslashes($login)."' AND password=PASSWORD('".addslashes($password)."')";

        $res = MyDB::query($sql);

        if( count($res) > 0 ){
            return $res['id'];
        }

        return false;

    }

    public function cheakUserAuth(){

        $this->userId = 0;
        $this->userName = "";
        $this->userLogin = "";

        $sql = "SELECT u.* FROM ".TABLE_USER_AUTH." ua INNER JOIN ".TABLE_USERS. " u ON ua.user_id=u.id WHERE ua.ip='".$_SERVER['REMOTE_ADDR']."' AND ua.session_id='".$this->getSessionID()."'";
       // echo $sql;


        if( $res = $this->dbo->query($sql) ){
            if( $row = $res->fetch_assoc() ){
                $this->userId = $row['id'];
                $this->userName = $row['name'];
                $this->userLogin = $row['login'];
            }
            $res->free();
        }

        return ($this->userId != 0);

    }



    public function addUserSession($userID){
        $sql = "INSERT INTO ".TABLE_USER_AUTH." (session_id,user_id,add_date,ip) VALUES ('".$this->getSessionID()."', '".$userID."', NOW(),  '".$_SERVER['REMOTE_ADDR']."' )";

        return MyDB::execute($sql);
    }
}
