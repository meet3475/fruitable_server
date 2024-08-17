const pool = require("../db/mysql");


const getSalespeople = async () => {
    try {
        const [result, feild] = await pool.execute('SELECT * FROM salespeople')
        console.log(result);

        return result

    } catch (error) {
        console.log(error);
        throw new Error("error fetched salespeople");
    }
}

const addSalespeople = async (sname, city, comm, isActive) => {
    try {
        const [result] = await pool.execute('INSERT INTO salespeople (sname, city, comm, isActive) VALUES (?, ?, ?, ?)', [sname, city, comm, isActive])
        console.log(result);

        return ({ snum: result.insertId, sname, city, comm, isActive})
    } catch (error) {
        console.log(error);
        throw new Error("error add salespeople");
    }
}


const deleteSalespeople = async (snum) => {
    try {
        const [result] = await pool.execute('DELETE FROM salespeople WHERE snum = ?', [snum])
        console.log(result);

        return result

    } catch (error) {
        console.log(error);
        throw new Error("error delete salespeople");
    }
}

const updateSalespeople = async (snum, sname, city, comm, isActive) => {
    try {
        const [result] = await pool.execute('UPDATE salespeople SET sname=?, city= ?, comm=?, isActive = ?   WHERE snum = ?', [sname, city, comm, isActive, snum])
        console.log(result);

        return result

    } catch (error) {
        console.log(error);
        throw new Error("error update salespeople");
    }
}




module.exports = {
    getSalespeople,
    addSalespeople,
    deleteSalespeople,
    updateSalespeople
}