/*
 * This is a js class for Search Page
 *
 * 
 * 
 *
 */

var iSearchPage = function() {
    this.viewSearchPagePanelURL = S_URL + ':viewSearchPagePanel';
    this.viewAllTagsURL = S_URL + ':viewAllTags';
    this.searchTablesURL = S_URL + ':searchTables';
    this.viewItemPagePanelURL = S_URL + ':viewItemPagePanel';
    this.getItemTagsURL = S_URL + ':getItemTags';
    this.getDiscussURL = S_URL + ':getDiscuss';
    this.getClassPostCommentsURL = S_URL + ':getClassPostComments';
    this.getStudentPostCommentsURL = S_URL + ':getStudentPostComments';
    this.getPostCommentsURL = S_URL + ':getPostComments';    
    //this.getTeacherClassURL = S_URL + ':getTeacherClass';  
    this.getClassListURL = S_URL + ':getClassList';  
    this.fonts;
    
    this.viewAddTopicPanelURL = S_URL + ':viewAddTopicPanel';
    this.doAddNewTopicURL = S_URL + ':doAddNewTopic';
    this.getClassDiscussionURL = S_URL + ':getClassDiscussion';
    this.viewPostCommentURL = S_URL + ':viewPostComment';
    this.doPostCommentURL = S_URL + ':doPostComment';
    
    this.viewFullImageURL = S_URL + ':viewFullImage';
    
    this.viewTranscriptWindowURL = S_URL + ':viewTranscriptWindow';
}

// $$(iLogin,iDJS);

