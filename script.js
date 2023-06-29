const containerDisplay = document.querySelector(".containerCards");

async function getData() {
  try {
    const response = await axios.get(
      "https://character-database.becode.xyz/characters"
    );
    const data = response.data;

    data.forEach((element) => {
      // create container for each char
      const displaySingleChar = document.createElement("div");
      displaySingleChar.textContent = element.name;
      containerDisplay.appendChild(displaySingleChar);

      // create content for each container

      // IMG and its content
      const imgSingleChar = document.createElement("img");
      imgSingleChar.className = "charImage";
      imgSingleChar.src = `data:image/png;base64, ${element.image}`;
      imgSingleChar.alt = "image of the character";

      // SHORT DESCRIPTION OF CHARACTER AND ITS CONTENT
      const shortDescriptionSingleChar = document.createElement("p");
      shortDescriptionSingleChar.className = "short-description-character";
      shortDescriptionSingleChar.textContent = element.shortDescription;

      // NAME OF CHARACTER AND ITS CONTENT
      const nameSingleChar = document.createElement("p");
      nameSingleChar.className = "name-character";
      nameSingleChar.textContent = element.name;

      // APPEND EVERYTHING INTO THE DISPLAY CONTAINER
      displaySingleChar.appendChild(imgSingleChar);
      displaySingleChar.appendChild(nameSingleChar);
      displaySingleChar.appendChild(shortDescriptionSingleChar);
    });
  } catch (error) {
    console.log(error);
  }
}

getData();
