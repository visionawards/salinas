<?php

class iMyProfile extends iDController {

     public function viewMyProfilePanel() {
      //  $this->bodytop(0);
        $this->renderOnly('iMyProfile');
     }
    
     public function getMyInfo() {
        
        $user_id = $this->post['user_id'];
        
        $res = $this->model->getMyInfo($user_id);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
                
        //session_start();
        
        if ($res) {
            $response = array("msg"=>1,"result_info"=>$res);
            
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
     public function updateMyInfo() {
        
        $user_id = $this->post['user_id'];
        $firstname = $this->post['firstname'];
        $lastname = $this->post['lastname'];
        $fullname = $this->post['fullname'];
        $user_email = $this->post['user_email'];
        $password = $this->post['password'];
        if ($password != "") {
            $password = md5($password);
        }        
        $res = $this->model->updateMyInfo($user_id,$firstname,$lastname,$fullname,$user_email,$password);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
                
        //session_start();
        
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
