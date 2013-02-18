<?php

class MSignUp extends iDModel {

    public function doSignUp($username,$userlevel,$firstname,$lastname,$fullname,$email,$password,$reg_time) {
        
        $reg_time = time();
       
        $result = $this->db->query("INSERT INTO roser_user
                                    (username,userlevel,firstname,lastname,fullname,email,password,reg_time) VALUES
                                    ('$username','$userlevel','$firstname','$lastname','$fullname','$email','$password','$reg_time')");

        $myUID = mysql_insert_id();

        return $myUID;
    }

    
    public function checkUsername($username) {
        
        $query = "SELECT COUNT(user_id) FROM roser_user WHERE username = '$username'";
        $result = @mysql_result(mysql_query($query),0);

        return $result;
    }


    public function checkEmail($email) {

        $query = "SELECT COUNT(user_id) FROM roser_user WHERE email = '$email'";
        $result = @mysql_result(mysql_query($query),0);

        return $result;
    }


}

?>
