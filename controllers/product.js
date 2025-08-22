const asyncWrapper = require('../middleware/async');
const Product = require('../models/product');
const imageProcessor = require('../utils/imageProcessor')

//menu items

const getAllProducts = asyncWrapper(async (req, res) => {
    const { page } = req.query;
    const productsTotal = await Product.countDocuments();
    const pageInt = parseInt(page) || 1;
    const itemsPerPage = 10;
    const nbPages = parseInt(productsTotal / itemsPerPage)
    let pageNum;

    pageInt <= 1 ? pageNum = 0 : pageNum = pageInt - 1;

    const products = await Product.find().sort({createdAt : -1}).skip(pageInt * itemsPerPage).limit(itemsPerPage);

    res.status(200).json({success: true, products, nbHits : products.length, productsTotal, page: pageInt, nbPages})
})

const createMenuItem = asyncWrapper( async (req, res) => {

    const { title, tag, price, category } = req.body;

    const optimizedFilename = await imageProcessor(req.file.path,'menu_item')



    const newProduct = new Product({
        title,
        tag,
        price,
        category,
        image : optimizedFilename
    });

    await newProduct.save();
    console.log(newProduct)
    res.status(200).json({success : true, newProduct})
})

const findOneMenuItem = asyncWrapper(async (req, res) => {
    const {id} = req.params;
    console.log(id)

    const menuItem = await Product.findById(id)

    if(!menuItem) {
        return res.status(404).json({success : false , msg : 'item not found'})
    }

    res.status(200).json({success : true, menuItem})
})


const updateMenuItem = asyncWrapper(async (req, res) => {
    const {id} = req.params;
    const data = req.body;

    if (req.file) {
        const optimizedFilename = await imageProcessor(req.file.path, 'menu');
        data.image = optimizedFilename; // Add/replace image in data
    }



    const menuItem = await Product.findOneAndUpdate({
        _id : id
    },

    data,
    {
        new : true,
        runValidators : true
    });

    if(!menuItem) {
        return res.status(404).json({success : false, msg : 'item does not exist'})
    }

    res.status(200).json({success : true, menuItem})
})





module.exports = {
    getAllProducts,
    createMenuItem,
    updateMenuItem,
    findOneMenuItem
}