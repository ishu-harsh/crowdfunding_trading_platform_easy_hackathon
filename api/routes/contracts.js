

// const express = require('express');
// const router = express.Router();



// // router.use((req, res, next) => {
// //     const authHeader = req.headers['authorization'];
// //     const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
// //     if (token == null) return res.sendStatus(401); // No token

// //     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
// //         if (err) return res.sendStatus(403); // Invalid token
// //         req.user = user;
// //         next();
// //     });
// // });

// router.get('/protected', (req, res) => {
//     res.send('Protected content. You are authorized.');
// });


// // Route to handle POST requests for buying equity
// router.post('/buyEquity', async (req, res) => {
//     const { projectId, investorId, amount } = req.body;
//     // Here you would interact with the smart contract
//     try {
//         // Placeholder for blockchain interaction
//         const transactionHash = await buyEquity(projectId, investorId, amount);
//         res.json({ success: true, transactionHash });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });


