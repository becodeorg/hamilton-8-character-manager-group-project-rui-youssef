const createCharForm = document.querySelector("#createNewChar");
const uploadImg = document.getElementById("image");

async function readImage(file) {
  const fileType = file.files[0];
  // Check if the file is an image.
  if (fileType.type && !fileType.type.startsWith("image/")) {
    throw new Error("File is not an image.");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const original = e.target.result;
      const subOriginal = original.split(",")[1];
      resolve(subOriginal);
    };
    reader.onerror = () => {
      reject(new Error("Error occurred while reading the file."));
    };
    reader.readAsDataURL(fileType);
  });
}

async function populateDataObj() {
  const allFormData = new FormData(createCharForm);
  const data = Object.fromEntries(allFormData);

  try {
    const convertedValue = await readImage(uploadImg);
    data.image = convertedValue;
  } catch (error) {
    console.error(error);
  }

  return data;
}

createCharForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const obj = await populateDataObj();
  try {
    const response = await fetch(
      "https://character-database.becode.xyz/characters",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.log(`There has been an error, ${error}!`);
  }
});
