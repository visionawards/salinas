/*
 * JS class for Classes
 *
 *
 */

var iClasses = function() {
    this.viewClassesPanelURL = C_URL + ':viewClassesPanel';
    this.getAllClassesURL = C_URL + ':getAllClasses';
    this.getTeachersNamesURL = C_URL + ':getTeachersNames';
    this.viewAddClassPanelURL = C_URL + ':viewAddClassPanel';
    this.addAClassPanelURL = C_URL + ':addAClass';
    this.getAllStudentsURL = C_URL + ':getAllStudents';
    this.authorizeStudentsURL = C_URL + ':authorizeStudents';
    this.authorizeStudentsAllURL = C_URL + ':authorizeStudentsAll';
    this.removeAuthorizeURL = C_URL + ':removeAuthorization';
    this.fonts;

}

//$$(iClasses,iDJS);

iClasses.prototype = {
    viewClassesPage: function() {
        //alert("Classes Page");
        $.iDView({
            url:myC.viewClassesPanelURL,
            id:'pnlClasses',
            container: '#container'
        }, function(e) {
            $('#pnlPrivilege').remove();
            $('#pnlMyClass').remove();
            $('#pnlMyProfile').remove();
            $('#pnlAddTags').remove();
            $('#pnlSearchPage').remove();
            $('#divSearchPage').remove();
            $('#articleResourceList').remove();
            $('#articleAddResource').remove();
            $(this).fadeIn();
                        
            
            $.iDAjax({                                              
            url:myC.getAllClassesURL,
            //data:{lnameStart:lnameAlpha},
            data: {uid:UID, ulevel:ULevel},
            success: function(data) {
                if (data.msg == 1) {
                    console.log(data.result_rows);
                    var classes_rows = data.result_rows;
                    var classForm = "<label for='list_Classes' class='labelClasses'>List of Classes</label><br /><br />";
                    classForm += "<p><select name='list_Classes' id='list_Classes' class='labelSelect'>";
                    classForm += "<option value=''>Select</option>";
                    for (i=0, len=classes_rows.length; i < len; i++) {
                        classForm += "<option value='" + classes_rows[i].class_id + "'>";
                        classForm += classes_rows[i].semester + " ";
                        classForm += classes_rows[i].year + "  ";
                        classForm += classes_rows[i].class_code + "-";
                        classForm += classes_rows[i].class_section + "  ";
                        classForm += classes_rows[i].schedule + "  ";
                        classForm += classes_rows[i].teacher_name  + "</option>";
                        
                    }
                    classForm += "</select></p>";
                    classForm += "<p><button type='button' id='btnAddStudents' class='userButton'>Authorize Students</button>";
                    $('#selectClassForm').html(classForm);

                    
                    $('#list_Classes').bind({   
                        click: function() {
                            if ($('#list_Classes option:selected').val() == '') {
                                $('#btnAddClass').css('visibility','visible');
                                $('#btnAddStudents').css('visibility','hidden');                                
                                                                
                            } else {
                                $('#btnAddClass').css('visibility','hidden');
                                $('#btnAddStudents').css('visibility','visible');                                
                            }
                            $('#selectStudents').empty(); 
                            $('#authorizationBlock').hide();
                        },
                        change: function() {
                            if ($('#list_Classes option:selected').val() == '') {
                                $('#btnAddClass').css('visibility','visible');
                                $('#btnAddStudents').css('visibility','hidden');                                
                            } else {
                                $('#btnAddClass').css('visibility','hidden');
                                $('#btnAddStudents').css('visibility','visible');
                            }
                            $('#selectStudents').empty();
                            $('#authorizationBlock').hide();
                        }
                    });

            
                } else {//when no class exists
                    alert("No class exists. Please add a class.");
                }
                
                    $('#btnAddStudents').css('visibility','hidden');
                    $('#authorizationBlock').hide();                
                
                    $('#btnBackMenu').click(function(){
                        $('#pnlClasses').remove();
                    });
                    $('#btnAddClass').click(function(){
                        myC.addAClass();
                    });
                    $('#btnAddStudents').click(function(){
                        myC.addStudents();
                    });                
            }
            });
            
        });
        
    },
    
     addAClass: function() {
        //alert('adding a class page');
        $.iDView({
             url:myC.viewAddClassPanelURL,
             id:'pnlAddClass',
             container: '#container'
         }, function(e) {
            //$(this).fadeIn();
            $(this).fadeIn().iDModal(this).iDCenter();
            $.iDAjax({                                              
                url:myC.getTeachersNamesURL,
                //data:{schedule:class_schedule},
                success: function(data) {
                    if (data.msg == 1) {
                        //alert('teachers names retrieved');
                        console.log(data.result_rows);
                        var teacher_rows = data.result_rows;
                        $('#teachername').append("<option value=''>Select</option>");
                        for (var i=0, len=teacher_rows.length; i<len; i++)  {
                            $('#teachername').append("<option value='" + teacher_rows[i].user_id + "'>" + teacher_rows[i].fullname + "</option>");
                        }
                        $('#teachername').append("</select>");
                    } else {
                        alert('Error.  Cannot retrieve teachers names.')
                    }
                }
            });            
            
            //$('#btnSaveClass').css('visibility','hidden');
            $('#btnBackClasses,#addClassBackBtnX').click(function(){
                $('#pnlAddClass').fadeOut().iDDemodal();                        
            });
            $(':reset').click(function(){
                $('input').val("");
            });
            $('input').bind({       
                focus: function() {
                    $(this).css('background-color','lightblue');
                },
                blur: function() {
                    $(this).css('background-color','');
                },
                click: function() {
                    $(this).css('background-color','lightblue');
                },
                change: function() {
                    $(this).css('background-color','');
                    $('#btnSaveClass').css('visibility','visible');
                }
            });

            $('#teachername').bind({       
                blur: function() {
                    $(this).css('background-color','');
                },
                change: function() {
                    $(this).css('background-color','lightblue');
                    $('#btnSaveClass').css('visibility','visible');
                }
            });
            $('#year').bind({       
                blur: function() {
                    $(this).css('background-color','');
                },
                change: function() {
                    $(this).css('background-color','lightblue');
                    $('#btnSaveClass').css('visibility','visible');
                }
            });
            $('#semester').bind({       
                blur: function() {
                    $(this).css('background-color','');
                },
                change: function() {
                    $(this).css('background-color','lightblue');
                    $('#btnSaveClass').css('visibility','visible');
                }
            });
            $('#btnSaveClass').click(function(){
                $('input').blur();
                var class_teacheruid = $('#teachername').val();
                var class_teachername = $('#teachername option:selected').html();
                var class_code = $('#class_code').val();
                var class_section =  $('#class_section').val();
                var class_schedule =  $('#schedule').val();
                var class_year =  $('#year').val();
                var class_semester =  $('#semester').val();
                
                if(class_teacheruid != '' && class_code != '' && class_section != '' && class_schedule != '' && class_year != '' && class_semester != '') {
                    $.iDAjax({                                              
                        url:myC.addAClassPanelURL,
                        data:{
                            classCode:class_code,
                            classSection:class_section,
                            year:class_year,
                            semester:class_semester,
                            teacher_uid:class_teacheruid,
                            teachername:class_teachername,
                            schedule:class_schedule
                        },
                        success: function(data) {
                            if (data.msg == 1) {
                                alert('Class has been added');
                                console.log(data.class_id);
                                $('#pnlAddClass').fadeOut().iDDemodal();
                                
                                myC.viewClassesPage();
                                
                                //$('#list_Classes').append("<option value='" + data.class_id + "' selected='selected'>" + class_semester + " " + class_year + " " + class_code + "-" + class_section + " " + class_schedule + " " + class_teachername + "</option>");
                                //$('#list_Classes option:selected').css('background-color','lightblue');
                                //$('#btnAddStudents').css('visibility','visible');
                                    
                            } else {
                                alert('Error.  Cannot add this class.')
                            }
                        }
                    });

                } else {
                    if (class_schedule == '') {
                        $('#schedule').focus().css('background-color','lightblue');
                    }
                    if (class_section == '') {
                        $('class_section').focus().css('background-color','lightblue');
                    }
                    if (class_code == '') {
                        $('#class_code').focus().css('background-color','lightblue');
                    }
                    if (class_teacheruid == '') {
                        $('#teachername').focus().css('background-color','lightblue');
                    }
                    if (class_year == '') {
                        $('#year').focus().css('background-color','lightblue');
                    }
                    if (class_semester == '') {
                        $('#semester').focus().css('background-color','lightblue');
                    }
                    alert('Please enter information');   
                }
  
  
            });
            
         });
                        
     },
  
    addStudents: function() {
        var class_selected = $('#list_Classes').val();
        //alert('selected class: ' + class_selected);
        $('#btnAddStudents').css('visibility','hidden');
        
        var stuAdded = '';
        var stuRemoved = '';        
        
        $.iDAjax({                                              
            url:myC.getAllStudentsURL,
            data:{classId:class_selected},
            success: function(data) {
                if (data.msg == 1) {
                    
                    $('#authorizationBlock').show();
                    
                    console.log(data.result_rows);
                    var all_students = data.result_rows;
                    if (all_students.length > 0)  {    
                        var unregArray = [];
                        var regArray = [];
                        var leftDisplay = "<select name='leftNames' id='leftNames'>";
                        var rightDisplay = "<select name='rightNames' id='rightNames'>";
                        for (var i=0, len = all_students.length; i < len; i++) {
                            if (all_students[i].authorized == false) {                 //put all students not registered in class selected in unregArray
                                var tempLeft = new Object(); 
                                tempLeft.user_id = all_students[i].user_id;
                                tempLeft.fullname = all_students[i].fullname;
                                tempLeft.class_id = all_students[i].class_idno;
                                unregArray.push(tempLeft);
                                leftDisplay += "<option value='" + all_students[i].user_id + "'>" + all_students[i].fullname + "</option>";
                            } else {
                                var tempRight = new Object(); 
                                tempRight.user_id = all_students[i].user_id;
                                tempRight.fullname = all_students[i].fullname;
                                tempRight.class_id = all_students[i].class_idno;
                                regArray.push(tempRight);
                                rightDisplay += "<option value='" + all_students[i].user_id + "'>" + all_students[i].fullname + "</option>";
                            }

                        }

                        leftDisplay += "</select>";
                        rightDisplay += "</select>";
                        
                        $('#selectStudents').html(leftDisplay);
                        var middleButtons = "<div id='btnAddRemove'><input name='left2right' value='add ->' type='button'><br />";
                        middleButtons += "<input name='right2left' value='<- remove' type='button'></div>";
                        $('#selectStudents').append(middleButtons);
                        $('#selectStudents').append(rightDisplay);
                        
                        if (unregArray.length > regArray.length) {
                            var displaySize = unregArray.length + 1;
                        } else {
                            var displaySize = regArray.length + 1;
                        }
                        if (displaySize < 6) {
                            displaySize = 6;
                        }
                        $('#leftNames').attr('size',displaySize);
                        $('#rightNames').attr('size',displaySize);
                        $("#leftNames option:first").attr('selected','selected');
                        
                        $("#btnAddRemove input[type='button']").click(function(){  
                            var whatBtn = "";
                            if ($(this).val().indexOf('add') != -1) {  
                                whatBtn = 'Add';
                            } else {
                                whatBtn = 'Remove';
                            }
                            
                            var arrDirect = $(this).attr("name").split("2");  
                            var fromWhere = arrDirect[0];
                            var toWhere = arrDirect[1];
                            
                            $("#" + fromWhere + "Names option:selected").each(function(){  
                                var student_selected = $(this).val();
                                $("#" + toWhere + "Names").append($(this).clone()); 
                                $(this).remove();  
                                var toWhereSize = $('#' + toWhere + 'Names option').length;
                                var fromWhereSize = $('#' + fromWhere + 'Names option').length;
                                if (toWhereSize > fromWhereSize) {
                                    var displaySize = toWhereSize + 1;
                                } else {
                                    var displaySize = fromWhereSize + 1;
                                }
                                if (displaySize < 6) {
                                    displaySize = 6;
                                }
                                $("#" + toWhere + "Names").attr('size',displaySize);
                                $("#" + fromWhere + "Names").attr('size',displaySize);                                  
                                
                                if (whatBtn == 'Add') {
                                    
                                    stuAdded += student_selected + '##';
                                    
                                    /*
                                    $.iDAjax({                                              
                                        url:myC.authorizeStudentsURL,
                                        data:{classId:class_selected,
                                            authStudent:student_selected},
                                        success: function(data) {
                                            if (data.msg == 1) {
                                                $("#leftNames option:first").attr('selected','selected');
                                
                                            } else {
                                                alert('Error.  Cannot authorize student.')
                                            }

                                        }
                                    });
                                    */
                                   
                                   
                                } else {
                                    
                                    stuRemoved += student_selected + '##';
                                    
                                    /*
                                    $.iDAjax({                                              
                                        url:myC.removeAuthorizeURL,
                                        data:{classId:class_selected,
                                            removeStudent:student_selected},
                                        success: function(data) {
                                            if (data.msg == 1) {
                                                $("#rightNames option:first").attr('selected','selected');
                                
                                            } else {
                                                alert('Error.  Cannot remove student.')
                                            }

                                        }
                                    });
                                    */
                                   
                                }
                                
                                
                                
                            });  
                            
                        });  
                                              
                      $('#btnSaveAuthorization').unbind().bind('click', function(e) {
                            $.iDAjax({                                              
                                url:myC.authorizeStudentsAllURL,
                                data:{classId:class_selected,
                                    stuAdded:stuAdded, stuRemoved:stuRemoved},
                                success: function(data) {
                                    if (data.msg == 1) {
                                        $("#leftNames option:first").attr('selected','selected');
                                        alert('Successfully saved.');
                                    } else {
                                        alert('Error.  Cannot authorize student.')
                                    }
                                }
                            });
                      });
                                              
                    } else {
                        $('#selectStudents').html("There are no students registered in this class.");
                    }
                                                            
                }   else {
                    alert('Error.  Cannot access students database.');
                }
            }
        });

    },
    
    
    
/*    
    authorizeStudents: function(class_id) {
        var removeArray = [];
        $('#leftNames option').each(function(){
            removeArray.push($(this).val());
        });
        var addedArray = [];
        $('#rightNames option').each(function(){
            addedArray.push($(this).val());
        });
        console.log(removeArray);
        console.log(addedArray);
        
        var removeStudList = removeArray.toString();
        var addStudList = addedArray.toString();
        console.log(removeStudList);
        console.log(addStudList);
        console.log(class_id);
        $.iDAjax({                                              
            url:myC.authorizeStudentsURL,
            data:{classId:class_id,
                  addStudents:addStudList,
               removeStudents:removeStudList},
            success: function(data) {
                if (data.msg == 1) {
                    alert('authorization is successful');      
                    $('#btnAddClass').css('visibility','visible');
                    $('#btnAddStudents').css('visibility','hidden');
                    $('#selectStudents').empty();
                    $('#list_Classes option:selected').removeAttr('selected');
                    
                } else {
                    alert('Error.  Cannot authorize students.')
                }
                
            }
        });
    },
*/  
     
    viewDummyFunction: function() {

    }
  
};