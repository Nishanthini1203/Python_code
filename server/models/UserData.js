import mongoose from 'mongoose';

const userDataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    analysisResults: {
        type: Object,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserData = mongoose.model('UserData', userDataSchema);

export default UserData;