<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

class iDControllerLocal extends iDControllerBuilder {

    private $_siteSkin;
    
    public function setSiteSkin($siteSkin) {
        $this->_siteSkin = $siteSkin;
    }

    public function getSiteSkin() {
        $this->_siteSkin = SITE_SKIN;
        return $this->_siteSkin;
    }

    public function setSiteLayout() {
        return include('layout' . DS . $this->_siteSkin . DS . $this->_siteSkin . '.layout.html');
    }
    
}

?>
