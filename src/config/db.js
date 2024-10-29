const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('✅ BBDD Connected');
    } catch (error) {
        console.log('❌ BBDD Error');
    }
}

module.exports = { connectDB }