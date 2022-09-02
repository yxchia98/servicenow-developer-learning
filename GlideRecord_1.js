// read incidents
var incidentGR = new GlideRecord("incident");
incidentGR.query();
while (incidentGR.next()) {
  gs.print(incidentGR.number);
}

// read and query using addQuery, incidents where priority = 1
var incidentGR = new GlideRecord("incident");
incidentGR.addQuery("priority", 1);
incidentGR.query();
while (incidentGR.next()) {
  gs.print(
    "Priority 1 incident: " +
      incidentGR.number +
      ":" +
      incidentGR.priority.getDisplayValue()
  );
}

// get api
// retrieve incident of sys_id 57af7aec73d423002728660c4cf6a71c
var incidentGR = new GlideRecord("incident");
incidentGR.get("57af7aec73d423002728660c4cf6a71c");
gs.print(incidentGR.number + "has a sys_id of:" + incidentGR.sys_id);

// read and query using addEncodedQuery
var encodedQueryString =
  "category=inquiry^active=true^opened_by=6816f79cc0a8016401c5a33be04be441";
var incidentGR = new GlideRecord("incident");
incidentGR.addEncodedQuery(encodedQueryString);
incidentGR.query();
while (incidentGR.next()) {
  gs.print(
    "Priority 1 incident: " +
      incidentGR.number +
      ":" +
      incidentGR.priority.getDisplayValue()
  );
}

// create new incident
var newIncident = new GlideRecord("incident");
newIncident.newRecord();
newIncident.short_description =
  "This incident was created from a background script";
newIncidentSysId = newIncident.insert();
gs.print(newIncidentSysId);

// create multiple new incidents
var newIncidents = [];
var counter = 0;
var incidentGR = new GlideRecord("incident");
while (counter < 5) {
  incidentGR.newRecord();
  // incidentGR.short_description = "Incident #" + ++counter;
  newIncidents.push(incidentGR.insert());
}
gs.print(newIncidents);
newIncidents.map(function (incident) {
  incidentGR.get(incident);
  gs.print(incidentGR.number + " has a sys_id of:" + incidentGR.sys_id);
});

// update specific incident record's urgency
var incidentGR = new GlideRecord("incident");
incidentGR.get("number", "INC0000047");
incidentGR.urgency = 3;
incidentGR.update();

// update all incidents with 2 urgency to 3 urgency
var incidentGR = new GlideRecord("incident");
incidentGR.addQuery("urgency", 2);
incidentGR.query();
while (incidentGR.next()) {
  gs.print("Updating " + incidentGR.number + "'s urgency level to 3");
  incidentGR.urgency = 3;
  incidentGR.update();
}

// delete all previously created incident records
var incidentGR = new GlideRecord("incident");
incidentGR.addQuery("short_description", "CONTAINS", "Incident #");
incidentGR.query();
while (incidentGR.next()) {
  gs.print(incidentGR.number + " has " + incidentGR.short_description);
  incidentGR.deleteRecord();
}
