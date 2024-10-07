// Výpočet celkové ceny
function calculateTotalPrice() {
    const price = parseFloat(document.getElementById('price').value) || 0;
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    let totalPrice = price * quantity;

    // Aktualizace zobrazené ceny
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

// Přidání event listenerů na změnu vstupních polí
document.getElementById('price').addEventListener('input', calculateTotalPrice);
document.getElementById('quantity').addEventListener('input', calculateTotalPrice);

// Přidání event listeneru na změnu měny
document.getElementById('currency').addEventListener('change', function() {
    calculateTotalPrice();  // Aktualizace ceny při změně měny
});
