const express = require('express');

const revRouter = express.Router();
const { Revenue } = require('../revenue_feature/revenue_model');

revRouter.get('/chardonations', (req, res) => {

	Revenue.find({ type: 'CHARDONATION' })
		.then(chardonations => {
			res.status(200).json({
				message: 'here are all the charity donations',
				payload: chardonations
			})
		})
		.catch(err=> {
			res.status(500).json({message: 'something happened'})
		})
})

revRouter.get('/lodgedonations', (req, res) => {

	Revenue.find({ type: 'LODGEDONATION' })
		.then(lodgedonations => {
			res.status(200).json({
				message: 'here are all the Lodge donations',
				payload: lodgedonations
			})
		})
		.catch(err=> {
			res.status(500).json({message: 'something happened'})
		})
})

revRouter.get('/foodpayments', (req, res) => {

	Revenue.find({ type: 'FOODPAYMENT' })
		.then(foodpayments => {
			res.status(200).json({
				message: 'here are all the food payments',
				payload: foodpayments
			})
		})
		.catch(err=> {
			res.status(500).json({message: 'something happened'})
		})
})

revRouter.get('/merchpayments', (req, res) => {

	Revenue.find({ type: 'MERCHPAYMENT' })
		.then(merchpayments => {
			res.status(200).json({
				message: 'here are all the merchandise payments',
				payload: merchpayments
			})
		})
		.catch(err=> {
			res.status(500).json({message: 'something happened'})
		})
})
revRouter.get('/all', (req, res) => {

	Revenue.find()
		.then(revenues => {
			res.status(200).json({
				message: 'here are all the revenues',
				payload: revenues
			})
		})
		.catch(err=> {
			res.status(500).json({message: 'something happened'})
		})
})

revRouter.post('/', (req, res) => {
	const newRevenue = new Revenue();
	newRevenue.amount = req.body.amount;
	newRevenue.type = req.body.type;
	newRevenue.lastName = req.body.lastName;
	newRevenue.firstName = req.body.firstName;

	newRevenue.save()
		.then(data => {
			res.status(200).json({ message: "here is the data", payload: data });
		})
		.catch(err => {
			res.status(500).json({ message: "server error", payload: err });
		});
})

revRouter.delete('/:id', (req, res) => {
  Revenue.findOneAndDelete({"_id": req.params.id})
    .then(() => {
      console.log(req.params.id);
      res.status(204).json({ message: 'success' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
})

revRouter.put('/:id', (req, res) => {
  const updated = {};
  const updateableFields = ['amount', 'type', 'firstName', 'lastName'];
  updateableFields.forEach(field => {
    if ((field in req.body) && ((req.body[field]) !== "")) {
      updated[field] = req.body[field];
    }
  });

  Revenue.findOneAndUpdate({"_id": req.params.id}, updated, { new: true })
    .then(updatedRevenue => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
})


module.exports = revRouter;