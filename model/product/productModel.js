const mongoose = require("mongoose");
const Product = mongoose.model('Product',{
    position: mongoose.Schema.Types.Number,
    title: mongoose.Schema.Types.String,
    link: mongoose.Schema.Types.String,
    snippet: mongoose.Schema.Types.String,
    displayed_link: mongoose.Schema.Types.String,
    thumbnail: mongoose.Schema.Types.String,
    rich_snippet: mongoose.Schema.Types.Mixed,
    cached_page_link: mongoose.Schema.Types.String,
    searchTerm: mongoose.Schema.Types.String,
    lookupDate: mongoose.Schema.Types.Number,
    websiteData: mongoose.Schema.Types.Array
});

/*
    position: 1,
    title: 'Glynt REVITAL Shot - Versandkostenfrei ab 40 - Salon ...',
    link: 'https://salon-grosskopf.de/produkt/revital-regain-shot',
    displayed_link: 'https://salon-grosskopf.de › Onlineshop',
    thumbnail: 'https://serpapi.com/searches/6234fa4cf26ac66489916636/images/2e3e72b768ecadaf00006614483f16b98cde9044dafc9c716c6aa713979b45d3.jpeg',
    snippet: 'Der Revital Shot ist ein hochkonzentrierter Pflegeschaum. Er verleiht Geschmeidigkeit und gesunden Glanz. Verbleibt im Haar.',
    rich_snippet: { top: [Object] },
    cached_page_link: 'https://webcache.googleusercontent.com/search?q=cache:x36-a5iyhBsJ:https://salon-grosskopf.de/produkt/revital-regain-shot+&cd=1&hl=de&ct=clnk&gl=de',
    searchTerm: 'glynt+revital+shot',
    lookupDate: 1647642603936,
    websiteData: [
      '{"@context":"https://schema.org/","@type":"Product","@id":"https://salon-grosskopf.de/produkt/revital-regain-shot#product","name":"REVITAL Shot","url":"https://salon-grosskopf.de/produkt/revital-regain-shot","description":"Hochkonzentrierter Pflegeschaum. Verleiht Geschmeidigkeit und gesunden Glanz. Verbleibt im Haar. Ideal zur Anwendung während des Haarschnittes.","image":"https://salon-grosskopf.de/wp-content/uploads/2020/04/GLYNT_12051_REVITAL-Shot_50ml_RGB_Web-scaled.jpeg","sku":538,"offers":[{"@type":"Offer","price":"9.90","priceValidUntil":"2023-12-31","priceSpecification":{"price":"9.90","priceCurrency":"EUR","valueAddedTaxIncluded":"true"},"priceCurrency":"EUR","availability":"http://schema.org/InStock","url":"https://salon-grosskopf.de/produkt/revital-regain-shot","seller":{"@type":"Organization","name":"Salon Großkopf","url":"https://salon-grosskopf.de"}}]}'
    ]
 */

module.exports = Product;