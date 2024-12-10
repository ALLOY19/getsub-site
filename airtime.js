
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

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const network = document.getElementById('network').value;
    const phone = document.getElementById('phone').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (!phone || isNaN(amount) || amount <= 0) {
        alert('Please enter valid phone number and amount!');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/purchase/airtime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, amount }),
        });

        const result = await response.json();

        if (result.success) {
            alert(`Purchase successful! Your new balance is ₦${result.balance}`);
            document.querySelector('.balance').textContent = `₦${result.balance.toFixed(2)}`;
        } else {
            alert(`Purchase failed: ${result.message}`);
        }
    } catch (error) {
        alert(`Error connecting to server: ${error.message}`);
    }
});



document.getElementById('purchaseForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const network = document.getElementById('network').value;
    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value;

    const response = await fetch('https://your-backend-url/purchase/airtime', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, network, phone, amount }),
    });

    const result = await response.json();
    if (result.success) {
        alert('Purchase successful!');
    } else {
        alert('Purchase failed: ' + result.message);
    }
});

async function fetchBalance() {
    try {
        const response = await fetch('http://localhost:5000/balance');
        const result = await response.json();
        document.querySelector('.balance').textContent = `₦${result.balance.toFixed(2)}`;
    } catch (error) {
        alert('Error fetching balance: ' + error.message);
    }
}

// Fetch balance on load
fetchBalance();
