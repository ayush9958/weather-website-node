const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent="";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const location = search.value;
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = `${data.location}`;
        messageTwo.textContent = `It is ${data.forecast.weatherDescriptions[0]}. Currently it is ${data.forecast.temperature} degrees celsius and feels like ${data.forecast.feelslike} degrees Celsius. Humidity is ${data.forecast.humidity}%`;
      }
    });
  });
});