iSearchPage.prototype = {
    
    v: function() {       
        
        myP.viewSearchPageContent();
    },
    viewSearchPagePanel: function()  {                          
         
         $('#divSearchPage').empty();
         
         $.iDView({
             url:myP.viewSearchPagePanelURL,
             id:'pnlSearchPage',
             container: '#container'
         }, function(e) {
                          
             $('#pnlClasses').remove();
             $('#pnlPrivilege').remove();
             $('#pnlMyClass').remove();
             $('#pnlMyProfile').remove();
             $('#pnlAddTags').remove();
             $('#articleResourceList').remove();
             $('#articleAddResource').remove();             
            
             $(this).fadeIn();             
             
             myP.viewSearchPageContent();
            }       
         );
 },    
    viewSearchPageContent: function() {
        
            //$('#pnlSearchPage').empty();
        
             $.iDAjax({                                              
                url:myP.viewAllTagsURL,
                //data:{doc_number:docNum},
                success: function(data) {
                    if (data.msg == 1) {
                        var allTag_rows = data.alltag_rows;
                        var uniqMainId = [];                            //create an array with unique main tags ID 
                        var uniqMainTitle = [];                         //create another array with unique main tags TITLE 
                        for (var i = 0, length_arr = allTag_rows.length; i < length_arr; i++)  {        
                            if (uniqMainId.indexOf(allTag_rows[i].maintag_id) == -1) {
                               uniqMainId.push(allTag_rows[i].maintag_id);
                               uniqMainTitle.push(allTag_rows[i].maintag_title);
                            }
                        }
                        //console.log(uniqMainId);
                        //console.log(uniqMainTitle);
                        
                        $('#pEditResourceTags').empty();
                        $('#centralFieldset').empty();                    
                        
                        var tagsForm = "";
                        for (var j = 0, len_arr = uniqMainId.length; j < len_arr; j++)     {
                            
                            tagsForm  += "<input type='checkbox' id='main_" + uniqMainId[j]  + "' name='category' value='" + uniqMainId[j] +"' onclick='myP.centralAllEvents(event," + uniqMainId[j]  + ");' />"
                                       + "<label for='main_" + uniqMainId[j] + "' class='searchPageCheckAll'>" + uniqMainTitle[j] + "</label><br />"
                                       + "<fieldset id='mainFset_" + uniqMainId[j] + "' class='searchPageFset'><legend></legend>";
                            for (var k = 0, length_arr = allTag_rows.length; k < length_arr; k++) {
                                if (uniqMainId[j] == allTag_rows[k].maintag_id) {               
                                    if  (allTag_rows[k].subtag_id != null)  {
                                        tagsForm += "<input type='checkbox' id='sub_" + allTag_rows[k].subtag_id  + "' name='" + allTag_rows[k].maintag_id + "'  value='" + allTag_rows[k].subtag_id 
                                              + "' onclick='myP.centralFormEvents(event," + allTag_rows[k].subtag_id + ");' />"
                                              + "<label for='sub_" + allTag_rows[k].subtag_id + "' class='searchPageLabel'>" + allTag_rows[k].subtag_title + "</label><br />";
                                    } else {
                                        tagsForm += "<input type='checkbox' id='sub_0' name='" + allTag_rows[k].maintag_id                  //create a hidden checkbox if subtag is null; assign 0 to subtag value
                                                  + "' value='0' style='visibility:hidden' />"
                                    }
                                } 
                            }   
                            tagsForm += "</fieldset>";
                        } 
                       $('#centralFieldset').html(tagsForm);                        
                        
                    }  else  {
                        alert("Sorry. Cannot retrieve records from category table.")
                        
                    }
                        
                }
             });         
        
    },
    returnHome: function() {
        location.href = BASE_URL;        
    },
    
    resetForm: function() {
        $('#searchPageFrame').empty();
        $('input:checkbox').each(function() {
            $(this).removeAttr('checked');
        });
    },
    
    gradeAllEvents: function() {
                                                                                        
        if (!($('#allGrades').is(':checked')))  {                                   //this will check/uncheck the "check all" box under Grade
            $('#gradeFieldset input:checkbox').each(function() {
                $(this).removeAttr('checked');
            }); 
        } else {
            $('#gradeFieldset input:checkbox').each(function() {
                $(this).attr('checked', 'checked');
            });
        }  
        myP.searchTables();
        
    },
    
    gradeFormEvents: function(e,grade_level) {

        if (!($('#allGrades').is(':checked')))  {                                  //Clicked inside Grade fieldset
            var gradeFlag = true;
            $('#gradeFieldset input:checkbox').each(function() {
                if  ( !($(this).is(':checked')) )  {
                    $(this).removeAttr('checked');
                    gradeFlag = false;
                }
            });
            if (gradeFlag == true) {
                $('#allGrades').attr('checked','checked');
            } else  {
                $('#allGrades').removeAttr('checked');
            }

        } else {
            if  (!($('#grade_' + grade_level).is(':checked')))  {
                $('#grade_' + grade_level).removeAttr('checked');
                $('#allGrades').removeAttr('checked');
            }            
        }
        myP.searchTables();            

    },
    
    centralAllEvents: function(e,maintag_id) {                                      //click the main category (check/uncheck all subcategories)

        var mainFieldset = "#mainFset_" + maintag_id;
        if (!($('#main_' + maintag_id).is(':checked')))  {
            $(mainFieldset + ' input:checkbox').each(function() {
                $(this).removeAttr('checked');
            }); 
        } else {
            $(mainFieldset + ' input:checkbox').each(function() {
                $(this).attr('checked', 'checked');
            });
        }  
        myP.searchTables();
        
    },
    
    centralFormEvents: function(e,subtag_id) {                                      //Clicked inside subcategory

        var maintag_id = $('#sub_' + subtag_id).attr('name');
        var mainFieldset = "#mainFset_" + maintag_id;
        //alert(maintag_id);
        if (!($('#main_' + maintag_id).is(':checked')))  {
            var subFlag = true;
            $(mainFieldset + ' input:checkbox').each(function() {
                if  ( !($(this).is(':checked')) )  {
                    $(this).removeAttr('checked');
                    subFlag = false;
                }
            });
            if (subFlag == true) {
                $('#main_' + maintag_id).attr('checked','checked');
            } else  {
                $('#main_' + maintag_id).removeAttr('checked');
            }

        } else {
            if  (!($('#sub_' + subtag_id).is(':checked')))  {
                $('#sub_' + subtag_id).removeAttr('checked');
                $('#main_' + maintag_id).removeAttr('checked');
            }            
        }
        myP.searchTables();            
        
    },
    
    searchTables: function()  {
                                                                             //put search criteria (grade level, main tag and sub tag) into its own array
            var gradeArray = [];                                                 //grade level array
            var gradeCount = 0;
            $('#searchPageFrame').empty();
            $('#gradeFieldset input:checkbox').each(function()  {
                if ($(this).is(':checked')) {
                    gradeArray[gradeCount] = $(this).attr('value');
                    gradeCount++;
                }
            });
            
            var mainArray = [];
            var mainIndex = 0;
            var subArray = []
            var subIndex = 0
            $('#centralFieldset input:checkbox').each(function() {               //main tag(category) array and sub tag (subcategory) array
                if ($(this).is(':checked')) { 
                    var input_name = $(this).attr('name');
                    var subtag_value = $(this).val();
                    //console.log(subtag_value);
                    if (input_name != 'category' && subtag_value != '0' )   {      //if a subcategory is selected             
                        subArray[subIndex] = $(this).attr('value');
                        subIndex++;
                    } 
                    if  (subtag_value == '0' )   {                                //this is for category checkbox (selected) when it has no subcategories under it
                        mainArray[mainIndex] = $(this).attr('name')               //get the main category id from the subcategory (hidden) checkbox name attribute
                        mainIndex++;                                              //use the main category id when there is no subcategory under it.
                    }
                 }
            });
            
            
            subArray.sort(function(a,b){return a-b});                                   //sort subcategory tags
            console.log("grades: " + gradeArray);
            console.log("main: " + mainArray);
            console.log("sub: " + subArray);
            

            var gradeStrList = gradeArray.toString();                                        // convert arrays into string for the "IN" lists for mysql select
            var mainStrList = mainArray.toString();
            var subStrList = subArray.toString();
            
            if ((gradeStrList != "") || (mainStrList != "") || (subStrList != "")) {                  //no need to search table if no checkbox was selected
                $.iDAjax({
                    url:myP.searchTablesURL,
                    data:{
                        gradeList:gradeStrList,
                        mainList:mainStrList,
                        subList:subStrList},
                    success: function(data) {
                        if (data.msg == 1 && data.result_rows != "") {
                            //console.log(data.result_rows);
                            var found_rows = data.result_rows;

                            var docNumberArray = [];                                                //create two arrays containing only doc numbers.  
                            for (var i=0; i < found_rows.length; i++)  {                            //Count the duplicates(# of tags) for each doc number and save in a new array of object (tagsArray)
                                docNumberArray[i] = found_rows[i].doc_number;
                            }
                            var copiedArray = docNumberArray.slice(0);
                            var tagsArray = [];
                            for (var i = 0, len_outArray = docNumberArray.length; i < len_outArray; i++) {
                                    var tagsCount = 0;	
                                    var tagsString = "";
                                    
                                    var maintags = "";
                                    var subtags = "";
                                    
                                    for (var w = 0, len_innerArray = copiedArray.length; w < len_innerArray; w++) {
                                        if (docNumberArray[i] == copiedArray[w]) {
                                            tagsCount++;
                                            var mainT_title = found_rows[w].maintag_title;
                                            var subT_title = found_rows[w].subtag_title;
                                            
                                            //console.log("mainTitle=> " + mainT_title);
                                            //maintags += mainT_title;
                                            //subtags += subT_title;
                                            
                                            
                                            if (tagsString.indexOf(mainT_title) == -1){
                                                if (subT_title != null) {
                                                    //tagsString = tagsString + mainT_title + ": " + subT_title + ", ";
                                                    if (tagsString != null) {                                                        //delete the ", " at the end 
                                                        tagsString = tagsString.slice(0,tagsString.length-2);
                                                    }
                                                    tagsString = tagsString + "; " + mainT_title + ": " + subT_title + ", ";         //add ; at the end of each group of tags (main & sub)        
                                                } else {
                                                    if (tagsString != null) {                                                        
                                                        tagsString = tagsString.slice(0,tagsString.length-2);                        //delete the ", " at the end 
                                                    }
                                                    tagsString = tagsString + "; " + mainT_title + ", ";                             //this is for main tags with no subcategories
                                                }
                                            } else {
                                                tagsString = tagsString + subT_title + ", ";
                                            }
                                            
                                           
                                            delete copiedArray[w];
                                        }
                                        
                                        //console.log("tagsString=> " + tagsString);
                                    }
                                    if (tagsCount > 0) {                                              // create an array of objects 
                                        var tempA = new Object();                                     // every object represents one resource doc 
                                        tempA.doc_number = found_rows[i].doc_number;
                                        tempA.tags_count = tagsCount;
                                        //console.log(tagsString);
                                        //tempA.tags = tagsString.slice(0,tagsString.length-2);          //delete the ", " at the end 
                                        //tempA.tags = tagsString.slice(2,tagsString.length-2);          //delete the "; " at the beginning
                                        //var tags = tagsString.slice(0,tagsString.length-2);          //delete the ", " at the end 
                                        var tags = tagsString.slice(2,tagsString.length-2);  
                                        
                                        var maintags = "";
                                        var subtags = "";
                                        
                                        var arrMainTags = tags.split(';');
                                        for(t in arrMainTags) {
                                            var t2 = arrMainTags[t].split(':');
                                            
                                            maintags += t2[0] + ", ";
                                            subtags += t2[1] + ", ";
                                        }
                                            //console.log("2 => " + tagsString);
                                            //tempA.maintag = tempA.tags.split(':')[0];
                                            //tempA.subtag = tempA.tags.split(':')[1];
                                            tempA.maintags = maintags.replace(/\, $/g,'');
                                            tempA.subtags = subtags.replace(/\, $/g,'');
                                            
                                        tempA.grade_level = found_rows[i].grade_level;
                                        tempA.grade_desc = found_rows[i].grade_desc;
                                        tempA.filename = found_rows[i].filename;
                                        tempA.filepath = found_rows[i].filepath;
                                        tempA.title = found_rows[i].title;
                                        tempA.author = found_rows[i].author;
                                        var age = found_rows[i].age;
                                        tempA.age = (age >0) ? ", Age " + age: '';
                                        tempA.desc = found_rows[i].description;
                                        tempA.star_rating = found_rows[i].star_rating;
                                        tagsArray.push(tempA);
                                    }
                            }
                            if (gradeStrList != "" && mainStrList == "" && subStrList == "")  {         //sort by grade if search criteria checked is grade only  else sort by # of tags (tags_count)
                                 tagsArray.sort(function(a,b){                                        
                                    if (a.grade_level < b.grade_level) return -1;
                                    if (a.grade_level > b.grade_level) return 1;
                                    return 0;
                                });
                            } else {               
                                tagsArray.sort(function(a,b){                                        
                                    if (a.tags_count < b.tags_count) return  1;
                                    if (a.tags_count > b.tags_count) return -1;
                                    return 0;
                                });
                            }
                            $('#searchPageFrame').empty();                                                            //display the new array (search results)         
                            var tableHead = "<h3 id='titleResults'>Showing  " + tagsArray.length + "  Results</h3>" 
                                            + "<table id='tableResults'><thead>" 
                                            + "<tr class='alignCenter'><th></th><th></th></tr></thead><tbody>";
                            $('#searchPageFrame').append(tableHead);
                            var tableRow = "";
                            for (var j = 0; j < tagsArray.length; j++) {
                                
                                var mainTitle = tagsArray[j].title;
                                //alert(mainTitle + ' => ' + mainTitle.length);
                                
                                if(mainTitle.length > 50) {
                                    //mainTitle = mainTitle.substr(0,40) + ' ...';
                                    mainTitle = mainTitle.replace(/^(.{44}[^\s]*).*/, "$1 ..."); 
                                    //alert(mainTitle.length);
                                }
                                
                                tableRow += "<tr class='alignCenter'><td class='searchPageTd'>" + "<button type='button' id='imageId_" + j + "' onclick='myP.viewItemPagePanel(event," + j + ")'>";
                                //tableRow += "<img src='" + tagsArray[j].filepath + tagsArray[j].filename  + "' height='80' width='80' /></button></td>";
                                tableRow += "<img src='" + RES_THUMB_PATH + tagsArray[j].filename  + "' height='80' width='80' /></button></td>";
                                tableRow += "<td class='searchPageNd'><button type='button' id='titleId_" + j + "' onclick='myP.viewItemPagePanel(event," + j + ")'>" + mainTitle + "<br />";
                                tableRow += "<span class='searchPageAuthor'>"+tagsArray[j].author+"</span><span class='searchPageAge'>"+tagsArray[j].age+"</span></button><br />";
                                tableRow += "<span class='searchPageTagHead'>Central Focus: </span><span class='searchPageTag'>" + tagsArray[j].maintags + "</span><br />";
                                tableRow += "<span class='searchPageTagHead'>Other Features: </span><span class='searchPageTag'>" + tagsArray[j].subtags + "</span><br />";
                                tableRow += "<span class='searchPageTagHead'>Grade Level: </span><span class='searchPageTag'>" + tagsArray[j].grade_desc + "</span><br />";
                                if (mainStrList != "" || subStrList != "") {
                                    var tagLabel = " Tag: ";                             //change label Tag to Tags if has more than 1 tag
                                    if (tagsArray[j].tags_count > 1) {
                                        tagLabel = " Tags: "
                                    }
                                    //tableRow = tableRow + "Has " +  tagsArray[j].tags_count + tagLabel + tagsArray[j].tags  + "</td></tr>";        
                                    tableRow = tableRow + "Has " + tagLabel + tagsArray[j].tags  + "</td></tr>";
                                } else {
                                    tableRow = tableRow + "</td></tr>";
                                }
                                $('#searchPageFrame').append(tableRow);

                                $('#imageId_' + j).data({                                    //store data for item page view
                                doc_number:tagsArray[j].doc_number,
                                grade_level: tagsArray[j].grade_level,
                                grade_desc: tagsArray[j].grade_desc,
                                author: tagsArray[j].author,
                                age: tagsArray[j].age,
                                filename: tagsArray[j].filename,
                                filepath: tagsArray[j].filepath,
                                title: tagsArray[j].title,
                                desc: tagsArray[j].desc,
                                star_rating: tagsArray[j].star_rating
                                });  
                                
                                tableRow = "";     //initialize every row
                            }
                            $('#searchPageFrame').append("</tbody></table>");
                            
                        } else if (data.msg == 1 && data.result_rows == "") {
                            $('#searchPageFrame').html("<h2>No Resources available in this criteria</h2>");
                        } else {
                            $('#searchPageFrame').empty();
                            alert('Error.  Cannot retrieve resources from database.');
                        }
                    }
                });

        } 
            
            
    },
  
  viewItemPagePanel: function(e,j)  {
      
        $(window).scrollTop(0);
      
         $.iDView({
             url:myP.viewItemPagePanelURL,
             id:'pnlItemPage',
             container: '#container'
         }, function(e) {
           
            $(this).fadeIn().iDModal(this).iDCenter();
            var doc_number = $('#imageId_' + j).data().doc_number;    
            var titleString = $('#imageId_' +j).data().title;
            var gradeLevel = $('#imageId_' +j).data().grade_desc;
            var author = $('#imageId_' +j).data().author;
            var age = $('#imageId_' +j).data().age;
            var desc = $('#imageId_' + j).data().desc;
            desc = $.trim(desc);
            if(desc == '') {
                $('#transcript').hide();
            };
            $('#itemPageTitle').html(titleString);
            $('#itemPageName').html(author);
            $('#itemPageAge').html(age);
            $('#itemPageGrade').html(gradeLevel);  
            
            //if(desc != '') {                
            //    $('#itemPageDesc').show().append(desc);             
            //}
            
            //var imgSrc = $('#imageId_' + j).data().filepath + $('#imageId_' + j).data().filename;
            var imgSrc = RES_PREVIEW_PATH + $('#imageId_' + j).data().filename;
            var pdfSrc = RES_PDF_PATH + $('#imageId_' + j).data().filename;
            $('#itemPageImage').attr('src',imgSrc);
            $('#itemPageImage').attr('alt',titleString);

            var screenImage = $("#itemPageImage");            //check the image's actual dimensions; if height and width is larger than 600x800 then scale down.
            var imgThis = new Image();
            imgThis.src = screenImage.attr("src");
            var imageHeight = imgThis.height;
            var imageWidth = imgThis.width;
            if (imageHeight > 600)  {
                $('#itemPageImage').attr('height','600');
            } 
            if (imageWidth > 800)  {
                $('#itemPageImage').attr('width','800');
            } 

            $('#itemPageImage').unbind().click(function(e) {
                myP.viewFullImage(e,$('#imageId_' + j).data().filename);
            });

            var docNum = $('#imageId_' + j).data().doc_number;        //get all the main tags and sub tags for this item from database regardless of the checkbox selection.

            $.iDAjax({                                              
                url:myP.getItemTagsURL,
                data:{doc_number:docNum},
                success: function(data) {
                    if (data.msg == 1) {
//                        console.log(data.item_rows);
                        var itemPage_rows = data.item_rows;
                        var centralFeature = "";
                        var subFeature = "";
                        for (var i = 0, length_Array = itemPage_rows.length; i < length_Array; i++)  {
                            if (centralFeature.indexOf(itemPage_rows[i].maintag_title) == -1){
                                centralFeature = centralFeature + itemPage_rows[i].maintag_title + ", ";
                            }    
                            if (subFeature.indexOf(itemPage_rows[i].subtag_title) == -1){
                                subFeature = subFeature + itemPage_rows[i].subtag_title + ", ";
                            }
                        }

                        centralFeature = centralFeature.slice(0,centralFeature.length-2);   //delete the ", " at the end 
                        subFeature = subFeature.slice(0,subFeature.length-2);               //delete the ", " at the end     

                    }  else {
                        centralFeature = "";
                        subFeature = "";
                    }
                    $('#itemPageCF').html(centralFeature);             
                    $('#itemPageSubF').html(subFeature);             
                }
            });
                        
            $('#itemPageHomeBtn').click(function() {                 //Home button
                location.href = BASE_URL;
            });

            $('#itemPagePDFBtn').click(function() {                 //Download PDF button
                //var itemPdfUrl = imgSrc.slice(0,imgSrc.length-3) + "pdf";
                var itemPdfUrl = pdfSrc + ".pdf";
                window.open(itemPdfUrl);
                return false;                                
            });

            $('#itemPageBackBtn, #itemPageBackBtnX').unbind().click(function() {                 //Go back button
                $('#pnlTranscript').fadeOut();
                $('#pnlItemPage').fadeOut().iDDemodal();
            });

            //$('#itemPageImage').click(function() {       
                
                //this is where the discussion thread goes
                //alert('User level: ' + ULevel );
                
                var myOpt = 0;
                if (ULevel == 2) {               
                    myOpt = 2;
                }
                else if(ULevel < 2) {
                    myOpt = 1;
                } else {
                    myOpt = 3;
                }
                    
                    $.iDAjax({                                              
                        url:myP.getClassListURL,
                        data:{uid:UID, opt:myOpt},
                        success: function(data) {
                            if (data.msg == 1) {
                                if (data.result_rows != "") {
                                    var class_rows = data.result_rows;
                                    var classForm = "<option value=''>Select</option>";
                                    
                                    for (var i=0, len=class_rows.length; i<len; i++)  {
                                        classForm += "<option value='" + class_rows[i].class_id + "'>";
                                        classForm += class_rows[i].year + " " + class_rows[i].semester + " ";
                                        classForm += class_rows[i].class_code + " " + class_rows[i].class_section + " ";
                                        classForm += class_rows[i].schedule + "</option>";                                        
                                    }
                                    
                                    $('#classByTeacher').append(classForm);
                                    $('#classByTeacher').bind({       
                                        blur: function() {
                                            $(this).css('background-color','');
                                        },
                                        change: function() {
                                            $(this).css('background-color','lightblue');
                                            $('#btnSaveClass').css('visibility','visible');
                                            if ($(this).val() != "") {
                                                var select_classid = $(this).val();
                                                //myP.getPostByClass(select_classid,doc_number);
                                                myP.getClassDiscussion(e, select_classid);
                                            } else {
                                                alert('please select a class');
                                            }
                                        }
                                    });                                                                                                                                                
                                    
                                } else {                                    
                                    //$('#classGroupDiv').html("You are not associated with any class.");
                                    $('#pnlImagePage').hide();
                                }
                            }  else {
                                alert('Error. Cannot access class file.')
                            }
                        }
                    });                    
                    
                 
                /*
                    alert ('Admin level discussion thread. This is not done');
                    $.iDAjax({                                              
                        url:myP.getPostCommentsURL,
                        data:{doc_number:docNum},
                        success: function(data) {
                            if (data.msg == 1) {
                                console.log(data.result_rows);
                                var post_rows = data.result_rows;
                                var uniqPost = [];
                                for (var i = 0, length_arr = post_rows.length; i < length_arr; i++)  {        
                                    if (uniqPost.indexOf(post_rows[i].post_topic) == -1) {
                                         uniqPost.push(post_rows[i].post_topic);
                                    }
                                }
                                                                                                
                                $('#itemDiscThread').empty();                    //display the discussion thread
                                var discussTable = "<ul>"; 
                                for (var j = 0, len_out = uniqPost.length; j < len_out; j++)  {
                                    discussTable += "<li>" + post_rows[j].post_topic + " " + post_rows[j].post_date + " " + post_rows[j].post_time + "<ul>"; 
                                    for (var k = 0, len_in = post_rows.length; k < len_in; k++) {
                                        discussTable += "<li>" + post_rows[k].comment_comments  + " " + post_rows[k].comment_date + " " + post_rows[k].comment_time + "</li>"; 
                                    }  
                                    discussTable += "</ul></li>";
                                }
                                discussTable += "</ul>";
                                $('#itemDiscThread').html(discussTable);
                            }  else {
                                $('#itemDiscThread').html("No Discussion");
                            }
                        }
                    });
                */
  
/*  
               $.iDAjax({                                              
                    url:myP.getDiscussURL,
                    data:{doc_number:docNum},
                    success: function(data) {
                        if (data.msg == 1) {
                            console.log(data.disc_rows);
                            var discuss_rows = data.disc_rows;
                            $('#itemDiscThread').empty();                    //display the discussion thread
                            var discussTable = "<dl>"; 
                            for (var k = 0; k < discuss_rows.length; k++) {
                                if (discussTable.indexOf(discuss_rows[k].disc_thread) == -1) {
                                    discussTable = discussTable + "<dt>" + discuss_rows[k].disc_thread  + "</dt><dd>" + discuss_rows[k].disc_date
                                                + ": "+ discuss_rows[k].disc_comment + "</dd>";
                                } else {
                                    discussTable = discussTable + "<dd>" + discuss_rows[k].disc_date + ": " + discuss_rows[k].disc_comment  +  "</dd>";
                                }
                            }    
                            discussTable = discussTable + "</dl>";
                            $('#itemDiscThread').html(discussTable);
                        }  else {
                            $('#itemDiscThread').html("No Discussion");
                        }
                    }
                });
*/                
                                                    
                $('#imageViewPrint').attr('src',imgSrc);
                $('#imageViewPrint').attr('alt',titleString);
                if (imageHeight > 800)  {                             //scale image down for display/print page
                    $('#imageViewPrint').attr('height','800');
                } 
                if (imageWidth > 1000)  {
                    $('#imageViewPrint').attr('width','1000');
                }  

                $('#backBtn').click(function(){
                    //$('#pnlImagePage').hide();
                });
                $('#printImageBtn').bind('click', function(){               //Print button
                    var imageHtml = "<html><head><title></title></head><body>";
                    imageHtml = imageHtml + $('#imageContainer').html();
                    imageHtml = imageHtml + "</body></html>";
                    var printWin = window.open('','','left=0,top=0,height=825,width=1025,location=0,menubar=0,toolbar=0,titlebar=0,scrollbars=0,status=0,resizable=1');
                    printWin.document.write(imageHtml);
                    printWin.document.close();
                    printWin.focus();
                    var objBrowse = window.navigator;
//                            console.log(objBrowse.appName);
                    if (objBrowse.appName == "Opera") {
//                                console.log('Opera or Netscape');
                        printWin.onload = function(){
                            printWin.print();
                        };
                    } else {
//                                console.log('Other Browsers');
                        printWin.print();
                    }
//                                printWin.print();
                    printWin.close();
//                                $('#pnlImagePage').show();
                    return false;

                });

                $('#transcript').unbind().click(function() {                    
                    $.iDView({
                        url:myP.viewTranscriptWindowURL,
                        id:'pnlTranscript',
                        container:'#container'
                    }, function(e) {
                        $(this).fadeIn().iDCenter().draggable();
                        
                        if(desc != '') {                
                            $('#pTranscript').html(desc);             
                        }                        
                                                
                        $('#btnCloseTranscript').unbind().click(function() {
                            $('#pnlTranscript').fadeOut();
                        })
                    });
                });

                //$('#pnlImagePage').show();
            //});                              
        });
 }, 
  viewFullImage: function(e,img) {
      $.iDView({
          url:myP.viewFullImageURL,
          id:'pnlFullImage',          
          container:'#container'
      }, function(e) {
          $(this).fadeIn().iDCenter().draggable();
          
          var imgsrc = RES_ORIGIN_PATH + img;
          $('#fullimage').attr('src',imgsrc);
          
          $('#btnCloseFullImage').unbind().click(function() {
              $('#pnlFullImage').fadeOut().remove();
          })
          
      });
  },
  getPostByClass: function(class_id,doc_num)  {
      //alert(class_id + " " + doc_num + " " + UID);

      $('#btnAddTopic').show().click(function(e) {
          myP.viewAddTopicPanel(e,class_id);
      });

      $.iDAjax({                                              
        url:myP.getClassPostCommentsURL,
        data:{classId:class_id,
              docId:doc_num,
            teacherUID:UID},
        success: function(data) {
            if (data.msg == 1) {
                if (data.result_rows != "") {
                    console.log(data.result_rows);
                    var post_rows = data.result_rows;
                    var uniqPost = [];
                    for (var i = 0, length_arr = post_rows.length; i < length_arr; i++)  {        
                        if (uniqPost.indexOf(post_rows[i].post_topic) == -1) {
                                uniqPost.push(post_rows[i].post_topic);
                        }
                    }
                    $('#itemDiscThread').empty();                    //display the discussion thread
                    var discussTable = "<ul>"; 
                    for (var j = 0, len_out = uniqPost.length; j < len_out; j++)  {
                        discussTable += "<li>" + post_rows[j].post_topic + " " + post_rows[j].post_date + " " + post_rows[j].post_time + "<ul>"; 
                        for (var k = 0, len_in = post_rows.length; k < len_in; k++) {
                            discussTable += "<li>" + post_rows[k].comment_comments  + " " + post_rows[k].comment_date + " " + post_rows[k].comment_time + "</li>"; 
                        }  
                        discussTable += "</ul></li>";
                    }
                    discussTable += "</ul>";
                    $('#itemDiscThread').html(discussTable);
                                                            
                } else {
                    $('#itemDiscThread').html("There are no discussions yet.");
                }
            }  else {
                $('#itemDiscThread').html("No Discussion");
            }
        }
      });
      
  },
  viewAddTopicPanel: function(e, cid) {      
      $.iDView({
          url:myP.viewAddTopicPanelURL,
          id:'pnlAddNewTopic',
          container:'#container'
      }, function() {
          $(this).fadeIn().iDCenter().iDModal(this);
          
            tinyMCE.init({                
                plugins : "equation,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
                theme : "advanced",
                mode : "exact",
                elements: "txtaNewTopic",
                theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
                theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor"
            });          
          
          
          $('#btnCancelNewTopic').click(function(e) {
              $('#pnlAddNewTopic').fadeOut();
          });
          $('#btnAddNewTopic').click(function(e) {
              myP.doAddNewTopic(e, cid);
          });          
      });      
  },
  doAddNewTopic: function(e, cid) {
      var newTopic = tinyMCE.get('txtaNewTopic').getContent();
      
      if(newTopic != '') {
          $.iDAjax({
              url:myP.doAddNewTopicURL,
              data: {uid:UID, cid:cid, topic:newTopic},
              success: function(data) {
                  if(data.msg ==1) {                                            
                      var ntid = data.ntid;
                      
                      myP.getClassDiscussion(e, cid);
                      
                      $('#pnlAddNewTopic').fadeOut();
                  } else {                      
                      
                  }
              }
          });
      }
  },
  getClassDiscussion: function(e, cid) {
     
      if(ULevel > 1) {
          $('#btnAddTopic').show().click(function(e) {
              myP.viewAddTopicPanel(e,cid);
          });      
      }
      
      $('#tblDiscussion').empty();
      
      $.iDAjax({
          url:myP.getClassDiscussionURL,
          data: {uid:UID, cid:cid},
          success: function(data) {
              if(data.msg ==1) {
                  var d = data.d;
                                                      
                  for(i in d) {
                      var tid = d[i].tid;
                      var topic = d[i].topic;
                      var tdate = d[i].date;
                      var tauthor = d[i].fullname;
                      
                      var cmt = d[i].c;
                                            
                      var tr = "<tr class='tdTopic'><td>" + topic + "</td><td class='dateLayout'> by " + tauthor + " ["+ tdate +"]</td></tr>";
                      tr += "<tr><td class='commentLayout'><ul class='ulComment'>";                     
                      tr += "<li><button onclick='myP.postComment(event,"+cid+","+tid+")'>Post a comment</button></li>";
                      
                      if(ULevel >1 || d[i].can > 0) {
                          for(j in cmt) {
                              var cauthor = cmt[j].fullname;
                              var comment = cmt[j].comment;
                              var cmtdate = cmt[j].date;
                            tr += "<li>" + comment + " by " + cauthor + " [" + cmtdate + "]</li>";
                          }
                      }
                      tr += "</ul></td></tr>";
                      
                      $('#tblDiscussion').append(tr);
                  }
              } else {
                  
              }
          }
      });
  },
  postComment: function(e, cid, tid) {
      $.iDView({
          url:myP.viewPostCommentURL,
          id:'pnlAddNewComment',
          container: '#container'
      }, function() {
         $(this).fadeIn().iDCenter().iDModal(this);         
            
            tinyMCE.init({
                min_height:200,
                plugins : "equation,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
                theme : "advanced",
                mode : "exact",
                elements: "txtaNewComment",
                theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
                theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor,,equation"                     
            });             
         
          $('#btnCancelNewComment').click(function(e) {
              $('#pnlAddNewComment').fadeOut();
          });
          
          $('#btnAddNewComment').click(function(e) {
              myP.doPostComment(e, cid, tid);
          });          
         
      });
  },
  doPostComment: function(e, cid, tid) {
      var newComment = tinyMCE.get('txtaNewComment').getContent();
      
      if(newComment != '') {
          $.iDAjax({
              url:myP.doPostCommentURL,
              data: {uid:UID, cid:cid, tid:tid, comment:newComment},
              success: function(data) {
                  if(data.msg ==1) {                                            
                      var ncmt_id = data.ncmt_id;
                      
                      myP.getClassDiscussion(e, cid);
                      
                      $('#pnlAddNewComment').fadeOut();
                  } else {                      
                      
                  }
              }
          });
      }
  }
};