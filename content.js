function checkURL() {
  if (window.location.href.includes("/media")) {
    // Execute your code here for Twitter gallery view
    console.log("You are on the media page of a Twitter profile.");
    // Add more of your custom code here
  }
}

// Run checkURL when the script loads
checkURL();

// Listen for URL changes in case of AJAX navigation
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "urlChange") {
    checkURL();
  }
});
