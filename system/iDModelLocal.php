<?php

abstract class iDModelLocal {

    public function __construct() {
        $mydb = new iDDatabaseFactory();
        $this->db = $mydb->getInstance('mysql', 'db');
        if(DB_ON == 1) {
            $this->db->connect('localhost','roser_childwrit','david','zxcvbn');
        }
    }
}

?>
