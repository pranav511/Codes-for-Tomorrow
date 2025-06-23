const db = require('../config/db');

exports.createCategory = async (req, res) => {
    const { name } = req.body;

    db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            })

        }
        return res.status(201).json({
            message: "User categories successfully",
            id:result.insertId
        });
    })
}

exports.getCategories = async (req, res) => {
    const { name } = req.body;

    db.query('SELECT * FROM categories', (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        return res.status(200).json({
            results
        });
    })
}

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    db.query('UPDATE categories SET name = ? WHERE id = ?',[name,id], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        return res.json({
            message: "Categories Updated."
        });
    })
}
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM categories WHERE id = ?',[id], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        return res.json({
            message: `Category deleted ${[id]}`
        });
    })
}