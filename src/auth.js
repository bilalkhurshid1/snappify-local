const clientId = "c67e72384a114191b582401cda129f93";
const redirectUri = "https://snappify.cc/callback.html"; 
const scopes = [
	"user-read-private",
	"user-read-email",
	"user-read-recently-played",
];

document.getElementById("auth-button").addEventListener("click", () => {
	const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes.join(" "))}&redirect_uri=${encodeURIComponent(redirectUri)}`;
	window.location.href = authUrl;
});