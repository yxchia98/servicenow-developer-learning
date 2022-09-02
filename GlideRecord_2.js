// orderby ascending short_description
var incidentGR = new GlideRecord("incident");
incidentGR.orderBy("short_description");
incidentGR.query();
while (incidentGR.next()) {
  gs.print(incidentGR.number + " : " + incidentGR.short_description);
}

// orderby descending short_description
var incidentGR = new GlideRecord("incident");
incidentGR.orderByDesc("short_description");
incidentGR.query();
while (incidentGR.next()) {
  gs.print(incidentGR.number + " : " + incidentGR.short_description);
}

// set limit to newest 10 records retrieved in the problem table
var problemGR = new GlideRecord("problem");
problemGR.orderByDesc("opened_at");
problemGR.setLimit(10);
problemGR.query();
while (problemGR.next()) {
  gs.print(problemGR.number + " : " + problemGR.short_description);
}

// check if can execute all CRUD
var problemGR = new GlideRecord("problem");
problemGR.query();
if (
  problemGR.canCreate() &&
  problemGR.canRead() &&
  problemGR.canWrite() &&
  problemGR.canDelete()
) {
  gs.print("Can Create, Read, Update, Delete");
}

// count number of records in incident table
var incidentGR = new GlideRecord("incident");
incidentGR.query();
gs.print(incidentGR.getRowCount());

// hasNext() api only checks if there is next, it is not an iterator
var incidentGR = new GlideRecord("incident");
incidentGR.query();
gs.print(incidentGR.hasNext());
if (incidentGR.hasNext()) {
  incidentGR.next();
  gs.print(incidentGR.number);
}
// next() gives you hasNext() + iterates into next element, saving code
if (incidentGR.next()) {
  gs.print(incidentGR.number);
}
// we can use hasNext() to check if there are records
incidentGR.addQuery("priority", 0);
incidentGR.query();
if (!incidentGR.hasNext()) {
  gs.print("there are no records found!");
}

// getLink() will get a URL link for the record
var incidentGR = new GlideRecord("incident");
incidentGR.get("number", "INC0000601");
gs.print(incidentGR.getLink());

// delteMultiple() to delete multiple records that satisfies condition 'short_descriptionLIKEIncident #'
var incidentGR = new GlideRecord("incident");
incidentGR.addEncodedQuery("short_descriptionLIKEIncident #");
incidentGR.deleteMultiple();

// addNullQuery() finds fields that have nulls
var incidentGR = new GlideRecord("incident");
incidentGR.addNullQuery("short_description");
incidentGR.query();
while (incidentGR.next()) {
  gs.print("Deleted " + incidentGR.number);
  incidentGR.deleteRecord();
}

// addNotNullQuery() finds fields that is not null
var incidentGR = new GlideRecord("incident");
incidentGR.addNotNullQuery("short_description");
incidentGR.query();
while (incidentGR.next()) {
  gs.print("Deleted " + incidentGR.number);
  incidentGR.deleteRecord();
}
