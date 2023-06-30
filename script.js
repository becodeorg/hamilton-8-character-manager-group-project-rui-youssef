const containerDisplay = document.querySelector(".containerCards");
async function getData() {
  try {
    const response = await axios.get(
      "https://character-database.becode.xyz/characters"
    );
    const data = response.data;
    data.forEach((element) => {
      // create container for each char
      const displaySingleChar = document.createElement("article");
      displaySingleChar.className = "displayChar-container";
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

      // BUTTON SEE MORE
      const buttonSeeMoreChar = document.createElement("button");
      buttonSeeMoreChar.className = "seeMore-character";
      buttonSeeMoreChar.textContent = "See character";

      // APPEND EVERYTHING INTO THE DISPLAY CONTAINER
      displaySingleChar.append(
        imgSingleChar,
        nameSingleChar,
        shortDescriptionSingleChar,
        buttonSeeMoreChar
      );
      containerDisplay.appendChild(displaySingleChar);
    });
  } catch (error) {
    console.log(error);
  }
}
getData();

const buttonCreateChar = document.querySelector(".btn.long");
buttonCreateChar.addEventListener("click", () => {
  location.href = "./pages/updateCh/updateCh.html";
});
