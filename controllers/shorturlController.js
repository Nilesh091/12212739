const db01 = require('../models/store');
const { gsc, ivu, ivic } = require('../utils/helpers');
const mom = require('moment');

// POST /shorturls
async function csu01(req, res) {
  const { url, validity: vey = 30, shortcode: csc12 } = req.body;

  if (!url || !ivu(url)) {
    return res.status(400).json({ error: 'Invalid or missing URL.' });
  }

  let sc = csc12 || gsc();

  if (!ivic(sc)) {
    return res.status(400).json({ error: 'Invalid shortcode format.' });
  }

  if (db01.shortcodes[sc]) {
    return res.status(409).json({ error: 'Shortcode already exists.' });
  }

  const cat = mom();
  const exp12 = mom(cat).add(vey, 'minutes');

  db01.shortcodes[sc] = {
    originalUrl: url,
    expiry: exp12.toISOString(),
    createdAt: cat.toISOString(),
    clicks: [],
  };

  res.status(201).json({
    shortLink: `http://localhost:3000/${sc}`,
    expiry: exp12.toISOString(),
  });
}

// GET /:shortcode
async function redsu(req, res) {
  const { shortcode: sc } = req.params;
  if (!ivic(sc) || !db01.shortcodes[sc]) {
    return res.status(404).json({ error: 'Shortcode not found.' });
  }
  const ent = db01.shortcodes[sc];
  if (ent.expiry && mom().isAfter(ent.expiry)) {
    return res.status(410).json({ error: 'Shortcode expired.' });
  }
  // Track click
  ent.clicks.push({ timestamp: mom().toISOString(), ip: req.ip });
  res.redirect(ent.originalUrl);
}

// GET /shorturls/:shortcode
async function gsus02(req, res) {
  const { shortcode: sc } = req.params;
  if (!ivic(sc) || !db01.shortcodes[sc]) {
    return res.status(404).json({ error: 'Shortcode not found.' });
  }
  const ent = db01.shortcodes[sc];
  res.json({
    shortcode: sc,
    originalUrl: ent.originalUrl,
    createdAt: ent.createdAt,
    expiry: ent.expiry,
    clickCount: ent.clicks.length,
    clicks: ent.clicks,
  });
}

module.exports = {
  csu01,
  redsu,
  gsus02,
};
