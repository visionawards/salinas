<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

class iDSiteLayoutLocal extends iDSiteLayoutBuilder {

    private $_siteSkin = '';
    private $_siteSkinCreator;
    private $_siteSkinCreatorMail;
    private $_siteSkinCreatorHome;
    private $_siteSkinDescription;
    private $__siteSkinDefaultPageTitle;
    private $__siteViewData;

    public function __construct() {

        if($_SESSION['ulevel'] >7) {
            $this->_siteSkin = SITE_SKIN;
        } else {
            $this->_siteSkin = SITE_USER_SKIN;
        }
//print $this->_siteSkin . "KKKKKKKKKK";
        define(CUR_SKIN, 'layout/'.$this->_siteSkin);
        define(LAYOUT_PATH, LAYOUT_ROOT . DS . $this->_siteSkin . DS);
        define(LAYOUT_PATH_JS, LAYOUT_ROOT . '/' . $this->_siteSkin);
        
        include_once( LAYOUT_PATH . $this->_siteSkin . '.info.html');
        $this->_siteSkinCreator = $creator;
        $this->_siteSkinCreatorMail = $creator_mail;
        $this->_siteSkinCreatorHome = $creator_home;
        $this->_siteSkinDescription = $description;

        /*
         * CURMODULE, CUREVENT, CURACTION, CURCONTROLLER, CURMODEL, CURVIEW
         * CURMEURL, CURMEAURL
         */
        define(CUR_MURL, MODU . CURMODULE . ":");
        define(CUR_MEURL, MODU . CURMODULE . ":" . CUREVENT . ":");
        define(CUR_MEAURL, MODU . CURMODULE . ":" . CUREVENT . ":" . CURACTION);
        define(CUR_JQMEURL, JQMODU . CURMODULE . ":" . CUREVENT . ":");
    }

    public function getSiteSkin() {
        return $this->_siteSkin;
    }

    protected function getSiteSkinCreator() {
        return $this->_siteSkinCreator;
    }

    protected function getSiteSkinCreatorMail() {
        return $this->_siteSkinCreatorMail;
    }

    protected function getSiteSkinCreatorHome() {
        return $this->_siteSkinCreatorHome;
    }

    protected function getSiteSkinDescription() {
        return $this->_siteSkinDescription;
    }

    protected function getSiteSkinDefaultPageTitle() {
        //$this->__siteSkinDefaultPageTitle = SITE_TITLE . ">" . CURMOD . ">" . CUREVENT;
        $this->__siteSkinDefaultPageTitle = SITE_TITLE;

        return $this->__siteSkinDefaultPageTitle;
    }

    public function setSiteLayout($page) {//$module data comes from 'iDuckling' class as in $iDSL->setSiteLayout($this->moduleData);
        ob_start();
        include_once( LAYOUT_PATH . DS . $this->_siteSkin . '.layout.html');
        $this->__siteViewData = ob_get_contents();
        ob_end_clean();
    }

    public function getSiteViewData() {
        return $this->__siteViewData;
    }
}

?>
