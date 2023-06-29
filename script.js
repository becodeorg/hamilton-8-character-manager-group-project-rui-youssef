async function getData() {
  try {
    const response = await axios.get(
      "https://character-database.becode.xyz/characters"
    );
    const data = response.data;
    data.forEach((element) => {
      let displaySingleChar = document.createElement("div");
      displaySingleChar.innerText = element.name;
      document.querySelector(".containerCards").append(displaySingleChar);
    });
  } catch (error) {
    console.log(error);
  }
}
getData();
