// get user information
alert("Hello " + g_user.getFullName() + ". Your User ID is: " + g_user.userID);

// get username
alert("Your username is: " + g_user.userName);

// check if user have any roles
var haveRoles = g_user.hasRoles() ? "Yes" : "No";
alert("Do you have any roles? " + haveRoles);

// check if user have specific role
var haveRole = g_user.hasRole("itil") ? "Yes" : "No";
alert("Do you have the ITIL role? " + haveRole);
