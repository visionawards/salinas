<?php

class iDLocalMySQL {

    public $db;

    public function __construct() {
        $this->iD = new iDucklingFacade();
    }
    
    public function db() {
        //$this->db = $this->iD->getDB('mysql');
        return $this->db;
    }

    public function connect() {
//        /return $this->db->connect('localhost','ptl','david','zxcvbn');
    }

    public function query($sql) {
        return $this->db->query($sql);
    }
}

?>
