
const apiKey = 'AIzaSyBuj6D8eE6Xcr7mKoq2C22r85fkULKqbJg'; // API KEY



const translationResult = document.getElementById('translationResult');
const textSource = document.getElementById('textSource');
const textTarget = document.getElementById('textTarget');

// Loop through all elements and add the "textToTranslate" class
const allElements = document.body.getElementsByTagName('*');

// Loop through all elements and add the "textToTranslate" class to elements within <section>
for (let i = 0; i < allElements.length; i++) {
    if (allElements[i].classList.length == 0 && allElements[i].tagName !== 'UL') {
        allElements[i].classList.add('textToTranslate');
    }
}

// Get all elements with the "textToTranslate" class
const words = document.querySelectorAll(".textToTranslate");
words.forEach(word => {
    const originalWord = word.textContent;
    let isHovered = false;
    let translationInProgress = false;
    let restoreTimeout;

    word.addEventListener('mouseenter', () => {
        isHovered = true;
        const hoveredWord = word.textContent;
        console.log(`Hovered word: ${hoveredWord}`);
        const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

        if (!translationInProgress) {
            translationInProgress = true;
            if (!apiUrl) {
                return;
            }
            if (!response.JSON.statusCode === 200) {
                return;
            }
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: hoveredWord,
                    source: textSource.value,
                    target: textTarget.value
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.data && data.data.translations && data.data.translations.length > 0) {
                        const translation = data.data.translations[0].translatedText;
                        word.textContent = translation;
                    } else {
                        translationResult.textContent = 'Translation not available.';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    translationInProgress = false;
                });
        }
    });

    word.addEventListener('mouseleave', () => {
        isHovered = false;
        // Restore the original word after a short delay, regardless of hover state
        restoreTimeout = setTimeout(() => {
            word.textContent = originalWord;
        }, 1000); // Adjust the delay time as needed
    });

    // Clear the restoreTimeout if the word is re-hovered
    word.addEventListener('mouseenter', () => {
        if (restoreTimeout) {
            clearTimeout(restoreTimeout);
        }
    });
});



