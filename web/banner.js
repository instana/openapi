// Robust initialization with multiple fallbacks
function initBanner() {
    // 1. Create banner with protected click handling
    const banner = document.createElement('div');
    banner.className = 'instana-custom-banner';
    banner.innerHTML = `
      <img src="https://img.icons8.com/ios-filled/50/0052cc/info.png" 
           class="instana-custom-banner-icon" alt="info icon"/>
      <span>
        <span class="instana-custom-banner-bold">This documentation has now moved</span> - please access the latest document 
        <a href="https://developer.ibm.com/apis/catalog/instana--instana-rest-api/Introduction" 
           target="_blank" 
           class="instana-custom-banner-link">
          here
        </a>.
      </span>
    `;
  
    // Absolute click protection
    banner.addEventListener('click', function(e) {
      if (!e.target.closest('.instana-custom-banner-link')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });
  
    // 2. Insertion logic with multiple fallbacks
    const insertionStrategies = [
      // Try after search bar
      () => {
        const search = document.querySelector('[class*="search"]');
        return search?.parentNode;
      },
      // Try after logo
      () => {
        const logo = document.querySelector('[class*="logo"], img[src*="logo"], svg');
        return logo?.parentNode;
      },
      // Try menu container
      () => document.querySelector('[data-section="menu"], [role="navigation"]')
    ];
  
    for (const strategy of insertionStrategies) {
      const container = strategy();
      if (container) {
        container.insertBefore(banner, container.firstChild);
        return; // Exit after successful insertion
      }
    }
  
    // Final fallback to body if all else fails
    document.body.prepend(banner);
  }
  
  // 3. Initialize with multiple safety checks
  if (document.readyState === 'complete') {
    setTimeout(initBanner, 100);
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(initBanner, 300);
    });
  }