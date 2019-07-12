const express = require('express');

const expRouter = express.Router();
const { Expense } = require('../expense_feature/expense_model');

expRouter.get('/', (req, res) => {
	Expense.find()
		.then(expenses => {
			res.status(200).json({
				message: 'here are all the expenses',
				payload: expenses
			})
		})
		.catch(err=> {
			res.status(500).json({message: 'something happened'})
		})
})

expRouter.post('/', (req, res) => {
	const newExpense = new Expense();
	newExpense.amount = req.body.amount;
	newExpense.payeeName = req.body.payeeName;

	newExpense.save()
		.then(data => {
			res.status(200).json({ message: "here is the data", payload: data });
		})
		.catch(err => {
			res.status(500).json({ message: "server error", payload: err });
		});
})

expRouter.delete('/:id', (req, res) => {
  Expense.findOneAndDelete({"_id": req.params.id})
    .then(() => {
      res.status(204).json({ message: 'success' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
})

expRouter.put('/:id', (req, res) => {
  const updated = {};
  const updateableFields = ['amount', 'payeeName'];
  updateableFields.forEach(field => {
    if ((field in req.body) && ((req.body[field]) !== "")) {
      updated[field] = req.body[field];
    }
  });

  Expense.findOneAndUpdate({"_id": req.params.id}, updated, { new: true })
    .then(updatedExpense => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
})


module.exports = expRouter;