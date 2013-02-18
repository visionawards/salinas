<?php

Class SignUp extends iDController {

     
    public function viewSignUp ()  {
        $this->renderOnly('SignUp');
    }
    
    public function doSignUp() {
        $firstname = $this->post['firstname'];
        $lastname = $this->post['lastname'];
//        $fullname = $this->post['fullname'];
        $username = $this->post['username'];
        $email = $this->post['email'];
        $password = $this->post['password'];

        $checkUsername = $this->model->checkUsername($username);

        if($checkUsername > 0) {
            $response = array("msg" => "3");

        } elseif($checkUsername == 0) {
            $checkEmail = $this->model->checkEmail($email);

            if($checkEmail > 0) {
                $response = array("msg" => "2");
            }
            elseif($checkEmail == 0) {

                $reg_time = time();

                $password = md5($password);
                $fullname = $firstname . " " . $lastname;
                $userlevel = '1';

                $myUID = $this->model->doSignUp($username,$userlevel,$firstname,$lastname,$fullname,$email,$password,$reg_time);
                
                if($myUID > 0) {

                    
 //                   if(copy($dataDir.$sampleAudFile1, $upADir."/".$sampleAudFile1)) {
 //                       if(copy($dataDir.$sampleAudFile2, $upADir."/".$sampleAudFile2)) {
//                            if(copy($dataDir.$sampleVidFile1, $upVDir."/".$sampleVidFile1)) {
//                                if(copy($dataDir.$sampleVidFile2, $upVDir."/".$sampleVidFile2)) {
//                                    $result = $this->model->addSampleMediaData($myUID,$sampleAudFile1,$sampleAudFile2,$sampleVidFile1,$sampleVidFile2);
//                                    if($result) {
//                                        $response = array("msg" => "1");
 //                                   } else {
 //                                       $response = array("msg" => "0");
  //                                  }
   //                             }
     //                       }
      //                  }
       //             }
                    $response = array("msg" => "1");
                } else {
                    $response = array("msg" => "3");
                }
                
            }
        }      
        
        //$this->render("iLogin");

        $this->raw(1);

        $this->json($response);
    }
/*
    public function doFBSignUp() {

        $firstname = $this->post['firstname'];
        $lastname = $this->post['lastname'];
        $fullname = $this->post['fullname'];
        $username = $this->post['username'];
        $email = $this->post['email'];
        $fb = $this->post['fb'];
        $fbid = $this->post['fbid'];

        $checkFBID = $this->model->checkFBID($fbid);

        if($checkFBID > 0) {
            $response = array("msg" => "4");

        } elseif($checkFBID == 0) {
            $checkEmail = $this->model->checkEmail($email);

            if($checkEmail > 0) {
                $response = array("msg" => "2");
            }
            elseif($checkEmail == 0) {

                $reg_time = time();

                $password = md5($password);

                $myUID = $this->model->doFBSignUp($firstname,$lastname,$fullname,$username,$email,$fbid,$reg_time);
                
                if($myUID > 0) {

                    //$uDir = "data/" . $myUID;
                    $uDir = DATA_PATH_R . $myUID;
                    $tDir = $uDir . "/timeline";
                    $eDir = $uDir . "/exhibit";
                    $mDir = $uDir . "/map";
                    $dDir = $uDir . "/data";
                    $fDir = $uDir . "/font";
                    $upDir = $uDir . "/uploads";
                        
                        $pDir = $dDir . "/profile";
                        
                        $upIDir = $upDir . "/image";
                        $upADir = $upDir . "/audio";
                        $upVDir = $upDir . "/video";

                    $taDir = $tDir . "/asset";
                    $toDir = $tDir . "/object";
                    $tbDir = $tDir . '/background';
                    $tgDir = $tDir . '/gallery';
                    $tgDir = $tDir . '/theme';

                    $imgDir = $taDir . "/image";
                    $audDir = $taDir . "/audio";
                        $audcDir = $audDir . "/cover";
                    $vidDir = $taDir . "/video";
                        $vidcDir = $vidDir . "/cover";

                    $othmDir = $toDir . "/thm";
                    $opreDir = $toDir . "/preview";

                    $ebDir = $eDir . '/background';
                    $eiDir = $eDir . '/item';

                    $mthmDir = $mDir . "/thm";
                    $mprevDir = $mDir . "/preview";

                    $thmDir = $imgDir . "/thm";
                    $prevDir = $imgDir . "/preview";                                     
                    
                    mkdir($uDir, 0777);
                    mkdir($dDir, 0777);
                    mkdir($tDir, 0777);
                    mkdir($eDir, 0777);
                    mkdir($mDir, 0777);
                    mkdir($fDir, 0777);
                    mkdir($pDir, 0777);
                    mkdir($upDir, 0777);

                    mkdir($taDir, 0777);
                    mkdir($toDir, 0777);
                    mkdir($tbDir, 0777);
                    mkdir($tgDir, 0777);
                    mkdir($imgDir, 0777);
                    mkdir($audDir, 0777);
                    mkdir($vidDir, 0777);
                    mkdir($audcDir, 0777);
                    mkdir($vidcDir, 0777);
                    mkdir($othmDir, 0777);
                    mkdir($opreDir, 0777);
                    
                    mkdir($upIDir, 0777);
                    mkdir($upADir, 0777);
                    mkdir($upVDir, 0777);                      
                    
                    mkdir($ebDir, 0777);
                    mkdir($eiDir, 0777);

                    mkdir($mthmDir, 0777);
                    mkdir($mprevDir, 0777);

                    mkdir($thmDir, 0777);
                    mkdir($prevDir, 0777);
                    
                    $dataDir = "data/";
                    $sampleAudFile1 = "sample.mp3.mp3";
                    $sampleAudFile2 = "sample.mp3.ogg";
                    $sampleVidFile1 = "sample.wmv.mp4";
                    $sampleVidFile2 = "sample.wmv.ogv";
                    
                    if(copy($dataDir.$sampleAudFile1, $upADir."/".$sampleAudFile1)) {
                        if(copy($dataDir.$sampleAudFile2, $upADir."/".$sampleAudFile2)) {
                            if(copy($dataDir.$sampleVidFile1, $upVDir."/".$sampleVidFile1)) {
                                if(copy($dataDir.$sampleVidFile2, $upVDir."/".$sampleVidFile2)) {
                                    $result = $this->model->addSampleMediaData($myUID,$sampleAudFile1,$sampleAudFile2,$sampleVidFile1,$sampleVidFile2);
                                    if($result) {
                                        $response = array("msg" => "1");
                                    } else {
                                        $response = array("msg" => "0");
                                    }
                                }
                            }
                        }
                    }

                } else {
                    $response = array("msg" => "3");
                }
                
            }
        }      
       
        //$this->render("iLogin");

        $this->raw(1);

        $this->json($response);
    }    
*/

    public function test($table,$param = 0) {
        if($this->post['insertAll'] == 1) {
            $i = 0;
            foreach($_POST as $key => $val) {

                $sep = ($i > 0) ? "," : '';

                foreach($param as $k => $v) {
                    if($key == $k) {
                        $nV = preg_replace('/('.$k.')/', "\$_POST[$1]", $v);
                        eval("\$val = ". $nV . ";");
                    }
                }
                $fields .= $sep . $key;
                $values .= $sep . "'" . $val ."'";

                $i++;
            }

            print $values;
        }
    }
/*
    public function viewFBSignUpPanel() {
        $this->renderOnly('SignUp_FB');
    }
 * 
 */
}

?>
