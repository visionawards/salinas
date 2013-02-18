<?php

class MiMyProfile extends iDModel {
    
     public function getMyInfo($userid) {
        
        $sqlSelect = "SELECT * FROM roser_user
                                    WHERE user_id = $userid";
        
        $result = $this->db->query($sqlSelect,1);    
          
        return $result;
    }
    
    public function updateMyInfo($upd_userid,$upd_fname,$upd_lname,$upd_fullname,$upd_email,$upd_password) {
        
        if ($upd_password == "") {
            $sqlUpdate = "UPDATE roser_user SET firstname='$upd_fname',
                                                lastname='$upd_lname',
                                                fullname='$upd_fullname',
                                                email='$upd_email'
                                        WHERE user_id='$upd_userid'";
            
        } else {
            $sqlUpdate = "UPDATE roser_user SET firstname='$upd_fname',
                                                lastname='$upd_lname',
                                                fullname='$upd_fullname',
                                                email='$upd_email',
                                                password='$upd_password'
                                        WHERE user_id='$upd_userid'";
        }
        $result = $this->db->query($sqlUpdate,1);  
         
        if (mysql_affected_rows() >=0 ) {
            return true;
        } else {
            return $result;
        }
    }

    
}

?>
