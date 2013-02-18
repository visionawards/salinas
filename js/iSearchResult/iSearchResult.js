/*
 * This is a js class for Login/SignUp
 *
 * @author David Kim
 * @email david.qwk@gmail.com
 *
 */

var iSearchResult = function() {
    this.viewSearchResultPanelURL = R_URL + ':viewSearchResultPanel';

    this.fonts;
}

// $$(iLogin,iDJS);

iSearchResult.prototype = {
     viewSearchResultPanel: function()  {
//         alert('Inside viewSearchResultPanel function');
         $.iDView({
             url:myR.viewSearchResultPanelURL,
             id:'pnlSearchResult',
             container: '#container'
         }, function(e) {
             $(this).fadeIn();

         })
     },
     viewDummyFunction: function() {

     }

};