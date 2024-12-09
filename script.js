const API_BASE = "http://thor.pylex.software:10663";

// Ambil ID dari URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

// Tampilkan ID di halaman
document.getElementById("idDisplay").textContent = `ID: ${userId || "Unknown"}`;

// Step 1: Whitelist ID
document.getElementById("whitelistButton").addEventListener("click", async () => {
  const messageElement = document.getElementById("whitelistMessage");

  if (!userId) {
    messageElement.textContent = "Invalid or missing ID.";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/id?id=${userId}`);
    const result = await response.json();

    if (result.success) {
      messageElement.textContent = "ID successfully whitelisted!";
      document.getElementById("step1").style.display = "none";
      document.getElementById("step2").style.display = "block";
    } else {
      messageElement.textContent = `Error: ${result.error || "Unable to whitelist ID."}`;
    }
  } catch (error) {
    messageElement.textContent = "Failed to connect to the server.";
  }
});

// Step 2: Generate Key
document.getElementById("generateKeyButton").addEventListener("click", async () => {
  const outputElement = document.getElementById("keyOutput");

  try {
    const response = await fetch(`${API_BASE}/generate?id=${userId}`);
    const result = await response.json();

    if (result.key) {
      outputElement.textContent = `Your Key: ${result.key}`;
    } else {
      outputElement.textContent = `Error: ${result.error || "Unable to generate key."}`;
    }
  } catch (error) {
    outputElement.textContent = "Failed to connect to the server.";
  }
});
