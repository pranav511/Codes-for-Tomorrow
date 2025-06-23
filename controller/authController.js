const bcrypt = require('bcryptjs');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const JWT_SECRETE = "$uperMan1212";

exports.register = async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (email,password) VALUES (?,?)', [email, hashedPassword], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    message: 'User already exists'
                })
            }
            return res.status(500).json({
                error: err
            })
        }
        return res.status(201).json({
            message: "User register successfully"
        })
    })


}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    db.query('select * from users where email = ?', [email], async (err, result) => {
        if (err) return res.status(500).json({  
            message: "Error", err
        })
        if (result.length === 0) {
            return res.status(401).josn({
                message: "Invalid email"
            })
        }
        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRETE, {
            expiresIn: '1h'
        })
        res.json({ token });
    })
}