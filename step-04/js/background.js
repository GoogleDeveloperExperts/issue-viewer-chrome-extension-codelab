function updateUser() {
  chrome.storage.local.get('githubToken', function(data) {
    if(data && data.githubToken) {

      GitHub.getMe(data.githubToken).then(function (me) {
        chrome.storage.local.set({
          user: me
        });
      });
    }
  });
}

function updateIssues() {
  chrome.storage.local.get('githubToken', function(data) {

    if(data && data.githubToken) {

      GitHub.getMyIssues(data.githubToken).then(function (issues) {

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