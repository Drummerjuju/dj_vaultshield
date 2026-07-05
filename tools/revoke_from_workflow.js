#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
function env(name, fallback = '') { return process.env[name] || fallback; }
function die(msg) { console.error('[DJ VaultShield License Host] ' + msg); process.exit(1); }
const productId = env('INPUT_PRODUCT_ID');
const serverHash = env('INPUT_SERVER_HASH');
const status = env('INPUT_STATUS', 'revoked');
const reason = env('INPUT_REASON', 'manual');
if (!productId || !serverHash) die('product_id und server_hash sind Pflicht.');
const licensesPath = path.resolve(__dirname, '../docs/licenses.json');
const db = JSON.parse(fs.readFileSync(licensesPath, 'utf8'));
const lic = (db.licenses || []).find(l => l.productId === productId && l.serverHash === serverHash);
if (!lic) die('Keine passende Lizenz gefunden.');
lic.status = status;
lic.revocationReason = status === 'active' ? null : reason;
lic.updatedAt = new Date().toISOString();
db.updatedAt = new Date().toISOString();
fs.writeFileSync(licensesPath, JSON.stringify(db, null, 2) + '\n', 'utf8');
console.log(`[DJ VaultShield License Host] Lizenz ${productId} / ${serverHash} -> ${status}`);
