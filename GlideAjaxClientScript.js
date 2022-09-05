// client side script to call sayHello() script include
function onLoad() {
  //Type appropriate comment here, and begin script below
  var ga = new GlideAjax("ServiceNow201GlideAjax");
  ga.addParam("sysparm_name", "sayHello");
  ga.getXML(ajaxProcessor);
}

function ajaxProcessor(response) {
  var answer = response.responseXML.documentElement.getAttribute("answer");
  g_form.setValue("short_description", answer);
}

// client side script to call getIncidentStatus() script include every 5000ms
var checkIncident = setInterval(function () {
  processRequest();
}, 5000);

function processRequest() {
  var ga = new GlideAjax("ServiceNow201GlideAjax");
  ga.addParam("sysparm_name", "getIncidentStatus");
  ga.addParam("sysparm_incident_number", "INC0010953");
  ga.getXML(ajaxProcessor);
}
function ajaxProcessor(response) {
  var answer = response.responseXML.documentElement.getAttribute("answer");
  console.log("status: " + answer);
}

// client side script to call getLatestIncidents() script include
var ga = new GlideAjax("ServiceNow201GlideAjax");
ga.addParam("sysparm_name", "getLatestIncidents");
ga.addParam("sysparm_limit", "5");
ga.getXML(ajaxProcessor);

function ajaxProcessor(response) {
  console.log("Response payload: " + response);
  var answer = response.responseXML.documentElement.getAttribute("answer");
  console.log("Answer: " + answer);
  var json = answer.evalJSON();
  console.log("JSON: " + json);
  console.log(json[0].shortDescription);
}
