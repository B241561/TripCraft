const mongoose = require('mongoose');
const { probeMongoNetwork, summarizeMongoError } = require('./mongoDiagnostics');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  try {
    await probeMongoNetwork(mongoUri);

    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection diagnostics:', JSON.stringify(summarizeMongoError(error)));
    process.exit(1);
  }
};

module.exports = connectDB;
