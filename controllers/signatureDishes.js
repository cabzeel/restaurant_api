const SignatureDish = require('../models/signatureDishes');
const imageProcessor = require('../utils/imageProcessor');
const asyncWrapper = require('../middleware/async');

//signature dishes

const getSignatureDishes = asyncWrapper(async (req, res) => {

    const  signatureDishes = await SignatureDish.find();

    res.status(200).json({success : true, signatureDishes, nbHits : signatureDishes.length})

})

const getSingleSignatureDish = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    const dish = await SignatureDish.findById(id);
    console.log(dish)

    res.status(200).json({
        success : true,
        dish
    })
})

const createSignatureDish = asyncWrapper(async (req, res) => {
    const {name, description, price, category, image} = req.body;
    const optimizedFilename = await imageProcessor(req.file.path, 'sign')
    
    const newSignatureDish = new SignatureDish({
        name, description, price, category, image : optimizedFilename
    })

    await newSignatureDish.save();
    res.status(200).json({success : true, newSignatureDish})

})

const updateSignatureDish = asyncWrapper(async (req, res) => {
    const {id} = req.params;
    const payload = req.body;

    if(req.file) {
        const optimizedFilename = await imageProcessor(req.file.path, 'sign');
        payload.image = optimizedFilename;
    }

    const dish = await SignatureDish.findOneAndUpdate({ _id : id}, payload, {
        new : true,
        runValidators : true
    });

    res.status(200).json({success : true, data : `${payload.name} updated succecssfully`})
})

const deleteSignatureDish = asyncWrapper(async (req, res) => {
    const { id } = req.params;


    const dish = await SignatureDish.findByIdAndDelete(id);

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
    createSignatureDish,
    getSignatureDishes,
    updateSignatureDish,
    getSingleSignatureDish,
    deleteSignatureDish
}