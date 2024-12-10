const express = require('express');
const router = express.Router();
const {
  getServices,
  getServiceProviderProfile,
  // followServiceProvider,
  startChat,
  getCatalog,
  getReviews,
  addReview,
  getContactInfo,
  getSocialLinks,
  addServiceProvider
} = require('../controllers/serviceProvider.controller');

router.get('/', getServices);

router.post('/add', addServiceProvider);

router.get('/:id', getServiceProviderProfile);

// router.post('/:id/follow', followServiceProvider);

router.post('/chats/start', startChat);

router.get('/:id/catalog', getCatalog);

router.get('/:id/reviews', getReviews);

router.post('/:id/review', addReview);

router.get('/:id/contact', getContactInfo);

router.get('/:id/social-links', getSocialLinks);

module.exports = router;
