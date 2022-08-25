<?php
class Dbh{

    private $db;

    public __constructor(){
        $this->db = null;
    }

    public __destructor(){
        if( $this->db )
        $this->db->close();
    }

    public function connect(){
        $this->db = new mysqli("127.0.0.1", "root", "", "public_transport");
    }

    public function query($sql){
        $its = Array();
        if( $this->db == null )
            return $its;
        if( $res = $this->db->query($sql) )
        {
            while( $row = $res->fetch_assoc() )
            {
                $its[] = $row;
            }
            $res->free();
        }
        return $its;
    }

    public function query2($sql){
        $its = 0;
        if( $this->db == null )
            return $its;
        if( $res = $this->db->query($sql) )
        {
            $its = $res->num_rows;
            $res->free();
        }
        return $its;
    }
}
?>
