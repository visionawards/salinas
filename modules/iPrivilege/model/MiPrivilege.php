<?php

class MiPrivilege extends iDModel {
    
     public function searchUsers($lnameLetter) {
        
        $sqlSelect = "SELECT * FROM roser_user
                                    WHERE lastname LIKE '$lnameLetter%'
                                    ORDER BY lastname, firstname";
        
        $result = $this->db->query($sqlSelect,1);    
          
        return $result;
    }
    
    public function updateUsers($upd_userid,$upd_uname,$upd_ulevel,$upd_fname,$upd_lname,$upd_fullname,$upd_email) {
        
         $result = $this->db->query("UPDATE roser_user 
                                    SET username='$upd_uname',
                                        userlevel='$upd_ulevel',
                                        firstname='$upd_fname',
                                        lastname='$upd_lname',
                                        fullname='$upd_fullname',
                                        email='$upd_email'
                                     WHERE user_id='$upd_userid'",1);  
         
        if (mysql_affected_rows() >=0 ) {
            return true;
        } else {
            return $result;
        }
    }

    public function deleteUsers($delete_userid) {
        
        $sqlDelete = "DELETE FROM roser_user WHERE user_id='$delete_userid'";
        
        $result = $this->db->query($sqlDelete,1);    
        
        return $result;
        
    }

}

?>
