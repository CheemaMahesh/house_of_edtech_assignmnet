import mongoose from 'mongoose';

let isConnected = false;
export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if(isConnected) {
    return;
  }
  try {
    console.log(String(process.env.NEXT_PUBLIC_MONGOOSE_HOST))
    await mongoose.connect(String(process.env.NEXT_PUBLIC_MONGOOSE_HOST))
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
}