import { model, Schema } from "mongoose";

export default model("Guild", new Schema({
    guildid: String,
    prefix: String,
    roles: {
        iron: String,
        bronze: String,
        silver: String,
        gold: String,
        plat: String,
        dia: String,
        master: String,
        gmaster: String,
        challenger: String
    }
}), "Guilds")