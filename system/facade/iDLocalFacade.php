<?php

class iDLocalFacade {

    protected $module;
    protected $event;
    protected $action;
    protected $param;
    
    public function __construct() {
        $this->iD = new iDucklingFacade();
    }

    public function module() {
        return $this->iD->getModule();
    }

    public function event() {
        return $this->iD->getEvent();
    }

    public function action() {
        return $this->iD->getActions()->getAction();
    }

    public function param() {
        return $this->iD->getActions()->getParam();
    }

    public function db($dbType) {
        
        switch($dbType) {
            case 'mysql':
                return new iDLocalMysql();
                break;
            case 'sqlite':
                return new iDLocalSqlite();
                break;
            default:
                throw new Exception('Database implementation not found');
        }
    }
}

?>
