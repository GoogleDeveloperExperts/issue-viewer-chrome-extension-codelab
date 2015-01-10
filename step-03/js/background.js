// Get one: https://github.com/settings/applications
var githubToken = "YOUR_PERSONAL_TOKEN";

function updateUser() {
  GitHub.getMe(githubToken).then(function (me) {
    chrome.storage.local.set({
      user: me
    });
  });
}

function updateIssues() {
  GitHub.getMyIssues(githubToken).then(function (issues) {

    chrome.storage.local.set({
      issues: issues
    });

    chrome.browserAction.setBadgeBackgroundColor({
      color: '#F00'
    });

    chrome.browserAction.setBadgeText({
      text: '' + issues.length
    });
  
  });

}

//
// Grab issues every 5 minutes
//
setInterval(updateIssues, 5 * 60 * 1000); 
updateIssues();

//
// Grab user info every 60 minutes
//
setInterval(updateUser, 60 * 60 * 1000);
updateUser();