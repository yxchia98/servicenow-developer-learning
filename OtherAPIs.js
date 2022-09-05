/*------------------ GLIDE DATE TIME API------------------------------------*/
// get and set time in GMT
var gdt1 = new GlideDateTime(); //get current time
var gdt2 = new GlideDateTime("2022-01-01 01:00:00");
var gdt3String = "2022-01-02 01:00:00";
var gdt3 = new GlideDateTime(gdt3String);
gs.print(gdt1);
gs.print(gdt2);
gs.print(gdt3);

// add month and days
var gdt1 = new GlideDateTime(); //get current time
var daysToAdd = 3;
var monthsToAdd = 2;
var yearsToAdd = 5;
gs.print("Current Datetime: " + gdt1);
gdt1.addDaysUTC(daysToAdd);
gdt1.addMonthsUTC(2);
gs.print(
  "Datetime after " +
    yearsToAdd +
    " years and " +
    monthsToAdd +
    " months and " +
    daysToAdd +
    " days: " +
    gdt1
);

// compare dates using before() and after()
var gdt1 = new GlideDateTime();
var gdt2 = new GlideDateTime("2021-09-05");
gs.print("Comparing now (" + gdt1 + ") with " + gdt2);
var isBefore = gdt1.before(gdt2) ? "Yes" : "No";
gs.print("Is the current time earlier than the one specified? " + isBefore);
var isAfter = gdt1.after(gdt2) ? "Yes" : "No";
gs.print("Is the current time later than the one specified? " + isAfter);

// compare dates using compareTo()
var gdt1 = new GlideDateTime();
var gdt2 = new GlideDateTime("2021-09-05");
var compareResult = gdt1.compareTo(gdt2);
compareResult =
  compareResult == -1 ? "after" : compareResult == 0 ? "equal to" : "before";
gs.print("Current time is " + compareResult + " the one specified");

// get difference in datetime between two datetimes
var gdt1 = new GlideDateTime();
var gdt2 = new GlideDateTime("2021-09-05");
var difference = GlideDateTime.subtract(gdt1, gdt2);
gs.print(
  "Difference between " +
    gdt1 +
    " and " +
    gdt2 +
    " is: " +
    difference.getDisplayValue()
);

/*------------------------ GLIDE ELEMENT API ------------------------------ */
// direct access
var incidentGR = new GlideRecord("incident");
incidentGR.get("45e2f97c2f351110fbae59ab2799b6b8");
gs.print(incidentGR.caller_id);

// toString access
var incidentGR = new GlideRecord("incident");
incidentGR.get("45e2f97c2f351110fbae59ab2799b6b8");
gs.print(incidentGR.caller_id.toString());

// getDisplayValue() access
var incidentGR = new GlideRecord("incident");
incidentGR.get("45e2f97c2f351110fbae59ab2799b6b8");
gs.print(incidentGR.caller_id.getDisplayValue());

// get HTML snippet
var kbArticle = new GlideRecord("kb_knowledge");
kbArticle.get("e97ee81eff6002009b20ffffffffffe0");
gs.print(kbArticle.text.getHTMLValue());

// get record journal entries
var incidentGR = new GlideRecord("incident");
incidentGR.get("45e2f97c2f351110fbae59ab2799b6b8");
gs.print(incidentGR.comments.getJournalEntry(-1));

/*-------------------------- CREATE OWN API ---------------------------------------*/
// Script Include side
var IncidentUtils = Class.create();
IncidentUtils.prototype = {
  initialize: function () {},
  getLatestIncidents: function (num) {
    var limit = num || 5;
    var results = [];
    var incidentGR = new GlideRecord("incident");
    incidentGR.orderByDesc("sys_created_on");
    incidentGR.setLimit(limit);
    incidentGR.query();
    while (incidentGR.next()) {
      results.push(incidentGR.number.getDisplayValue());
    }
    return results;
  },
  grabRecords: function (tab, lim, order) {
    var results = [];
    var table = tab || "incident";
    var limit = lim || 5;
    var orderBy = order || "sys_created_on";
    var gr = new GlideRecord(table);
    gr.orderBy(order);
    gr.setLimit(limit);
    gr.query();
    while (gr.next()) {
      results.push(gr.number.getDisplayValue());
    }
    return results;
  },
  type: "IncidentUtils",
};

// Background script side
var incidents = new IncidentUtils();
gs.print(incidents.getLatestIncidents());
gs.print(incidents.grabRecords("problem", 10, "sys_created_on"));
