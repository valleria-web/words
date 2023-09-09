document.addEventListener("DOMContentLoaded", function () {
  const wordInput = document.getElementById("wordInput");
  const addWordButton = document.getElementById("addWord");
  const wordList = document.getElementById("wordList");

  // Load words from local storage
  const storedWords = JSON.parse(localStorage.getItem("words")) || [];

  // Display stored words on page load
  storedWords.forEach(function (word) {
    addWordToUI(word);
  });

  // Add a word to local storage and update the UI
  function addWord() {
    const word = wordInput.value.trim();

    if (word !== "") {
      if (!storedWords.includes(word)) {
        storedWords.push(word);
        localStorage.setItem("words", JSON.stringify(storedWords));
        addWordToUI(word);
      } else {
        // Word already exists, apply a new color
        applyColorandSizeToExistingWord(word);
      }
      wordInput.value = "";
    }
  }

  // Add a word to the UI (unordered list)
  function addWordToUI(word) {
    const li = document.createElement("li");
    li.textContent = word;
    wordList.appendChild(li);
  }

  // Apply a new color and size to an existing word in the UI
  function applyColorandSizeToExistingWord(word) {
    const existingWords = Array.from(wordList.querySelectorAll("li"));

    for (const li of existingWords) {
      if (li.textContent === word) {
        const currentFontSize = parseFloat(getComputedStyle(li).fontSize);
        const newFontSize = currentFontSize + 10; // Increase font size by 10 pixels (you can adjust this value)

        li.style.color = getRandomColor();
        li.style.fontSize = `${newFontSize}px`; // Change the font size as desired
      }
    }
  }

  // Generate a random color
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Event listener for the "Add Word" button
  addWordButton.addEventListener("click", addWord);
});
