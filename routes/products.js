const express = require('express');
const router = express.Router();
//const authGuard = require('../auth/auth-guard');
const scraper = require('../scraper/scraper')

/**
 * @swagger
 * /products:
 *  post:
 *    description: get Product Data from top search results
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/', async (req, res, next) => {
    console.log(req)
    if(!req.body.terms) return res.status(400).send("no terms provided")
    let terms = req.body.terms.split(",")
    let data = await scraper.getData(terms)
    res.json(data)
});

router.get('/', (req, res, next) => {
    scraper.crawl("glynt+revital+regain+shot",res)
});


module.exports = router;