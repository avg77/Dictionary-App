const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const inpWord = document.getElementById("inp-word");

function getData() {
    fetch(`${url}${inpWord.value}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord.value}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up" id="speech"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            
            const audioSrc = data[0].phonetics[1]?.audio;
            if (audioSrc) {
                sound.setAttribute("src", audioSrc);
            }
            else {
                sound.removeAttribute("src"); 
            }
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });

    document.querySelector(".result").style.display = "block";
}

btn.addEventListener("click", () => {
    getData();
});

inpWord.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getData();
    }
});

function playSound() {
    if (sound.src) {
        sound.play();
    } else {
        alert("Audio not found.");
    }
}
