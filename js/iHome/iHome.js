/*
 * JS class for Home
 *
 * @author David Kim
 * @email david.qwk@gmail.com
 *
 */

var iHome = function() {

}

// $$(iHome,iDJS);



iHome.prototype = {
    initHome: function() {
   
        $('#btnAbout').click(function(e) {
            alert('go to About Page'); 
        });
   
        $('#btnSearchPage').click(function(e) {
            myP.viewSearchPagePanel();
        });
        
        $('#btnContact').click(function(e) {
            alert('go to Contact Page'); 
        });

        $('#btnHelp').click(function(e) {
            alert('go to Help Page'); 
        });
        $('#btnClasses').click(function(e) {
            myC.viewClassesPage();
        });
        $('#btnCategory').click(function(e) {
            myT.viewTagsPage();
        });
        
        $('#btnUpload').click(function(e) {
            //alert('go to Upload Page'); 
            location.href = MODU + 'iResource::v';
        });
        
        $('#btnPrivilege').click(function(e) {
            //alert('go to Privileges Page'); 
            myG.viewPrivilegePanel();
        });
             
        $('#btnSignIn').click(function(e) {
            $('.top_nav_right > li').removeClass('selected');
            $(this).addClass('selected');
            myL.viewLoginForm();
        });
        
        $('#btnRegister').click(function(e) {
            $('.top_nav_right > li').removeClass('selected');
            $(this).addClass('selected');
            myL.viewSignUp();
        });
        
        $('#btnMyClass').click(function(e) {
            myY.viewMyClassPage();
        });
        
        $('#btnMyProfile').click(function(e) {
            myM.viewMyProfilePanel();
        });
        
        $('#btnSignOut').click(function(e) {
            
            $.iDYesNo({
                title:'Sign-out',
                message:'Are you sure you want to sign out?'
            }, function() {            

                $('.top_nav_right > li').removeClass('selected');
                $(this).addClass('selected');
                //alert('Signing Out');
                myL.logOut();

            });
            
        });
        

    
    }
    
};
