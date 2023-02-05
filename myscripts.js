const newQuoteButton = document.querySelector('#js-new-quote');
newQuoteButton.addEventListener('click', getQuote);
const endpoint = 'https://type.fit/api/quotes';
const spinner = document.querySelector('#js-spinner');
const twitterButton = document.querySelector('#js-twitter');

async function getQuote()
{
    spinner.classList.remove('hidden');
    // disable the quote button
    newQuoteButton.disabled = true;

    var random_Number = Math.floor(Math.random() * 1640);
    try 
    {
        const response = await fetch(endpoint);

        if(!response.ok) 
        {
            throw Error(response.statusText);
        }

        const json = await response.json();
        displayQuote(json[random_Number].text, json[random_Number].author);
        setTwitterButton(json[random_Number].text, json[random_Number].author);

    } catch (err) {
        console.log(err);
        alert('Failed to fetch new quote');
    } finally {
        newQuoteButton.disabled = false;
        spinner.classList.add('hidden');
    }
}

function displayQuote(quote, author) 
{
    const quoteText = document.querySelector('#js-quote-text');
    if(author)    quoteText.textContent = quote + ' - ' + author;
    else {
        quoteText.textContent = quote;
    }
}

function setTwitterButton(quote, author)
{
    twitterButton.setAttribute('href',`https://twitter.com/share?text=${quote} - ${author}`);
}
