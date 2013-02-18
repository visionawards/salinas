<?php

class iSearchPage extends iDController {

    public function v() {
        $this->render("iSearchPage");
    }
    
     public function viewSearchPagePanel() {
      //  $this->bodytop(0);
        $this->renderOnly('iSearchPage');
        //$this->render('iSearchPage');
    }

    public function viewItemPagePanel() {
        $this->renderOnly('iItemPage');
    }
    
    public function viewFullImage() {
        $this->renderOnly('FullImage');
    }    
    
    public function viewAllTags() {
        
        $res = $this->model->viewAllTags();

        if ($res) {
            $num_rows = count($res);
            if ($num_rows > 0) {
                $response = array("msg"=>1,"alltag_rows"=>$res);
            } else {
                $response = array("msg"=>1,"alltag_rows"=>"");
            }
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
     public function searchTables() {
                 
        $gradeTags = $this->post['gradeList'];
        $mainTags = $this->post['mainList'];
        $subTags = $this->post['subList'];
        
        $res = $this->model->searchTables($gradeTags,$mainTags,$subTags);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
                
//        session_start();
        
        if ($res) {
            $num_rows = count($res);
            if ($num_rows > 0) {
                
                //print"<script>$num_rows</script>";
                $response = array("msg"=>1,"result_rows"=>$res);
            }
        } else  {
            $response = array("msg"=>1,"result_rows"=>"");
        }
        $this->raw(1);
        $this->json($response);        
     }

     public function getItemTags() {
        
        $doc_number = $this->post['doc_number'];
        
        $res = $this->model->getItemTags($doc_number);

//        session_start();
        
        if ($res) {
            $num_rows = count($res);
            if ($num_rows > 0) {
                $response = array("msg"=>1,"item_rows"=>$res);
            }
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }

     public function getPostComments() {
        
        $doc_number = $this->post['doc_number'];
        
        $res = $this->model->getPostComments($doc_number);

//        session_start();
        $num_rows = count($res);
        if ($res || $num_rows == 0) {
            if ($num_rows > 0) {
                $response = array("msg"=>1,"result_rows"=>$res);
            } else {
                $response = array("msg"=>1,"result_rows"=>"");
            }
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
     public function getClassPostComments() {
        
        $class_id = $this->post['classId'];
        $doc_id = $this->post['docId'];
        $teacher_uid = $this->post['teacherUID'];
        
        $res = $this->model->getClassPostComments($class_id,$doc_id,$teacher_uid);

//        session_start();
        $num_rows = count($res);
        if ($res || $num_rows == 0) {
            if ($num_rows > 0) {
                $response = array("msg"=>1,"result_rows"=>$res);
            } else {
                $response = array("msg"=>1,"result_rows"=>"");
            }
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
     public function getDiscuss() {
        
        $doc_number = $this->post['doc_number'];
        
        $res = $this->model->getDiscuss($doc_number);

//        session_start();
        
        if ($res) {
            $num_rows = count($res);
            if ($num_rows > 0) {
                $response = array("msg"=>1,"disc_rows"=>$res);
            }
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
     public function getClassList() {
        
        $uid = $this->post['uid'];
        $opt = $this->post['opt'];
        
        if($opt ==1) {
            $res = $this->model->getStudentClass($uid);
        }

        if($opt ==2) {
            $res = $this->model->getTeacherClass($uid);
        } 
        
        if($opt ==3) {
            $res = $this->model->getAdminClass();
        }         
        
//        session_start();
        $num_rows = count($res);
        if ($res || $num_rows == 0) {
            if ($num_rows > 0) {
                $response = array("msg"=>1,"result_rows"=>$res);
            } else {
                $response = array("msg"=>1,"result_rows"=>"");
            }
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
     public function viewAddTopicPanel() {
         $this->renderOnly('AddTopic');
     }
     
     public function doAddNewTopic() {
         $uid = $this->post['uid'];
         $cid = $this->post['cid'];
         $topic = $this->post['topic'];
            $topic = addslashes($topic);
            
            
         $nTID = $this->model->doAddNewTopic($uid, $cid, $topic);
         
         if($nTID >0) {
            $response = array("msg"=>1,"ntid"=>$nTID);
         } else {
            $response = array("msg"=>0);
        }
        
        $this->raw(1);
        $this->json($response);             
     }
     
     public function getClassDiscussion() {
         $uid = $this->post['uid'];
         $cid = $this->post['cid'];
         
         $d = $this->model->getClassDiscussion($uid,$cid);
         
         if($d) {
            $response = array("msg"=>1,"d"=>$d);
         } else {
            $response = array("msg"=>0);
        }
        
        $this->raw(1);
        $this->json($response);         
        
     }    
     
     public function viewPostComment() {
         $this->renderOnly('PostComment');
     }
     
     public function doPostComment() {
         $uid = $this->post['uid'];
         $cid = $this->post['cid'];
         $tid = $this->post['tid'];
         $comment = $this->post['comment'];
            $comment = addslashes($comment);
            
         $nCMT_ID = $this->model->doPostComment($uid, $cid, $tid, $comment);
         
         if($nCMT_ID >0) {
            $response = array("msg"=>1,"ncmt_id"=>$nCMT_ID);
         } else {
            $response = array("msg"=>0);
        }
        
        $this->raw(1);
        $this->json($response);             
            
     }
     
     public function viewTranscriptWindow() {
         $this->renderOnly("Transcript");
     }
}

?>
