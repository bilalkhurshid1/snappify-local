const redirectUri =
	"https://snappify.cc/callback.html";

// Step 1: Get the `code` from the URL
const code = new URLSearchParams(window.location.search).get("code");

// Clean up URL after authorization
const newUrl = window.location.origin + window.location.pathname;
window.history.replaceState({}, document.title, newUrl);

const statusText = document.getElementById("to-be-replaced");

if (!code) {
	statusText.innerHTML = "<p>Error: No code found in URL.</p>";
} else {
	// Step 2: Send the `code` to your Lambda function to exchange it for tokens
	async function onboardUser(code) {
		try {
			const response = await fetch(
				"https://zdu2j4i4zad2a2fjtrsy4x7yri0vkzwx.lambda-url.us-east-2.on.aws/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ code, redirect_uri: redirectUri }),
				}
			);

			if (!response.ok) {
				const errData = await response.text();
				throw new Error(`Lambda error: ${errData || response.statusText}`);
			}

			statusText.innerHTML = "<p>Success!</p>";
		} catch (error) {
			console.error("Error during onboarding:", error);
			statusText.innerHTML = `<p>Error during onboarding: ${error.message}</p>`;
		}
	}

	function getNextSunday() {
		const today = new Date();
		const day = today.getDay(); // 0 (Sun) - 6 (Sat)
		const daysUntilSunday = (7 - day) % 7 || 7; // ensures it's *next* Sunday
		const nextSunday = new Date(today);
		nextSunday.setDate(today.getDate() + daysUntilSunday);

		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return nextSunday.toLocaleDateString(undefined, options).toLowerCase(); // local formatting
	}

    const nextSunday = document.getElementById("next-sunday");
    nextSundayRaw = getNextSunday();
    nextSundayClean = nextSundayRaw.replace(/,/g, "");
    const boldedSunday = nextSundayClean.replace(/sunday/i, "<b style='font-size: 2.5em; color: #1DB954;'>sunday</b>");
    nextSunday.innerHTML = boldedSunday;

	setTimeout(() => {
		statusText.style.opacity = 0;

		// Optional: remove from DOM after fade
		setTimeout(() => {
			statusText.remove();
		}, 1000); // match transition time
	}, 4000);

	onboardUser(code);
}
