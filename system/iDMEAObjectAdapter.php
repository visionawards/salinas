<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

class iDMEAObjectAdapter extends iDMEAObject {
    
    private $__iDModuleLocalClass;
    private $__iDEventLocalClass;
    private $__iDActionLocalClass;

    public function __construct($iDModuleLocalClass,$iDEventLocalClass,$iDActionLocalClass) {
        $this->_iDModuleLocalClass = $iDModuleLocalClass;
        $this->_iDEventLocalClass = $iDEventLocalClass;
        $this->_iDActionLocalClass = $iDActionLocalClass;

        parent::__construct($this->_iDModuleLocalClass,$this->_iDEventLocalClass,$this->_iDActionLocalClass);
    }

}

?>
