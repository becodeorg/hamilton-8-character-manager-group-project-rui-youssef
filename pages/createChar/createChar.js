const createCharForm = document.querySelector("#createNewChar");

createCharForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const allFormData = new FormData(createCharForm);
  let data = {};
  for (let [key, value] of allFormData) {
    data[key] = value;
  }

  fetch("https://character-database.becode.xyz/characters", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    // Convert data to JSON string
    body: JSON.stringify(data),
  })
    // Parse the response as JSON
    .then((response) => response.json())
    .then((responseData) => {
      console.log("New character posted successfully:", responseData);
    })
    .catch((error) => {
      console.error("Error posting new character:", error);
    });
});
