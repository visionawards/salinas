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
        
        
        //$whereQuery = ($mainTags != "") ? ($subTags != "") ? $tagsQuery : $mainQuery : ($subTags != "") ? $subQuery : "";
        
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

        //print $orderBy; 
        //print '    ';
        //print $sqlSelect;
        
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
    
    public function getPostComments($doc_num) {
        
        $sqlSelect = "SELECT * FROM roser_posts rp
                         INNER JOIN roser_comments rc
                                 ON rc.comment_postid = rp.post_id
                              WHERE rp.post_docid = $doc_num
                           ORDER BY rp.post_docid, rp.post_date DESC, rp.post_time DESC, rc.comment_date DESC, rc.comment_time DESC";
        
        $result = $this->db->query($sqlSelect,1);    

        return $result;
        
            
    }
    
    public function getClassPostComments($class_id,$doc_id,$teacher_userid) {
        
        $sqlSelect = "SELECT * FROM roser_class rcl
                         INNER JOIN roser_posts rp
                                 ON rp.post_classid = rcl.class_id
                         INNER JOIN roser_comments rc
                                 ON rc.comment_postid = rp.post_id
                              WHERE rcl.class_id = $class_id AND rp.post_docid = $doc_id AND rcl.teacher_userid = $teacher_userid
                           ORDER BY rp.post_date DESC, rp.post_time DESC, rc.comment_date DESC, rc.comment_time DESC";
        
        $result = $this->db->query($sqlSelect,1);    

        return $result;
        
            
    }

    public function getStudentClass($uid) {
        
        $sqlSelect = "SELECT * FROM roser_class rc, roser_students rs, roser_user ru 
                                    WHERE rs.user_idno = '$uid' AND  rs.user_idno = ru.user_id AND rc.class_id = rs.class_idno 
                                        AND rs.authorized = '1'  
                                 ORDER BY rc.year, rc.semester, rc.class_code, rc.class_section, rc.schedule";
        
        $result = $this->db->query($sqlSelect,1);    

        return $result;
        
            
    }    
    
    public function getTeacherClass($uid) {
        
        $sqlSelect = "SELECT * FROM roser_class 
                                    WHERE teacher_userid = $uid
                                 ORDER BY year, semester, class_code, class_section, schedule";
        
        $result = $this->db->query($sqlSelect,1);    

        return $result;
        
    }

    public function getAdminClass() {
        
        $sqlSelect = "SELECT * FROM roser_class                                     
                                 ORDER BY year, semester, class_code, class_section, schedule";
        
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
    
    public function doAddNewTopic($uid, $cid, $topic) {
        $now = time();
        $query = "INSERT INTO discussion_topic (discussion_class_id,topic_text,topic_creator,topic_date) VALUES 
                    ('$cid','$topic','$uid','$now')";
        $result = mysql_query($query);
        
        $nTID = mysql_insert_id();
        
        return $nTID;
    }
    
    public function getClassDiscussion($uid, $cid) {
        //$query = "SELECT * FROM discussion_topic WHERE discussion_class_id = '$cid' AND topic_creator = '$uid'";
        $query = "SELECT * FROM discussion_topic t, roser_user u  WHERE u.user_id = t.topic_creator AND 
                    t.discussion_class_id = '$cid'";
        $result = mysql_query($query);
        
        $i = 0;
        $d = array();
        while($row = mysql_fetch_array($result)) {
            
            $tid = $row['discussion_topic_id'];
            $d[$i]['tid'] = $tid;
            $d[$i]['cid'] = $row['discussion_class_id'];
            $d[$i]['topic'] = $row['topic_text'];
            $d[$i]['creator'] = $row['topic_creator'];
            $d[$i]['fname'] = $row['firstname'];
            $d[$i]['lname'] = $row['lastname'];
            $d[$i]['fullname'] = $row['fullname'];
            $date = $row['topic_date'];
            $d[$i]['date'] = date("m/d/Y H:i:s", $date);
            
            $query1 = "SELECT * FROM discussion_comment c, roser_user u WHERE c.comment_author = u.user_id AND c.topic_id = '$tid'";
            $result1 = mysql_query($query1);
            
            $j=0;
            $c = array();
            while($row1 = mysql_fetch_array($result1)) {
                
                $cmt_id = $row1['discussion_comment_id'];
                $c[$j]['cid'] = $cmt_id;
                $c[$j]['tid'] = $tid;
                $c[$j]['author'] = $row1['comment_author'];
                $c[$j]['fname'] = $row1['firstname'];
                $c[$j]['lname'] = $row1['lastname'];
                $c[$j]['fullname'] = $row1['fullname'];                
                $c[$j]['comment'] = $row1['comment_text'];
                $cmt_date = $row1['comment_date'];
                $c[$j]['date'] = date("m/d/Y H:i:s", $cmt_date);
                
                $j++;
            }
            
            if($_SESSION['ulevel'] ==1) {
                $query0 = "SELECT COUNT(discussion_comment_id) FROM discussion_comment WHERE topic_id = '$tid' AND comment_author = '$uid'";
                $d[$i]['can'] = mysql_result(mysql_query($query0),0,0);
            }
            
            $d[$i]['c'] = $c;
            
            $i++;
        }        
        
        return $d;
    }
    
    public function doPostComment($uid, $cid, $tid, $comment) {
        $now = time();
        $query = "INSERT INTO discussion_comment (topic_id,comment_author,comment_text,comment_date) VALUES 
                    ('$tid','$uid','$comment','$now')";
        $result = mysql_query($query);
        
        $nCMT_ID = mysql_insert_id();
        
        return $nCMT_ID;        
    }
    
}

?>
