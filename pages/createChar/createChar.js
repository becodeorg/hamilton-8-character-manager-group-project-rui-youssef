const createCharForm = document.querySelector("#createNewChar");
const uploadImg = document.getElementById("image");

// Function to read the selected image file and return the base64-encoded image data
async function readImage(file) {
  const fileType = file.files[0]; // Get the selected file
  // Check if the file is an image by verifying its MIME type
  if (fileType.type && !fileType.type.startsWith("image/")) {
    throw new Error("File is not an image.");
  }

  // Create a Promise to handle the asynchronous file reading
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); // Create a FileReader object
    reader.onload = (e) => {
      const original = e.target.result; // Get the file content as a data URL
      const subOriginal = original.split(",")[1]; // Extract the base64-encoded image data
      resolve(subOriginal); // Resolve the Promise with the image data
    };
    reader.onerror = () => {
      reject(new Error("Error occurred while reading the file.")); // Reject the Promise if an error occurs
    };
    reader.readAsDataURL(fileType); // Read the file as a data URL
  });
}

// Function to populate the form data and convert the selected image to base64 format
async function populateDataObj() {
  const allFormData = new FormData(createCharForm); // Collect all form data
  const data = Object.fromEntries(allFormData); // Convert form data to a regular object

  try {
    const convertedValue = await readImage(uploadImg); // Convert the selected image to base64 format
    data.image = convertedValue; // Assign the converted image data to the "image" property in the data object
  } catch (error) {
    console.error(error); // Log any errors that occur during image reading
  }

  return data; // Return the populated data object
}

// Add a submit event listener to the form
createCharForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission

  const obj = await populateDataObj(); // Populate the data object with form data and converted image

  try {
    const response = await fetch(
      "https://character-database.becode.xyz/characters",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj), // Convert the data object to JSON and send it as the request body
      }
    );

    if (response.ok) {
      const responseData = await response.json(); // Parse the response data as JSON
      console.log(responseData); // Log the response data
      window.location.href = "../../index.html"; // Redirect to the index.html page
    } else {
      throw new Error("Failed to create character."); // Throw an error if the request fails
    }
  } catch (error) {
    console.log(`There has been an error: ${error}`); // Log any errors that occur during the request
  }
});
