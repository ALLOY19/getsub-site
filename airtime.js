
let currentBalance = 50000;
function toggleBalance() {
    const balance = document.querySelector('.balance');
    const hiddenBalance = document.querySelector('.star');
    const eyes = document.querySelector('.eyes');

    if (balance.classList.contains('show')) {
        balance.classList.remove('show');
        balance.classList.add('hidden');
        eyes.classList.remove('fa-eye');
        eyes.classList.add('fa-eye-slash');

        hiddenBalance.classList.remove('hidden');
    } else {
        hiddenBalance.classList.add('hidden');
        balance.classList.remove('hidden');
        balance.classList.add('show');
        eyes.classList.remove('fa-eye-slash');
        eyes.classList.add('fa-eye');
    }
}


const form = document.getElementById('purchaseForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const network = document.getElementById('network').value;
    const phone = document.getElementById('phone').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (!phone || isNaN(amount) || amount <= 0) {
        alert('Please enter valid phone number and amount!');
        return;
    }

    if (amount > currentBalance) {
        alert('Insufficient balance!');
        return;
    }

    currentBalance -= amount;
    document.querySelector('.balance').textContent = `₦${currentBalance.toFixed(2)}`;

    alert(`Purchase successful!\nType: ${type}\nNetwork: ${network}\nPhone: ${phone}\nAmount: ₦${amount.toFixed(2)}`);
});
