const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 character"],
  },
  brand: {
      type: String,
      required: [true, "Must provide brand name"],
  },
  cpu_make: {
    type: String,
    required: [true, "Must provide cpu_make"],
    enum: ['Intel', 'AMD'],
  },
  cpu_model: {
    type: String,
    enum : ['i5' , 'i7', 'Ryzen 5', 'Ryzen 7']
  },
  storage_type: {
    type: String,
    required : [true, ""],
    enum: ['SSD', 'HDD'],
  },
  storage: {
    type: Number,
    required : [true, ""],
    enum: [256, 512, 1024, 2048],
  },
  ram: {
    type: Number,
    required: [true, ""],
    enum: [8, 16, 32],
  },
  price: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model("products", productSchema);
