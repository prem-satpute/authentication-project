import mongoose from "mongoose";
import config from "../config/config.js";
import dns from 'dns'

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])


async function ConnectDB() {
    await mongoose.connect(config.MONGO_URL);
    
}

export default ConnectDB;

