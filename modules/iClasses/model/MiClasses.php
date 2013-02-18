<?php

class MiClasses extends iDModel {
    
     public function getAllClasses($uid, $ulevel) {
        
        if($ulevel > 2) { 
            $sqlSelect = "SELECT  *  FROM roser_class rc
                                 ORDER BY rc.year DESC, rc.semester, rc.class_code, rc.class_section, rc.schedule, rc.teacher_name";

        }
        elseif($ulevel ==2) {
            $sqlSelect = "SELECT  *  FROM roser_class rc WHERE teacher_userid = '$uid' 
                                 ORDER BY rc.year DESC, rc.semester, rc.class_code, rc.class_section, rc.schedule, rc.teacher_name";            
        }
        
        $result = $this->db->query($sqlSelect,1);    
          
        return $result;
    }
   
     public function getTeachersNames() {
        
        $sqlSelect = "SELECT *  FROM roser_user ru
                               WHERE ru.userlevel = '2'
	                    ORDER BY ru.lastname, ru.firstname";
        
        $result = $this->db->query($sqlSelect,1);    
          
        return $result;
    }
   
     public function addAClass($class_code,$class_section,$class_year,$class_semester,$class_teacheruid,$class_teachername,$class_schedule) {
        
        $result = $this->db->query("INSERT INTO roser_class (class_code, class_section, year, semester, teacher_userid, teacher_name, schedule)
                                    VALUES ('$class_code', '$class_section','$class_year','$class_semester','$class_teacheruid','$class_teachername','$class_schedule')",1);  
        
        if ($result) {
            $class_id = mysql_insert_id();
            return $class_id;
        } else {
            return $result;
        }    
            
    }
    
    public function getAllStudents($class_id) {
        
        $sqlSelect = "SELECT * FROM roser_user  ru
                         INNER JOIN roser_students rs
                                ON  rs.user_idno = ru.user_id
                              WHERE rs.class_idno = '$class_id'
                           ORDER BY ru.lastname, ru.firstname ";
        
        $result = $this->db->query($sqlSelect,1);    
          
        return $result;
    }
   
    
    public function authorizeStudents($class_id,$auth_userid) {
        
         $sqlUpdate = "UPDATE roser_students
                              SET authorized = '1'
                      WHERE class_idno = $class_id AND user_idno = $auth_userid";
         
        $result = $this->db->query($sqlUpdate,1);    
          
        //return $result; 
        
        if (mysql_affected_rows() > 0 ) {
            return true;
        } else {
            return $result;
        }
        
    }
    
    public function authorizeStudentsAll($class_id,$stuAdded,$stuRemoved) {
        
        $arrAdded = split("##",$stuAdded);
        $arrRemoved = split("##",$stuRemoved);
        
        foreach($arrAdded as $k => $v) {
            if($v >0) {
                $sqlUpdate = "UPDATE roser_students
                                  SET authorized = '1'
                          WHERE class_idno = $class_id AND user_idno = $v";

                $result = mysql_query($sqlUpdate);    
            }
          
        }
    
        foreach($arrRemoved as $k1 => $v1) {
            if($v1 >0) {
                $sqlUpdate1 = "UPDATE roser_students
                                  SET authorized = '0'
                          WHERE class_idno = $class_id AND user_idno = $v1";

                $result1 = mysql_query($sqlUpdate1);    
            }
          
        }        
        
        if (mysql_affected_rows() > 0 ) {
            return true;
        } else {
            return $result;
        }
        
    }    
    
    public function removeAuthorization($class_id,$remove_userid) {
        
         $sqlUpdate = "UPDATE roser_students
                              SET authorized = '0'
                      WHERE class_idno = $class_id AND user_idno = $remove_userid";
         
        $result = $this->db->query($sqlUpdate,1);    
          
        //return $result; 
        
        if (mysql_affected_rows() > 0 ) {
            return true;
        } else {
            return $result;
        }
        
    }
   
    //public function authorizeStudents($class_id,$addStudents) {
    //    
    //     $sqlUpdate = "UPDATE roser_students
    //                          SET authorized = CASE 
    //                          WHEN user_idno IN ($addStudents) then '1'
    //                          ELSE false
    //                          END
    //                  WHERE class_idno = $class_id";
    //     
    //    $result = $this->db->query($sqlUpdate,1);    
          
        //return $result; 
        
    //    if (mysql_affected_rows() >=0 ) {
    //        return true;
    //    } else {
    //        return $result;
    //    }
        
    //}
    
}

?>
