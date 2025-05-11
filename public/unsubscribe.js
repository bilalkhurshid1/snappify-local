document.addEventListener('DOMContentLoaded', function() {
    // Get the user ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('uid');
    
    if (!userId) {
        // If no user ID is provided, show an error message
        document.getElementById('confirmation-box').innerHTML = `
            <p>Error: No user ID found. Please check your unsubscribe link.</p>
            <a href="https://snappify.cc" class="cta-button">Return to Homepage</a>
        `;
        return;
    }
    
    // Add event listener to the confirm button
    const confirmButton = document.getElementById('confirm-button');
    confirmButton.addEventListener('click', function() {
        // Show loading state
        confirmButton.textContent = 'Processing...';
        confirmButton.disabled = true;
        
        // Instead of using fetch, redirect the user directly to the Lambda URL
        // This avoids CORS issues completely
        const lambdaUrl = `https://g47byy3n3zwn7gnwuahyxgrzky0jkefv.lambda-url.us-east-2.on.aws/?uid=${encodeURIComponent(userId)}&redirect=https://snappify.cc/unsubscribe-success.html`;
        
        // Store that we've initiated the unsubscribe process
        localStorage.setItem('unsubscribeInitiated', 'true');
        
        // Redirect to the Lambda URL
        window.location.href = lambdaUrl;
    });
    
    // Check if we're returning from a successful unsubscribe
    if (localStorage.getItem('unsubscribeInitiated') === 'true' && window.location.pathname.includes('unsubscribe-success')) {
        // Clear the flag
        localStorage.removeItem('unsubscribeInitiated');
        
        // Hide confirmation box and show success message
        document.getElementById('confirmation-box').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
        
        // Clean up URL
        const newUrl = window.location.origin + '/unsubscribe.html';
        window.history.replaceState({}, document.title, newUrl);
    }
});
