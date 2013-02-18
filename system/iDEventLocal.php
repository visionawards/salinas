<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//iDModuleLocal eventually extends iDModuleTemplate
class iDEventLocal extends iDEventBuilder {

    protected $_url;
    protected $_urlData = array();
    protected $_eventNameFromUrl;
    protected $_eventName;
    protected $_eventPath;
    protected $_modelEventNameFromUrl;
    protected $_modelEventName;
    protected $_modelEventPath;


    public $name;
    
    public function __construct() {
        $url = $_GET['u'];
        $this->_url = ($url != '') ? $url : "Home";

        $this->_urlData = explode(":",$this->_url);
    }

    protected function setEventName() {
        //$this->_urlData = $this->_urlData[0];

        $this->_eventNameFromUrl = (!$this->_urlData[1])?$this->_urlData[0]:$this->_urlData[1];

        return  $this->_eventNameFromUrl;
    }

    protected function setEventPath() {
        
        $this->_moduleNameFromUrl = $this->_urlData[0];

        $this->_eventPath = MODULE_ROOT . DS . $this->_moduleNameFromUrl . DS . CONTROLLER_ROOT . DS . $this->_eventNameFromUrl . '.php';

        return $this->_eventPath;
    }

    protected function setModelEventName() {
        $this->_modelEventNameFromUrl = MODEL_PREFIX.$this->_eventNameFromUrl;

        return  $this->_modelEventNameFromUrl;
    }

    protected function setModelEventPath() {

        $this->_modelEventPath = MODULE_ROOT . DS . $this->_moduleNameFromUrl . DS . MODEL_ROOT . DS . $this->_modelEventNameFromUrl . '.php';

        return $this->_modelEventPath;
    }

}

?>
