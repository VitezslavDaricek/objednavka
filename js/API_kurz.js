// Zde můžeme zavolat API pro získání kurzu
if (currency === 'AUD' || currency === 'BRL' || currency === 'BGN' || currency === 'CAD' || currency === 'CNY' || currency === 'CZK' || currency === 'DKK' || currency === 'EUR' || currency === 'HKD' || currency === 'HUF' || currency === 'ISK' || currency === 'XDR' || currency === 'INR' || currency === 'IDR' || currency === 'ILS' || currency === 'JPY' || currency === 'MYR' || currency === 'MXN' || currency === 'NZD' || currency === 'NOK' || currency === 'PHP' || currency === 'PLN' || currency === 'RON' || currency === 'SGD' || currency === 'ZAR' || currency === 'KRW' || currency === 'SEK' || currency === 'CHF' || currency === 'THB' || currency === 'TRY' || currency === 'GBP' || currency === 'USD') {
    fetch('http://test.cz.web1.relaxhosting.cz/getCNBData.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status})`);
            }
            return response.text();
        })
        .then(data => {
            console.log('Data from CNB:', data); // Zkontrolujte, co vrací API

            // Získání přepočítávacího kurzu podle zvolené měny
            let exchangeRate;
            if (currency === 'AUD') {
                exchangeRate = extractExchangeRate(data, 'AUD');
            } else if (currency === 'BRL') {
                exchangeRate = extractExchangeRate(data, 'BRL');
            } else if (currency === 'BGN') {
                exchangeRate = extractExchangeRate(data, 'BGN');
            } else if (currency === 'CAD') {
                exchangeRate = extractExchangeRate(data, 'CAD');
            } else if (currency === 'CNY') {
                exchangeRate = extractExchangeRate(data, 'CNY');
            } else if (currency === 'CZK') {
                exchangeRate = extractExchangeRate(data, 'CZK');
            } else if (currency === 'DKK') {
                exchangeRate = extractExchangeRate(data, 'DKK');
            } else if (currency === 'EUR') {
                exchangeRate = extractExchangeRate(data, 'EUR');
            } else if (currency === 'HKD') {
                exchangeRate = extractExchangeRate(data, 'HKD');
            } else if (currency === 'HUF') {
                exchangeRate = extractExchangeRate(data, 'HUF');
            } else if (currency === 'ISK') {
                exchangeRate = extractExchangeRate(data, 'ISK');
            } else if (currency === 'XDR') {
                exchangeRate = extractExchangeRate(data, 'XDR');
            } else if (currency === 'INR') {
                exchangeRate = extractExchangeRate(data, 'INR');
            } else if (currency === 'IDR') {
                exchangeRate = extractExchangeRate(data, 'IDR');
            } else if (currency === 'ILS') {
                exchangeRate = extractExchangeRate(data, 'ILS');
            } else if (currency === 'JPY') {
                exchangeRate = extractExchangeRate(data, 'JPY');
            } else if (currency === 'MYR') {
                exchangeRate = extractExchangeRate(data, 'MYR');
            } else if (currency === 'MXN') {
                exchangeRate = extractExchangeRate(data, 'MXN');
            } else if (currency === 'NZD') {
                exchangeRate = extractExchangeRate(data, 'NZD');
            } else if (currency === 'NOK') {
                exchangeRate = extractExchangeRate(data, 'NOK');
            } else if (currency === 'PHP') {
                exchangeRate = extractExchangeRate(data, 'PHP');
            } else if (currency === 'PLN') {
                exchangeRate = extractExchangeRate(data, 'PLN');
            } else if (currency === 'RON') {
                exchangeRate = extractExchangeRate(data, 'RON');
            } else if (currency === 'SGD') {
                exchangeRate = extractExchangeRate(data, 'SGD');
            } else if (currency === 'ZAR') {
                exchangeRate = extractExchangeRate(data, 'ZAR');
            } else if (currency === 'KRW') {
                exchangeRate = extractExchangeRate(data, 'KRW');
            } else if (currency === 'SEK') {
                exchangeRate = extractExchangeRate(data, 'SEK');
            } else if (currency === 'CHF') {
                exchangeRate = extractExchangeRate(data, 'CHF');
            } else if (currency === 'THB') {
                exchangeRate = extractExchangeRate(data, 'THB');
            } else if (currency === 'TRY') {
                exchangeRate = extractExchangeRate(data, 'TRY');
            } else if (currency === 'GBP') {
                exchangeRate = extractExchangeRate(data, 'GBP');
            } else if (currency === 'USD') {
                exchangeRate = extractExchangeRate(data, 'USD');
            } 
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
        });
}

function extractExchangeRate(data, currency) {
    const lines = data.split('\n');     
    for (let line of lines) {
        if (line.includes(currency)) {  
            const parts = line.split('|');
            if (parts.length >= 5) {    // Zajistíme, že máme dostatek částí po rozdělení
                return parseFloat(parts[4].replace(',', '.'));  // Získá kurz a převede na číslo 
            }  
        }
    }
    return null;  // Pokud kurz nenalezen
}
