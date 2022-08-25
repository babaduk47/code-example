<?php
class MyDB
{
    private static $db = null;
    private static $is_connected=null;

    public function __construct(){
        self::$db = null;
        $this->connect();
    }

    public function __destructor(){
        if( $this->db )
            $this->db->close();
    }

    public function connect(){
        if ( self::$db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME) ) {
            self::$is_connected=true;
      }
    }

    public static function get_db_instance(){
        if( self::$is_connected ){
            return self::$db;
        }
        return null;
    }

    public static function query($sql){
        $data = Array();
        //$is_connected=true;
        if( self::$is_connected ){
            if( $res = self::$db->query($sql) ){
                while ( $row = $res->fetch_assoc()) {
                    $data[] = $row;
                }
                $res->free();
            }
        }
        return $data;
    }

    public static function execute($sql){
        if ( self::$is_connected ){
            if ( self::$db->query($sql) ) return true;
        }
        return false;
    }
}


