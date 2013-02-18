<?php

class MiSearchPage extends iDModel {
    
    public function viewAllTags() {
        
        $sqlSelect = "SELECT category_tags.*, subcategory_tags.*                                        
                                FROM category_tags 
                                LEFT OUTER JOIN subcategory_tags                        
                                ON subcategory_tags.main_id = category_tags.maintag_id
                                ORDER BY category_tags.maintag_id, subcategory_tags.subtag_id";
        
        $result = $this->db->query($sqlSelect,1);    

        return $result;
            
    }
    
    
    
    public function searchTables($gradeTags,$mainTags,$subTags) {
        
        $gradeQuery = " AND rd.grade_level IN ($gradeTags)";
        $mainQuery =  " AND rt.maintag_id IN ($mainTags)"; 
        $subQuery = " AND rt.subtag_id IN ($subTags)";   
        $tagsQuery =  " AND (rt.maintag_id IN ($mainTags) OR rt.subtag_id IN ($subTags))"; 
        $orderBy = " ORDER BY rd.doc_number";
        
        
/*        
        if ($gradeTags == "") {
            $gradeQuery = "";
        }
            
        if ($mainTags == "") {
            $mainQuery = "";
        }
        
        if ($subTags == "") {
            $subQuery = "";
        }
        
        $sqlSelect = 'SELECT * FROM resource_doc, resource_tags, category_tags, subcategory_tags 
                                          WHERE resource_doc.doc_number = resource_tags.doc_number 
                                            AND resource_tags.maintag_id = category_tags.maintag_id
                                            AND (resource_tags.subtag_id = subcategory_tags.subtag_id 
                                            OR resource_tags.subtag_id IS NULL) '. $gradeQuery . ' ' . $mainQuery . ' ' . $subQuery 
                                         . ' ORDER BY resource_tags.doc_number, resource_tags.maintag_id, resource_tags.subtag_id';
*/        
/*        
        $queryA = ($gradeTags != '') ? " AND ( rd.grade_level IN ($gradeTags)": '';
        $queryB =  ($mainTags != '') ? ($queryA != '') ? $queryA . " OR rt.maintag_id IN ($mainTags)" : $queryA . " AND ( rt.maintag_id IN ($mainTags)" : $queryA; 
        $queryC = ($subTags != '') ? ($queryB != '') ? $queryB . " OR rt.subtag_id IN ($subTags)" : $queryB . " AND ( rt.subtag_id IN ($subTags)" : $queryB;
        //$orderQuery = ($subTags != '') ? "ORDER BY rt.doc_number, rt.maintag_id, rt.subtag_id" : ($mainTags != '') ? "ORDER BY rt.doc_number,rt.maintag_id" : "ORDER BY rt.doc_number";
        $queryClosing = ($queryC != '') ? $queryC . " ) " : $queryC;
        $orderQuery = ($mainTags != '') ? " ORDER BY rt.doc_number, rt.maintag_id " : " ORDER BY rt.doc_number";
        $orderQuery .= ($subTags != '') ? ", rt.subtag_id" : '';        
 
        $sqlSelect = 'SELECT * FROM resource_doc rd INNER JOIN resource_tags rt USING (doc_number) 
                                                    LEFT JOIN category_tags ct ON rt.maintag_id = ct.maintag_id 
                                                    LEFT JOIN subcategory_tags st ON st.main_id = ct.maintag_id   
                                                    WHERE 1=1 '. ' ' . $queryClosing  
                                         . $orderQuery;        
  
  
  
  
*/
        
        //$whereQuery = ($mainTags != "") ? ($subTags != "") ? $tagsQuery : $mainQuery : ($subTags != "") ? $subQuery : "";
        
        $whereQuery = "";
        $whereQuery = ($mainTags != "" && $subTags == "") ? $mainQuery : "";
        $whereQuery = ($mainTags == "" && $subTags != "") ? $subQuery : "";
        $whereQuery = ($mainTags != "" && $subTags != "") ? $tagsQuery : "";
        
        if ($mainTags != "") {
            if ($subTags != "") {
                $whereQuery = $tagsQuery;
            } else {
                $whereQuery = $mainQuery;
            }
        } else if  ($subTags != "" ) {
                $whereQuery = $subQuery;
        } else {
                $whereQuery = "";
        }
        
        $whereQuery .= ($gradeTags != "") ? $gradeQuery : "";
        $orderBy .= ($mainTags != "") ? ($subTags != "") ? ", rt.maintag_id, rt.subtag_id" : ", rt.maintag_id" : ($subTags != "") ? ", rt.maintag_id, rt.subtag_id" : "";
        
        $sqlSelect = 'SELECT * FROM resource_doc rd 
                            INNER JOIN resource_tags rt USING (doc_number) 
                            LEFT JOIN category_tags ct ON rt.maintag_id = ct.maintag_id 
                            LEFT JOIN subcategory_tags st ON (st.main_id = ct.maintag_id AND rt.subtag_id = st.subtag_id)
                            WHERE (1=1 '. ' ' . $whereQuery .')'. ' ' . $orderBy;  
/* 
        print $gradeTags;
        print '    ';
        print $mainTags;
        print '    ';
        print $subTags;
        print '    ';
        print $whereQuery;
        print '    ';
        print $sqlSelect;
*/
        $result = $this->db->query($sqlSelect,1);    

        return $result;
        
            
    }

    
     public function getItemTags($doc_num) {
        
        $sqlSelect = "SELECT * FROM resource_tags, category_tags, subcategory_tags  
                                    WHERE resource_tags.doc_number = $doc_num 
                                      AND resource_tags.maintag_id = category_tags.maintag_id
                                      AND resource_tags.subtag_id = subcategory_tags.subtag_id 
                                 ORDER BY category_tags.maintag_id, subcategory_tags.subtag_id";
        
        $result = $this->db->query($sqlSelect,1);    

        return $result;
        
            
    }
    
    public function getDiscuss($doc_num) {
        
        $sqlSelect = "SELECT * FROM discussion_thread 
                                    WHERE discussion_thread.disc_docnum = $doc_num 
                                 ORDER BY disc_docnum, disc_date DESC, disc_time, disc_thread";
        
        $result = $this->db->query($sqlSelect,1);    

        return $result;
        
            
    }


    
}

?>
