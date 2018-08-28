// array of possible search engines
const engines = [
    {
        cmd: '',
        action: 'https://google.com/search?q=',
    },
    {
        cmd: '/d',
        action: 'https://duckduckgo.com/?q=',
    },
    {
        cmd: '/y',
        action: 'https://www.youtube.com/results?search_query='
    },
    {
        cmd: '/w',
        action: 'http://en.wikipedia.org/wiki/Special:Search/'
    }
];

const form = document.getElementById('search-form');
const search = document.getElementById('search-input');
search.addEventListener('keyup', handleInput);

function handleInput(e) {
    // if enter, starts the search with the correct engine
    // otherwise detects the engine
    if (e.keyCode == 13 && search.value.length >= 3) {
        let query = '';
        if (search.value.startsWith('/')) {
            query = search.value.substring(3, search.value.length);
        } else {
            query = search.value;
        }
        window.location.href = form.getAttribute('action') + query;
    } else {
        detectEngine();
    }
}

// sets the form action based on the first 2 characters
// of the input value
function detectEngine() {
    let engine = engines[0];

    if (search.value.length >= 2) {
        let inCmd = search.value.substring(0, 2);
        let tempEngine = engines.find(x => x.cmd === inCmd);
        if (tempEngine) {
            engine = tempEngine;
        }
    }

    form.setAttribute('action', engine.action);
}
