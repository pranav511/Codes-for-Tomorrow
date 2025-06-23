const db = require('../config/db');

exports.createService = async (req, res) => {
    const { categoryId } = req.params;
    const { service_name, type, price_option } = req.body;

    db.query('INSERT INTO services (category_id,service_name,type) VALUES (?,?,?)', [categoryId, service_name, type], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        const serviceId = result.insertId;

        const values = price_option.map((opt) => [
            serviceId,
            opt.duration,
            opt.price,
            opt.type
        ]);

        db.query('INSERT INTO service_price_options (service_id,duration,price,type) values ?', [values], (err2) => {
            (err2) => {
                return res.status(500).json({
                    error: err2
                })
            }
        })
        return res.status(201).json({
            message: "User service and price created successfully",
            id: result.insertId
        });
    })
}//

exports.getServices = async (req, res) => {
    const { categoryId } = req.params;
    const serviceQuesry = `
    SELECT S.*,P.id as price_Id,P.duration, P.price,P.type as price_type
    from services S 
    left join service_price_options
    P on S.id = P.service_id
    where S.category_id = ?`

    db.query(serviceQuesry, [categoryId], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        const services = {};

        results.forEach((row) => {
            if (!services[row.id]) {
                services[row.id] = {
                    id: row.id,
                    service_name: row.service_name,
                    type: row.type,
                    categoryId: row.categoryId,
                    price_options: []
                }
            }

            if (row.price_id) {
                services[row.id].price_options.push({
                    id: row.price_id,
                    duration: row.duration,
                    price: row.price,
                    type: row.price_type
                })
            }
        })

        return res.status(200).json(
            Object.values(services)
        );
    })
}


exports.deleteServices = async (req, res) => {
    const { servicesId } = req.params;

    db.query('DELETE FROM services WHERE id = ?', [servicesId], (err) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        return res.json({
            message: `Service deleted Successfully}`
        });
    })
}

exports.updateService = async (req, res) => {
    const { categoryId, serviceId } = req.params;
    const { service_name, type, price_options } = req.body;

    db.query('UPDATE services SET name = ?, type = ? WHERE id = ? AND category_id', [name, type, serviceId, categoryId], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        db.query('delete from service_price_options where service_id = ?', [serviceId], (err1) => {
            if (err1) {
                return res.status(500).json({
                    error: err
                })
            }
        })

        const values = price_options.map((opt) => {
            serviceId,
                opt.duration,
                opt.price,
                opt / type
        })
        db.query('insert into service_price_options(service_id,duration,price,type) values ?', [values], (err, res) => {
            return res.status(500).json({
                error: err
            })

        })
        return res.json({
            message: "Services and price options updated."
        });

    })
}