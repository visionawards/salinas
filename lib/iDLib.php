<?php

/*

The methods here or in the inherited classes of iDLib class
can be simply called from Controllers as in:

$this->iDLib->subword($inputText, '10');

*/

class iDLib
{
    public function subword($text,$length,$opt = "...") {
        if(strlen($text) >= $length) {
            $pos = strpos($text, ' ', $length);
        } else {
            $pos = false;
        }
        if ($pos !== false) {
            $result = substr($text, 0, $pos) . $opt;
        } else {
            $result = $text;
        }

        return $result;
    }

    public function print_alert($input) {
        print "<script>alert('aaa');</script>";
    }

    public function print_array($array) {
        print "<pre>";
        print_r($array);
        print "</pre>";
    }

    public function date01($timestamp) {
        return date("F j, Y, g:i a", $timestamp);
    }

    public function getENCTdS($length='16') {
        $str = '';
        $maxchar = $length;
        $chars = str_shuffle('abcdef1234567890');
        $len = strlen($chars);
        for ($i = 0; $i < $maxchar; $i++)
        {
            $str .= $chars[mt_rand(0, $len-1)];
        }

        return $str;
    }
}

?>
