//# sourceURL=/Datafari/admin/ajax/js/alerts.js


var d;
var data;
$(document).ready(function() {
    addAlerts();
    getTab();
    document.getElementById("legendAdd").innerHTML = window.i18n.msgStore['createAlerts'];
    document.getElementById("searchBar").placeholder = window.i18n.msgStore['alertsSearch'];
    document.getElementById("contextMenu").innerHTML = window.i18n.msgStore['Results'];
    document.getElementById("topbar1").innerHTML = window.i18n.msgStore['home'];
    document.getElementById("topbar2").innerHTML = window.i18n.msgStore['adminUI-MyAccount'];
    document.getElementById("topbar3").innerHTML = window.i18n.msgStore['adminUI-Alerts'];
});
function getTab(){
	//Cleans the response area
    $("#ajaxResponse").empty();
    //get the keyword of the search field and serialize it
    var keyword = $("input#searchBar").val();
    dataString = "keyword=" + keyword;
    $.ajax({			//Ajax request to the doGet of the Alerts servlet
        type: "GET",
        url: "./../admin/Alerts",
        data: dataString,
    	beforeSend: function(jqXHR, settings){
    		$("#ajaxResponse").append("<center><div class=\"bar-loader\" style=\"display : block; height : 32px; width : 32px;\"></div></center>");
        	$('#newAlerts').attr("disabled", true);
    	},
        //if received a response from the server
        success: function( data, textStatus, jqXHR) {
        	$('#newAlerts').attr("disabled", false);
        	if(data.toString().indexOf("Error code : ")!==-1){
        		$("#ajaxResponse").empty();
        		$("#ajaxResponse").append("<div class=col-xs-3></div>");
				$("#ajaxResponse").append("<h3 class=col-xs-6>"+data+"</h3>");
				$("#ajaxResponse").append("<div class=col-xs-3></div>");
				$('#newAlerts').attr("disabled", true);
        	} 
        	else if(data.alerts!=undefined){
        		$("#ajaxResponse").empty();
        		//get the data in a global var so it can be used in edit() or remove() 
        		d=data;
        		var numb = data.alerts.length;
        		var i = 0;
        		//Append the table to the response area
                 $("#ajaxResponse").append("<div class=\"col-xs-12\"><div class=\"box\"><div class=\"box-header\"><div class=\"box-name\"><i class=\"fa fa-table\"></i><span>"+window.i18n.msgStore['alertList']+"</span></div><div class=\"box-icons\"><a class=\"collapse-link\"><i class=\"fa fa-chevron-up\"></i></a><a class=\"expand-link\"><i class=\"fa fa-expand\"></i></a><a class=\"close-link\"><i class=\"fa fa-times\"></i></a></div><div class=\"no-move\"></div></div><div id=\"boxCon\" class=\"box-content no-padding\">");
            	 $("#boxCon").append("<table id=\"table\" class=\"table table-striped table-bordered table-hover table-heading no-border-bottom\">");
                 $("#table").append("<thead><tr><th>Id</th><th>"+window.i18n.msgStore['keyword']+"</th><th>"+window.i18n.msgStore['subject']+"</th><th>"+window.i18n.msgStore['core']+"</th><th>"+window.i18n.msgStore['frequency']+"</th><th>"+window.i18n.msgStore['mail']+"</th><th id=\"user\">"+window.i18n.msgStore['user']+"</th><th></th></tr></thead><tbody>");          
                 while (i<numb){	//While they are still alerts to print
                	 var doc = data.alerts[i];
                	 //Print the alert with an href of the keyword towards edit()
                	 $("#table").append("<tr id=\""+i+"\"><td>"+doc._id+"</td><td><a href=\"javascript: edit("+i+")\">"+doc.keyword+"</a></td><td>"+doc.subject+"</td><td>"+doc.core+"</td><td>"+window.i18n.msgStore[doc.frequency]+"</td><td>"+doc.mail+"</td><td>"+doc.user+"</td><td class=\"btn-danger text-center\"style=\"background-color : #d9534f; position : relative;\"><a href=\"javascript: remove("+i+")\" style=\"color: #FFFFFF; position: absolute;top: 50%;left: 50%; text-decoration: inherit; -ms-transform: translate(-50%,-50%); -webkit-transform: translate(-50%,-50%); transform: translate(-50%,-50%);\"><i class=\"far fa-trash-alt\" ></i></a></td></tr>");
                	 //Print a button with an href towards remove()
					 i++;
                 }
                 //If not an admin
                 if(data.alerts[0].user===undefined){
                	 //Remove the user column
                	 var ndx = $("#user").index() + 1;
                	 // Find all TD elements with the same index
                	 $("td", event.delegateTarget).remove(":nth-child(" + ndx + ")");
                	 var columnhead = document.getElementById("user");
                	 columnhead.parentNode.removeChild(columnhead);
                 }
				$("#table").append("</tbody></table>");
				$("#ajaxResponse").append("</div></div></div></div>");
        	}else{
        		if(keyword===""){
        			$("#ajaxResponse").html("<div><b>"+window.i18n.msgStore['noAlerts']+"</b></div>");
        		}else{
        			$("#ajaxResponse").html("<div><b>"+window.i18n.msgStore['noKeywordAlerts']+"</b></div>");
        		}
        	}
        },
       
        //If there was no response from the server
        error: function(jqXHR, textStatus, errorThrown){
              if(jqXHR.responseText==="error connecting to the database"){
          		$("#ajaxResponse").append(window.i18n.msgStore['dbError'])
          	}else {
                console.log("Something really bad happened " + textStatus);
                $("#ajaxResponse").html(jqXHR.responseText);
          	}
        }
    });      
}
function addAlerts(){
	//Clean the response area
	$("#addAlertsForm").empty();
	//Print the add form in the response area
	$("#addAlertsForm").append("<div class=\"col-xs-12\"><div class=\"box\"><div class=\"box-header\"><div class=\"box-name\"><i class=\"fa fa-table\"></i><span>"+window.i18n.msgStore['createAlerts']+"</span></div><div class=\"box-icons\"><a class=\"collapse-link\"><i class=\"fa fa-chevron-up\"></i></a><a class=\"expand-link\"><i class=\"fa fa-expand\"></i></a></i></a></div><div class=\"no-move\"></div></div><div id=\"addBox\" class=\"box-content\">");
	$("#addBox").append("<form id=\"add\" class=\"form-horizontal\" role=\"form\">");
	$("#add").append("<fieldset id=\"fieldsAdd\" >");
	$("#fieldsAdd").append("<div class=\"form-group\" id=\"div1\">");
	$("#div1").append("<label class=\"col-sm-2 control-label\">"+window.i18n.msgStore['keyword']+"</label>");
	$("#div1").append("<input required type=\"text\" id=\"keyword\" name=\"keyword\" placeholder="+window.i18n.msgStore['keyword']+" class=col-sm-4 ></br>");
	$("#fieldsAdd").append("</div>");
	$("#fieldsAdd").append("<div class=\"form-group\" id=\"div11\">");
	$("#div11").append("<label class=\"col-sm-2 control-label\">"+window.i18n.msgStore['subject']+"</label>");
	$("#div11").append("<input required type=\"text\" id=\"subject\" name=\"subject\" placeholder="+window.i18n.msgStore['subject']+" class=col-sm-4 >");
	$("#fieldsAdd").append("</div>");
	$("#fieldsAdd").append("<div class=\"form-group\" id=\"div12\">");
	$("#div12").append("<label class=\"col-sm-2 control-label\">"+window.i18n.msgStore['mail']+"</label>");
	$("#div12").append("<input required type=\"text\" id=\"mail\" name=\"mail\" placeholder="+window.i18n.msgStore['mail']+" class=col-sm-4 >");
	$("#fieldsAdd").append("</div>");
	$("#fieldsAdd").append("<div class=\"form-group\" id=\"div2\">");
	$("#div2").append("<label class=\"col-sm-2 control-label\">"+window.i18n.msgStore['core']+"</label>");
	$("#div2").append("<input required type=\"text\" id=\"core\" name=\"core\" placeholder=\"Core\" value=\"@MAINCOLLECTION@\" class=\"col-sm-4\"/>");
	$("#fieldsAdd").append("</div>");
	$("#fieldsAdd").append("<div class=\"form-group\" id=\"div21\">");
	$("#div21").append("<label class=\"col-sm-2 control-label\">"+window.i18n.msgStore['frequency']+"</label>");
	$("#div21").append("<select required id=\"frequency\" name=\"frequency\" class=\"col-sm-4\">	<OPTION value='hourly'>"+window.i18n.msgStore['hourly']+"</OPTION><OPTION value='daily'>"+window.i18n.msgStore['daily']+"</OPTION><OPTION value='weekly'>"+window.i18n.msgStore['weekly']+"</OPTION></select> ");
	$("#fieldsAdd").append("</div>");
	$("#fieldsAdd").append("<div class=\"form-group\" id=\"div3\">");
	$("#div3").append("</div>");
	$("#fieldsAdd").append("</div>");
	$("#fieldsAdd").append("<div class=\"form-group\" id=\"div4\">");
	$("#div4").append("<div class=\"col-sm-2\"></div>");
	$("#div4").append("<input type=\"Submit\" id=\"newAlerts\" name=\"AddAlert\" value=\""+window.i18n.msgStore['confirm']+"\" class=\"btn btn-primary btn-label-left  col-sm-2\"/>");
	$("#fieldsAdd").append("</div>");
	$("#add").append("</fieldset>");
	$("#addBox").append("</form>");
	$("#addAlertsForm").append("</div></div></div></div>");
	 //Stops the submit request
	$("#add").submit(function(e){
        e.preventDefault();
 	});
	 //Redefines the submit request
	 $("#add").submit(function(e){
		 if(data==null){
			 //get the 4 parameters, keyword, subject, core, frequency and serialize them
		 var datastring = $("#add").serialize();	
	 		$.ajax({ 				//Ajax request to the doPost of the Alerts servlet
	       		type: "POST",
	        	url: "./../admin/Alerts",
	       	 	data: datastring,
	        	//if received a response from the server
	        	success: function(data, textStatus, jqXHR) {
	        		if(data.toString().indexOf("Error code : ")!==-1){
	            		$("#ajaxResponse").append("<div class=col-xs-3></div>");
	    				$("#ajaxResponse").append("<h3 class=col-xs-6>"+data+"</h3>");
	    				$("#ajaxResponse").append("<div class=col-xs-3></div>");
	    				$('#newAlerts').attr("disabled", true);
	            	}else{
	        			getTab();
	        			$("#addAlertsForm").empty();
	        			addAlerts();
	            	}
	        	},
	        	error: function(jqXHR, textStatus, errorThrown){
	        		 if(jqXHR.responseText==="error connecting to the database"){
	               		$("#addAlertsForm").append(window.i18n.msgStore['dbError'])
	               	}else {
	                     console.log("Something really bad happened " + textStatus);
	                     $("#addAlertsForm").html(jqXHR.responseText);
	               	}
	        	},
	        	//capture the request before it was sent to server
	        	beforeSend: function(jqXHR, settings){
	            	//disable the button until we get the response
	            	$('#newAlerts').attr("disabled", true);
	        	},
	        	//called after the response or error functions are finsihed
	        	complete: function(jqXHR, textStatus){
	            	//enable the button 
	            	$('#add').attr("disabled", false);
	        	}  
	 		});
		 }
	 });
}
function edit(i){
	data = d;
	document.getElementById("keyword").value = d.alerts[i].keyword;
	document.getElementById("subject").value = d.alerts[i].subject;
	document.getElementById("mail").value = d.alerts[i].mail;
	document.getElementById("core").value = d.alerts[i].core;
	document.getElementById("frequency").value = d.alerts[i].frequency;
	 //Redefines the submit request
	$("#add").submit(function(e){
        e.preventDefault();
 	});
	//Redefines the submit request
	 $("#add").submit(function(e){
		 if(data!=null){
		 //Gets the Id of the alert and all the parameters of the form and serialize them 
		 var datastring = "_id="+d.alerts[i]._id+"&"+$("#add").serialize();
		 $.ajax({			 	//Ajax request to the doPost of the Alerts servlet
		        type: "POST",
		        url: "./../admin/Alerts",
		        data: datastring,
		        //if received a response from the server
		        success: function(data, textStatus, jqXHR) {
		        	//Clean the responseArea
		        	$("#ajaxResponse").empty();
		        	if(data.toString().indexOf("Error code : ")!==-1){
		        		$("#ajaxResponse").append("<div class=col-xs-3></div>");
						$("#ajaxResponse").append("<h3 class=col-xs-6>"+data+"</h3>");
						$("#ajaxResponse").append("<div class=col-xs-3></div>");
						$('#newAlerts').attr("disabled", true);
		        	}else{
		        		//Print the alerts with the modifications made 
		        		getTab();
		        		addAlerts();
		        	}
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		             console.log("Something really bad happened " + textStatus);
		              $("#ajaxResponse").html(jqXHR.responseText);
		        },
		       
		        //capture the request before it was sent to server
		        beforeSend: function(jqXHR, settings){
		            //disable the button until we get the response
		            $('#add').attr("disabled", true);
		        },
		        //called after the response or error functions are finsihed
		        complete: function(jqXHR, textStatus){
		            //enable the button 
		            $('#add').attr("disabled", false);
		            data = null;
		        }  
		 });
		 }
		 });
}
function remove(i){
	// get the id of the alert to remove and serialize it
	var id = "_id="+d.alerts[i]._id;
	$.ajax({		//Ajax request to the doPost of the Alerts servlet
        type: "POST",
        url: "./../admin/Alerts",
        data: id,
        //if received a response from the server
        success: function(data, textStatus, jqXHR) {
        	if(data.toString().indexOf("Error code : ")!==-1){
        		$("#ajaxResponse").append("<div class=col-xs-3></div>");
				$("#ajaxResponse").append("<h3 class=col-xs-6>"+data+"</h3>");
				$("#ajaxResponse").append("<div class=col-xs-3></div>");
				$('#newAlerts').attr("disabled", true);
        	}else{
        		//Suppress the row of the tab that was show the now removed alert
        		var row = document.getElementById(i);
            	row.parentNode.removeChild(row);
        	}        
        },
        //If there was no resonse from the server
        error: function(jqXHR, textStatus, errorThrown){
             console.log("Something really bad happened " + textStatus);
              $("#ajaxResponse").html(jqXHR.responseText);
        }
	});
}