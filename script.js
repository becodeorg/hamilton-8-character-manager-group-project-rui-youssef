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

      // create content for each container
      // IMG and its content
      const imgSingleChar = document.createElement("img");
      imgSingleChar.className = "charImage";
      imgSingleChar.setAttribute(
        "src",
        `data:image/png;base64, ${element.image}`
      );
      imgSingleChar.setAttribute("alt", "image of the character");

      // SHORT DESCRIPTION OF CHARACTER AND ITS CONTENT
      const shortDescriptionSingleChar = document.createElement("p");
      shortDescriptionSingleChar.className = "short-description-character";
      shortDescriptionSingleChar.textContent = element.shortDescription;

      // NAME OF CHARACTER AND ITS CONTENT
      const nameSingleChar = document.createElement("p");
      nameSingleChar.className = "name-character";
      nameSingleChar.textContent = element.name;

      // APPEND EVERYTHING INTO THE DISPLAY CONTAINER
      displaySingleChar.append(
        imgSingleChar,
        nameSingleChar,
        shortDescriptionSingleChar
      );
      containerDisplay.appendChild(displaySingleChar);
    });
  } catch (error) {
    console.log(error);
  }
}
getData();
