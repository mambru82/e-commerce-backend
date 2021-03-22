const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
  // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  User.findOne({
    where: {
      id: req.params.id
    },
    attributes: { 
      attributes: [
        'id',
        'category_name'
      ],
      include:[
        {
          model: Product,
          attributes: ['product_name']
        }
      ]
    }
    
  // be sure to include its associated Products
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
        res.status(404).json({ message: 'No post found with this id'});
        return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.categoryname
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData[0]) {
      res.status(404).json({ message: 'No user found with this id'});
      return;
    }
  res.json(dbCategoryData)})
  .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData[0]) {
      res.status(404).json({ message: 'No user found with this id'});
      return;
    }
  res.json(dbCategoryData)})
  .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router ;
