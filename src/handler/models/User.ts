import { model, Schema } from "mongoose";

export default model("User", new Schema({
    discord_id: String,
    account_id: String
}), "Users")