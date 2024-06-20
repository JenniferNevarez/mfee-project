import express from 'express';

const router = express.Router();
const categories = []

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const currentCategory = categories.find(el => el.id === id)

    if (!currentCategory) return res.status(404).json({message: "Category not found"})

    res.status(200).json(currentCategory);
  })
  .patch((req, res) => {
    const { id } = req.params;
    const categoryIndex = categories.findIndex(el => el.id === id)
    if (categoryIndex < 0) return res.status(404).json({message: "Category not found"})

    const { name } = req.body;
    if (!name) return res.status(401).json({ message: "Name is required!" })

    categories[categoryIndex].name = name;

    res.status(203).json(categories[categoryIndex]);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const categoryIndex = categories.findIndex(el => el.id === id)
    if (categoryIndex < 0) return res.status(404).json({message: "Category not found"})

    const currentCategory = categories[categoryIndex]

    categories.splice(categoryIndex, 1)

    res.status(200).json({status: "Item Deleted", item: currentCategory});
  })


router.route('/')
  .get((req, res) => {
    res.status(200).json(categories);
  })
  .post((req, res) => {
    const { name } = req.body;

    if (!name) return res.status(401).json({ message: "Name is required!" })

    const newCategory = {
      id: Date.now().toString(),
      name
    }

    categories.push(newCategory)

    res.status(201).json(newCategory)
  })

export default router
