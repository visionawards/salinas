<?php

class MiMyClass extends iDModel {
    
    public function searchClasses() {
        
        $sqlSelect = "SELECT  *  FROM roser_class  rc
                            LEFT JOIN roser_students rs
	                           ON rs.class_idno = rc.class_id
	                     ORDER BY rc.year DESC, rc.semester, rc.class_code, rc.class_section, rs.user_idno";
        
        $result = $this->db->query($sqlSelect,1);    
          
        return $result;
    }
    
    public function registerClasses($class_id,$user_id) {
        
        
       $result = $this->db->query("INSERT INTO roser_students (class_idno, user_idno, authorized)
                        VALUES ('$class_id', '$user_id','0')",1);  
        
       if ($result) {
            $insert_id = mysql_insert_id();
            return $insert_id;
       } else {
            return $result;
       }    
            
    }
    
}

?>
