import mongoose from "mongoose";
import { logger } from "../logger";
import getConfig from "../../config/database";

const mongoDbConfig = getConfig();

const connect = async () => {
    try {
        if (!mongoDbConfig.uri) {
            throw new Error("MongoDB URI is not defined");
        }

        await mongoose.connect(mongoDbConfig.uri, mongoDbConfig.options);
        logger.info('MongoDB has been connected');
    } catch (err) {
        logger.error(err, 'Error connecting MongoDB');
    }
};

export default connect;
