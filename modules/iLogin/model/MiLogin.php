<?php

class MiLogin extends iDModel {

    public function proceedLogin($username,$password) {

        $result = $this->db->query("SELECT * FROM roser_user WHERE username='$username' AND password='$password'",1);

        return $result;
    }

/*
    public function setNotifiee($email,$str) {
        $qry = "SELECT notifier_id FROM cyotl_notifier WHERE notifiee_email = '$email'";
        $res = mysql_num_rows(mysql_query($qry));

        if($res > 0) {
            $result[0] = -1;
        } 
        elseif($res ==0) {

            $query1 = "INSERT INTO cyotl_notifier (notifiee_email,confirm_key,status) VALUES ('$email','$str','0')";
            $result1 = mysql_query($query1);

            $nid = mysql_insert_id();
            $result[0] = $nid;
            $result[1] = $str;
        } else {
            $result[0] = -2;
        }

        return $result;
    }

    public function confirmEmail($key, $email) {
        $query = "SELECT notifier_id FROM cyotl_notifier WHERE notifiee_email = '$email' AND confirm_key = '$key'";
        $nid = @mysql_result(mysql_query($query),0);

        if($nid >0) {
            $result = $this->db->query("
                UPDATE cyotl_notifier SET status = '1' WHERE notifiee_email = '$email' AND confirm_key = '$key' AND notifier_id = '$nid'
            ");

            return $nid;
        } else {
            return -1;
        }
    }
    
    public function checkUserFromMediaTool($uname, $upass) {        
        $query = "SELECT cyotl_user_id FROM cyotl_user WHERE username = '$uname' AND password = '$upass'";
        $result = @mysql_result(mysql_query($query),0);
        
        return $result;
        
    }
 
    public function recordSession($uid, $usid, $uip, $now) {
      
        $query = "INSERT INTO cyotl_user_session (user_id,user_sid,user_ip,session_date,status) VALUES 
                    ('$uid','$usid','$uip','$now','1')";
        $result = mysql_query($query);

        $recid = mysql_insert_id();
                
        return $recid;
    
    }

 */


}


?>
