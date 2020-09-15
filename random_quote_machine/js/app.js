// https://random-quote-machine-liard.vercel.app

const quoteEl = document.querySelector('#text');
const authorEl = document.querySelector('#author');
const newQuoteBtn = document.querySelector('#new-quote');
const app = document.querySelector('.app');
const root = document.documentElement;

const quotesUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
const colors = [
    '#588da8', '#6e5773', '#f1935c', '#385170',
    '#77628c', '#709078', '#c06c84', '#78ba78',
    '#679186', '#e66767', '#303952', '#c44569',
    '#84817a', '#218c74', '#2c2c54', '#b33939',
    '#40407a', '#cc8e35', '#227093', '#833471',
    '#006266'
]

let quotesData;
const fetchQuotes = async () => {
    const response = await fetch(quotesUrl)
    const { quotes } = await response.json();
    quotesData = quotes;
}


function getRandomElement(arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
};

function displayQuote({ quote, author }) {
    quoteEl.innerHTML =
        `<span id="quotation-mark">
            <i class='bx bxs-quote-left'></i>
        </span>
        ${quote}
        `;
    authorEl.textContent = `- ${author}`;
};

function changeColor(color) {
    root.style.setProperty('--color-primary', color)
    root.style.setProperty('--color-primary-shadow', tinycolor(color).setAlpha(.3).toRgbString())

    root.style.setProperty('--color-primary-dark', tinycolor(color).darken(5));
    root.style.setProperty('--color-primary-darker', tinycolor(color).darken(12));
    root.style.setProperty('--color-primary-darkest', tinycolor(color).darken(20));
    root.style.setProperty('--color-primary-light', tinycolor(color).lighten(2));
    root.style.setProperty('--color-primary-lighter', tinycolor(color).lighten(5));
    root.style.setProperty('--color-primary-lightest', tinycolor(color).lighten(20));
}

function generateQuote() {
    displayQuote(getRandomElement(quotesData));
    changeColor(getRandomElement(colors));
}

changeColor(getRandomElement(colors))
fetchQuotes().then(generateQuote);
newQuoteBtn.addEventListener('click', generateQuote);
