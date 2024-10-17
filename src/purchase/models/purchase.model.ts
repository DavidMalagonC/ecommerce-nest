import * as dynamoose from 'dynamoose';

const productSchema = new dynamoose.Schema({
  id: String,
  name: String,
  price: Number,
});

const purchaseSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  direction: String,
  idUser: String,
  observations: {
    type: String,
    default: 'Ninguna',
  },
  payment: String,
  products: {
    type: Array,
    schema: [productSchema],
  },
  status: {
    type: String,
    default: 'NEW',
  },
  total: Number,
  validatePayment: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const PurchaseModel = dynamoose.model('Purchase', purchaseSchema);