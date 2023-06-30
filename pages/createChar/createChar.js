const createCharForm = document.querySelector("#createNewChar");

createCharForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const allFormData = new FormData(createCharForm);
  const data = Object.fromEntries(allFormData);
  console.log(data);

  fetch("https://character-database.becode.xyz/characters", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    // Convert data OBJ into JSON
    body: JSON.stringify(data),
  })
    // Parse the response as JSON
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((error) => {
      console.error(error);
    });
});
