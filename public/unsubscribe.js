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
    confirmButton.addEventListener('click', async function() {
        try {
            // Show loading state
            confirmButton.textContent = 'Processing...';
            confirmButton.disabled = true;
            
            // Call the lambda function to unsubscribe the user
            const response = await fetch(`https://g47byy3n3zwn7gnwuahyxgrzky0jkefv.lambda-url.us-east-2.on.aws/?uid=${encodeURIComponent(userId)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            
            // Hide confirmation box and show success message
            document.getElementById('confirmation-box').style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
            
            // Clean up URL after unsubscribe
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
            
        } catch (error) {
            console.error('Error during unsubscribe:', error);
            document.getElementById('confirmation-box').innerHTML = `
                <p>Error during unsubscribe: ${error.message}</p>
                <p>Please try again later or contact support.</p>
                <a href="https://snappify.cc" class="cta-button">Return to Homepage</a>
            `;
        }
    });
});
