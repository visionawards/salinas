<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//iDModuleLocal eventually extends iDModuleTemplate
class iDModuleLocal extends iDModuleBuilder {

    protected $_url;
    protected $_urlData = array();
    protected $_moduleNameFromUrl;
    protected $_moduleName;
    protected $_modulePath;
    protected $_moduleSkin;

    public $name;
    public $path;
    public $skin;
    
    public function __construct() {
        $url = $_GET['u'];
        $this->_url = ($url != '') ? $url : "Home";
        $this->_urlData = explode(":",$this->_url);
    }

    protected function setModuleName() {

        $this->_moduleNameFromUrl = $this->_urlData[0];

        include_once(MODULE_ROOT. DS . $this->_moduleNameFromUrl . DS . $this->_moduleNameFromUrl . ".inc.php");

        $this->_moduleName = $moduleName;

        return $this->_moduleName;
    }

    protected function setModulePath() {
        $this->_modulePath = MODULE_ROOT . DS . $this->_moduleName . DS;

        return $this->_modulePath;
    }

    protected function setModuleSkin() {

        include($this->_modulePath . $this->_moduleName . ".inc.php");

        $this->_moduleSkin = $moduleSkin;

        define(CURMODULE_VIEW_PATH, MODULE_ROOT . DS . $this->_moduleName . DS . 'view' . DS);
        define(CURMODULE_PDE_PATH, MODULE_ROOT . DS . $this->_moduleName . DS . 'view' . DS . 'pde' . DS);                
        define(CURMODULE_SKIN, $this->_moduleSkin);

        $css = "<link href='". MODULE_ROOT."/".$this->_moduleName. "/view/skin/" .CURMODULE_SKIN . "/css/style.css' type='text/css' rel='stylesheet'  media='screen'/>";
        if(strpos($_SERVER['HTTP_ACCEPT'], 'json') != '') {
        } else {
            print $css;
        }
        
        return $this->_moduleSkin;
    }

}

?>
