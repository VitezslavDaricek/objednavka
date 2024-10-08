// Spuštění kódu až po načtení celého dokumentu
document.addEventListener('DOMContentLoaded', function() {
    // Odeslání formuláře a zobrazení ceny
    const form = document.getElementById('objednavka');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const surname = document.getElementById('surname').value.trim();
            const email = document.getElementById('email').value.trim();
            const product = document.getElementById('product').value.trim();
            const price = parseFloat(document.getElementById("price").value);
            const quantity = parseInt(document.getElementById("quantity").value);

            // Získání vybrané měny
            const selectedCurrency = document.getElementById("currency").value;
    
            // Základní vstupní validace polí
            if (!name || !surname || !email || !product || isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
                alert("Prosím vyplňte všechna povinná pole a zadejte platné hodnoty pro cenu a množství.");
                return;  // Zastaví odeslání formuláře
            }

            const totalPrice = price * quantity;
            const totalPriceWithVAT = (totalPrice * 1.21).toFixed(2);   // Předpoklad 21% DPH

            let priceInSelectedCurrency = '';   // Přepočítaná cena

            // Přepočet pouze pro vybrané měny
            if (['AUD', 'BRL', 'BGN', 'CAD', 'CNY', 'CZK', 'DKK', 'EUR', 'HKD', 'HUF', 'ISK', 'XDR', 'INR', 'IDR', 'ILS', 'JPY', 'MYR', 'MXN', 'NZD', 'NOK', 'PHP', 'PLN', 'RON', 'SGD', 'ZAR', 'KRW', 'SEK', 'CHF', 'THB', 'TRY', 'GBP', 'USD'].includes(selectedCurrency)) {
                fetch('http://test.cz.web1.relaxhosting.cz/getCNBData.php')
                    .then(response => response.text())
                    .then(data => {
                        // Získání přepočítávacího kurzu podle zvolené měny
                        const exchangeRate = extractExchangeRate(data, selectedCurrency);
                        if (exchangeRate) {
                            priceInSelectedCurrency = (totalPriceWithVAT / exchangeRate).toFixed(2);
                        } else {
                            priceInSelectedCurrency = 'Nezjištěno';
                        } 
                        redirectToSummary(name, surname, email, product, totalPrice, totalPriceWithVAT, selectedCurrency, priceInSelectedCurrency, quantity);
                    })
                    .catch(error => console.error('Error fetching exchange rates:', error));
            } else {
                redirectToSummary(name, surname, email, product, totalPrice, totalPriceWithVAT, selectedCurrency, priceInSelectedCurrency, quantity);
            }
        });
    }
});

function redirectToSummary(name, surname, email, product, totalPrice, totalPriceWithVAT, selectedCurrency, priceInSelectedCurrency, quantity) {
    // Přesměrování na rekapitulaci s přepočtenou cenou
    const url = `rekapitulace.html?name=${encodeURIComponent(name)}&surname=${encodeURIComponent(surname)}&email=${encodeURIComponent(email)}&product=${encodeURIComponent(product)}&totalPrice=${encodeURIComponent(totalPrice)}&totalPriceWithVAT=${encodeURIComponent(totalPriceWithVAT)}&currency=${encodeURIComponent(selectedCurrency)}&priceInSelectedCurrency=${encodeURIComponent(priceInSelectedCurrency)}&quantity=${encodeURIComponent(quantity)}`;
    window.location.href = url;
}

function extractExchangeRate(data, currency) {
    const lines = data.split('\n');     // Rozdělí text na jednotlivé řádky
    for (let line of lines) {
        if (line.includes(currency)) {  // Najde řádek obsahující zadanou měnu
            const parts = line.split('|');  // Rozdělí řádek podle '|'
            return parseFloat(parts[4].replace(',', '.'));  // Získá kurz a převede na číslo
        }
    }
    return null;  // Pokud kurz nenalezen
}
