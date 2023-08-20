const mongoose = require('mongoose');
const { Schema } = mongoose;

const countrySchema = new Schema({
  ua: {
    type: String,
    required: [true, "Country in Ukraine is required"]
  },
  en: {
    type: String,
    required: [true, "Country in English is required"]
  },
  code: {
    type: String,
    required: [true, "Code of country is required"],
    unique: true
  }
});

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"]
  },
  brand: {
    type: String,
    required: [true, "Brand is required"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"]
  },
  producingCountry: {
    type: Schema.Types.ObjectId,
    ref: 'Country' // Reference to "Country"
  }
});

const Country = mongoose.model('Country', countrySchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Country, Product };