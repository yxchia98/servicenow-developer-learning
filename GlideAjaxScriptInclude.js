// script include with getIncidentStatus(), getLatestIncidents() and sayHello() function
var ServiceNow201GlideAjax = Class.create();
ServiceNow201GlideAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getIncidentStatus: function () {
    var incidentNumber = this.getParameter("sysparm_incident_number");
    if (!gs.nil(incidentNumber)) {
      var incidentGR = new GlideRecord("incident");
      incidentGR.get("number", incidentNumber);
      return incidentGR.state.getDisplayValue();
    } else {
      return "No incident was found";
    }
  },

  getLatestIncidents: function () {
    var incidents = [];
    var limit = parseInt(this.getParameter("sysparm_limit")) || 10;
    if (!gs.nil(limit) && typeof limit == "number") {
      var incidentGR = new GlideRecord("incident");
      incidentGR.orderByDesc("sys_created_on");
      incidentGR.setLimit(limit);
      incidentGR.query();
      while (incidentGR.next()) {
        var record = {};
        record.number = incidentGR.number.getDisplayValue();
        record.sysID = incidentGR.sys_id.getDisplayValue();
        record.shortDescription =
          incidentGR.short_description.getDisplayValue();
        incidents.push(record);
      }
      return new JSON().encode(incidents);
    } else {
      return "something aint right...";
    }
  },

  sayHello: function () {
    return "Hello World!";
  },

  type: "ServiceNow201GlideAjax",
});
