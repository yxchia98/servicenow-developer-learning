// set onClick to adoptDog()
// check active, show update, client, listv2/v3 compatible, and form button

function adoptDog() {
  var email = prompt("Please enter your email address");
  if (email != "") {
    var ga = new GlideAjax("fetchUtils");
    ga.addParam("sysparm_name", "createEmailNotification");
    ga.addParam("sysparm_adoption_center", g_form.getValue("adoption_center"));
    ga.addParam("sysparm_adopter_email", email);
    ga.getXMLAnswer("ajaxProcessor");
  } else {
    alert("The email you entered does not appear to be valid!");
  }
}
function ajaxProcessor(answer) {
  alert("Thank you for your request, someone will be with you shortly.");
}
