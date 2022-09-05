// simple print message using gs.print()
var message = "Hello World!";
gs.print(message);

// log messages using gs.log()
gs.log("This is a log message", "marks_logs");

// log error messages using gs.error()
gs.error("This is an error message");

// log warning messages using gs.warn()
gs.warn("This is an warning message");

// info and error messages using gs.addInfoMessage() and gs.addErrorMessage()
gs.addInfoMessage(
  "Welcome to ServiceNow! This is an info message added using gs.addInfoMessage()."
);
gs.addErrorMessage(
  "Welcome to ServiceNow! This is an error message added using gs.addErrorMessage()."
);

// get beginning of last month
gs.print(gs.beginningOfLastMonth());

// generate global unique identifier
gs.print(gs.generateGUID());

// get property of system variable defined in system properties
gs.print("Hello " + gs.getProperty("servicenow.201.hello.world"));

// set a system variable or system property
gs.setProperty("servicenow.201.hello.world", "Hello World!");

// get current user, and get display name of current user, and location
gs.print(gs.getUser());
gs.print(gs.getUserID());
gs.print(gs.getUser().getFirstName());
gs.print(gs.getUser().getLastName());
gs.print(gs.getUser().getDisplayName());
gs.print(gs.getUser().getLocation());

// get roles of current user
gs.print(gs.getUser().getUserRoles());

// get incidents created by the current user
var incidentGR = new GlideRecord("incident");
incidentGR.addQuery("caller", gs.getUserID());
incidentGR.query();
gs.print(incidentGR.getEncodedQuery());
while (incidentGR.next()) {
  gs.print("Incident: " + incidentGR.number);
}

// check if current user has certain roles
if (gs.hasRole("itil") || gs.hasRole("admin")) {
  gs.print("The current user has the ITIL or Admin role");
}

// get session information
gs.print(gs.getSession());
gs.print(gs.getSessionID());
gs.print("Is user logged in? " + gs.getSession().isLoggedIn());

// gs.nil() checks if a field or object is null
var incidentGR = new GlideRecord("incident");
incidentGR.query();
while (incidentGR.next()) {
  if (gs.nil(incidentGR.short_description)) {
    gs.print(
      "Incident number " +
        incidentGR.number +
        " does not have a short description"
    );
  } else {
    gs.print(
      "Incident number " + incidentGR.number + " has a short description"
    );
  }
}

// gs.tableExists() checks if a table is there, and returns a boolean value
gs.print(gs.tableExists("incident"));

// gs.xmlToJSON() converts from XML string to JSON object
var xmlString =
  "<root><test>Some XML</test><test1>Some more XML</test1></root>";
var json = gs.xmlToJSON(xmlString);
gs.print(JSON.stringify(json));
gs.print(json.root.test);
gs.print(json.root.test1);

// add a registered event into eventQueue
gs.eventQueue("servicenow.201.hello.world");
