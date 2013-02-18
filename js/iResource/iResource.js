/*
 * JS class for iResource
 *
 * @author David Kim
 * @email david.qwk@gmail.com
 *
 */

var iResource = function() {
    this.getResourceListURL = R_URL + ':getResourceList';
    this.viewAddResourceFormURL = R_URL + ':viewAddResourceForm';
    this.viewInitResourceImagePanelURL = R_URL + ':viewInitResourceImagePanel';
    this.putTempResourceImageURL = R_URL + ':putTempResourceImage';
    this.viewAllTagPanelURL = R_URL + ':viewAllTagPanel';
    this.viewAllTagsURL = R_URL + ':viewAllTags';
    
    this.submitResourceURL = R_URL + ':submitResource';
    this.editResourceURL = R_URL + ':editResource';
    this.doEditResourceURL = R_URL + ':doEditResource';
    this.deleteResourceURL = R_URL + ':deleteResource';
    
    //this.arrOType = ["Image","Audio","Video"];
    this.arrImgExt = ['gif','png','jpg','jpeg','jpe'];    
    this.curImgExt = '';
    
    this.tempResImgFileName = '';
    this.resCO = new Array();
    this.doresize = 0;
    
    this.arrGrade = ['','PK-1','2-3','4-5'];
}

$$(iResource,iDJS);

