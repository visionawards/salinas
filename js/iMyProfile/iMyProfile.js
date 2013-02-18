/*
 * JS class for MyProfile
 *
 *
 */


var iMyProfile = function() {
    this.viewMyProfilePanelURL = M_URL + ':viewMyProfilePanel';
    this.getMyInfoURL = M_URL + ':getMyInfo';
    this.updateMyInfoURL = M_URL + ':updateMyInfo';    
    this.fonts;
}

// $$(iLogin,iDJS);

iMyProfile.prototype = {
     viewMyProfilePanel: function()  {
         //alert('open privilege page');
         $.iDView({
             url:myM.viewMyProfilePanelURL,
             id:'pnlMyProfile',
             container: '#container'
         }, function(e) {
             $('#pnlClasses').remove();
             $('#pnlPrivilege').remove();
             $('#pnlMyClass').remove();
             $('#pnlAddTags').remove();
             $('#pnlSearchPage').remove();
             $('#divSearchPage').remove();
             $('#articleResourceList').remove();
             $('#articleAddResource').remove();
             $(this).fadeIn();
             var prof_userid = UID;
             $.iDAjax({                                              
                url:myM.getMyInfoURL,
                data:{user_id:prof_userid},
                success: function(data) {
                    if (data.msg == 1) {
                        console.log(data.result_info);
                        $('#prof_uname').html(data.result_info[0].username);                    
                        $('#prof_fname').val(data.result_info[0].firstname);                    
                        $('#prof_lname').val(data.result_info[0].lastname);                    
                        $('#prof_email').val(data.result_info[0].email);                    
                        $('#prof_password').val("");                    
                        $('#prof_confirm').val("");  
                        $('#prof_fname').focus();
                        //$('#btnSaveProfile').css('visibility','hidden');                         //Hide the save button until something is changed
                        $('input').bind({                                                        //when input text boxes are changed or clicked
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
                                //$('#btnSaveProfile').css('visibility','visible');
                            }
                        });
                        $('#btnBackMenu').click(function(){
                             $('#pnlMyProfile').remove();
                        });
                        $('#btnSaveProfile').click(function(){
                            $('input').blur();
                            var p_fname = $('#prof_fname').val();
                            var p_lname = $('#prof_lname').val();
                            var p_email =  $('#prof_email').val();
                            var p_password =  $('#prof_password').val();
                            var p_confirm =  $('#prof_confirm').val();
                            var p_fullname = p_fname + " " + p_lname;
                            var goodEmail = false;
                            var goodPassword = false;
                            console.log("pass: " + p_password);
                            console.log("conf: " + p_confirm);
                            
                            if(p_fname != '' && p_lname != '' && p_email != '') {
                                if (p_password == '' && p_confirm == '') {
                                    goodPassword = true;
                                } 
                                if (p_password != '' && p_password == p_confirm) {
                                    goodPassword = true;
                                } 
                                if (p_password != '' && p_password != p_confirm) {
                                    goodPassword = false;
                                    alert("Passwords do not match. Please try again.");                 
                                    $('#prof_password').focus();
                                } 
            
                                var emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
                                if (emailregex.test(p_email))  {
                                    goodEmail = true;
                                } else  {
                                    goodEmail = false;
                                    alert("Please enter a valid email");
                                    $('#prof_email').focus().css('background-color','lightblue');
                                }

                            } else {
                                if (p_email == '') {
                                    $('#prof_email').focus().css('background-color','lightblue');
                                }
                                if (p_lname == '') {
                                    $('#prof_lname').focus().css('background-color','lightblue');
                                }
                                if (p_fname == '') {
                                    $('#prof_fname').focus().css('background-color','lightblue');
                                }

                                alert('Please enter information');   
                            }

                            if(goodEmail && goodPassword) {    

                                $.iDAjax({                                              
                                    url:myM.updateMyInfoURL,
                                    data:{
                                        user_id:prof_userid,
                                        firstname:p_fname,
                                        lastname:p_lname,
                                        fullname:p_fullname,
                                        user_email:p_email,
                                        password:p_password
                                    },
                                    success: function(data) {
                                        if (data.msg == 1) {
                                            alert('Your account has been updated');
                                        } else {
                                            alert('Error.  Cannot update your account.')
                                        }
                                    }
                                });
                            } 
                        });
                        
                    }  else {
                        alert('Error.  Cannot access your account.')
                    }
                    
                }
             });

         })
     },
     
   viewDummyFunction: function() {
       
   }
     


};