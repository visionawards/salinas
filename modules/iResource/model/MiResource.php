<?php
/**
 *  MiResource model: this class gets data from iResource controller and 
 *  handles transaction between the controller and database
 * 
 *  @author David Kim <david.qwk@gmail.com>
 *  @namespace modules.iResource.model
 *  @extends iDucklling.system.mvc.iDModel
 * 
 */
Class MiResource extends iDModel {
    /**
     * retrieve resource data for a user and return it in 
     * as an object to its controller
     * 
     * @param {Integer} $uid user's unique id
     * @return {Object} $result resource data object
     * 
     */
    public function getResourceList($uid) {   
        //$result = $this->db->query("
        //    SELECT * FROM resource_doc WHERE resource_creator = '$uid'
        //",1);
        
        //$result = $this->db->query("
        //    SELECT * FROM resource_doc d LEFT JOIN resource_tags t ON d.doc_number = t.doc_number GROUP BY d.doc_number
        //",1);        
        
        $query = "SELECT * FROM resource_doc";
        $result = mysql_query($query);
        
        $r = array();
        $i = 0;
        while($row = mysql_fetch_array($result)) {
            $rid = $row['doc_number'];
            $r[$i]['doc_number'] = $rid;
            $r[$i]['title'] = stripcslashes($row['title']);
            $r[$i]['description'] = stripcslashes($row['description']);
            $r[$i]['filename'] = $row['filename'];
            $r[$i]['grade_level'] = $row['grade_level'];
            $r[$i]['grade_desc'] = $row['grade_desc'];
            $r[$i]['author'] = $row['author'];
            $r[$i]['age'] = $row['age'];
            
            //$query1 = "SELECT * FROM resource_tags rt, category_tags ct, subcategory_tags st WHERE rt.doc_number = '$rid' AND 
            //            rt.maintag_id = ct.maintag_id AND rt.subtag_id = st.subtag_id";
            $query1 = "SELECT * FROM resource_tags rt, category_tags ct WHERE rt.doc_number = '$rid' AND 
                        rt.maintag_id = ct.maintag_id GROUP BY rt.maintag_id"; 
            //$query1 = "SELECT * FROM resource_tags rt, category_tags ct WHERE rt.doc_number = '$rid' AND 
            //            rt.maintag_id = ct.maintag_id";             
            $result1 = mysql_query($query1);
            
            $tag = array();
            
            $j=0;
            while($row1 = mysql_fetch_array($result1)) {
                $tagid = $row1['resource_tag_id'];
                $maintag_id = $row1['maintag_id'];
                $tag[$j]['resource_tag_id'] = $tagid;
                $tag[$j]['maintag_id'] = $maintag_id;
                //$tag[$j]['subtag_id'] = $row1['subtag_id'];
                $tag[$j]['maintag_title'] = $row1['maintag_title'];
                //$tag[$j]['subtag_title'] = $row1['subtag_title'];
                //$subtag_id = $row1['subtag_id'];
                
                    #$query2 = "SELECT * FROM subcategory_tags WHERE main_id = '$maintag_id'";
                    #$query2 = "SELECT * FROM subcategory_tags WHERE subtag_id = '$subtag_id'";
                    $query2 = "SELECT * FROM resource_tags rt, subcategory_tags st WHERE rt.doc_number = '$rid' AND 
                                rt.subtag_id = st.subtag_id AND st.main_id = '$maintag_id'";                     
                    $result2 = mysql_query($query2);
                    
                    $subtag = array();
                    $k=0;
                    while($row2 = mysql_fetch_array($result2)) {
                        $subtagid = $row2['subtag_id'];
                        $subtag[$k]['subtag_id'] = $subtagid;
                        $subtag[$k]['subtag_title'] = $row2['subtag_title'];
                        
                        $k++;
                    }
                
                $tag[$j]['subtag'] = $subtag; 
                    
                $j++;
            }
            
            $r[$i]['tag'] = $tag;
            
            $i++;
        }
        
        return $r;
    }
    
     public function viewAllTags() {
        
        $sqlSelect = "SELECT category_tags.*, subcategory_tags.*                                        
                                FROM category_tags 
                                LEFT OUTER JOIN subcategory_tags                        
                                ON subcategory_tags.main_id = category_tags.maintag_id
                                ORDER BY category_tags.maintag_id, subcategory_tags.subtag_id";
        
        $result = $this->db->query($sqlSelect,1);    

        return $result;
            
    }
    
    public function submitResource($title, $desc, $gradeIdx, $grade, $tags, $filename, $author, $age) {
        $query = "INSERT INTO resource_doc (filename,title,description,author,grade_level,grade_desc,age) VALUES 
                    ('$filename','$title','$desc','$author','$gradeIdx','$grade','$age')";
        $result = mysql_query($query);
        
        $nResID = mysql_insert_id();
        
        if($nResID >0) {
            
            for($i = 0; $i < count($tags); $i++) {
                $maintag_id = $tags[$i]->main_id;
                $subtag_id = $tags[$i]->sub_id;
                
                if($maintag_id >0) {
                    $query1 = "INSERT INTO resource_tags (doc_number,maintag_id, subtag_id) VALUES ('$nResID','$maintag_id','$subtag_id')";
                    $result1 = mysql_query($query1);
                }
                
            }
        } 
        
        return $nResID;
    }
    
    public function doEditResource($rid, $title, $desc, $gradeIdx, $grade, $tags, $author, $age) {
        
        $tags = json_decode($tags);
        
        $query = "UPDATE resource_doc SET title = '$title', description = '$desc', author = '$author', grade_level = '$gradeIdx', grade_desc = '$grade', age = '$age'  
                    WHERE doc_number = '$rid'";
        $result = mysql_query($query);
        
        if($result) {
                               
            $query1 = "DELETE FROM resource_tags WHERE doc_number = '$rid'";
            $result1 = mysql_query($query1);            
            
            for($i = 0; $i < count($tags); $i++) {
                $maintag_id = $tags[$i]->main_id;
                $subtag_id = $tags[$i]->sub_id;
                
                if($maintag_id >0) {
                    
                    //$query0 = "SELECT COUNT(resource_tag_id) FROM resource_tags WHERE doc_number = '$rid' AND maintag_id = '$maintag_id' AND subtag_id = '$subtag_id'";
                    //$result0 = mysql_num_rows(mysql_query($query0));
                    
                    //if($result0 >0) {
                    //    $query1 = "DELETE FROM resource_tags WHERE maintag_id = '$maintag_id'";
                    //    $result1 = mysql_query($query1);
                    //}                                            
                        
                    $query2 = "INSERT INTO resource_tags (doc_number,maintag_id,subtag_id) VALUES ('$rid','$maintag_id','$subtag_id')";                    
                    $result2 = mysql_query($query2);
                }                
            }            
        }
        
        return $result;
    }    
    
    public function deleteResource($rid) {
        $query = "DELETE FROM resource_doc WHERE doc_number = '$rid'";
        $result = mysql_query($query);
        
        if($result) {
            $query1 = "DELETE FROM resource_tags WHERE doc_number = '$rid'";
            $result1 = mysql_query($query1);
        }
        
        return $result1;
    }
}

?>
