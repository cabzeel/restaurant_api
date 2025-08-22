const imageProcessor = require('../utils/imageProcessor');
const asyncWrapper = require('../middleware/async');
const SpecialDish = require('../models/todaysSpecial');

//special dishes

const getSpecialDishes = asyncWrapper(async (req, res) => {

    const  SpecialDishes = await SpecialDish.find();

    res.status(200).json({success : true, SpecialDishes, nbHits : SpecialDishes.length})

})

const getSingleSpecialDish = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    const dish = await SpecialDish.findById(id);
    console.log(dish)

    res.status(200).json({
        success : true,
        dish
    })
})

const createSpecialDish = asyncWrapper(async (req, res) => {
    const {name, description, price, category, image} = req.body;
    const optimizedFilename = await imageProcessor(req.file.path, 'special')
    
    const newSpecialDish = new SpecialDish({
        name, description, price, category, image : optimizedFilename
    })

    await newSpecialDish.save();
    res.status(200).json({success : true, newSpecialDish})

})

const updateSpecialDish = asyncWrapper(async (req, res) => {
    const {id} = req.params;
    const payload = req.body;

    if(req.file) {
        const optimizedFilename = await imageProcessor(req.file.path, 'special');
        payload.image = optimizedFilename;
    }

    const dish = await SpecialDish.findOneAndUpdate({ _id : id}, payload, {
        new : true,
        runValidators : true
    });

    res.status(200).json({success : true, data : `${payload.name} updated successfully`})
})

const deleteSpecialDish = asyncWrapper(async (req, res) => {
    const { id } = req.params;


    const dish = await SpecialDish.findByIdAndDelete(id);

    if(!dish) {
       return  res.status(404).json({
            success : false,
            msg : 'failed to delete item, probably does not exist'
        })
    }

    res.status(200).json({
        success : true,
        msg : 'item deleted succesfully'
    })
})

module.exports = {
    createSpecialDish,
    getSpecialDishes,
    updateSpecialDish,
    getSingleSpecialDish,
    deleteSpecialDish
}