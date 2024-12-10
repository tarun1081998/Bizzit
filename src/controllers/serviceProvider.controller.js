const ServiceProvider = require('../models/serviceProvider.model');
const Chat = require('../models/chat.model');
const Review = require('../models/review.model');

exports.getServices = async (req, res) => {
  try {
    const { location, search } = req.query;
    const filter = search ? { name: new RegExp(search, 'i') } : {};
    if (location) filter['contactInfo.location'] = location;    

    const services = await ServiceProvider.find(filter);
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch services' });
  }
};

exports.addServiceProvider = async (req, res)=>{
  try{
    const {name, bio, contactInfo, socialLinks} = req.body
    const serviceProvider = new ServiceProvider({name, bio, contactInfo, socialLinks})
    await serviceProvider.save()
    res.json({ success: true, data: serviceProvider });
  }
  catch(error){
    res.status(500).json({ success: false, message: 'Failed to create service' });
    console.log(error)
  }
}

exports.getServiceProviderProfile = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id);
    if (!provider) return res.status(404).json({ success: false, message: 'Service provider not found' });

    res.json({ success: true, data: provider });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
};

// exports.followServiceProvider = async (req, res) => {
//   try {
//     const { action } = req.body;
//     const provider = await ServiceProvider.findById(req.params.id);
//     if (!provider) return res.status(404).json({ success: false, message: 'Service provider not found' });

//     if (action === 'follow') provider.followers += 1;
//     else if (action === 'unfollow') provider.followers -= 1;

//     await provider.save();
//     res.json({ success: true, message: `Successfully ${action}ed the service provider.`, data: provider });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to update follow status' });
//   }
// };

exports.startChat = async (req, res) => {
  try {
    const { userId, serviceProviderId } = req.body;
    const chat = new Chat({ userId, serviceProviderId });
    await chat.save();
    res.json({ success: true, message: 'Chat initiated successfully.', chatId: chat._id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to start chat' });
  }
};

// 5. Get Catalog
exports.getCatalog = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id);
    if (!provider) return res.status(404).json({ success: false, message: 'Service provider not found' });

    res.json({ success: true, data: provider.catalog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch catalog' });
  }
};

// 6. Get Reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ serviceProviderId: req.params.id });
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
};

// 7. Add Review
exports.addReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const newReview = new Review({ serviceProviderId: req.params.id, rating, review });
    await newReview.save();
    res.json({ success: true, message: 'Review added successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add review' });
  }
};

// 8. Get Contact Information
exports.getContactInfo = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id, 'contactInfo');
    if (!provider) return res.status(404).json({ success: false, message: 'Service provider not found' });

    res.json({ success: true, data: provider.contactInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contact info' });
  }
};

// 9. Get Social Links
exports.getSocialLinks = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id, 'socialLinks');
    if (!provider) return res.status(404).json({ success: false, message: 'Service provider not found' });

    res.json({ success: true, data: provider.socialLinks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch social links' });
  }
};
