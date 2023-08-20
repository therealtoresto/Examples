const mongoose = require('mongoose');
const { Country, Product } = require('./schema.js');

// A function for get a list of products with data on producing countries
const getProductsAndCountries = async () => {
  try {
    const products = await Product.find().populate('producingCountry');
    return products;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function for deleting test data
const clearData = async () => {
  try {
    await Country.deleteMany({});
    await Product.deleteMany({});
    console.log('Test data cleared successfully.');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
}

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database.');
    seedData();
  })
  .catch(err => console.error('Connection error:', err));

// Function for fill collection test data
const seedData = async () => {
  try {
    // Creation producing countries
    const countries = await Country.create([
      { ua: 'Україна', en: 'Ukraine', code: 'UA' },
      { ua: 'США', en: 'USA', code: 'US' },
      { ua: 'Китай', en: 'China', code: 'CN' },
    ]);

    // Creation of products with refs to producing countries
    await Product.create([
      {
        productName: 'Vine',
        brand: 'Shabo',
        price: 49.49,
        producingCountry: countries[0]._id, // UA
      },
      {
        productName: 'Iphone',
        brand: 'Apple',
        price: 999.90,
        producingCountry: countries[1]._id, // US
      },
      {
        productName: 'Laptop',
        brand: 'Lenovo',
        price: 1899.00,
        producingCountry: countries[2]._id, // CN
      },
    ]);

    console.log('Test data seeded successfully.');

    // Log all data
    const productsWithCountries = await getProductsAndCountries();
    console.log('Products with Countries:');
    console.log(productsWithCountries);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Clear DB
    clearData()
      .then(() => mongoose.disconnect()) // Disconnection from db
      .catch(err => console.error(err));
  }
}
