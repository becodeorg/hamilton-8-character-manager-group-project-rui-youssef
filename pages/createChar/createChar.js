// Select the form element with the ID "createNewChar"
const createCharForm = document.querySelector("#createNewChar");
// Form inputs
const imageForm = document.querySelector("#image");
const nameForm = document.querySelector("#name");
const shortDescriptionForm = document.querySelector("#shortDescription");
const descriptionForm = document.querySelector("#description");
// Form inputs
const displayImg = document.querySelector(".displayImage");

// Select the input element with the ID "image"
const uploadImg = document.getElementById("image");

// Get (if there's any) the id of the current character
const id = sessionStorage.getItem("selectedCharacterId");

// Delete or populate form according to if there's an Id or not

async function populateForm() {
  if (id !== null) {
    const response = await axios.get(
      `https://character-database.becode.xyz/characters/${id}`
    );
    const data = response.data;
    nameForm.value = data.name;
    shortDescriptionForm.value = data.shortDescription;
    descriptionForm.value = data.description;
  } else {
    nameForm.value = "";
    shortDescriptionForm.value = "";
    descriptionForm.value = "";
    // imageForm.value = "";
  }
}

// When page load display image and populate form (if theres any img/form value)
window.addEventListener("load", async () => {
  const response = await fetch(
    `https://character-database.becode.xyz/characters/${id}`
  );
  const data = await response.json();
  displayImg.style.backgroundImage = `url(data:image/png;base64, ${data.image}`;

  populateForm();
});

// When there's a change in the img input display it
imageForm.addEventListener("change", () => {
  readImage(imageForm);
});

// Function to read the selected image file and return the base64-encoded image data
async function readImage(file) {
  const fileType = file.files[0];
  // Check if the file is an image by verifying its MIME type
  if (fileType.type && !fileType.type.startsWith("image/")) {
    throw new Error("File is not an image.");
  }

  // Create a Promise to handle the asynchronous file reading
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const original = e.target.result;
      const subOriginal = original.split(",")[1];
      resolve(subOriginal);
      displayImg.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.onerror = () => {
      reject(new Error("Error occurred while reading the file."));
    };
    reader.readAsDataURL(fileType);
  });
}

// Function to populate the form data and convert the selected image to base64 format
async function populateDataObj() {
  // Collect all form data
  const allFormData = new FormData(createCharForm);
  // Convert form data to a regular object
  const data = Object.fromEntries(allFormData);

  if (id === null) {
    try {
      const convertedValue = await readImage(uploadImg);
      data.image = convertedValue;
    } catch (error) {
      console.error(error);
    }
  }

  return data;
}

// Add a submit event listener to the form
createCharForm.addEventListener("submit", async (e) => {
  console.log(imageForm.value);
  e.preventDefault();
  if (id !== null) {
    try {
      const obj = await populateDataObj();
      const response = await fetch(
        `https://character-database.becode.xyz/characters/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
    } catch (error) {
      console.log(`There has been an error: ${error}`);
    }
  } else {
    // Store the return value of populateDataObj which is a object with the form values
    const obj = await populateDataObj();
    try {
      const response = await fetch(
        "https://character-database.becode.xyz/characters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      // Check if it was accepted by the API
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        window.location.href = "../../index.html";
      }
    } catch (error) {
      console.log(`There has been an error, ${error}!`);
    }
  }
});
