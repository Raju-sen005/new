// <!-- search open pannel -->

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('focus', () => {
        searchResults.classList.remove('hidden');
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });

    // Prevent search results from closing when clicking inside
    searchResults.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Optional: Show/hide based on input
    searchInput.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
            searchResults.classList.remove('hidden');
        } else {
            searchResults.classList.add('hidden');
        }
    });

// <!-- dark theme -->


    function toggleDarkMode() {
        const html = document.documentElement;
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('darkMode', isDark);
    }

    // Check for saved dark mode preference
    document.addEventListener('DOMContentLoaded', () => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.getElementById('switch-component').checked = true;
        }
    });


//   <!-- slidebar -->
  
    document.addEventListener('DOMContentLoaded', () => {
        const menuButton = document.getElementById('menuButton');
        const sidebar = document.getElementById('sidebar');

        menuButton.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });

        // Close sidebar when clicking outside (optional)
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !menuButton.contains(e.target)) {
                sidebar.classList.add('-translate-x-full');
            }
        });
    });

  
//  <!-- flow button -->
 
    document.addEventListener("DOMContentLoaded", function () {
        const dropdownBtn = document.getElementById("flow-shop-dropdown-btn");
        const dropdownMenu = document.getElementById("flow-shop-dropdown-menu");
        dropdownBtn.addEventListener("click", function () {
            dropdownMenu.classList.toggle("opacity-0");
            dropdownMenu.classList.toggle("invisible");
        });
        document.addEventListener("click", function (event) {
            if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.add("opacity-0", "invisible");
            }
        });
    });
//   <!-- dropdown of admin -->
  
    document.getElementById('user-menu-btn').addEventListener('click', function () {
        document.getElementById('user-menu').classList.toggle('hidden');
    });


    document.addEventListener('DOMContentLoaded', () => {
   
    // Notification Popup
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationBackdrop = document.getElementById('notificationBackdrop');

    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMobile = window.innerWidth < 1024; // lg breakpoint

        notificationDropdown.classList.toggle('hidden');
        if (isMobile) {
            notificationBackdrop.classList.toggle('hidden');
            document.body.style.overflow = notificationDropdown.classList.contains('hidden') ? '' : 'hidden';

            // Mobile animation
            if (!notificationDropdown.classList.contains('hidden')) {
                notificationDropdown.style.transform = 'translateY(100%)';
                setTimeout(() => {
                    notificationDropdown.style.transform = 'translateY(0)';
                }, 0);
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.add('hidden');
            notificationBackdrop.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    notificationBackdrop.addEventListener('click', () => {
        notificationDropdown.classList.add('hidden');
        notificationBackdrop.classList.add('hidden');
        document.body.style.overflow = '';
    });

    // Clear Notifications
    const clearNotificationsBtn = document.getElementById('clearNotifications');
    clearNotificationsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.add('hidden');
        notificationBackdrop.classList.add('hidden');
        document.body.style.overflow = '';

        const notificationDot = document.querySelector('#notificationBtn .bg-red-500');
        if (notificationDot) {
            notificationDot.classList.add('hidden');
        }
    });

    // Mobile Search
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const mobileSearchContainer = document.getElementById('mobileSearchContainer');

    mobileSearchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileSearchContainer.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!mobileSearchContainer.contains(e.target) && !mobileSearchBtn.contains(e.target)) {
            mobileSearchContainer.classList.add('hidden');
        }
    });

    // Handle Window Resize (fix mobile transition issues)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            notificationBackdrop.classList.add('hidden');
            document.body.style.overflow = '';
            notificationDropdown.style.transform = ''; // Reset transform
        }
    });
});




// setting page java

// 1. responsive java for toggel
document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.getElementById('dropdown-btn');
    const sidebarContent = document.getElementById('sidebar-content');
    const dropdownArrow = dropdownBtn.querySelector('.dropdown-arrow');
    dropdownBtn.addEventListener('click', () => {
        const isOpen = sidebarContent.classList.contains('open');
        sidebarContent.classList.toggle('open');
        dropdownArrow.classList.toggle('open');
    });
    const sidebarButtons = sidebarContent.querySelectorAll('.sidebar-btn');
    sidebarButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                sidebarContent.classList.remove('open');
                dropdownArrow.classList.remove('open');
            }
        });
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            sidebarContent.classList.remove('open');
            dropdownArrow.classList.remove('open');
        }
    });
});


//2. JavaScript for toggling content left side silder

const buttons = document.querySelectorAll('.sidebar-btn');
const contents = document.querySelectorAll('.flex-1.p-6');

// Show Store Details by default
document.getElementById('store-details-content').classList.remove('hidden');
document.getElementById('store-details-btn').classList.add('bg-gray-100');

// Add click event listener to all sidebar buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Hide all content sections
        contents.forEach(content => content.classList.add('hidden'));
        
        // Remove active state from all buttons
        buttons.forEach(btn => btn.classList.remove('bg-gray-100'));

        // Show the target content section
        const targetContentId = button.getAttribute('data-target');
        document.getElementById(targetContentId).classList.remove('hidden');

        // Add active state to the clicked button
        button.classList.add('bg-gray-100');
    });
});



// shipping-filled-state page javaScript

// edit weight & create present & add packages

document.addEventListener("click", (event) => {
    // Open modal when clicking a button with [data-modal] attribute
    if (event.target.matches("[data-modal]")) {
        const modalId = event.target.getAttribute("data-modal");
        document.getElementById(modalId).classList.remove("hidden");
    }

    // Close modal when clicking a close button inside a modal
    if (event.target.matches(".close-modal")) {
        event.target.closest(".fixed").classList.add("hidden");
    }

    // Close modal when clicking outside the modal box
    if (event.target.matches(".fixed")) {
        event.target.classList.add("hidden");
    }
});