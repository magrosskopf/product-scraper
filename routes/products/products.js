const express = require('express');
const router = express.Router();
//const authGuard = require('../auth/auth-guard');
const scraper = require('../../scraper/scraper')

router.post('/', (req, res, next) => {    
    console.log(req);
    scraper.crawl()
    
}); 

router.get('/', (req, res, next) => {
    scraper.crawl("glynt+revital+regain+shot",res)
});


module.exports = router;