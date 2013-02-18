/*
 * This is a js class for Category
 *
 */

var iCategory = function() {
    this.viewTagsPagePanelURL = T_URL + ':viewTagsPagePanel';
    this.getAllTagsURL = T_URL + ':getAllTags';
    this.getMainTagsURL = T_URL + ':getMainTags';
    this.getSubTagsURL = T_URL + ':getSubTags';
    this.addSubTagsURL = T_URL + ':addSubTags';
    this.addMainTagsURL = T_URL + ':addMainTags';
    this.updateSubTagsURL = T_URL + ':updateSubTags';
    this.updateMainTagsURL = T_URL + ':updateMainTags';
    this.deleteSubTagsURL = T_URL + ':deleteSubTags';
    this.deleteMainTagsURL = T_URL + ':deleteMainTags';

    this.fonts;
}

// $$(iLogin,iDJS);

iCategory.prototype = {
     viewTagsPage: function()  {
         $.iDView({
             url:myT.viewTagsPagePanelURL,
             id:'pnlAddTags',
             container: '#container'
         }, function(e) { 
             $('#pnlClasses').remove();
             $('#pnlPrivilege').remove();
             $('#pnlMyClass').remove();
             $('#pnlMyProfile').remove();
             $('#pnlSearchPage').remove();
             $('#divSearchPage').remove();
             $('#articleResourceList').remove();
             $('#articleAddResource').remove();
             $(this).fadeIn();
             $('#addTagsFormDiv').empty();
             $('#subTagListDiv').empty();
             $.iDAjax({                                              
                url:myT.getAllTagsURL,
                //data:{doc_number:docNum},
                success: function(data) {
                    if (data.msg == 1) {
                        //console.log(data.alltag_rows);
                        var allTag_rows = data.alltag_rows;
                        var uniqMainId = [];                            //create an array with unique main tags ID 
                        var uniqMainTitle = [];                         //create another array with unique main tags TITLE 
                        for (var i = 0, length_arr = allTag_rows.length; i < length_arr; i++)  {        
                            if (uniqMainId.indexOf(allTag_rows[i].maintag_id) == -1) {
                               uniqMainId.push(allTag_rows[i].maintag_id);
                               uniqMainTitle.push(allTag_rows[i].maintag_title);
                            }
                        }
                        console.log(uniqMainId);
                        console.log(uniqMainTitle);
                        $('#addTagsFormDiv').empty();                    
                        var tagsForm = "<form><p>"
                                     + "<input type='text' id='addMainTag' class='addMainTag' maxlength='256' onchange='myT.addCategory();' />" 
                                     + "<button type='button' class='addCatButton' onclick='myT.addCategory();'>Add Category</button>"
                                     + "<br /><br /></p>"
                                     + "<ul id='tagListDiv'>"; 
                        for (var j = 0, len_arr = uniqMainId.length; j < len_arr; j++)     {
                            tagsForm  += "<li>" 
                                       + "<input type='text' id='editMainId_" + uniqMainId[j] + "' class='editMainTag' maxlength='256' value='" + uniqMainTitle[j] 
                                       + "' onchange='myT.editCategory(event," + uniqMainId[j] + ");' />"
                                       + "<button type='button' class='editButton' onclick='myT.editCategory(event," + uniqMainId[j] + ");'>save</button>" 
//                                       + "<button type='button' class='deleteButton' onclick='myT.deleteCategory(event," + uniqMainId[j] + ");'>delete</button>" 
                                       + "<ul id='ul_main_" + uniqMainId[j] + "'>";
                            for (var k = 0, length_arr = allTag_rows.length; k < length_arr; k++) {
                                if (uniqMainId[j] == allTag_rows[k].maintag_id && allTag_rows[k].subtag_id != null) {               //test null if a main tag exists with no subcategory
                                    tagsForm += "<li>" 
                                              + "<input type='text' id='editSubId_" + allTag_rows[k].subtag_id + "' class='editSubTag' maxlength='256' value='" + allTag_rows[k].subtag_title
                                              + "' onchange='myT.editSubCategory(event," + allTag_rows[k].subtag_id + ");' />"
                                              + "<button type='button' class='editButton' onclick='myT.editSubCategory(event," + allTag_rows[k].subtag_id + ");'>save</button>"
  //                                            + "<button type='button' class='deleteButton' onclick='myT.deleteSubCategory(event," + allTag_rows[k].subtag_id + ");'>delete</button>"
                                              + "</li>";
                                }
                            }   
                            tagsForm += "<li>" 
                                      + "<input type='text' id='addSubId_" + uniqMainId[j] + "' class='addSubTag' maxlength='256' onchange='myT.addSubCategory(event," 
                                      + uniqMainId[j] + ");' />"
                                      + "<button type='button' class='addButton' onclick='myT.addSubCategory(event," + uniqMainId[j] + ");'>Add</button>" 
                                      + "</li>"
                                      + "</ul>" 
                                      + "</li>";
                        } 
                        tagsForm = tagsForm + "</ul></form>";
                        $('#addTagsFormDiv').html(tagsForm);
                        $('#addMainTag').focus();
                    } else {
                        $('#addTagsFormDiv').html("Sorry. Cannot retrieve records from category table.");
                    }
                    
                }
             });  
             
  
         })
     },
     
     
     addCategory: function() {
         $('#addMainTag').focus();
         var new_maintag = $('#addMainTag').val();
         if (new_maintag.length != 0) {
            $.iDAjax({                                              
                url:myT.addMainTagsURL,
                data:{new_maintitle:new_maintag},
                success: function(data) {
                    if (data.msg == 1) {
                        var tagsForm = "";
                        alert(new_maintag + ' added. Id# ' + data.insert_mainid);
                        tagsForm += "<li>"
                                    + "<input type='text' id='editMainId_" + data.insert_mainid + "' class='editMainTag' maxlength='256' value='" + new_maintag
                                    + "' onchange='myT.editCategory(event," + data.insert_mainid + ");' />"
                                    + "<button type='button' class='editButton' onclick='myT.editCategory(event," + data.insert_mainid  + ");'>save</button>"
//                                    + "<button type='button' class='deleteButton' onclick='myT.deleteCategory(event," + data.insert_mainid  + ");'>delete</button>"
                                    + "<ul id='ul_main_" + data.insert_mainid + "'>"
                                    + "<li>" 
                                    + "<input type='text' id='addSubId_" + data.insert_mainid + "' class='addSubTag' maxlength='256' onchange='myT.addSubCategory(event," 
                                    + data.insert_mainid + ");' />"
                                    + "<button type='button' class='addButton' onclick='myT.addSubCategory(event," + data.insert_mainid + ");'>Add</button>" 
                                    + "</li>"
                                    + "</ul>" 
                                    + "</li>";
                        $('#tagListDiv').append(tagsForm);
                        $('#addMainTag').val("");
                        $('#addSubId_' + data.insert_mainid).focus();
                    } else {
                        alert('Error.  Cannot add new category to database.');
                        $('#addMainTag').focus();
                    }
                }
            });                 
         } else {
            alert('Please enter a category');
            $('#addMainTag').focus();
         }
     },

     
     addSubCategory: function(e,cat_id) {
         var newSubTag = $('#addSubId_' + cat_id).val();
         var mainTag_selected = cat_id;
         //alert ("category id: " + cat_id);
         //alert ("subcategory value: " + newSubTag);
         if (newSubTag.length != 0) {
            $.iDAjax({                                              
                url:myT.addSubTagsURL,
                data:{main_id:mainTag_selected,
                  subtag_title:newSubTag},
                success: function(data) {
                    if (data.msg == 1) {
                        alert(newSubTag + ' added with subtag id# ' + data.insert_subid);
                        var tagsForm = "";
                        tagsForm = tagsForm + "<li>" 
                                            + "<input type='text' id='editSubId_" + data.insert_subid + "' class='editSubTag' maxlength='256' value='" + newSubTag
                                            + "' onchange='myT.editSubCategory(event," + data.insert_subid + ");' />"
                                            + "<button type='button' class='editButton' onclick='myT.editSubCategory(event," + data.insert_subid  + ");'>save</button>"
//                                            + "<button type='button' class='deleteButton' onclick='myT.deleteSubCategory(event," + data.insert_subid  + ");'>delete</button>"
                                            + "</li>"
                                            + "<li>" 
                                            + "<input type='text' id='addSubId_" + cat_id + "' class='addSubTag' maxlength='256' onchange='myT.addSubCategory(event," 
                                            + cat_id + ");' />"
                                            + "<button type='button' class='addButton' onclick='myT.addSubCategory(event," + cat_id + ");'>Add</button>" 
                                            + "</li>";
                        var last_li = "#ul_main_" + cat_id + " li:last";
                        $(last_li).remove();                                        //remove the last (blank) input text box for adding and then replace with two input lines (edit and add)
                        $('#ul_main_' + cat_id).append(tagsForm);
                        $('#addSubId_' + cat_id).focus();
                        
                    } else {
                        alert('Error.  Cannot add new subcategory to the database.');
                        $('#addSubId_' + cat_id).focus();
                    }
                
                }
            });              
         } else {
             alert('please enter a subcategory');
             $('#addSubId_' + cat_id).focus();
         }
             
         
     },
     
     editCategory: function(e,cat_id) {
         var update_maintitle = $('#editMainId_' + cat_id).val();
         //alert("category id: " + cat_id);
         //alert("category: " + update_maintitle);
         if (update_maintitle.length != 0) {
            $.iDAjax({                                              
                url:myT.updateMainTagsURL,
                data:{edit_maintag:cat_id,
                    edit_maintitle:update_maintitle},
                success: function(data) {
                    if (data.msg == 1) {
                        alert('Category is changed.');
                        $('#editMainId_' + cat_id).val(update_maintitle);
                        $('#editMainId_' + cat_id).focus();
                    } else {
                        alert('Error.  Cannot update category in database.');
                        $('#editMainId_' + cat_id).focus();
                    }
                }
            });                 
         } else {
            alert('Please enter a category');
            $('#editMainId_' + cat_id).focus();
         }
         

     },
     
     editSubCategory: function(e,subCat_id) {
         
         var update_subTitle = $('#editSubId_' + subCat_id).val();
         //alert("subcategory id: " + subCat_id);
         //alert("subcategory: " + update_subTitle);
         if (update_subTitle.length != 0) {
            $.iDAjax({                                              
                url:myT.updateSubTagsURL,
                data:{edit_subtag:subCat_id,
                    edit_subtitle:update_subTitle},
                success: function(data) {
                    if (data.msg == 1) {
                        alert('Subcategory is changed.');
                        $('#editSubId_' + subCat_id).val(update_subTitle);
                        $('#editSubId_' + subCat_id).focus();
                    } else {
                        alert('Error.  Cannot update category in database.');
                        $('#editSubId_' + subCat_id).focus();
                    }
                }
            });                 
         } else {
            alert('Please enter a category');
            $('#editSubId_' + subCat_id).focus();
         }
         

     },
     
     
     
     deleteCategory: function(e,main_id) {
        alert('delete cat ' + main_id);
        $.iDAjax({                                              
            url:myT.deleteMainTagsURL,
            data:{delete_maintag:cat_id},
            success: function(data) {
                if (data.msg == 1) {
                    alert('Category is deleted');
                    
                } else {
                    alert('Cannot delete category in database. Resources have been tag with this category.');
                    
                }
            }
        });                 

     },
     
     deleteSubCategory: function(e,sub_id) {
         alert('delete sub ' + sub_id);
         var deleteAnswer=confirm("Delete this subcategory?");
         if (deleteAnswer==true){
            $.iDAjax({                                              
                url:myT.deleteSubTagsURL,
                data:{delete_subtag:sub_id},
                success: function(data) {
                    if (data.msg == 1) {
                        alert('Subcategory is deleted');
                        $('#editSubId_' + sub_id).remove();
                    } else {
                        alert('Cannot delete subcategory in database. Resources have been tag with this category.');
                    }
                }
            });                 
        } 
     },
     
     viewDummyFunction: function() {

     }


};