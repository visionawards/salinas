<?php

Class iLogin extends iDController {

//    public function _iLogin() {
        //$this->viewTimelines();
        //$this->CYOTL->CYOTL->test();
        //$this->CYOTL->viewMyTimelines('2');
        //print_r($this->CYOTL->getAllMyTimelines('2'));
//    }

    public function viewLoginForm() {
        $this->renderOnly('iLogin');
    }
    
    public function v() {
        //$this->render('iLogin');
        $this->render('dummy');
    }

    public function c($key,$email) {
        //$this->raw(1);
        $this->set('key',$key);
        $this->set('email',$email);
    }

    public function confirmEmail() {
        $key = $this->post['key'];
        $email = $this->post['email'];

        $result = $this->model->confirmEmail($key, $email);

        $response = array("msg"=>$result);

        $this->raw(1);
        $this->json($response);
    }

    public function setNotifiee() {
        $email = $this->post['email'];
        $str = $this->iDLib->getENCTdS();

        $result = $this->model->setNotifiee($email,$str);
        
        if($result[0] > 0) {

            $key = $result[1];

            $msgContent1 .= "<p>Thank you for your interest in our Create-Your-Own-Timeline system.</p> \r\n";
            $msgContent1 .= "<p>Please cliick the link below to comfirm and complete the process.</p> \r\n";
            $msgContent1 .= "<p><a href='http://cyotl.presidentialtimeline.org/?u=iLogin::c,".$key.",".$email."'>[Click here to confirm]</a></p> \r\n";
            $msgContent1 .= "<p>If you have any questions, please feel free to contact us by replying this email.</p> \r\n<p>Thank you.</p>";
            $to1 = $email;
            $subject1 = "CYOTL: Email confirmation";
            $message1 = $msgContent1;
            $headers1 = "MIME-Version: 1.0" . "\r\n";
            $headers1 .= "Content-type: text/html; charset = iso-8859-1" . "\r\n";
            $headers1 .= "To: You" . "<".$email.">". "\r\n";
            $headers1 .= "From: CYOTL Team <david.kim@austin.utexas.edu>" . "\r\n";
            $headers1 .= "Reply-To:david.kim@austin.utexas.edu" . "\r\n";
            //$headers1 .= "Reply-To:david.qwk@gmail.com" . "\r\n";            
            //$headers1 .= "Cc: david.kim@austin.utexas.edu" . "\r\n";
            mail($to1,$subject1,$message1,$headers1);

            $response = array("msg"=>1);
        } else {
            $response = array("msg"=>0,"res"=>$result[0]);
        }

        $this->raw(1);
        $this->json($response);
    }


    public function doLogin() {
        $username = $this->post['username'];
        $password = md5($this->post['password']);

        $res = self::proceedLogin($username, $password);
                    session_start();
                    
        if ($res) {
//            session_destroy();

            //print "<pre>";
            //print_r($res);
            //print "</pre>";
            
            $userid = $res[0]->user_id;
//            $usid = session_id();
//            $uip = $_SERVER["REMOTE_ADDR"];            
//            $now = time();            
            
//            $recSessionId = $this->model->recordSession($uid,$usid,$uip,$now);            
            
//            if($recSessionId >0) {
            
                $fullname = $res[0]->fullname;
             
                $_SESSION['username'] = $username;
                $_SESSION['user_Id'] = $userid;
                $_SESSION['uid'] = $userid;
                $_SESSION['fullname'] = $fullname;
                $_SESSION['email'] = $res[0]->email;

                $_SESSION['ulevel'] = $res[0]->userlevel;
//                $_SESSION['sid'] = $recSessionId;

                if($res[0]->userlevel > 8) {
                    $_SESSION['admin'] = '1';
                    $_SESSION['teacher'] = '1';
                    $_SESSION['student'] = '1';
                } else if ($res[0]->userlevel == 2){
                    $_SESSION['admin'] = '0';
                    $_SESSION['teacher'] = '1';
                    $_SESSION['student'] = '0';
                } else if ($res[0]->userlevel == 1){ 
                    $_SESSION['admin'] = '0';
                    $_SESSION['teacher'] = '0';
                    $_SESSION['student'] = '1';
                }
                
                
                //$this->render("Timeline");
                //$this->CYOTL->CYOTL->viewTimelines();
                //$this->CYOTL->viewTimelines();
                //$this->render(0);                        
                //print "<script>location.href='". BASE_URL ."';</script>\n";
//                $response = array("msg"=>1, "fullname"=>$fullname);

                $response = array("msg"=>1,"user_data"=>"$res");

                                   
//            } else {
//                print "<script>alert('Failed to login. Please try again.');</script>";
//            }
        } else {
//            print "<script>javascript:alert('Please check your username/password and try again.');</script>";
//            $this->render(0);
//            $this->render("iLogin");
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
  
        //print"<script>coming out of testing res</script>";



//           $app_id = "101328789981201";
//           $app_secret = "a3bb49a4232eafade17229fa5d08f6e1";
//           $my_url = "http://localhost/cyotl_beta1";

//           session_start();
//           $code = $_REQUEST["code"];

//           if(empty($code)) {
//             $_SESSION['state'] = md5(uniqid(rand(), TRUE)); //CSRF protection
//             $dialog_url = "http://www.facebook.com/dialog/oauth?client_id=" 
//               . $app_id . "&redirect_uri=" . urlencode($my_url) . "&state="
//               . $_SESSION['state'];

//             echo("<script> top.location.href='" . $dialog_url . "'</script>");
//           }

//           if($_REQUEST['state'] == $_SESSION['state']) {
//             $token_url = "https://graph.facebook.com/oauth/access_token?"
//               . "client_id=" . $app_id . "&redirect_uri=" . urlencode($my_url)
//               . "&client_secret=" . $app_secret . "&code=" . $code;

//             $response = file_get_contents($token_url);
//             $params = null;
//             parse_str($response, $params);

//             $graph_url = "https://graph.facebook.com/me?access_token=" 
//               . $params['access_token'];

//             $user = json_decode(file_get_contents($graph_url));
//             echo("Hello " . $user->name);
//           }
//           else {
//             echo("The state does not match. You may be a victim of CSRF.");
//           }        
        
               
        
    }    

    public function proceedLogin($username, $password) {
        $result = $this->model->proceedLogin($username,$password);

        return $result;
    }

    public function proceedFBLogin($fbid, $email) {
        $result = $this->model->proceedFBLogin($fbid,$email);

        return $result;
    }    
    
//    public function Logout($fb) {
    public function logOut() {        
        //session_start();
        //session_destroy();
 
        session_unregister('username');
        session_unregister('uid');
        session_unregister('fullname');
        session_unregister('email');
        session_destroy();        
        $response = array("msg"=>1); 
        $this->raw(1);
        $this->json($response);                
        
//        if($_['SESSION']['fbid'] != '') {
//            session_unregister('fbid');            
//        }
                        
        //setCookie("fbs_". FBAppID,"",time()-3600,"/", BASE_URL);
//        setCookie("fbs_". FBAppID,'',time()-3600,'/');
//        session_destroy();        
        
//        if(SITE_SKIN == 'beta1') {
            
//            if($fb ==1) {
//                print "<script>location.href='". BASE_URL ."';</script>";
//            } else {
//                $this->render(0);
//                print "<script>location.href='". MODU ."iLogin::v';</script>";
//            }
//        } else {
//            $this->render("iLogin");
 //       }
        //$this->render("iLogin");
    }

    public function joinMailing() {
        $email = $this->post['email'];

        $result = $this->model->joinMailing($email);

        if($result) {
            //mail();
        } else {
            
        }

        $this->raw(1);
    }
    
    public function checkUserFromMediaTool() {
        $uname = $this->post['username'];
        $password = $this->post['password'];        
        $requestid = $this->post['requestid'];
                
        $upass = md5($password);
        
        $result = $this->model->checkUserFromMediaTool($uname,$upass);

        if($result != '') {            
            $result = DKS + DKP + $result;            
        } 
        else if($result == '') {            
            $result = -1;     
        }
        
        $myFile = DATA_PATH_R . "remote" . DS. $requestid;
        $fh = fopen($myFile, 'w') or die("can't open file");
        $stringData = $result;
        fwrite($fh, $stringData);
        //$stringData = "And Testing...\n";
        //fwrite($fh, $stringData);
        fclose($fh);

        $this->raw(1);        
    }
    
}

?>
