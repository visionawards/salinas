/*
 * This is a js class for Privileges
 *
 * 
 *
 */

var iPrivilege = function() {
    this.viewPrivilegePanelURL = G_URL + ':viewPrivilegePanel';
    this.searchUserURL = G_URL + ':searchUsers';
    this.viewUserPagePanelURL = G_URL + ':viewUserPagePanel';
    this.updateUserURL = G_URL + ':updateUsers';
    this.deleteUserURL = G_URL + ':deleteUsers';
    this.fonts;
}

// $$(iLogin,iDJS);

iPrivilege.prototype = {
     viewPrivilegePanel: function()  {
         //alert('open privilege page');
         $.iDView({
             url:myG.viewPrivilegePanelURL,
             id:'pnlPrivilege',
             container: '#container'
         }, function(e) {
             $('#pnlClasses').remove();
             $('#pnlMyProfile').remove();
             $('#pnlMyClass').remove();
             $('#pnlAddTags').remove();
             $('#pnlSearchPage').remove();
             $('#divSearchPage').remove();
             $('#articleResourceList').remove();
             $('#articleAddResource').remove();
             $(this).fadeIn();

         })
     },
     
     getUserLname: function(e,lnameAlpha) {
         //alert('Last name starts with: ' + lnameAlpha);
         $('#pnlUsers').css('visibility','visible');
         $.iDAjax({                                              
                url:myG.searchUserURL,
                data:{lnameStart:lnameAlpha},
                success: function(data) {
                    if (data.msg == 1) {
                        //console.log(data.result_rows);
                        var users_rows = data.result_rows;
                        $('#displayUsersDiv').empty();                    
                        var userForm = "<table class='tblUsers'><thead>" 
                                        + "<tr class='trUsers'><th>Last Name</th><th>First Name</th><th>" + " &nbsp; " + "</th></tr></thead></table>";
                        $('#displayUsersDiv').append(userForm);                    
                        for (i=0, len_user = users_rows.length; i < len_user; i++) {
                            userForm = "<table id='userTable_" + i + "'  class='tblUsers'><tr class='trUsers'>";
                            userForm += "<td id='tdlastname_" + i + "' class='tdUsers'>" + users_rows[i].lastname + "</td>";
                            userForm += "<td id='tdfirstname_" + i + "' class='tdUsers'>" + users_rows[i].firstname + "</td>";
                            userForm += "<td class='tdUsers'>"; 
                            //userForm += "<button type='button' id='btnView_" + i + "' onclick='myG.viewUserInfo(event," + i + ")'>" + " view " + "</button>";
                            userForm += "<button type='button' id='btnEdit_" + i + "' onclick='myG.editUserInfo(event," + i + ")'>" + " edit " + "</button>";
                            if(UID != users_rows[i].user_id ) {                                                                                                        //UID is current userid
                                userForm += "<button type='button' id='btnDelete_" + i + "' onclick='myG.deleteUserInfo(event," + i + ")'>" + " delete " + "</button>";
                            } 
                            
                            userForm += "</td></tr></table>";
                                    
                            $('#displayUsersDiv').append(userForm); 
                           
                            $('#userTable_' + i).data({                                    //store data for individual page view
                            user_id: users_rows[i].user_id,
                            username: users_rows[i].username,
                            userlevel: users_rows[i].userlevel,
                            firstname: users_rows[i].firstname,
                            lastname: users_rows[i].lastname,
                            fullname: users_rows[i].fullname,
                            //password: users_rows[i].password,
                            email: users_rows[i].email
                            });  
                            
                        }
                        //$('#btnViewbackBtn').click(function(){
                        
                        //});
                    } else {
                        alert('Error.  Cannot access Users table')
                    }
                }
            });
         
     },
     
     viewUserInfo: function(e,j) {
         //alert('view page: ' + j);
         //console.log('view: ' + $('#userTable_' + j).data().fullname);
         
         $.iDView({
             url:myG.viewUserPagePanelURL,
             id:'pnlUserPage',
             container: '#container'
         }, function(e) {
            $(this).fadeIn().iDModal(this).iDCenter();
            $('#whatPage').html('View Page');
            $('#ind_fname').val($('#userTable_' + j).data().firstname);
            $('#ind_lname').val($('#userTable_' + j).data().lastname);
            $('#ind_uname').val($('#userTable_' + j).data().username);
            $('#ind_ulevel').val($('#userTable_' + j).data().userlevel);
            $('#ind_email').val($('#userTable_' + j).data().email);
            $('input').blur();
            $('#btnSaveUser').css('visibility','hidden');                         //Hide the save button.  Not needed. 
            $('input').click(function(){                                          //blur the input text boxes when clicked
               $(this).blur(); 
            });
            $('#ind_ulevel').click(function(){                                      
               $(this).blur(); 
            });
            $('#btnBackUser').focus();                                
            $('#btnBackUser').click(function() {                                  //Back button
                $('#pnlUserPage').fadeOut().iDDemodal();
            });
            
         });
         
     },
     
     editUserInfo: function(e,j) {
         //alert('edit page: ' + j);
         //console.log('edit: ' + $('#userTable_' + j).data().fullname);
         $.iDView({
             url:myG.viewUserPagePanelURL,
             id:'pnlUserPage',
             container: '#container'
         }, function(e) {
            $(this).fadeIn().iDModal(this).iDCenter();
            $('#whatPage').html('Edit Page');
            $('#ind_fname').val($('#userTable_' + j).data().firstname);
            $('#ind_lname').val($('#userTable_' + j).data().lastname);
            $('#ind_uname').val($('#userTable_' + j).data().username);
            $('#ind_ulevel').val($('#userTable_' + j).data().userlevel);
            $('#ind_email').val($('#userTable_' + j).data().email);
            //$('#btnSaveUser').css('visibility','hidden');                         //Hide the save button until something is changed
            $('#btnBackUser, #userPageBackBtnX').click(function() {                                  //Back button
                $('#pnlUserPage').fadeOut().iDDemodal();
            });
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
                    //$('#btnSaveUser').css('visibility','visible');
                }
            });
            $('#ind_ulevel').bind({                                                    //when user level select boxes is changed or clicked
                blur: function() {
                    $(this).css('background-color','');
                },
                change: function() {
                    $(this).css('background-color','lightblue');
                    //$('#btnSaveUser').css('visibility','visible');
                }
            });
            
            $('#btnSaveUser').click(function(){
                $('input').blur();
                $('#ind_ulevel').blur();
                var uid = $('#userTable_' + j).data().user_id;
                var fname = $('#ind_fname').val();
                var lname = $('#ind_lname').val();
                var uname = $('#ind_uname').val();
                var ulevel = $('#ind_ulevel').val();
                var u_email =  $('#ind_email').val();
                var full_name = fname + " " + lname;
                var goodEmail = false;
                //var validUlevel = false;
        
                if(uname != '' && fname != '' && lname != '' && u_email != '' && ulevel != '') {
                    var emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
                    if (emailregex.test(u_email))  {
                        goodEmail = true;
                    } else  {
                        alert("Please enter a valid email");
                        $('#ind_email').focus().css('background-color','lightblue');
                    }
                    
/*                    
                    if (!(isNaN(ulevel))) {
                        if ((ulevel >= 0) && (ulevel <= 4)) {                                      //user level are only from 0-4, 9 is super admin.
                            validUlevel = true;
                        } else {
                            alert("Please enter numbers from 0-4");
                            $('#ind_ulevel').focus().css('background-color','lightblue');
                        }
                    } else {
                        alert('User level is not a number');
                        $('#ind_ulevel').focus().css('background-color','lightblue');
                    }
*/                    
                } else {
                    if (u_email == '') {
                        $('#ind_email').focus().css('background-color','lightblue');
                    }
                    if (ulevel == '') {
                        $('#ind_ulevel').focus().css('background-color','lightblue');
                    }
                    if (uname == '') {
                        $('#ind_uname').focus().css('background-color','lightblue');
                    }
                    if (lname == '') {
                        $('#ind_lname').focus().css('background-color','lightblue');
                    }
                    if (fname == '') {
                        $('#ind_fname').focus().css('background-color','lightblue');
                    }

                    alert('Please enter information');   
                }

//                if(goodEmail && validUlevel) {
                if(goodEmail) {    

                    $.iDAjax({                                              
                        url:myG.updateUserURL,
                        data:{
                            userid:uid,
                            username:uname,
                            userlevel:ulevel,
                            firstname:fname,
                            lastname:lname,
                            fullname:full_name,
                            user_email:u_email
                        },
                        success: function(data) {
                            if (data.msg == 1) {
                                //alert('user information updated');
                                $('#pnlUserPage').fadeOut().iDDemodal();
                                $('#tdlastname_' + j).html(lname);
                                $('#tdfirstname_' + j).html(fname);
                                $('#userTable_' + j).data({                                    //store data for individual page view
                                    user_id: uid,
                                    username: uname,
                                    userlevel: ulevel,
                                    firstname: fname,
                                    lastname: lname,
                                    fullname: full_name,
                                    email: u_email
                                });  
                            
                            } else {
                                alert('Error.  Cannot update Users table');
                            }
                        }
                    });
                } 
            });
         });
     },
     
     deleteUserInfo: function(e,j) {
         //alert('delete page: ' + j);
         //console.log('delete: ' + $('#userTable_' + j).data().fullname);
         //console.log('delete: ' + $('#userTable_' + j).data().user_id);
         var del_userid = $('#userTable_' + j).data().user_id;
         var user_fullname = $('#userTable_' + j).data().fullname;
         $.iDYesNo({
             title:'Delete User',
             message:"Are you sure to delete " + user_fullname + " account?"                
         }, function() {
             
                $.iDAjax({                                              
                    url:myG.deleteUserURL,
                    data:{userid:del_userid},
                    success: function(data) {
                        if (data.msg == 1) {
                            alert("User account is deleted");
                            $('#userTable_' + j).remove();
                        } else {
                            alert('Error. Cannot delete user in database.');
                        }
                    }
                }); 
             
         });
          
     },
     
     viewDummyFunction: function() {

     }
     


};