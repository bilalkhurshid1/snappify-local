const redirectUri = "https://snappify.cc/callback.html";

const code = new URLSearchParams(window.location.search).get("code");
const statusText = document.getElementById("to-be-replaced");

if (!code) {
	statusText.innerHTML = "<p>Error: No code found in URL.</p>";
} else {
	async function onboardUser(code) {
		try {
			const response = await fetch(
				"https://zdu2j4i4zad2a2fjtrsy4x7yri0vkzwx.lambda-url.us-east-2.on.aws/",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
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

	// Clean up URL after auth
	const newUrl = window.location.origin + window.location.pathname;
	window.history.replaceState({}, document.title, newUrl);

	// Display next Sunday
	const nextSunday = document.getElementById("next-sunday");
	if (nextSunday) {
		const nextSundayRaw = getNextSunday();
		const nextSundayClean = nextSundayRaw.replace(/,/g, "");
		const boldedSunday = nextSundayClean.replace(
			/sunday/i,
			"<b style='font-size: 2.5em; color: #1DB954;'>sunday</b>"
		);
		nextSunday.innerHTML = boldedSunday;
	}

	function getNextSunday() {
		const today = new Date();
		const day = today.getDay();
		const daysUntilSunday = (7 - day) % 7 || 7;
		const nextSunday = new Date(today);
		nextSunday.setDate(today.getDate() + daysUntilSunday);

		return nextSunday.toLocaleDateString(undefined, {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		}).toLowerCase();
	}

	setTimeout(() => {
		statusText.style.opacity = 0;
		setTimeout(() => statusText.remove(), 1000);
	}, 4000);

	onboardUser(code);
}
