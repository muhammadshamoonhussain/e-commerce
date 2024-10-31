const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // File system module to read and write files
const path = require('path'); // For path handling
const nodemailer = require('nodemailer');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to db.json file
const middlewares = jsonServer.defaults();


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
server.use(middlewares);
server.use(router);
// Helper function to read db.json
const PORT1 = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
const readDb = () => {
    const data = fs.readFileSync(path.join(__dirname, 'src/assets/db.json'), 'utf8');
    return JSON.parse(data);
}

// Helper function to write to db.json
const writeDb = (data) => {
    fs.writeFileSync(path.join(__dirname, 'src/assets/db.json'), JSON.stringify(data, null, 2));
}

// API endpoint to get all products
app.get('/products', (req, res) => {
    try {
        const products = readDb();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error reading products' });
    }
});

// API endpoint to get a specific product
app.get('/products/:id', (req, res) => {
    try {
        const products = readDb();
        const product = products.find(p => p.id === req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error reading product' });
    }
});

// API endpoint to add a new product
app.post('/products', (req, res) => {
    try {
        const products = readDb();
        const newProduct = { id: Date.now().toString(), ...req.body }; // Create a unique ID based on the current timestamp
        products.push(newProduct);
        writeDb(products);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error adding product' });
    }
});

// API endpoint for order submissions
app.post('/order', (req, res) => {
    const { name, email, address, orderDetails } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Change this to your mail service
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password' // Change to your email password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Order Placed Successfully',
        text: `Hi ${name},\nYour order has been placed successfully!\nOrder Details: ${orderDetails}\nShipping Address: ${address}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// API endpoint for contact form submissions
app.post('/contact', (req, res) => {
    const newContact = req.body; // Get the contact data from the request

    try {
        const jsonData = readDb();
        newContact.id = new Date().getTime().toString(); // Simple ID generation based on current timestamp
        jsonData.contact.push(newContact); // Assuming you have a contact array in db.json

        writeDb(jsonData);
        res.status(201).json({ message: 'Contact saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving contact' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





