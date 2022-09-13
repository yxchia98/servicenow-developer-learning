/*
1. Create HTTP Methods sys_rest_message
2. Create GET PUT POST DELETE on respective HTTP Method sys_rest_message_fn
 */

var requestBody;
var responseBody;
var status;
var sm;
try {
  sm = new sn_ws.RESTMessageV2("IP Info", "Default GET"); // Might throw exception if message doesn't exist or not visible due to scope.
  sm.setBasicAuth("admin", "admin");
  sm.setStringParameter("symbol", "NOW");
  sm.setStringParameterNoEscape("xml_data", "<data>test</data>");
  sm.setHttpTimeout(10000); //In milliseconds. Wait at most 10 seconds for response from http request.

  response = sm.execute(); //Might throw exception if http connection timed out or some issue with sending request itself because of encryption/decryption of password.
  responseBody = response.haveError()
    ? response.getErrorMessage()
    : response.getBody();
  status = response.getStatusCode();
} catch (ex) {
  responseBody = ex.getMessage();
  status = "500";
} finally {
  requestBody = sm ? sm.getRequestBody() : null;
}
var formattedResponseBody = JSON.parse(responseBody);
gs.info("Request Body: " + requestBody);
gs.info("Response: " + responseBody);
gs.info("HTTP Status: " + status);
