<?php

class iCategory extends iDController {

    public function viewTagsPagePanel() {
      //  $this->bodytop(0);
        $this->renderOnly('iCategory');
    }
    
    public function getAllTags() {
        
        $res = $this->model->getAllTags();

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
     
     public function getMainTags() {
        
        $res = $this->model->getMainTags();

        if ($res) {
            $num_rows = count($res);
            if ($num_rows > 0) {
                $response = array("msg"=>1,"maintag_rows"=>$res);
            }
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
      
     public function getSubTags() {
        
        $mainTag_id = $this->post['main_id'];  
        
        $res = $this->model->getSubTags($mainTag_id);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
        if (count($res) == 0 || $res == true) {                    //if no subtags found, return msg=1
            $response = array("msg"=>1,"subtag_rows"=>$res,"rowCount"=>count($res));
            
            //$num_rows = count($res);
            //if ($num_rows > 0) {
            //    $response = array("msg"=>1,"subtag_rows"=>$res);
            //} else {
            //    $response = array("msg"=>1,"subtag_rows"=>"");
            //}
            
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
     public function addMainTags() {
        
        $new_mtitle = $this->post['new_maintitle'];  
        
        $res = $this->model->addMainTags($new_mtitle);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
         if ($res) {
            $response = array("msg"=>1,"insert_mainid"=>$res);
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
     public function addSubTags() {
        
        $mainTag_id = $this->post['main_id'];  
        $subTag_title = $this->post['subtag_title'];  
        
        $res = $this->model->addSubTags($mainTag_id,$subTag_title);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
         if ($res) {
            $response = array("msg"=>1,"insert_subid"=>$res);
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
     public function updateMainTags() {
        
        $edit_mtag = $this->post['edit_maintag'];   
        $edit_mtitle = $this->post['edit_maintitle'];  
        
        $res = $this->model->updateMainTags($edit_mtag,$edit_mtitle);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
         if ($res) {
            $response = array("msg"=>1);
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
    
      public function updateSubTags() {
        
        $edit_subTag = $this->post['edit_subtag'];   
        $edit_subTitle = $this->post['edit_subtitle'];  
        
        $res = $this->model->updateSubTags($edit_subTag,$edit_subTitle);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
         if ($res) {
            $response = array("msg"=>1);
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
     public function deleteMainTags() {
        
        $delete_mtag = $this->post['delete_maintag'];   
        
        $res = $this->model->deleteMainTags($delete_mtag);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
         if ($res) {
            $response = array("msg"=>1);
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
      public function deleteSubTags() {
        
        $delete_stag = $this->post['delete_subtag'];   
        
        $res = $this->model->deleteSubTags($delete_stag);
        if ($res) {
            $response = array("msg"=>1);
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
}

?>
