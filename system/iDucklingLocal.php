<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

class iDucklingLocal extends iDuckling {
    
    public function __construct() {
        /*
        $iDMEAObj = new iDMEAObjectAdapter('iDModuleLocal',
                                            'iDEventLocal',
                                            'iDActionLocal');
        */
        session_start();
        parent::__construct();
        //$this->siteLayout();
        //print_r($this->moduleData);

    }


}

?>
