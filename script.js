const containerDisplay = document.querySelector(".containerCards");

// Function that creates a new element
const createElement = (element, className, textContent = "") => {
  const newElement = document.createElement(element);
  newElement.className = className;
  newElement.textContent = textContent;

  return newElement;
};

const getDataFromApi = async () => {
  try {
    const response = await axios.get(
      "https://character-database.becode.xyz/characters"
    );
    const data = response.data;

    data.forEach((element) => {
      // create container for each char
      const displaySingleChar = createElement(
        "article",
        "displayChar-container"
      );

      // create content for each container

      // IMG and its content
      const imgSingleChar = createElement("img", "charImage");
      imgSingleChar.setAttribute(
        "src",
        `data:image/png;base64, ${element.image}`
      );
      imgSingleChar.setAttribute("alt", "image of the character");

      // SHORT DESCRIPTION OF CHARACTER AND ITS CONTENT
      const shortDescriptionSingleChar = createElement(
        "p",
        "short-description-character",
        element.shortDescription
      );

      // NAME OF CHARACTER AND ITS CONTENT
      const nameSingleChar = createElement("p", "name-character", element.name);

      // DESCRIPTION OF CHAR AND ITS CONTENT
      const descriptionOfCharacter = createElement(
        "p",
        "long-description",
        element.description
      );

      // BUTTON SEE MORE
      const buttonSeeMoreChar = createElement(
        "button",
        "seeMore-character",
        "See character"
      );
      buttonSeeMoreChar.addEventListener("click", () => {
        // Store the selected character's ID in session storage
        sessionStorage.setItem("selectedCharacterId", element.id);
        // Navigate to the other page
        location.href = "./pages/singlePage/singlePage.html";
      });

      // Append the char container into the chars container
      containerDisplay.appendChild(displaySingleChar);

      // APPEND EVERYTHING INTO THE DISPLAY CONTAINER
      displaySingleChar.append(
        imgSingleChar,
        nameSingleChar,
        shortDescriptionSingleChar,
        descriptionOfCharacter,
        buttonSeeMoreChar
      );
    });
  } catch (error) {
    console.log(error);
  }
};

getDataFromApi();

const buttonCreateChar = document.querySelector(".btn.long");
buttonCreateChar.addEventListener("click", () => {
  sessionStorage.clear();
  location.href = "./pages/createChar/createChar.html";
});

const searchBarFunctionality = async () => {
  const searchInput = document.getElementById("search");
  const cardsContainer = document.getElementsByClassName(
    "displayChar-container"
  );

  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();

    Array.from(cardsContainer).forEach((container) => {
      const card = container.querySelector(".name-character");
      const cardName = card.innerText.toLowerCase();

      if (cardName.includes(searchValue)) {
        container.style.display = "flex";
      } else {
        container.style.display = "none";
      }
    });
  });
};

searchBarFunctionality();
