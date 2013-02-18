<?php

class MiCategory extends iDModel {
    
    public function getAllTags() {
        
        $sqlSelect = "SELECT category_tags.*, subcategory_tags.*                                        
                                FROM category_tags 
                                LEFT OUTER JOIN subcategory_tags                        
                                ON subcategory_tags.main_id = category_tags.maintag_id
                                ORDER BY category_tags.maintag_id, subcategory_tags.subtag_id";
        
        $result = $this->db->query($sqlSelect,1);    

        return $result;
        
            
    }
    
    public function getMainTags() {
        
        $sqlSelect = "SELECT * FROM category_tags
                                 ORDER BY maintag_id";
        
        $result = $this->db->query($sqlSelect,1);    

        return $result;
        
            
    }
    
    public function getSubTags($mainTag_id) {
        
        $sqlSelect = "SELECT * FROM subcategory_tags 
                              WHERE main_id = $mainTag_id  
                              ORDER BY subtag_id";
        
        $result = $this->db->query($sqlSelect,1);  
        
        return $result;
        
            
    }
   
     public function addMainTags($new_maintitle) {
        
        $result = $this->db->query("INSERT INTO category_tags (maintag_title)
                        VALUES ('$new_maintitle')",1);  
        
        if ($result) {
            $inserted_mainId = mysql_insert_id();
            return $inserted_mainId;
        } else {
            return $result;
        }    
        
    }
    
    
    
     public function addSubTags($mainTag_id,$subTag_title) {
        
        $result = $this->db->query("INSERT INTO subcategory_tags (main_id, subtag_title)
                        VALUES ('$mainTag_id', '$subTag_title')",1);  
        
        if ($result) {
            $subtag_id = mysql_insert_id();
            return $subtag_id;
        } else {
            return $result;
        }    
            
    }
    
     public function updateMainTags($edit_mtag,$edit_maintitle) {
        
         $result = $this->db->query("UPDATE category_tags SET maintag_title='$edit_maintitle'
                                     WHERE maintag_id='$edit_mtag'",1);  
        if (mysql_affected_rows() >=0 ) {
            return true;
        } else {
            return $result;
            
        }
    }
    
     public function updateSubTags($edit_subtag,$edit_subtitle) {
        
         $result = $this->db->query("UPDATE subcategory_tags SET subtag_title='$edit_subtitle'
                                     WHERE subtag_id='$edit_subtag'",1);  
         
        if (mysql_affected_rows() >=0 ) {
            return true;
        } else {
            return $result;
            
        }
    }
    
    public function deleteMainTags($delete_mtag) {
        
        $sqlResource = 'SELECT count(*) FROM category_tags ct
                            LEFT JOIN resource_tags rt
                            ON rt.maintag_id = ct.maintag_id';
        
        $result = $this->db->query($sqlResource,1);    
        
        if ($result > 0)  {
            return $result;
        }  else {
        
        $resultmain = $this->db->query("DELETE FROM category_tags WHERE maintag_id='$delete_mtag'",1);  
        $resultsub = $this->db->query("DELETE FROM subcategory_tags WHERE main_id='$delete_mtag'",1);  
            
            if (mysql_affected_rows() >=0 ) {
                return true;
            } else {
                return $result;

            }
        }
    }
    
    public function deleteSubTags($delete_subtag) {
        
        $sqlResource = "SELECT * FROM subcategory_tags st
                            INNER JOIN resource_tags rt
                            ON rt.subtag_id = st.subtag_id
                            WHERE rt.subtag_id = '$delete_subtag' ";
        
        $result = $this->db->query($sqlResource,1);    
        
        $num_rows = mysql_num_rows($result);
        
        if ($num_rows == 0)  {
            $result = $this->db->query("DELETE FROM subcategory_tags WHERE subtag_id='$delete_subtag'",1);  
            return $result;
        }  else {
            return false;
        }
    }
   
}

?>
