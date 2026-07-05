# DJ VaultShield License Host für GitHub Pages

Dieses Repository ist dein kostenloser Lizenz-Host. Es veröffentlicht nur eine statische `docs/licenses.json` über GitHub Pages.

## Einrichtung

1. Neues GitHub-Repository anlegen, z. B. `dj_vaultshield-license-host`.
2. Inhalt dieses Ordners ins Repository kopieren.
3. GitHub Pages aktivieren: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / docs**.
4. Die öffentliche URL sieht ungefähr so aus:
   `https://DEINNAME.github.io/dj_vaultshield-license-host/licenses.json`
5. Diese URL trägst du später in `dj_vaultshield_auth.json` der geschützten Resource ein.

## Lizenz hinzufügen

Variante A lokal:

```bash
node tools/add_license_entry.js ../license_entry_dj_vaultshield_demo_product_<hash>.json
git add docs/licenses.json && git commit -m "Add license" && git push
```

Variante B über GitHub:

- Tab **Actions** öffnen.
- Workflow **DJ VaultShield - Lizenz hinzufügen/aktualisieren** starten.
- Werte aus der generierten `license_entry_*.json` eintragen.

## Lizenz sperren / wieder aktivieren

Über Actions den Workflow **DJ VaultShield - Lizenz sperren/aktivieren** starten.

- `status=revoked` = Lizenz gesperrt.
- `status=active` = Lizenz wieder aktiv.
- `status=suspended` = vorläufig gesperrt.

Die FiveM-Resource prüft die Lizenz beim Start und danach regelmäßig. Nach dem Sperren kann es je nach Cache/Intervall ein paar Minuten dauern.

## Uploads über Admin-Panel

Das lokale Admin-Panel kann fertige ZIPs oder Dateien nach `docs/uploads` schreiben. Diese Dateien werden dann über GitHub Pages öffentlich abrufbar.

Die Übersicht liegt in:

```text
docs/uploads/index.json
```

Wichtig: Lade hier am besten nur bereits geschützte/verpackte Ressourcen hoch, nicht deinen ungeschützten Quellcode.
