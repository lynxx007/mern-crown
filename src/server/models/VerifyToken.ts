import mongoose, { Document, Types } from "mongoose";

interface IVerifyToken extends Document {
    _userId: Types.ObjectId,
    token: string,
    createdAt: Date
}

const VerifyTokenSchema = new mongoose.Schema<IVerifyToken>({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 900
    }
})

const VerifyToken = mongoose.model<IVerifyToken>('VerifyToken', VerifyTokenSchema)
export default VerifyToken