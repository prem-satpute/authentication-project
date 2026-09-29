import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGO_URL){
    throw new Error("MONGO_URL Variable not exists at .env ");
};

if (!process.env.EMIAL_USER){
    throw new Error("EMIAL_USER Variable not exists at .env ");
};


if (!process.env.EAMIL_PASS){
    throw new Error("EAMIL_PASS Variable not exists at .env ");
};

if (!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET Variable not exists at .env ");
};

if (!process.env.GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE_CLIENT_ID Variable not exists at .env ");
};

if (!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE_CLIENT_SECRET Variable not exists at .env ");
};

if (!process.env.CLIENT_URL){
    throw new Error("CLIENT_URL Variable not exists at .env ");
};


const config ={
    MONGO_URL:process.env.MONGO_URL,
    EMIAL_USER:process.env.EMIAL_USER,
    EAMIL_PASS:process.env.EAMIL_PASS,
    JWT_SECRET:process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    CLIENT_URL:process.env.CLIENT_URL,
    GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL || 'http://localhost:8080/auth/google/callback'
};

export default config;