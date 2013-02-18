<?php

class iMyClass extends iDController {

       public function viewMyClassPanel() {
      //  $this->bodytop(0);
        $this->renderOnly('iMyClass');
    }
    
    public function searchClasses() {
        
        $res = $this->model->searchClasses();
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
                
        //session_start();
        if ($res) {
            $response = array("msg"=>1,"result_rows"=>$res);
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
    
     public function registerClasses() {
        
        $class_id = $this->post['class_id'];  
        $user_id = $this->post['user_id'];  
        
        $res = $this->model->registerClasses($class_id,$user_id);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
         if ($res) {
            $response = array("msg"=>1,"insert_id"=>$res);
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
     
}

?>
