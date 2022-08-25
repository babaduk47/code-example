<?php
class Session
{
    private $sessionID = "";

    public function __construct($path = ""){
        if($path != ""){
            session_save_path($path);
        }
        session_start();
        $this->sessionID = session_id();
    }

    public function getSessionID(){
        return $this->sessionID;
    }
}
