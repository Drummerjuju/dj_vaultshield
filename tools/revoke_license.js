#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function arg(name, fallback = '') {
  const i = process.argv.indexOf('--' + name);
  return i >= 0 ? (process.argv[i + 1] || fallback) : fallback;
}
function die(msg) {
  console.error('[DJ VaultShield License Host] ' + msg);
  process.exit(1);
}

const productId = arg('product');
const serverHash = arg('server-hash');
const status = arg('status', 'revoked');
const reason = arg('reason', 'manual');
if (!productId || !serverHash) die('Nutzung: node tools/revoke_license.js --product <id> --server-hash <hash> [--status revoked|active] [--reason text]');
if (!['active', 'revoked', 'suspended'].includes(status)) die('status muss active, revoked oder suspended sein');

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
