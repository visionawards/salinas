/*
 * Sample extracted from iDuckling_Proto Google groups
 */
function iDJSLocal() {
    //this.LAYOUT_ROOT = "<?php echo(LAYOUT_ROOT);?>";
    //alert("<?php echo(LAYOUT_ROOT);?>");
    this.ihideTop = -500;
};

iDJSLocal.prototype = {
    getA: function() {
        alert('getA');
        return this;
    },
    getB: function() {
        alert('getB');
        return this;
    },
    vSignUp: function() {
        
    },
    noti: function(msg) {//only works with Chrome at this moment
        if (window.webkitNotifications.checkPermission() == 0) {
                var notification = window.webkitNotifications.createNotification('http://localhost/cyotl_alpha1/images/noti.gif','CYOTL Notifier',msg);
                //notification.ondisplay = function() { setTimeout(notification.cancel(), 2000); }
                notification.show();
                setTimeout(notification.close(), 2000);
        } else {
            window.webkitNotifications.requestPermission();
        }    
    }
}
$$(iDJSLocal); //this inherits parent class as in $$(CHILD_CLASS, PARENT_CLASS);

var iDJS = new iDJSLocal();
//Then, it works like myiDJSLocal.progressor().getA().getB();
               
/* another sample to add 'getC' to iDJS */
_$$('getC', function() { 
   alert('getC');
   return this;
});

_$$('getD', function() {
   alert('getD');
   return this;
});

$(window).resize(function(){
   //alert('Window has benn resized\n\nWidth: ' + $(window).width() + '\n\nHeight: ' + $(window).height());
});

jQuery.event.add(window, "load", resizeFrame);
jQuery.event.add(window, "resize", resizeFrame);

//add this function to the onload event to ensure it is resized when the page loads as well.
function resizeFrame()
{
    var h = $(window).height();
    var w = $(window).width();
    $("#elementToResize").css('height',(h < 1024 || w < 768) ? 500 : 400);
}

   //var worker = new Worker('js/worker.js');
   //worker.onmessage = function (event) {
     //document.getElementById('dummy').textContent = event.data;
   //};

