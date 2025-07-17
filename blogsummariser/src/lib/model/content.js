import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: String, 
    content: String,
    url: String,
},
    {
    collection: 'ScrapedData'
    }
);

export const Content = mongoose.models.ScrapedData || mongoose.model("ScrapedData", contentSchema); 