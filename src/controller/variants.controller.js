const Variants = require("../model/variants.model");
const { uploadfiles } = require("../utils/cloundary");


const listVariants = async (req, res) => {
    try {
        const variant = await Variants.find()
        console.log(variant);


        if (!variant || variant.length === 0) {
            res.status(404).json({
                success: false,
                message: "variant data not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "variant data fetched",
            data: variant,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getVariant= async (req, res) => {
    try {
        const variant = await Variants.findById(req.params.variant_id)
        if (!variant) {
            res.status(404).json({
                success: false,
                message: "Data not found." + error.message
            })
        }

        res.status(200).json({
            success: true,
            message: "Variant Data fetched",
            data: variant
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}
const addVariant = async (req, res) => {
    // console.log("hahhaa", req.body);
    // console.log(req.file);
    // try {
    //     console.log(req.body);
    //     const variant = await Variants.create(req.body);
    //     if (!variant) {
    //         res.status(400).json({
    //             success: true,
    //             message: "failed to added variant",
    //             data: variant,
    //         });
    //     }
    //     res.status(201).json({
    //         success: true,
    //         message: "variant added successfully",
    //         data: variant,
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "Internal server error: " + error.message,
    //     });
    // }

    try {
        console.log(req.body);
        console.log(req.file);

        const fileResult = await uploadfiles(req.file.path, "Variants");
        console.log(fileResult);

        const variant = await Variants.create({
            ...req.body,
            variant_img: {
                public_id: fileResult.public_id,
                url: fileResult.url
            }

        });
        console.log(variant);

        if (!variant) {
            res.status(400).json({
                success: false,
                message: "Variants not creted"
            })
        }

        res.status(201).json({
            success: true,
            message: "Variants careted sucessfully",
            data: variant
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }

}

const updateVariant = async (req, res) => {
    // try {
    //     const updatedVariant = await Variants.findByIdAndUpdate(
    //         req.params.variant_id,
    //         req.body,
    //         { new: true, runValidators: true }
    //     );
    //     if (!updatedVariant) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Bad request",
    //         });
    //     }
    //     res.status(200).json({
    //         success: true,
    //         message: "Variant updated successfully",
    //         data: updatedVariant,
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "Internal server error: " + error.message,
    //     });
    // }

    console.log("acbd", req.params.variant_id, req.body, req.file);

    if (req.file) {
        console.log("new image");

        const fileResult = await uploadfiles(req.file.path, "Variants");
        console.log(fileResult);

        const variant = await Variants.findByIdAndUpdate(req.params.variant_id,
            {
                ...req.body,
                variant_img: {
                    public_id: fileResult.public_id,
                    url: fileResult.url
                }
            },
            { new: true, runValidators: true });
        console.log(variant);

        if (!variant) {
            res.status(400).json({
                success: false,
                message: "variant not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "variant Update sucessfully",
            data: variant
        })


    } else {
        console.log("old image");

        const variant = await Variants.findByIdAndUpdate(req.params.variant_id, req.body, { new: true, runValidators: true });
        console.log(variant);

        if (!variant) {
            res.status(400).json({
                success: false,
                message: "variant not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "variant Update sucessfully",
            data: variant
        })

    }

};

const deleteVariant = async (req, res) => {
    try {
        const variant = await Variants.findByIdAndDelete(req.params.variant_id);

        if (!variant) {
            res.status(404).json({
                success: false,
                message: "variant not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "variant deleted successfully",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

module.exports={
    listVariants,
    getVariant,
    addVariant,
    updateVariant,
    deleteVariant
}