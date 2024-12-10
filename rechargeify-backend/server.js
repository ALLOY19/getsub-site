const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AfricasTalking = require('africastalking');

const app = express();
const PORT = 5000;

const africastalking = AfricasTalking({
    apiKey: 'your-api-key',
    username: 'your-username',
});

const airtime = africastalking.AIRTIME;

app.use(cors());
app.use(bodyParser.json());

let userBalance = 50000;

app.post('/purchase/airtime', async (req, res) => {
    const { phone, amount } = req.body;

    if (amount > userBalance) {
        return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    try {
        const response = await airtime.send({
            recipients: [
                {
                    phoneNumber: phone,
                    amount: `NGN ${amount}`,
                },
            ],
        });

        userBalance -= amount;

        res.status(200).json({
            success: true,
            message: 'Airtime purchase successful',
            balance: userBalance,
            response,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Airtime purchase failed',
            error: error.message,
        });
    }
});

app.get('/balance', (req, res) => {
    res.json({ balance: userBalance });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
