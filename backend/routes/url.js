const express = require("express")
const router = express.Router()
const UrlModel = require("../model/url")
const shortid = require("shortid")

router.post("/short", async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(200).json({ error: 'Original URL is required' });
        }

        const existingUrl = await UrlModel.findOne({ originalUrl });
        if (existingUrl) {
            return res.status(200).json({
                data: { url: `http://localhost:3000/url/${existingUrl.shortCode}` }
            })
        }

        const shortUrl = shortid.generate();
        const newUrl = new UrlModel({
            originalUrl: originalUrl,
            shortCode: shortUrl
        });

        await newUrl.save();

        return res.status(200).json({
            data: { url: `http://localhost:3000/url/${shortUrl}` }
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            data: { error: err }
        })
    }
})

router.get('/:shortUrl', async (req, res) => {
    try {
        const { shortUrl } = req.params;

        const url = await UrlModel.findOne({ shortCode: shortUrl });

        if (!url) {
            return res.status(200).json({ error: 'URL not found' });
        }
        const newurl = url.originalUrl;
        req.url = newurl
        // console.log(newurl);
        res.redirect(req.url);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            data: { error: err }
        })
    }
});

router.post("/getposts", async (req, res) => {
    try {
        const r = await UrlModel.find();

        return res.status(200).json({
            data: { result: r }
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            data: { error: err }
        })
    }
})

module.exports = router

