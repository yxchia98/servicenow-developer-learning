// get value of a form field
var fieldValue = g_form.getValue("category");
alert(fieldValue);

// set value of a form field
presetValue = "hardware";
g_form.setValue("category", presetValue);

// clear value of a form field
g_form.clearValue("category");

// save form
g_form.save();

// disable a form field
g_form.setDisabled("category", true);

// change a form field to mandatory
g_form.setMandatory("category", true);

// hide/show related lists
g_form.hideRelatedLists();
g_form.showRelatedLists();

// check if current form is a new record
var isNewRecord = g_form.isNewRecord();
alert("Is this a new record? " + isNewRecord);

// add info and error messages
g_form.addInfoMessage("Hello World!");
g_form.addErrorMessage("Hello Error!");

// clear info and error messages
g_form.clearMessages();

// get label of a field
alert(g_form.getLabelOf("caller_id"));

// get table name of form
alert(g_form.getTableName());
