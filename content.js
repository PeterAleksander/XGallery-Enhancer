// Store the current state of the extension
let isExtensionEnabled = true;

function checkURL() {
  if (window.location.href.includes("/media")) {
    console.log("You are on the media page of a Twitter profile.");
    if (isExtensionEnabled) {
      updatePageStyles();
    } else {
      removePageStyles();
    }
  }
}

// Listen for URL changes in case of AJAX navigation
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "urlChange") {
    checkURL();
  }
});

// Function to hide specific elements and override CSS
function updatePageStyles() {
  // Hide the header
  const headerElement = document.querySelector('header[role="banner"]');
  if (headerElement) {
    headerElement.style.display = "none";
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

  // Override CSS for elements with class .r-113js5t
  const styleElement = document.createElement("style");
  styleElement.id = "extension-styles";
  styleElement.textContent = `
    .r-113js5t {
        width: 100% !important;
    }
    .r-1ye8kvj {
      max-width: none !important;
    }
  `;
  document.head.appendChild(styleElement);
}

// Function to remove applied styles
function removePageStyles() {
  const headerElement = document.querySelector('header[role="banner"]');
  if (headerElement) {
    headerElement.style.display = "";
  }

  const sidebarElement = document.querySelector(
    'div[data-testid="sidebarColumn"]'
  );
  if (sidebarElement) {
    sidebarElement.style.display = "";
  }

  const styleElement = document.getElementById("extension-styles");
  if (styleElement) {
    styleElement.remove();
  }
}

// Function to toggle extension state
function toggleExtension() {
  isExtensionEnabled = !isExtensionEnabled;
  chrome.storage.sync.set({ isEnabled: isExtensionEnabled }, function() {
    console.log("Extension state saved: " + isExtensionEnabled);
    checkURL(); // Re-check and apply/remove styles based on new state
  });
}

// Create an observer instance linked to a callback function
const observer = new MutationObserver(function (mutations, me) {
  // Re-check URL when DOM changes, in case we navigate to or from a media page
  checkURL();
});

// Start observing the document body for added nodes
observer.observe(document.body, {
  childList: true, // Observe direct children
  subtree: true, // and lower descendants
  attributes: false,
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleExtension") {
    toggleExtension();
  }
});

// Initialize extension state from storage
chrome.storage.sync.get('isEnabled', function(data) {
  isExtensionEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
  console.log("Extension state loaded: " + isExtensionEnabled);
  checkURL();
});

// Run checkURL when the script loads to apply changes if already on a media page
checkURL();