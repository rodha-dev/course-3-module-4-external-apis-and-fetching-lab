// index.js
const WeatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here //

const weatherApi = "https://api.weather.gov/alerts/active?area=";

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  errorMessage.classList.add("error");
}

fetchButton.addEventListener("click", async () => {
  const stateAbbr = stateInput.value.trim().toUpperCase();

  // Clear the input and previous results
  stateInput.value = "";
  alertsDisplay.innerHTML = "";
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
  errorMessage.classList.remove("error");

  // Validate the input
  if (!/^[A-Z]{2}$/.test(stateAbbr)) {
    displayError("Please enter a valid two-letter state abbreviation.");
    return;
  }

  try {
    // Fetch alerts for the selected state
    const response = await fetch(`${weatherApi}${stateAbbr}`);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    // Display the summary
    const summary = document.createElement("h2");
    summary.textContent = `${data.title}: ${data.features.length}`;
    alertsDisplay.append(summary);

    // Display each alert headline
    const alertList = document.createElement("ul");

    data.features.forEach((alert) => {
      const listItem = document.createElement("li");
      listItem.textContent =
        alert.properties.headline || "No headline available";

      alertList.append(listItem);
    });

    alertsDisplay.append(alertList);
  } catch (error) {
    displayError(error.message);
  }
});

























