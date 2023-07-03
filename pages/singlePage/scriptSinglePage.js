const containerToStore = document.querySelector(".container");
const selectedCharacterId = sessionStorage.getItem("selectedCharacterId");

async function fetchCharacterData() {
  try {
    const response = await axios.get(
      `https://character-database.becode.xyz/characters/${selectedCharacterId}`
    );
    const SelectedCardData = response.data;

    const displayedImage = document.createElement("img");
    displayedImage.src = `data:image/png;base64, ${SelectedCardData.image}`;
    displayedImage.alt = "Image of the character";
    displayedImage.className = "charImage";

    const name = document.createElement("p");
    name.textContent = SelectedCardData.name;
    name.className = "name-character";

    const shortDescription = document.createElement("p");
    shortDescription.textContent = SelectedCardData.shortDescription;
    shortDescription.className = "short-description-character";

    const description = document.createElement("p");
    description.textContent = SelectedCardData.description;
    description.className = "long-description";

    const divForButton = document.createElement("div");
    divForButton.className = "div-for-button";

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

    const buttonToUpdate = document.createElement("button");
    buttonToUpdate.className = "update-character";
    buttonToUpdate.textContent = "Update character";
    buttonToUpdate.addEventListener("click", async () => {
      sessionStorage.setItem("selectedCharacterId", SelectedCardData.id);
      window.location.href = "../../pages/createChar/createChar.html";
    });

    containerToStore.appendChild(displayedImage);
    containerToStore.appendChild(name);
    containerToStore.appendChild(shortDescription);
    containerToStore.appendChild(description);
    containerToStore.appendChild(divForButton);
    divForButton.appendChild(buttonToDeleteCard);
    divForButton.appendChild(buttonToUpdate);
  } catch (error) {
    console.error(error);
  }
}

fetchCharacterData();
