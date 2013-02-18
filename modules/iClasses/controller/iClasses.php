<?php

class iClasses extends iDController {

    public function viewClassesPanel() {
      //  $this->bodytop(0);
        $this->renderOnly('iClasses');
    }
    
    public function viewAddClassPanel() {
        $this->renderOnly('iAddClass');
    }
    
    public function getAllClasses() {
        
        $uid = $this->post['uid'];
        $ulevel = $this->post['ulevel'];
        
        $res = $this->model->getAllClasses($uid, $ulevel);
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
  
     public function getTeachersNames() {
        
        $res = $this->model->getTeachersNames();
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
   
    public function addAClass() {
        
        $class_code = $this->post['classCode'];
        $class_section = $this->post['classSection'];
        $class_year = $this->post['year'];
        $class_semester = $this->post['semester'];
        $class_teacheruid = $this->post['teacher_uid'];
        $class_teachername = $this->post['teachername'];
        $class_schedule = $this->post['schedule'];
        
        $res = $this->model->addAClass($class_code,$class_section,$class_year,$class_semester,$class_teacheruid,$class_teachername,$class_schedule);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
                
        //session_start();
        if ($res) {
            $response = array("msg"=>1,"class_id"=>$res);
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
    
    public function getAllStudents() {
        
        $class_id = $this->post['classId'];
        $res = $this->model->getAllStudents($class_id);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
                
        //session_start();
        $num_rows = count($res);
        if ($res || $num_rows == 0) {
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
     
    public function authorizeStudents() {
        
        $class_id = $this->post['classId'];
        $auth_userid = $this->post['authStudent'];
        
        $res = $this->model->authorizeStudents($class_id,$auth_userid);
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
     
    public function authorizeStudentsAll() {
        
        $class_id = $this->post['classId'];
        $stuAdded = $this->post['stuAdded'];
        $stuRemoved = $this->post['stuRemoved'];
        
        $res = $this->model->authorizeStudentsAll($class_id,$stuAdded,$stuRemoved);
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
     
     public function removeAuthorization() {
        
        $class_id = $this->post['classId'];
        $remove_userid = $this->post['removeStudent'];
        
        $res = $this->model->removeAuthorization($class_id,$remove_userid);
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
    
    //public function authorizeStudents() {
    //    
    //    $class_id = $this->post['classId'];
    //    $addStudents = $this->post['addStudents'];
        //$removeStudents = $this->post['removeStudents'];
        
   //     $res = $this->model->authorizeStudents($class_id,$addStudents);
        //print "<pre>";
        //print_r($res);
        //print "</pre>";
                
        //session_start();
   //     if ($res) {
   //         $response = array("msg"=>1);
   //     } else  {
   //         $response = array("msg"=>0);
   //     }
   //     $this->raw(1);
   //     $this->json($response);        
   //  }
    
    
}

?>
