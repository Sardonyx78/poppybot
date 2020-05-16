const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://main:U3WnfAL95dlmD0nm@cluster0-yo19c.gcp.mongodb.net/Database", { useNewUrlParser: true, useUnifiedTopology: true })

import GuildModel from "./models/Guild";

import UserModel from "./models/User";


export default {
    GuildModel,
    UserModel
}