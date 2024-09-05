const Carts = require("../model/carts.model");

const listcarts = async (req, res) => {
    try {
        const carts = await Carts.find();
        console.log(carts);


        if (!carts || carts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "carts data not found",
            });
        }

        res.status(200).json({
            resuccess: true,
            message: "carts data fetched",
            data: carts,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const addcart = async (req, res) => {
    try {
        const { user_id, items } = req.body;

        const sanitizedItems = items.map(item => ({
            product_id: item.product_id,
            qty: item.qty
        }));

        let cart = await Carts.findOne({ user_id });

        if (!cart) {
            cart = await Carts.create({
                user_id,
                items: sanitizedItems,
            });
        } else {
            sanitizedItems.forEach(item => {
                const productIndex = cart.items.findIndex(
                    (existingItem) => existingItem.product_id.toString() === item.product_id
                );

                if (productIndex > -1) {
                    cart.items[productIndex].qty += parseInt(item.qty, 10);
                } else {
                    cart.items.push(item);
                }
            });

            await cart.save(); 
        }

        res.status(201).json({
            success: true,
            message: "Cart updated successfully",
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
};

const updatecart = async (req, res) => {
    try {
        const carts = await Carts.findByIdAndUpdate(req.params.cart_id, req.body, { new: true, runValidators: true })
        console.log(carts);

        if (!carts) {
            return res.status(400).json({
                success: false,
                message: 'carts not found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'carts update successfully',
            data: carts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const getcartUser = async (req, res) => {
   
    try {
        const cart = await Carts.findOne({ user_id: req.params.user_id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Cart fetched successfully.',
            data: cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + error.message
        });
    }
}

const updatequantity = async (req, res) => {
    try {
        const carts = await Carts.findByIdAndUpdate(req.params.cart_id, req.body, { new: true, runValidators: true })
        console.log(carts);

        if (!carts) {
            return res.status(400).json({
                success: false,
                message: 'carts not found',
            })
        }
        res.status(200).json({
            success: true,
            message: 'carts update successfully',
            data: carts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal error' + error.message
        })
    }
}

const deleteCart = async (req, res) => {
    try {
        const { cart_id, product_id } = req.params;

       
        const cart = await Carts.findByIdAndUpdate(
            cart_id,
            { $pull: { items: { product_id: product_id } } },
            { new: true } 
        );

        if (!cart) {
            return res.status(404).json({ 
                message: 'Cart not found' 
            });
        }

        return res.status(200).json({ 
            message: 'Item removed from cart', 
            cart 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Server error' 
        });
    }
};

module.exports = {
    listcarts,
    addcart,
    updatecart,
    getcartUser,
    updatequantity,
    deleteCart
}