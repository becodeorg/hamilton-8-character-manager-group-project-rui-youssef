const containerToStore = document.querySelector(".container");
const selectedCharacterId = sessionStorage.getItem("selectedCharacterId");
axios
  .get(
    `https://character-database.becode.xyz/characters/${selectedCharacterId}`
  )
  .then((response) => {
    const SelectedCardData = response.data;

    const displayedImage = document.createElement("img");
    displayedImage.src = `data:image/png;base64, ${SelectedCardData.image}`;
    displayedImage.alt = "Image of the character";

    const name = document.createElement("h2");
    name.textContent = SelectedCardData.name;

    const shortDescription = document.createElement("p");
    shortDescription.textContent = SelectedCardData.shortDescription;

    const description = document.createElement("p");
    description.textContent = SelectedCardData.description;

    const buttonToDeleteCard = document.createElement("button");
    buttonToDeleteCard.className = "delete-character";
    buttonToDeleteCard.textContent = "Delete character";
    buttonToDeleteCard.addEventListener("click", async () => {
      try {
        await axios.delete(
          `https://character-database.becode.xyz/characters/${selectedCharacterId}`
        );
        containerToStore.remove();
        window.location.href = "../../index.html";
      } catch (error) {
        console.log(error);
      }
    });
    containerToStore.appendChild(displayedImage);
    containerToStore.appendChild(name);
    containerToStore.appendChild(shortDescription);
    containerToStore.appendChild(description);
    containerToStore.appendChild(buttonToDeleteCard);
  })
  .catch((error) => {
    console.error(error);
  });
