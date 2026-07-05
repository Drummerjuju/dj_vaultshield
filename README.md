# DJ VaultShield License Host für GitHub Pages

Dieses Repository ist dein kostenloser Lizenz-Host. Es veröffentlicht `docs/licenses.json` und die HTML-Verwaltung über GitHub Pages.

## Einrichtung

1. Neues GitHub-Repository anlegen, z. B. `dj_vaultshield-license-host`.
2. Inhalt dieses Ordners ins Repository kopieren.
3. GitHub Pages aktivieren: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / docs**.
4. Danach sind erreichbar:

```text
https://DEINNAME.github.io/dj_vaultshield-license-host/
https://DEINNAME.github.io/dj_vaultshield-license-host/admin.html
https://DEINNAME.github.io/dj_vaultshield-license-host/licenses.json
```

`licenses.json` trägst du später im Packer als `--portal-url` ein.

## HTML-Verwaltung

Öffne:

```text
https://DEINNAME.github.io/dj_vaultshield-license-host/admin.html
```

Passwort:

```text
Zidane11223&
```

Das Passwort steht nicht im Klartext in der HTML-Datei, sondern nur als PBKDF2-SHA256-Hash.

Die HTML-Verwaltung kann:

- Lizenzen laden
- `license_entry_*.json` importieren
- Lizenzen aktivieren
- Lizenzen deaktivieren
- Lizenzen löschen
- ZIPs/Assets nach `docs/uploads` hochladen
- optional per Status-URL live prüfen, ob eine Resource läuft

## GitHub Token für die HTML-Verwaltung

Die HTML-Seite läuft ohne Node und ohne Backend. Zum Speichern nutzt sie die GitHub REST API direkt aus deinem Browser.

Erstelle dafür einen Fine-grained GitHub Token:

```text
Repository access: nur dieses Repository
Permissions: Contents -> Read and write
```

Den Token gibst du nur in deinem Browser in `admin.html` ein. Er steht nicht im Code und wird nicht an Kunden ausgeliefert.

## Lizenz hinzufügen

Empfohlen: In `admin.html` die erzeugte `license_entry_*.json` importieren.

Alternativ lokal:

```bash
node tools/add_license_entry.js ../license_entry_dj_vaultshield_demo_product_<hash>.json
git add docs/licenses.json && git commit -m "Add license" && git push
```

## Lizenz deaktivieren / wieder aktivieren

In `admin.html`:

```text
Deaktivieren = status revoked
Aktivieren = status active
Löschen = Eintrag wird komplett entfernt
```

Die FiveM-Resource prüft die Lizenz beim Start und danach regelmäßig. Wenn die Lizenz deaktiviert oder gelöscht ist, schreibt die Resource bei jedem Startversuch eine deutliche Meldung in die Serverkonsole und stoppt sich selbst.

## Live-Check

Der Loader stellt optional einen Status-Endpunkt bereit:

```text
http://SERVER_IP:30120/RESOURCE_NAME/dj_vaultshield/status
```

Diese URL kannst du in `admin.html` bei einer Lizenz als `Status-URL` speichern. Danach kann die HTML-Seite live prüfen, ob die Resource erreichbar ist.

Falls der Server nicht öffentlich erreichbar ist oder die Firewall den Zugriff blockiert, bleibt der Live-Check offline. Die Lizenzprüfung selbst funktioniert trotzdem.

## Uploads

Uploads landen in:

```text
docs/uploads
```

Wichtig: Lade hier am besten nur bereits geschützte/verpackte Ressourcen hoch, nicht deinen ungeschützten Quellcode.
