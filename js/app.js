let input = document.querySelector('.input');
let btn = document.querySelector('.btn');

let wordEl = document.querySelector('.word');
let phoneticEl = document.querySelector('.phonetic');
let audioEl = document.querySelector('.audio');
let originEl = document.querySelector('.origin');
let meaningsEl = document.querySelector(".meanings");

// functions

function showMeaning(data) {
    data = data[0];
    let {
        word,
        phonetic,
        phonetics,
        origin,
        meanings
    } = data;
    let audio = phonetics[0].audio;
    let meaning = "";

    wordEl.innerHTML = word;
    phoneticEl.innerHTML = phonetic;
    audioEl.setAttribute("src", `${audio}`);
    originEl.innerHTML = `<span>Origin:</span> ${origin}`;

    meanings.forEach(item => {
        let {
            partOfSpeech,
            definitions
        } = item;

        let {
            definition,
            example
        } = definitions[0];

        meaning += `<div class="meaning">
                        <h3 class="partsofspeech">${partOfSpeech}</h3>
                        <h4 class="definition">${definition}</h4>
                        <h4 class="example"><span>Example:</span> ${example}</h4>
                    </div>`;
    });

    meaningsEl.innerHTML = meaning;
}

// events

btn.addEventListener('click', (e) => {
    e.preventDefault();
    let word = input.value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(res => res.json()).then(data => showMeaning(data));
});