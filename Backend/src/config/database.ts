require('dotenv').config();

const getConfig = () => {
    return {
        uri: process.env.MONGODB_URI,
        options: {
           
        }
    };
};

export default getConfig;