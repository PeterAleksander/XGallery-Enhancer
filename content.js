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

// Function to hide specific elements
function hideElements() {
  // Hide the header
  const headerElement = document.querySelector('header[role="banner"]');
  if (headerElement) {
    headerElement.style.display = "none"; // Hide the element
    console.log("Header element hidden");
  }

  // Hide the sidebar column
  const sidebarElement = document.querySelector(
    'div[data-testid="sidebarColumn"]'
  );
  if (sidebarElement) {
    sidebarElement.style.display = "none";
    console.log("Sidebar column hidden");
  }
}

// Create an observer instance linked to a callback function
const observer = new MutationObserver(function (mutations, me) {
  // Check if the target elements are now available
  hideElements(); // Call hideElements to hide both the header and sidebar
});

// Start observing the document body for added nodes
observer.observe(document.body, {
  childList: true, // Observe direct children
  subtree: true, // and lower descendants
  attributes: false,
});
