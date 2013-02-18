/*
 * JS class for MyClass
 *
 *
 */

var iMyClass = function() {
    this.viewMyClassPanelURL = Y_URL + ':viewMyClassPanel';
    this.searchClassesURL = Y_URL + ':searchClasses';
    this.registerClassURL = Y_URL + ':registerClasses';
    this.fonts;
}

//$$(iMyClass,iDJS);

iMyClass.prototype = {
    viewMyClassPage: function() {
       $.iDView({
             url:myY.viewMyClassPanelURL,
             id:'pnlMyClass',
             container: '#container'
         }, function(e) {
             $('#pnlClasses').remove();
             $('#pnlPrivilege').remove();
             $('#pnlMyProfile').remove();
             $('#pnlAddTags').remove();
             $('#pnlSearchPage').remove();
             $('#divSearchPage').remove();
             $('#articleResourceList').remove();
             $('#articleAddResource').remove();
             $(this).fadeIn();
             $.iDAjax({                                              
                url:myY.searchClassesURL,
                //data:{lnameStart:lnameAlpha},
                success: function(data) {
                    if (data.msg == 1) {
                        //console.log(data.result_rows);
                        var classes_rows = data.result_rows;
                        
                        var uniqClassArray = [];
                        var uniqIdArray = [];
                        var copiedArray = [];
                        for (var i=0, len = classes_rows.length; i < len; i++)  {
                            copiedArray[i] = classes_rows[i].class_id;
                            if (uniqIdArray.indexOf(classes_rows[i].class_id) == -1) {
                                uniqIdArray.push(classes_rows[i].class_id);
                                var tempObj = new Object();
                                tempObj.class_id = classes_rows[i].class_id;
                                tempObj.class_code = classes_rows[i].class_code;
                                tempObj.class_section = classes_rows[i].class_section;
                                tempObj.year = classes_rows[i].year;
                                tempObj.semester = classes_rows[i].semester;
                                tempObj.schedule = classes_rows[i].schedule;
                                tempObj.teachername = classes_rows[i].teacher_name;
                                tempObj.student_registered = false;
                                uniqClassArray.push(tempObj);
                                
                            }
                            
                        }
                        //console.log('uniq: ' + uniqIdArray);
                        //console.log('copy: ' + copiedArray);
                        for (var i = 0, len_outArray = uniqIdArray.length; i < len_outArray; i++) {
                                var registeredFlag = false;
                                for (var w = 0; w < copiedArray.length; w++) {
                                    if (uniqIdArray[i] == copiedArray[w]) {
                                        if (classes_rows[w].student_id != null && classes_rows[w].user_idno == UID) {
                                            registeredFlag = true;
                                        }
                                        delete copiedArray[w];
                                    }
                                }
                                if (registeredFlag == true) {                   
                                    uniqClassArray[i].student_registered = true;
                                    registeredFlag = false;
                                }
                        }
                        //console.log(uniqClassArray);
                        
                        $('#displayClassesForm').empty();    
                        var classForm = "<p>Please Select a Class</p><br />";
                        $('#displayClassesForm').append(classForm);   
                        for (i=0, len=uniqClassArray.length; i < len; i++)  {
                            classForm = "<p id='regLabel_" + uniqClassArray[i].class_id  + "'>";
                            if (uniqClassArray[i].student_registered == true)  {
                                classForm += "<input type='radio' name='classList' value='"  + uniqClassArray[i].class_id  +  "' disabled='disabled' /> ";
                            } else {
                                classForm += "<input type='radio' name='classList' value='"  + uniqClassArray[i].class_id  +  "' /> ";
                            }
                            
                            classForm += " " + uniqClassArray[i].year;
                            classForm += " " + uniqClassArray[i].semester;
                            classForm += " " + uniqClassArray[i].class_code; 
                            classForm += " Section: " + uniqClassArray[i].class_section;
                            classForm += " " + uniqClassArray[i].schedule;
                            classForm += " " + uniqClassArray[i].teachername;
                            if (uniqClassArray[i].student_registered == true)  {
                                classForm += " ======Registered======";
                            }
                            classForm += "</p>"; 
                            $('#displayClassesForm').append(classForm);   
                        
                        }
                        classForm =  "<br /><br /><br />";
                        classForm +=  "<button type='button' id='btnBackMenu' class='userButton' >Back to Main Menu</button>";
                        classForm +=  "<button type='button' id='btnClear' class='userButton' >Clear Selection</button>";
                        classForm +=  "<button type='button' id='btnRegister' class='userButton'>Register</button>";
                        //$('#displayClassesForm').html(classForm);   
                        $('#displayClassesForm').append(classForm);   
                        $('#btnRegister').css('visibility','hidden');
                        $('input').bind({                                                        //when input text boxes are changed or clicked
                            focus: function() {
                                $(this).css('background-color','lightblue');
                            },
                            blur: function() {
                                $(this).css('background-color','');
                            },
                            click: function() {
                                $(this).css('background-color','lightblue');
                                $('#btnSaveUser').css('visibility','visible');
                            },
                            change: function() {
                                $(this).css('background-color','lightblue');
                                $('#btnRegister').css('visibility','visible');
                            }
                        });
                        $('#btnClear').click(function(){
                            $('#btnRegister').css('visibility','hidden');
                            $('input:radio').each(function() {
                                 $(this).removeAttr('checked');
                            });
                        });
                        $('#btnBackMenu').click(function(){
                            $('#pnlMyClass').remove();
                        });
                        $('#btnRegister').click(function(){
                            $('input:radio').each(function() {
                                if ($(this).is(':checked')) {
                                    var myClassId = $(this).val();
                                    //alert ("My Selected Class: " + myClassId);
                                    $.iDAjax({                                              
                                        url:myY.registerClassURL,
                                        data:{
                                            class_id:myClassId,
                                            user_id:UID
                                        },
                                        success: function(data) {
                                            if (data.msg == 1) {
                                                alert('You have been registered.');
                                                $('#regLabel_' + myClassId).append('  =====Registered=====');
                                                $('input:radio:checked').attr('disabled','disabled').removeAttr('checked');
                                            }  else {
                                                alert('Error.  Cannot register into this class');
                                            }
                                        }
                                     });
                                    
                                
                                }
                                 
                            });
                        });
                    }  else {
                        alert('Error in reading database.');
                    }
                }
             });
         });    
                    
    }
};