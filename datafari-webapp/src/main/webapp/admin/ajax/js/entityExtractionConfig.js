//# sourceURL=/Datafari/admin/ajax/js/entityExtractionConfig.js

var timeouts = [];

var clearTimeouts = function() {
  for (var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }

  //quick reset of the timer array you just cleared
  timeouts = [];

  $('#main').unbind('DOMNodeRemoved');
}

$(document).ready(function(){
  $('#main').bind('DOMNodeRemoved', clearTimeouts);
  var simpleFeedbackMessageDiv = $("#simpleFeedbackMessage");
  var ENDOFANIMATION = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  let simpleEntityExtractionResponseCodes= {
    'OK' : 0
  };

  setupLanguage();

  // suppose the feature is not active until we loaded the actual state
  $("#simplePersons").prop("disabled", true);
  $("#simplePhones").prop("disabled", true);
  $("#simpleSpecials").prop("disabled", true);
  $("#simplePersonsSection").hide();
  $("#simplePhonesSection").hide();
  $("#simpleSpecialSection").hide();

  initValues();

  function setupLanguage(){
    $(document).find('a.indexAdminUIBreadcrumbLink').prop('href', "./index.jsp?lang=" + window.i18n.language);
    $("#topbar1").text(window.i18n.msgStore['home']);
    $("#topbar2").text(window.i18n.msgStore['adminUI-SearchEngineConfig']);
    $("#topbar3").text(window.i18n.msgStore['adminUI-entityExtractionConf']);
    $("#title").text(window.i18n.msgStore['adminUI-entityExtractionConf']);
    $("#activateSimpleExtractionLabel").text(window.i18n.msgStore['adminUI-SimpleEntityExtractionActivate']);
    $("#simplePersonsLabel").text(window.i18n.msgStore['adminUI-SimpleEntityExtractionActivatePersons']);
    $("#simplePhonesLabel").text(window.i18n.msgStore['adminUI-SimpleEntityExtractionActivatePhones']);
    $("#simpleSpecialsLabel").text(window.i18n.msgStore['adminUI-SimpleEntityExtractionActivateSpecial']);
    $("#simpleSaveButton").text(window.i18n.msgStore['save']);
    $("#simpleSaveButton").attr('data-loading-text', "<i class='fa fa-spinner fa-spin'></i> " + window.i18n.msgStore['save']);
  }

  function initValues() {
    $.get("../SearchAdministrator/simpleEntityExtractorConfiguration", function(data) {
      $("#activateSimpleExtraction").prop("checked", data.isActivated?true:false);
      $("#simplePersons").prop("checked", data.isNamesActivated?true:false);
      $("#simplePhones").prop("checked", data.isPhonesActivated?true:false);
      $("#simpleSpecials").prop("checked", data.isSpecialActivated?true:false);
      if (data.isActivated) {
        $("#simplePersons").prop("disabled", false);
        $("#simplePhones").prop("disabled", false);
        $("#simpleSpecials").prop("disabled", false);
        $("#simplePersonsSection").show();
        $("#simplePhonesSection").show();
        $("#simpleSpecialSection").show();
      }
    });
  }

  function showError(){
    let message= "Error";
    let danger = true;

    sourceError = source;
    simpleFeedbackMessageDiv.text(message).show();
    if (danger){
        simpleFeedbackMessageDiv.addClass("danger").prepend('<i class="fas fa-exclamation-triangle"></i> ');
    }else{
      simpleFeedbackMessageDiv.removeClass("danger");
    }
  }

  function clearStatus(element) {
    let parent = element.closest(".form-group");
    parent.removeClass("has-error");
    parent.removeClass("has-warning");
    parent.removeClass("has-success");
    parent.removeClass("has-feedback");
    let glyphElement = element.next();
    glyphElement.removeClass("glyphicon-remove");
    glyphElement.removeClass("glyphicon-warning-sign");
    glyphElement.removeClass("glyphicon-ok");
  };

  function setSuccess(element) {
    element.closest(".form-group").addClass("has-success");
    element.closest(".form-group").addClass("has-feedback");
    element.next().addClass("glyphicon-ok");
  };

  function setWarning(element) {
    element.closest(".form-group").addClass("has-warning");
    element.closest(".form-group").addClass("has-feedback");
    element.next().addClass("glyphicon-warning-sign");
  }

  function setError(element) {
    element.closest(".form-group").addClass("has-error");
    element.closest(".form-group").addClass("has-feedback");
    element.next().addClass("glyphicon-remove");
  };

  $("#activateSimpleExtraction").change(function() {
    if(this.checked) {
      $("#simplePersons").prop("disabled", false);
      $("#simplePhones").prop("disabled", false);
      $("#simpleSpecials").prop("disabled", false);
      $("#simplePersonsSection").show();
      $("#simplePhonesSection").show();
      $("#simpleSpecialSection").show();
    } else {
      $("#simplePersons").prop("disabled", true);
      $("#simplePhones").prop("disabled", true);
      $("#simpleSpecials").prop("disabled", true);
      $("#simplePersonsSection").hide();
      $("#simplePhonesSection").hide();
      $("#simpleSpecialSection").hide();
    }
  });

  $('#simpleEntityExtractionForm').submit(function(e){
    e.preventDefault();
    if ($("#simpleSaveButton").hasClass('disabled')) {
      return;
    }
    $("#simpleSaveButton").button("loading");

    let isActivated = $("#activateSimpleExtraction").is(":checked");
    let isNamesActivated = $("#simplePersons").is(":checked");
    let isPhonesActivated = $("#simplePhones").is(":checked");
    let isSpecialActivated = $("#simpleSpecials").is(":checked");

    $.post("../SearchAdministrator/simpleEntityExtractorConfiguration",{
      isActivated : isActivated,
      isNamesActivated : isNamesActivated,
      isPhonesActivated : isPhonesActivated,
      isSpecialActivated : isSpecialActivated
    },function(data){
      if (data.code == simpleEntityExtractionResponseCodes['OK']){
        $("#simpleFeedbackMessage").html("<i class='fa fa-check'></i>" + window.i18n.msgStore['parameterSaved'])
                                   .addClass("success")
                                   .show()
                                   .removeClass("animated fadeOut");
        timeouts.push(setTimeout(function(){
          $("#simpleFeedbackMessage").addClass("animated fadeOut");
        },1500));
      }else{
        $("#simpleFeedbackMessage").html("<i class='fa fa-exclamation-triangle'></i>" + window.i18n.msgStore['adminUI-ErrorWhileSaving'])
                                   .addClass("danger")
                                   .show()
                                   .removeClass("animated fadeOut");
        timeouts.push(setTimeout(function(){
          $("#simpleFeedbackMessage").addClass("animated fadeOut");
        },1500));
      }
      $("#simpleSaveButton").button("reset");
    },"json").fail(function() {
      $("#simpleFeedbackMessage").html("<i class='fa fa-exclamation-triangle'></i>" + window.i18n.msgStore['adminUI-ErrorWhileSaving'])
                                 .addClass("danger")
                                 .show()
                                 .removeClass("animated fadeOut");
      timeouts.push(setTimeout(function(){
        $("#simpleFeedbackMessage").addClass("animated fadeOut");
      },1500));
      $("#simpleSaveButton").button("reset");
    });
    return false;
  });
});
