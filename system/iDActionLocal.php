<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//iDModuleLocal eventually extends iDModuleTemplate
class iDActionLocal extends iDActionBuilder {

    protected $_url;
    protected $_urlData = array();
    protected $_actionParamData = array();
    protected $_paramData = array();
    protected $_actionNameFromUrl;
    protected $_actionName;
    protected $_actionPath;

    public $name;
    
    public function __construct() {
        $url = $_GET['u'];
        $this->_url = ($url != '') ? $url : "Home";
        $this->_urlData = explode(":",$this->_url);

        $actionDataFromUrl =  $this->_urlData[2];
        $this->_actionParamData = explode(",", $actionDataFromUrl);
    }

    protected function setActionName() {
        if(!$this->_actionParamData[0]) {
            if(!$this->_urlData[1]) {
                $this->_actionNameFromUrl = '_'.$this->_urlData[0];//'_' is needed to create the pseudo constructor
            } else {
                $this->_actionNameFromUrl = '_'.$this->_urlData[1];//'_' is needed to create the pseudo constructor
            }
        } else {
            $this->_actionNameFromUrl = $this->_actionParamData[0];
        }

        return  $this->_actionNameFromUrl;
    }

    protected function setActionPath() {
        return  $this->_actionPath;
    }

    protected function setActionParam() {
        
        $sizeOfAPData = count($this->_actionParamData);

        //$this->_paramData = $_paramData;

        for($i = 0;$i < $sizeOfAPData-1; $i++) {
            //array_push($this->_paramData, $this->_actionParamData[$i]);
            $this->_paramData[$i] = $this->_actionParamData[$i+1];
        }

        return  $this->_paramData;
    }
}

?>
