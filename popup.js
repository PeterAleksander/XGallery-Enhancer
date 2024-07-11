// Function to create the popup HTML structure
function createPopupHTML() {
    // Create main container
    const container = document.createElement('div');
    container.style.width = '200px';
    container.style.padding = '10px';
  
    // Create title
    const title = document.createElement('h2');
    title.textContent = 'Gallery Xhancer';
    title.style.marginBottom = '15px';
  
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggleButton';
    toggleButton.style.width = '100%';
    toggleButton.style.padding = '8px';
    toggleButton.style.cursor = 'pointer';
  
    // Append elements to container
    container.appendChild(title);
    container.appendChild(toggleButton);
  
    // Append container to body
    document.body.appendChild(container);
  }
  
  // Function to initialize popup functionality
  function initializePopup() {
    createPopupHTML();
  
    const toggleButton = document.getElementById('toggleButton');
    
    // Load initial state
    chrome.storage.sync.get('isEnabled', function(data) {
      const isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
      updateButtonState(toggleButton, isEnabled);
    });
  
    toggleButton.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleExtension"});
      });
  
      // Update button state
      chrome.storage.sync.get('isEnabled', function(data) {
        updateButtonState(toggleButton, !data.isEnabled);
      });
    });
  }
  
  // Function to update button state
  function updateButtonState(button, isEnabled) {
    button.textContent = isEnabled ? 'Disable Extension' : 'Enable Extension';
    button.style.backgroundColor = isEnabled ? '#ff4136' : '#2ecc40';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
  }
  
  // Run initialization when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initializePopup);