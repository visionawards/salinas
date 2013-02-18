<?php

class iPrivilege extends iDController {

    public function viewPrivilegePanel() {
      //  $this->bodytop(0);
        $this->renderOnly('iPrivilege');
    }
    
   public function viewUserPagePanel() {
        $this->renderOnly('iUserPage');
    }
    
    public function searchUsers() {
        
        $lnameLetter = $this->post['lnameStart'];
        
        $res = $this->model->searchUsers($lnameLetter);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
                
        //session_start();
        $num_rows = count($res);
        
        if ($res || $num_rows == 0) {
            //print"<script>$num_rows</script>";
            if ($num_rows == 0) {
                $response = array("msg"=>1,"result_rows"=>"");
            } else {
                $response = array("msg"=>1,"result_rows"=>$res);
            }
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
     public function updateUsers() {
        $upd_userid = $this->post['userid'];  
        $upd_uname = $this->post['username'];  
        $upd_ulevel = $this->post['userlevel'];  
        $upd_fname = $this->post['firstname'];   
        $upd_lname = $this->post['lastname'];  
        $upd_fullname = $this->post['fullname'];   
        $upd_email = $this->post['user_email'];  
        
        $res = $this->model->updateUsers($upd_userid,$upd_uname,$upd_ulevel,$upd_fname,$upd_lname,$upd_fullname,$upd_email);
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
     
    public function deleteUsers() {
        
        $delete_userid = $this->post['userid'];   
        
        $res = $this->model->deleteUsers($delete_userid);
        
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
