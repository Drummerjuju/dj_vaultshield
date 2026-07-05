#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
function writeJson(p, data) {
  data.updatedAt = new Date().toISOString();
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
}
function die(msg) {
  console.error('[DJ VaultShield License Host] ' + msg);
  process.exit(1);
}

const entryFile = process.argv[2];
if (!entryFile) die('Nutzung: node tools/add_license_entry.js <license_entry.json>');

const licensesPath = path.resolve(__dirname, '../docs/licenses.json');
const db = readJson(licensesPath);
const entry = readJson(path.resolve(entryFile));

for (const key of ['id', 'productId', 'serverHash', 'status', 'encryptedKey']) {
  if (!entry[key]) die(`license_entry.json fehlt Feld: ${key}`);
}
if (!Array.isArray(db.licenses)) db.licenses = [];

const idx = db.licenses.findIndex(l => l.productId === entry.productId && l.serverHash === entry.serverHash);
if (idx >= 0) {
  db.licenses[idx] = { ...db.licenses[idx], ...entry, updatedAt: new Date().toISOString() };
  console.log(`[DJ VaultShield License Host] Lizenz aktualisiert: ${entry.productId} / ${entry.serverHash}`);
} else {
  db.licenses.push({ ...entry, createdAt: entry.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() });
  console.log(`[DJ VaultShield License Host] Lizenz hinzugefügt: ${entry.productId} / ${entry.serverHash}`);
}
writeJson(licensesPath, db);
