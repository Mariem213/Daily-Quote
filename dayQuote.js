const quoteEl = document.querySelector(".quote");
const authorEl = document.querySelector(".author");

// Random Quotes
const API_URL = 'https://api.quotable.io/random';

// To get quote from API to my page
const getQuote = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const quote = data.content;
        const author = data.author || 'Unknown';

        quoteEl.textContent = quote;
        authorEl.textContent = author;
    } catch (error) {
        console.log(error);
        quoteEl.textContent = 'Oops! Something went wrong.';
        authorEl.textContent = '';
    }
}

// To get quote from API to my page with ---- New Quote Button ----
const newQuoteBtn = document.querySelector(".new-quote-btn");
getQuote(); // fetching a quote on page load
newQuoteBtn.addEventListener('click', getQuote);


// --------------- Copy Quote ---------------
let handleCopyClick = document.querySelector('#copy-quote');
handleCopyClick.addEventListener('click', () => {
    let text = quoteEl.textContent;
    let author = authorEl.textContent;
    navigator.clipboard.writeText(`${text}`);

    alert(`Quote : ${text} ${'\n'} by ${author} ${'\n'} copied to clipboard!`);
});


// --------------- Share quote to twitter ---------------
function shareOnTwitter() {
    const quote = quoteEl.textContent + '\n' + authorEl.textContent;
    const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(quote)}`;
    window.open(twitterUrl, '_blank');
}

const twitterBtn = document.getElementById('twitter-share-btn');
twitterBtn.addEventListener('click', shareOnTwitter);

// --------------- Listen quote ---------------
const speakBtn = document.getElementById("speakBtn");

// Add event listener to the "speak" button
speakBtn.addEventListener("click", () => {
    const quote = quoteEl.textContent;
    speakText(quote);
});

// Function to speak the text using the Web Speech API
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}