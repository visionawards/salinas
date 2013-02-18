<?php

/**
 *  iResource controller class: this class handles  
 *  methods about resource materials
 * 
 *  @author David Kim <david.qwk@gmail.com>
 *  @namespace modules.iResource.controller
 *  @extends iDucklling.system.mvc.iDController
 * 
 */
Class iResource extends iDController {
    
    /**
     * render resource list view
     * 
     * @method v
     * @param 
     * @return {void}
     * 
     */    
    public function v() {
        $this->render('iResource');
    }
    /**
     *  get resource data from model
     * 
     * @method getResourceList
     * @param {Integer} user unique id
     * @return {Object} resource data
     * 
     */   
    public function getResourceList() {
        $uid = $this->post['UID'];
        
        $r = $this->model->getResourceList($uid);
        
        if($r) {
            $response = array("msg"=>1,"r"=>$r);
        } else {
            $response = array("msg"=>0);
        }
        
        $this->raw(1);
        $this->json($response);
    }
    /**
     *  render the form to initiate the process for the resource image
     * 
     *  @method viewInitResourceImagePanel
     *  @param
     *  @return {void}
     * 
     */
    public function viewInitResourceImagePanel() {
        $this->renderOnly("AddResourceImage");
    }
    /**
     *  upload the resource image file to the temp folder
     *  and send it back to the javascript method as a json data
     * 
     *  @method putTempResourceImage
     *  @param {Integer} user's unique id
     *  @param {Integer} resource type index 1:image 2:doc/pdf 3:link
     *  @param {Array} form file array
     *  @return {Json} error message, original image name, new image name
     */
    public function putTempResourceImage() {
        $MAXIMUM_FILESIZE = 1024 * 50000; // 50000KB = 50M 
        $temp_path = TEMP_PATH;
        $img_path = DATA_PATH . "image/";
        
        $uid = $this->post['uid'];
        $resType = $this->post['resType']; 
        
        $imageFile = $_FILES['resourceFile'];

        //print "<h1>File => $imageFile</h1>";
        
        if($imageFile['size'] <= $MAXIMUM_FILESIZE) {
            
            $fileName = $imageFile['name'];
            $ext = pathinfo($fileName, PATHINFO_EXTENSION);
            
            $date = time();
            $image_name = ($date+DKP) . '_' . ($uid+DKS) . '.' . $ext;

            move_uploaded_file($imageFile['tmp_name'], $temp_path . $image_name);

            chmod($temp_path . $image_name, 0777);            
            
            $response = array("msg" => "1", "result" => $image_name, "originalFile" => $fileName);            
        } else {
            $response = array("msg" => "0", "result" => "Image size is too big (max: $MAXIMUM_FILESIZE).");
        }
        
        $this->raw(1);
        $this->json($response);
    }
    /**
     * render all tag panel
     * 
     * @method viewAllTags
     * @param 
     * @return {void}
     * 
     */
    public function viewAllTagPanel() {
        $this->renderOnly("AllTags");
    }
    
    public function viewAllTags() {
        
        $res = $this->model->viewAllTags();

        if ($res) {
            $num_rows = count($res);
            if ($num_rows > 0) {
                $response = array("msg"=>1,"alltag_rows"=>$res);
            } else {
                $response = array("msg"=>1,"alltag_rows"=>"");
            }
        } else  {
            $response = array("msg"=>0);
        }
        $this->raw(1);
        $this->json($response);        
     }
    
    public function submitResource() {
        
        $title = $this->post['title'];
            $title = addslashes($title);
        $desc = $this->post['desc'];
            $desc = addslashes($desc);
        $gradeIdx = $this->post['gradeIdx'];            
        $grade = $this->post['grade'];
        $author = $this->post['author'];
        $age = $this->post['age'];
        
        $tags = $this->post['tags'];                
            $tags = json_decode(stripslashes($tags));
            
        $thumb = $this->post['thumb'];
        $resize = $this->post['resize'];
        $tmpImg =  $this->post['tempImgName'];
        
        $temp_path = TEMP_PATH;
        $img_path = DATA_PATH . "image/";  
        $original_path = DATA_PATH . "original/";
        $thumb_path = $img_path . "thumb/";
        $preview_path = $img_path . "preview/";
        
        copy($temp_path . $tmpImg, $original_path . $tmpImg);
        chmod($original_path . $tmpImg, 0777);           
                       
        $thumbD = substr($thumb, strpos($thumb, ",")+1);
        $thumbData=base64_decode($thumbD);         
        
        $fp = fopen( $thumb_path . $tmpImg, 'wb' );
        fwrite($fp, $thumbData);
        fclose($fp );         
        
        $resizeD = substr($resize, strpos($resize, ",")+1);
        $resizeData=base64_decode($resizeD);         
        
        $fp = fopen( $preview_path . $tmpImg, 'wb' );
        fwrite($fp, $resizeData);
        fclose($fp );         
        
        $nResID = $this->model->submitResource($title,$desc,$gradeIdx,$grade,$tags, $tmpImg, $author, $age);
        
        if ($nResID > 0) {
            require('lib/fpdf17/fpdf.php');
            
            $pdf = new FPDF();
            $pdf->AliasNbPages();
            $pdf->AddPage();
            //$pdf->Image($temp_path . $tmpImg);
            $pdf->Image($temp_path . $tmpImg,0,0,200);
            $pdf->Output(DATA_PATH . "pdf" . DS . $tmpImg.".pdf", "F");
            //$pdf->Output(DATA_PATH . "pdf" . DS . $tmpImg.".pdf", "D");
            
            $response = array("msg"=>1,"nResID"=>$nResID,"tags"=>$tags);
        } else  {
            $response = array("msg"=>0);
        }
        
        $this->raw(1);
        $this->json($response);
        
    }
    
    public function editResource() {
        $this->renderOnly('EditResource');
    }
    
    public function doEditResource() {
        $rid = $this->post['rid'];
        $title = $this->post['title'];
            $title = addslashes($title);
        $desc = $this->post['desc'];
            $desc = addslashes($desc);
        $gradeIdx = $this->post['gradeIdx'];            
        $grade = $this->post['grade'];
        
        $author = $this->post['author'];
        $age = $this->post['age'];        
        
        $tags = stripslashes($this->post['tags']);            
                        
        $result = $this->model->doEditResource($rid,$title,$desc,$gradeIdx,$grade,$tags,$author,$age);
        
        if ($result) {
            $response = array("msg"=>1);
        } else  {
            $response = array("msg"=>0);
        }
        
        $this->raw(1);
        $this->json($response);            
    }
    
    public function deleteResource() {
        $rid = $this->post['rid'];
        
        $result = $this->model->deleteResource($rid);
        
        if ($result) {
            $response = array("msg"=>1);
        } else  {
            $response = array("msg"=>0);
        }
        
        $this->raw(1);
        $this->json($response);        
        
    }
    
}

?>
