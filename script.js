const input = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const wordTitle = document.getElementById("wordTitle");
const partOfSpeechContainer = document.querySelector(".partofspeech");
const wordMeaning = document.getElementById("wordMeaning");

async function getMeaning() {
  const word = input.value.trim();
  if (!word) {
    alert("Please enter a word");
    return;
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      alert(`No definition found for "${word}"`);
    }
    let data = await response.json();
    displayMeaning(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayMeaning(data) {
  if (data.length > 0) {
    const element = data[0];
    wordTitle.textContent = element.word;

    partOfSpeechContainer.innerHTML = "";
    wordMeaning.innerHTML = "";

    element.meanings.forEach((meaning, index) => {
      const partOfSpeech = meaning.partOfSpeech;
      const definitions = meaning.definitions;
      const posDiv = document.createElement("div");
      posDiv.classList.add("pos-section");

      const postitle = document.createElement("h3");
      postitle.textContent = `Part of Speech: ${partOfSpeech}`;
      posDiv.appendChild(postitle);

      definitions.forEach((definitionObj, defIndex) => {
        const definitionelement = document.createElement("p");
        const definitioncontext = definitionObj.definition;

        definitionelement.textContent = `${defIndex + 1}- ${definitioncontext}`;
        posDiv.appendChild(definitionelement);
      });
      partOfSpeechContainer.appendChild(posDiv);
    });
  } else {
    wordTitle.textContent = "";
    partOfSpeechContainer.innerHTML = "<h2>No definitions found.</h2>";
    wordMeaning.textContent = "";
  }
}

searchButton.addEventListener("click", getMeaning);
