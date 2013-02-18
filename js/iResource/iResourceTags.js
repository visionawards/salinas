/*
 * JS class for iResourceTags
 *
 * @author David Kim
 * @email david.qwk@gmail.com
 *
 */

var iResourceTags = function() {
    this.arrTags = new Array();
}

$$(iResourceTags,iDJS);

iResourceTags.prototype = {
    /**
     * view all the tags and the form to add a new one
     * 
     * @package js.
     * @method viewAllTags
     * @param
     * @return {void}
     * 
     */
    viewAllTags: function(e,opt,rdata) {
        
        var container = (opt ==1) ? "#pEditResourceTags" : "#contents";
        var res_container = (opt ==1) ? "#pEditResourceTags" : "#pResourceTags";
        
        $.iDView({
            url:myR.viewAllTagPanelURL,
            id:'pnlAllTags',
            container:container
            //container:'#pEditResourceTags'
        }, function(e) {

            $(this).fadeIn()
            $.iDAjax({                                              
                url:myR.viewAllTagsURL,
                //data:{doc_number:docNum},
                success: function(data) {
                    if (data.msg == 1) {
                        var allTag_rows = data.alltag_rows;
                        var uniqMainId = [];                                                              //create an array with unique main tags ID 
                        var uniqMainTitle = [];                                                           //create another array with unique main tags TITLE 
                        for (var i = 0, length_arr = allTag_rows.length; i < length_arr; i++)  {        
                            if (uniqMainId.indexOf(allTag_rows[i].maintag_id) == -1) {
                               uniqMainId.push(allTag_rows[i].maintag_id);
                               uniqMainTitle.push(allTag_rows[i].maintag_title);
                            }
                        }
                        //console.log(uniqMainId);
                        //console.log(uniqMainTitle);
                        //$('#pResourceTags').empty();
                        $(res_container).empty();
                        
                        var tagsForm = "<fieldset id='centralFieldset' class='searchPageFset'><legend>Central Features</legend>";
                        for (var j = 0, len_arr = uniqMainId.length; j < len_arr; j++)     {
                            tagsForm  += "<input type='checkbox' id='main_" + uniqMainId[j]  + "' name='category' value='" + uniqMainId[j] 
                                       + "' onclick='myRT.centralMainEvents(event," + uniqMainId[j]  + ");' />"
                                       + "<label for='main_" + uniqMainId[j] + "' class='searchPageCheckAll'>" + uniqMainTitle[j] + "</label><br />"
                                       + "<fieldset id='mainFset_" + uniqMainId[j] + "' class='searchPageFset'><legend></legend>";
                            for (var k = 0, length_arr = allTag_rows.length; k < length_arr; k++) {
                                if (uniqMainId[j] == allTag_rows[k].maintag_id) {               
                                    if  (allTag_rows[k].subtag_id != null)  {
                                        tagsForm += "<input type='checkbox' id='sub_" + allTag_rows[k].subtag_id  + "' name='" + allTag_rows[k].maintag_id + "'  value='" + allTag_rows[k].subtag_id 
                                                  + "' onclick='myRT.centralSubEvents(event," + allTag_rows[k].subtag_id + ");' />"
                                                  + "<label for='sub_" + allTag_rows[k].subtag_id + "' class='searchPageLabel'>" + allTag_rows[k].subtag_title + "</label><br />";
                                        } else {
                                        tagsForm += "<input type='checkbox' id='sub_0' name='" + allTag_rows[k].maintag_id                  //create a hidden checkbox if subtag is null; assign 0 to subtag value
                                                  + "' value='0' style='visibility:hidden' />"
                                        
                                    }
                                } 
                            }   
                            tagsForm += "</fieldset>";
                        } 
                        tagsForm += "</fieldset>"
                       //$('#pResourceTags').html(tagsForm);
                       $(res_container).html(tagsForm);
                       
                       $('#centralFieldset input:checkbox').each(function() {                        
                           if ($(this).attr('name') == 'category') {                                      //disable all main category unless main category does not have any subcategory
                                $(this).attr('disabled',true);
                           }
                           if ($(this).val() == 0) {                                                       //enable a main category if it has no subcategory.   
                               var mainId = $(this).attr('name');
                               $('#main_'+ mainId).attr('disabled',false);
                           }
                       })

                        if(opt ==1) {
                            //var rdata = $('#tr_res_'+rid).data();
                            var img = rdata.img;
                            var title = rdata.title;
                            var desc = rdata.desc;
                            var grade_level = rdata.grade_level;
                            var grade_desc = rdata.grade_desc;
                            var tag = rdata.tag;                           

                            for(t in tag) {
                                //alert(tag[t].maintag_id);
                                var maintag_id = tag[t].maintag_id;
                                var subtag = tag[t].subtag;
                                
                                $('#main_' + maintag_id).attr('checked',true);
                                
                                for(s in subtag) {
                                    var subtag_id = subtag[s].subtag_id;
                                    
                                    $('#sub_' + subtag_id).attr('checked',true);
                                }
                            }

                        }
                       
                       myRT.createTagsArray();
                       
                    }  else  {
                        alert("Sorry. Cannot retrieve records from category table.")
                    }
                        
                }
             });   

            //$('#btnCloseAllTagPanel').click(function(e) {
            //    $('#pnlAllTags').fadeOut().iDDemodal();
            //});
            
        });        
    },
    
    centralMainEvents: function(e,maintag_id) {                                      //click the main category (check/uncheck all subcategories)
        var mainFieldset = "#mainFset_" + maintag_id;                                //this function is only for main categories without any subcategories       
        if (!($('#main_' + maintag_id).is(':checked')))  {
            $(mainFieldset + ' input:checkbox').each(function() {
                $(this).removeAttr('checked');
            }); 
        } else {
            $(mainFieldset + ' input:checkbox').each(function() {
                $(this).attr('checked', 'checked');
            });
        }  
        myRT.createTagsArray();
        
    },
    
    centralSubEvents: function(e,subtag_id) {                                            //Clicked inside a subcategory 
        var maintag_id = $('#sub_' + subtag_id).attr('name');
        var mainFieldset = "#mainFset_" + maintag_id;
        $('#main_' + maintag_id).attr('disabled',true);
        //console.log('#main_' + maintag_id);
        if ($('#main_' + maintag_id).is(':checked'))  {
            var subFlag = false;
            $(mainFieldset + ' input:checkbox').each(function() {
                if ($(this).is(':checked'))  {
                    $(this).attr('checked','checked');
                    subFlag = true;
                }
            });
            if (subFlag == true) {
                $('#main_' + maintag_id).attr('checked','checked');
            } else  {
                $('#main_' + maintag_id).removeAttr('checked');
            }

        } else {
            if  ($('#sub_' + subtag_id).is(':checked'))  {
                $('#sub_' + subtag_id).attr('checked','checked');
                $('#main_' + maintag_id).attr('checked','checked');
            }            
        }
        myRT.createTagsArray();
        
    },
    
    createTagsArray: function() {                                                         //tagsArray contain the main id and sub id of every subcategory selected
        var showString = "";
        var tagsArray = [];
        $('#centralFieldset input:checkbox:checked').each(function() {
            if ($(this).val() == 0) {                                                          //if hidden field is checked then get the main category id & subcategory is null
                var mainId = $(this).attr('name');
                var tempObj = new Object();
                tempObj.main_id = $(this).attr('name');
                tempObj.sub_id = null;
                tagsArray.push(tempObj);
            } else if ($(this).attr('name') != 'category' && $(this).val() != 0) {
                var mainId = $(this).attr('name');
                $('#main_' + mainId).attr('disabled',true);
                var tempObj = new Object();
                tempObj.main_id = $(this).attr('name');
                tempObj.sub_id = $(this).val();
                tagsArray.push(tempObj);
                showString += $("label[for='" + $(this).attr("id")+ "']").text() + ", ";
            } else if ($(this).attr('name') == 'category') {
                showString +=  "<br />" + $("label[for='" + $(this).attr("id")+ "']").text() + ": ";
            }                      
       });        
       console.log(tagsArray);
       //console.log(tagsArray.length);
       //console.log(showString);
       if (showString == "")  {
            $('#pSelectedTags').empty();  
       }  else {
            showString = showString.slice(0,showString.length-2);
            $('#pSelectedTags').html(showString + "<br /><br />");
            $('#pSelectedTags').prepend("Tags Selected:");  
       }
       
       myRT.arrTags = tagsArray;
       console.log("RT => " + myRT.arrTags);
       
       //alert(myRT.arrTags.length);
       
    }

 
}
