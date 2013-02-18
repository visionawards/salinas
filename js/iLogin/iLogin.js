/*
 * This is a js class for Login/SignUp
 *
 * 
 * 
 *
 */

var iLogin = function() {
    this.viewSignUpPanelURL = LS_URL + 'viewSignUp';
    this.doSignUpURL = LS_URL + 'doSignUp';
    this.viewLoginFormURL = LL_URL + 'viewLoginForm';
    this.doLoginURL = LL_URL + 'doLogin';
    this.logoutURL = LL_URL + 'logOut';
    this.viewForgotPasswordPanelURL = L_URL + ':viewForgotPasswordPanel';
    this.sendNewPasswordURL = L_URL + ':sendNewPassword';

    this.fonts;
}

// $$(iLogin,iDJS);

iLogin.prototype = {
    initLogin: function() {
        if(UID>0) {
        } else {
           
        }
    },
    viewLoginForm: function(e) {

        $('#pnlSignUpPage').remove();
        $('#container > div').eq(1).remove();
        $.iDView({
             url:myL.viewLoginFormURL,
             id:'pnlLoginPage',
             container: '#container'
         }, function(e) {
             $(this).fadeIn();
             $('#username').focus();
             $('#btnLogin').click(function() {

                var uname = $('#username').val();
                var pass =  $('#password').val();          
                if (uname != '' && pass != '') {
                     $.iDAjax({
                         url:myL.doLoginURL,
                         data:{username:uname,password:pass},
                         success: function(data) {
                           if (data.msg == 1) {
                              //location.href = BASE_URL;
                              location.href = BASE_URL + "?u=iSearchPage::v";                             
                              
                           } else {
                              alert("Failed to sign-in properly. Please check your account data and try it again.");
                              $('#username').focus();
                           }
                         }
                     });
                } else {
                    
                    if (pass == '') {
                        $('#password').focus();
                    }
                    if (uname == '') {
                        $('#username').focus();
                    }
                    alert('All blanks need to be filled.');                      
                }
                   
             });
             $('#btnFrgtPass').click(function(e) {
                myL.sendPass(e);
             });
         });
        
//        $().renderm(myL.loginFormURL,function() {
//        $().iDRenderm(myL.loginFormURL,function() {    
            
//            $('#pnlFrgtPass').css({
//                width:'280px',
//                margin:'0 auto'
//            });
            
            
            
//            $('#btnFrgtPass').click(function(e) {
//                myL.sendPass(e);
//            });
            
            //$('button').button('refresh');
            //$("div[data-role='collapsible']").collapsible('refresh');            
//        });             
            
    },
    
    logOut: function(e) {
       $.iDAjax({
          url:myL.logoutURL,
          //data:{},
          success: function(data) {
              if(data.msg ==1) {
                  location.href = BASE_URL + "?u=iLogin::v";
              } else {
                  alert("Failed to sign-out properly. Please refresh the page and go to the Homepage.");
              }
          }
        });        
    },
    viewSignUp: function(e) {
        $('#pnlLoginPage').remove();
        $.iDView({
             url:myL.viewSignUpPanelURL,
             id:'pnlSignUpPage',
             container: '#container'
         }, function(e) {
             $(this).fadeIn();
             $('#fname').focus();
             $('#btnSignUp').bind('click',function(e){
                 myL.doSignUp(e);
             })
         })

    },
    vp: function(e) {
        
         $().iDRenderm(myL.signUpURL, function() {    
            
            _$('#frmSignUp > ul').css({
                width:'280px',
                margin:'0 auto'
            });
            
            $('#btnSignUp').bind('click', function(e) {
                myL.doSignUp(e);
            });
        });
    },

    doSignUp: function(e) {
        var uname = $('#uname').val();
        var fname = $('#fname').val();
        var lname = $('#lname').val();
//        var full_name = $('#fname').val() + $('#lname').val();
        var email = $('#email').val();
        var pass = $('#password').val();
        var confirm = $('#confirm').val();
        var goodEmail = false;
        var goodPasswd = false;
        
// insert validation here

        if(uname != '' && fname != '' && lname != '' && email != '' && pass != '' && confirm != '') {

            if (pass == confirm) {
                goodPasswd = true;
            } else {
                goodPasswd = false;
                alert("The passwords do not match. Please try again.");                 
                $('#password').focus();
            } 
            
            var emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
            if (emailregex.test(email))  {
                goodEmail = true;
            } else  {
                goodEmail = false;
                alert("Please enter a valid email");
                $('#email').focus();
            }
                
        } else {
            
            if (confirm == '') {
                $('#confirm').focus();
            }
            if (pass == '') {
                $('#password').focus();
            }
            if (email == '') {
                $('#email').focus();
            }
            if (uname == '') {
                $('#uname').focus();
            }
            if (lname == '') {
                $('#lname').focus();
            }
            if (fname == '') {
                $('#fname').focus();
            }
            
            alert('All blanks need to be filled.');   
        }
        
        if(goodPasswd == true && goodEmail == true) {
            $.iDProgressorInit();
            $().iDAjax({
                url:myL.doSignUpURL,
                data:{
                    username:uname,
                    firstname:fname,
                    lastname:lname,
                    email:email,
                    password:pass               
                },
                success: function(data) {
                    if(data.msg == 1) {
//                        $('#signUpDiv').load(myL.loginFormURL);
//                        alert('success');
                        myL.viewLoginForm(e);
                    } else {
                        if(data.msg == 0) {
                            alert('The username already exists. Please try a different username.');
                            $('#uname').focus();
                        }
                        else if(data.msg == 2) {
                            alert('The email already exists. Please provide a different email.');
                            $('#email').focus();
                        }
                        else if(data.msg == 3) {
                            alert('Failed to sign up. Please try it again.');
                            $('#uname').focus();
                        }
                    }
                   $.iDProgressorEnd();
                }
            });
        } 
       
        
    },
    
 forgotPass: function(e) {
       $.iDView({
            url:myL.viewForgotPasswordPanelURL,
            parent: 'pnlForgotPassword',
            attribute: {
                'class':'pnlForgotPass'
            }
        }, function() {
            //_$(this).center('#container');
            $(this).fadeIn('5000').center();

            $('#pnlForgotPassword input[type=button]').eq(0).click(function(e) {
               $('#pnlForgotPassword').fadeOut('5000');
            });

            $('#pnlForgotPassword input[type=button]').eq(1).click(function(e) {
               myL.sendPass(e);
            });
        }).draggable({cancel:'input'});

    },
 
 
 sendPass: function(e) {
        
        $.iDProgressorInit();

        var email = $('#myemail').val();             //email validation
        if (email == '') {
            $.iDProgressorEnd();
            alert("Please enter your email address.");
            $('#myemail').focus();
        } 
        else  {
            var emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
            if (emailregex.test(email)) {
 //               alert('email is good.');
                $.iDAjax({
                    url:myL.sendNewPasswordURL,
                    data:{email:email},
                    success: function(data) {
                        if(data.msg ==1) {
                            $.iDProgressorEnd();
                            $().noti({
                                html:"Successfully submitted. Please check your mailbox. Your username and new password have been sent out.",
                                style: {
                                    width:'300px',
                                    height:'300px'
                                },
                                timeout: 10000
                            });
                        } else {
                            $.iDProgressorEnd();
                            alert("We cannot find your account information associated with the email. Please try again.");
                            $('#myemail').focus();
                        }
                    }
                });
            } else {
                $.iDProgressorEnd();
                alert("Please enter a valid email.");
                $('#myemail').focus();
            }
        
        }
 }
};