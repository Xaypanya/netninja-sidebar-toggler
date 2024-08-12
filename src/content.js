
// Function to hide or show the sidebar
function hideCourseSidebar(isHideSidebar) {

  console.log("hideCourseSidebar called with:", isHideSidebar);

    const sidebar = document.querySelector("#courseSidebar");
    if (sidebar) {
      sidebar.style.display = isHideSidebar ? "block" : "none";
      
      // Save the state to chrome.storage
      chrome.storage.local.set({ sidebarVisible: !isHideSidebar });
    } else {
      console.warn("Sidebar not found");
    }
  }
  
  // Retrieve the sidebar state on page load
  function restoreSidebarState() {
    chrome.storage.local.get('sidebarVisible', (result) => {
      const isSidebarVisible = result.sidebarVisible !== false; // Default to true if not set
      hideCourseSidebar(!isSidebarVisible); // Hide if isSidebarVisible is false
    });
  }
  
  // Call restoreSidebarState when the content script loads
  restoreSidebarState();
  
  // Listen for messages from other parts of the extension
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received:", request);
  
    if (request.action === "toggleSidebar") {
      hideCourseSidebar(request.visible);
      sendResponse({ status: "Sidebar toggled", visible: request.visible });
    }
  
    if (request.action === "getSidebarState") {
      const sidebar = document.querySelector("#courseSidebar");
      if (sidebar) {
        const isHidden = getComputedStyle(sidebar).display === "none";
        sendResponse({ status: "Sidebar state retrieved", visible: !isHidden });
      } else {
        console.warn("Sidebar not found when retrieving state");
        sendResponse({ status: "Sidebar state retrieved", visible: false });
      }
    }
  });
  