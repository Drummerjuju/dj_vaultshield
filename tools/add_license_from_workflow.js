#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function env(name, fallback = '') { return process.env[name] || fallback; }
function die(msg) { console.error('[DJ VaultShield License Host] ' + msg); process.exit(1); }
const productId = env('INPUT_PRODUCT_ID');
const serverHash = env('INPUT_SERVER_HASH');
const encryptedKey = env('INPUT_ENCRYPTED_KEY');
const serverName = env('INPUT_SERVER_NAME', 'Unbenannter Server');
const expiresAt = env('INPUT_EXPIRES_AT', '');
if (!productId || !serverHash || !encryptedKey) die('product_id, server_hash und encrypted_key sind Pflicht.');
const licensesPath = path.resolve(__dirname, '../docs/licenses.json');
const db = JSON.parse(fs.readFileSync(licensesPath, 'utf8'));
if (!Array.isArray(db.licenses)) db.licenses = [];
const entry = {
  id: 'lic_' + crypto.randomBytes(8).toString('hex'),
  productId,
  serverHash,
  serverName,
  status: 'active',
  expiresAt: expiresAt || null,
  encryptedKey,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
const idx = db.licenses.findIndex(l => l.productId === productId && l.serverHash === serverHash);
if (idx >= 0) db.licenses[idx] = { ...db.licenses[idx], ...entry, id: db.licenses[idx].id || entry.id };
else db.licenses.push(entry);
db.updatedAt = new Date().toISOString();
fs.writeFileSync(licensesPath, JSON.stringify(db, null, 2) + '\n', 'utf8');
console.log(`[DJ VaultShield License Host] Lizenz gespeichert: ${productId} / ${serverHash}`);