iResource.prototype = {
    /**
     * show the list of the resource materials
     * 
     * @method viewResourceList
     * @param {Integer} user's unique id
     * @resutn {void}
     *
     */
    viewResourceList: function() {
        //$.iDProgressorInit();
        
        $('#resListTB').empty();
        
        $.iDAjax({
            url:myR.getResourceListURL,
            data: {uid:UID},
            success: function(data) {
                if(data.msg ==1) {                        
                    
                    var r = data.r;
                    
                    //tblResourceList
                    //resListTB
                    for(var i=0,len=r.length;i<len;i++) {
                        var rid = r[i].doc_number;
                        var img = r[i].filename;
                        var title = r[i].title;
                        var desc = r[i].description;
                        var grade_level = r[i].grade_level;
                        var grade_desc = r[i].grade_desc;
                        var grade_desc = r[i].grade_desc;
                        var author = r[i].author;
                        var age = r[i].age;
                        var tag = r[i].tag;
                        
                        var tr = "<tr id='tr_res_"+rid+"'>";
                        tr += "<td class='tdResourceThumb'><img src='"+RES_THUMB_PATH+img+"' /></td>";
                        tr += "<td class='tdResourceTitle'>" + title + "</td>";
                        tr += "<td class='tdResourceGrade'>" + grade_desc + "</td>";
                        tr += "<td class='tdTags'><ul class='ulTags'>";
                        for(t in tag) {
                            var subtag = tag[t].subtag;
                            
                            var maintag_id = tag[t].maintag_id;
                            var maintag_title = tag[t].maintag_title;
                            
                            tr += "<li>" + maintag_title; 
                            tr += "<ul class='ulSubtags'>";
                            
                            for(s in subtag) {
                                var subtag_id = subtag[s].subtag_id;
                                var subtag_title = subtag[s].subtag_title;
                                
                                tr += "<li>" + subtag_title;
                                tr += "</li>";
                            }
                            
                            tr += "</ul></li>"; 
                        }
                        tr += "</ul></td>";
                        tr += "<td class='tdActions'>";
                        //tr += "<a onclick=''><span> view </span></a>";
                        tr += "<a onclick='myR.editResource(event,"+rid+")'><span> edit </span></a>";
                        tr += "<a onclick='myR.deleteResource(event,"+rid+")'><span> delete </span></a>";
                        tr += "</td>";
                        tr += "</tr>";
                        
                        $('#resListTB').append(tr);
                        
                        $('#tr_res_'+ rid).data({
                            rid:rid,
                            img:img,
                            title:title,
                            desc:desc,
                            grade_level:grade_level,
                            grade_desc:grade_desc,
                            author:author,
                            age:age,
                            tag:tag
                        });
                    }
                    
                    //$.iDProgressorEnd();
                } else {                                        
                    //$.iDProgressorEnd();
                    alert("Invalid data. Please try again.");
                }
            }
        });
        
        $('#btnAddResource').click(function(e) {
            
            /*
            $.iDView({
                url:myR.viewAddResourceFormURL,
                id:'pnlAddResource',
                container:'#contents'
            }, function(e) {
                $(this).fadeIn().iDCenter().iDModal(this);                                
            });
            
            */
            
            myR.addResource(e);
            
        });
    },
    editResource: function(e,rid) {
        
        var rdata = $('#tr_res_'+rid).data();
        var img = rdata.img;
        var title = rdata.title;
        var desc = rdata.desc;
        var grade_level = rdata.grade_level;
        var grade_desc = rdata.grade_desc;
        var author = rdata.author;
        var age = rdata.age;
        var tag = rdata.tag;
        
        $.iDView({
            url:myR.editResourceURL,
            id:'pnlEditResource',
            container:'#container'
        }, function() {
            $(this).fadeIn().iDCenter().iDModal(this).draggable();                        
                        
            $('#resImageThumbEditPreview').attr('src', RES_THUMB_PATH + img);
            
            tinyMCE.init({
                theme : "simple",
                mode : "exact",
                elements: "txtaResourceEditDescription",
                init_instance_callback: function(e) {
                    tinyMCE.get('txtaResourceEditDescription').setContent(desc);
                }     
            });                        
                       
            myRT.viewAllTags(e,1,rdata);
            
            $('#resourceEditTitle').val(title);
            
            $('#selEditGradeLevel').val(grade_level);
            
            $('#resourceEditAuthor').val(author);
            $('#resourceEditAge').val(age);                        
            
            $('#btnUpdateResource').unbind().click(function(e) {
                myR.doEditResource(e,rid,rdata);
            });

            $('#btnCloseEditResource').unbind().click(function() {
                myR.viewResourceList();
                $('#pnlEditResource').fadeOut().iDDemodal();              
            }) 
        
            //alert(myRT.arrTags.length);
        });
        
    },
    doEditResource: function(e,rid,rdata) {
        var title = $('#resourceEditTitle').val();
        var desc = tinyMCE.get('txtaResourceEditDescription').getContent();
        var gradeIdx = $('#selEditGradeLevel').val();
        
        var author = $('#resourceEditAuthor').val();
        var age = $('#resourceEditAge').val();        
        
        var grade = myR.arrGrade[gradeIdx];
        
        var tags = JSON.stringify(myRT.arrTags);
        
        //alert(tags);
        
        $.iDAjax({
            url:myR.doEditResourceURL,
            data: {rid:rid,title:title,desc:desc,gradeIdx:gradeIdx,grade:grade,tags:tags, author:author, age:age},
            success: function(data) {
                if(data.msg ==1) {
                    myR.viewResourceList();
                    $('#pnlEditResource').fadeOut().iDDemodal();                    
                    alert("Successfully updated.");
                } else {
                    alert("Invalid data. Please try again.");
                }
            }
        });      
    },
    /**
     *  view the Form to add a new resource material
     *  
     *  @method addResource
     *  @param 
     *  @return {void}
     *  
     */
    addResource: function(e) {
        $.iDFadeInOut({
           fin:'#articleAddResource',
           fout:'#articleResourceList',
           dur:500,
           btn:'#hrefResourceList'
        });       
        
        //$('input,textarea,button').attr('disabled',true);
        $('#resourceAttachement').attr('disabled',true);
        
        tinyMCE.init({
            theme : "simple",
            mode : "exact",
            elements: "txtaResourceDescription"
        });         
                              
        $('#selResourceType').change(function(e) {
            myRT.viewAllTags(e,0);
            
            var opt = $(this).val();
           
            if(opt >0) {
                //$('input,textarea').removeAttr('disabled');
                //$('input,textarea').prop('disabled','');
                //$('input[type=file] > button').attr('disabled', false);
                
                //document.getElementById('resourceFile').removeAttribute('disabled');
                
            } else {
                //$('input,textarea,button').attr('disabled',true);
                //$('input,textarea').prop('disabled','');
            }
            
            if(opt >2) {
                $('#pResourceFile').hide();
                $('#pResourceLink').show();
            } else {
                $('#pResourceFile').show();
                $('#pResourceLink').hide();                
            }
            
        });
        
        $('#resourceFile').change(function(e) {
            var opt = $('#selResourceType').val();
            
            if(opt ==1) {
               myR.initResourceImage(e);
            }
        });
        
        $('#resourceTitle').keyup(function(e) {
            var titleText = $('#resourceTitle').val();
            
            if(titleText.length > 3) {
                $('button').removeAttr('disabled').attr('enabled',true);
            } else {
                $('button').attr('disabled',true);
            }
            
        });
        
//        $('#btnViewAllTags').click(function(e) {
//            myRT.viewAllTags(e);
//        });
        
        $('.resAutoTag > span').click(function(e) {
            $(this).parent().remove();
        });        
        
        $('#selGradeLevel').change(function(e) {
            var grad = $(this).val();
            
            if(grad >0) {
                
            } else {
                alert("Select the grade level for this resource material.");
            }
        });
        
        /*
        $('#txtNewTag').keypress(function(e) {       
            if(e.keyCode ==13) {
                var newTagLabel = $(this).val();
                var span = "<span class='resAutoTag'>"+ newTagLabel+" <span>x</span></span>";
               
                $('#spanResTagContainer').append(span);
                
                $('#txtNewTag').val('');
                
                $('.resAutoTag > span').click(function(e) {
                    $(this).parent().remove();
                });
                
                $('#btnSubmitResource').removeAttr('disabled').attr('enabled',true);
            }
        });
        */
       
        $('#btnSubmitResource').unbind().click(function(e) {
            myR.submitResource(e);
        });
        
    },
    /**
     * check everything's ok before load the image editor
     * 
     * @method preResImage
     * @param
     * @return {void} 
     * 
     */
    preResImage: function(e) {
        if(UID == undefined) {
            alert("Your session has been expired. Please sign-in and try it again.");
        } 
    },
    /**
     * check if the file is image
     * 
     * @method initResImagePre
     * @param
     * @return {void}
     * 
     */ 
    initResImagePre: function() {

        var imgfileExt = $('#resourceFile').val().split('.').pop().toLowerCase();

        if($.inArray(imgfileExt, myR.arrImgExt) != -1) { 
            myR.curImgExt = imgfileExt.toLowerCase();
            //myR.initResourceImage();
        } else {
            $('#resourceImageFile').val('');
            alert("Only JPEG/JPG, GIF, and PNG formats are supported.");
        }        
    },    
    /**
     *  render the resource image panel and initiate the image 
     *  processing logic to create 
     *  thumbnails of the new resouce image
     *  
     *  @method initResourceImage
     *  @param {Object} onChanage event from the fomr file element
     *  @return {void}
     *  
     */
    initResourceImage: function(e) {
        $.iDProgressorInit();
        
        var resType = $('#selResourceType').val();

        if(resType ==1) {
            
            $.iDView({
                url:myR.viewInitResourceImagePanelURL,
                id: 'pnlInitResourceImage',
                container: '#container' 
            }, function(e) {
                $(this).fadeIn().iDModal(this).iDCenter();
                
                $('#frmResourceFile').iDAjaxSubmit({
                    url:myR.putTempResourceImageURL,
                    type:'post',
                    data: {uid:UID, resType:resType},
                    dataType:'json',
                    success: function(data) {
                        if(data.msg ==1) {
                                                              
                            myR.tempResImgFileName =  data.result;
                            var resImage = TEMP_PATH + data.result;
                            
                            myR.imgFormProcess(resImage);                          
                            
                            $.iDProgressorEnd();
                        } else {
                            
                            $.iDProgressorEnd();
                        }
                    }
                });

                   $('input[name=cropResize]').change(function(){
                       if($(this).val() ==0) {
                               
                           if(myR.resCO[99] ==1) {
                               //$('#btnSaveResImg').removeAttr('disabled').attr('enabled', true);
                           } else {
                               //$('#btnSaveResImg').removeAttr('enabled').attr('disabled', true);
                           }
                           
                           //$('#resImageBox canvas[name=cropBox]').show();
                           $('#resImageBox > div').show();
                       }
                       if($(this).val() ==1) {
                           
                           //$('#btnSaveResImg').removeAttr('disabled').attr('enabled', true);
                           
                           myR.doresize = 1;
                           
                           //$('#resImageBox canvas[name=cropBox]').hide();
                           $('#resImageBox > div').hide();
                           //alert($('#mimgPreview canvas').attr('id'));
                            var oimg = TEMP_PATH + myR.tempResImgFileName;
                            var imgLoader = new Image();
                                imgLoader.src = oimg;
                                imgLoader.onload = function() {
                                    
                                    var siw = imgLoader.width;
                                    var sih = imgLoader.height;

                                    var resPrevId = $('#resImagePreview canvas').attr('id');

                                    var imgCxt = document.getElementById(resPrevId).getContext('2d');
                                        imgCxt.clearRect(0,0,80,80);
                                        imgCxt.drawImage(imgLoader,0,0,siw,sih,0,0,80,80);                                       
                                }
 
                                    $.iDResizer({
                                        source:oimg,
                                        width:80
                                    },function(o){
                                        myR.resCO[0] = o.image;//resized object thm
                                    });

                       } else {
                           myR.doresize = 0;
                       }                       
                       
                   });

                $('#btnCloseResImage').click(function(e) {
                    $('#pnlInitResourceImage').fadeOut().iDDemodal();
                });
                
            });
                    
        } else {
            alert("Invalid Resource Type for this process. Please check the type and try it again.")
        }
    },
    /**
     * process the resource image and show it onto the 
     * resource image editor panel
     * 
     * @method imgFormProcess
     * @param {String} the name of the image file in the temp directory
     * @resutn {void}
     * 
     */
    imgFormProcess: function(resimg) {

        $.iDCropper({
           source: {
                container:'#resImageBox',
                width:780,
                height:460,
                image:resimg,
                cwidth:60
           },
           target: {
               container:['#resImagePreview'],
               width:[80],
               height:[80]
           }
        },function(o) {            
           myR.objCO99 = 0;

           if(o.image[0].length > 300) {
               myR.resCO99 = 1;
               $('#btnSaveResImg').removeAttr('disabled').attr('enabled', true);
           }                                       
            myR.resCO = o.image;    
        });

        $.iDResizer({
            source:resimg,
            width:500
        },function(o){
          //if(o.image[0].length > 300) {
                $('#btnSaveResImg').removeAttr('disabled').attr('enabled', true);
           //}                                         
           myR.resCO[1] = o.image;        
        }); 
       

        $('#btnSaveResImg').bind('click', function(e) {
            myR.saveResCO(e);
        });
     
    },
    /**
     * save the reduced image data
     * 
     * @method saveResCO
     * @param {Object} the event object
     * @return {void}
     * 
     */
    saveResCO: function(e) {
        $.iDProgressorInit();

        $('#resImageThumbPreview').show().attr({
           'src': myR.resCO[0]
        });
       
        $.iDProgressorEnd();

        $('#pnlInitResourceImage').fadeOut().remove().iDDemodal();        
    },
    /**
     * 
     * submit the resource data
     * 
     * @method submitResource
     * @params {Object} click event
     * @return {void}
     * 
     */
    submitResource: function(e) { 
        var title = $('#resourceTitle').val();
        var desc = tinyMCE.get('txtaResourceDescription').getContent();
        var gradeIdx = $('#selGradeLevel').val();
        
        var author = $('#resourceAuthor').val();
        var age = $('#resourceAge').val();
        
        var grade = myR.arrGrade[gradeIdx];
        
        var tags = JSON.stringify(myRT.arrTags);
        //console.log(a);
        
        //console.log(title + ':' + desc + ':' + myRT.arrTags);
        
        var thumb = myR.resCO[0];
        var resize = myR.resCO[1];
        
        var tempImgName = myR.tempResImgFileName;        
        
        $.iDAjax({
            url:myR.submitResourceURL,
            data: {title:title,desc:desc,gradeIdx:gradeIdx,grade:grade,tags:tags,thumb:thumb,resize:resize,tempImgName:tempImgName,author:author,age:age},
            success: function(data) {
                if(data.msg ==1) {
                    alert("Successfully added.");
                    $(':input').val('').removeAttr('checked').removeAttr('selected');
                    tinyMCE.get('txtaResourceDescription').setContent('');
                    $('#resImageThumbPreview').removeAttr('src').removeAttr('style');
                    $('#pSelectedTags').empty();
                    //$('#pResourceTags').hide();                    
                } else {
                    alert("Invalid data. Please try again.");
                }
            }
        });
    },
    deleteResource: function(e,rid) {
        
        $.iDYesNo({
            title:'Delete resource',
            message:'Are you sure you want to delete this resource?'
        }, function() {
            
            $.iDAjax({
                url:myR.deleteResourceURL,
                data: {rid:rid},
                success: function(data) {
                    if(data.msg ==1) {
                        $('#tr_res_'+rid).remove();
                        alert("Successfully deleted.");
                    } else {
                        alert("Invalid data. Please try again.");
                    }
                }
            });                    
        });         
        

    }
};


