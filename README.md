# Belonging in the Phoenician–Punic Mediterranean

A static academic research site: Lepcis Magna, Delos and Dougga. All research computations are precomputed. No tracking, authentication, remote fonts or model runtime.

Serve locally with `python3 -m http.server 8000 --bind 127.0.0.1` from this directory. External scholarly citations require internet. GitHub Pages configuration: main branch, repository root; `.nojekyll` is included.

This repository contains only reviewed public output. The private research backend, raw inference logs, source XML and meeting materials are excluded. The manifest records pinned source provenance, exact public scope and hashes; it is not a claim that private inputs can be rebuilt from this repository.

See `sources/index.html` for attribution, quotation basis, licence distinctions and inspection limits. No blanket licence over third-party source material is granted. The unchanged canonical Delos JSON retains archival private-document URLs as provenance, not publicly accessible links; the browser renders them as labelled plain-text citations.

## Iconographic analysis

`iconography/` displays a curated recorded inference on three Shonagon CC0 photographs. No model runs at runtime. Inventory IDs connect observations with attributed catalogue context; expert adjudication remains pending. `snapshot/iconography.json` contains selected public fields, not raw execution logs or complete catalogue transcriptions.

Serve the repository with `python3 -m http.server 8000` and open `http://localhost:8000/iconography/`. All viewer assets are local; source citations are outbound reading links. Preserve photo aspect ratios: coordinates are normalized to the full uncropped images. The manifest records every publication file other than itself.
