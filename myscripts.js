const newQuoteButton = document.querySelector('#js-new-quote');
newQuoteButton.addEventListener('click', getQuote);
const endpoint = 'https://type.fit/api/quotes';
const spinner = document.querySelector('#js-spinner');
const twitterButton = document.querySelector('#js-twitter');


window.onload = function onLoad() {
    var line = new ProgressBar.Line('#progress', {
      color: '#FCB03C'
    });
  
    function progress() {
      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 1);  // Start of this year
      var end = new Date(now.getFullYear() + 1, 0, 1);  // End of this year
      var done = (now-start) / (end-start);
      var percentStr = (100.0 * done).toString();
      if (done < 0.1) {
        percentStr = percentStr.slice(0, 9);
      } else {
        percentStr = percentStr.slice(0, 10);
      }
      document.getElementById("percent").innerHTML = percentStr + "%";
      return done;
    }
  
    line.animate(progress());  // Number from 0.0 to 1.0
  
    requestAnimationFrame(update);
  
    function update() {
      line.set(progress());
      requestAnimationFrame(update);
    }
  };

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
