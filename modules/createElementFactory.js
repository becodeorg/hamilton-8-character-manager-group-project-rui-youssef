// Function that creates a new element
const createElement = (element, className, textContent = "") => {
  const newElement = document.createElement(element);
  newElement.className = className;
  newElement.textContent = textContent;

  return newElement;
};

export default createElement;
