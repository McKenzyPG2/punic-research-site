'use strict';
(() => {
 const $=id=>document.getElementById(id);
 const names={morphology:'Morphology',inscription:'Inscription zone',damage:'Damage',motif:'Motif'};
 const examples={AO23296:'Tanit-sign type; other labels withheld',AO23477:'Vessel or agricultural implement?',AO23410:'Geometry without a conventional label'};
 let data,object,selected;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 const link=(text,url)=>{const a=el('a',text);a.href=url;return a;};
 const enabled=()=>new Set([...$('layers').querySelectorAll('input:checked')].map(x=>x.value));
 const title=r=>r.layer==='motif'?`Motif ${r.id.slice(1)}`:names[r.layer]+(r.layer==='damage'?' '+r.id.slice(-1):'');
 function detail(r){
  const d=$('detail');d.replaceChildren();if(!r){d.append(el('p','Enable a layer and select a region to inspect its recorded observation.'));return;}
  d.append(el('p','Recorded model observation'),el('h3',r.layer==='motif'?(r.proposed_label||'Conventional label withheld'):title(r)));
  const q=el('p',r.observation??r.legibility);q.className='observation';d.append(q);
  const dl=el('dl');for(const [k,v] of [['Proposed conventional label',r.layer==='motif'?(r.proposed_label??'Withheld (recorded null)'):'Not requested for this layer'],['Qualitative confidence',r.confidence+' · uncalibrated'],['Expressed uncertainty',r.uncertainty],['Location',JSON.stringify(r.bbox)+' · normalized to full photograph']])dl.append(el('dt',k),el('dd',v));
  if(r.layer==='inscription')dl.append(el('dt','Model visible-row count'),el('dd',r.visible_lines===null?'Withheld':String(r.visible_lines)+' · not an editorial line count'));
  d.append(dl);const c=el('div');c.className='comparison';c.append(el('strong','Scholarly comparison · assistant-assisted'),el('p',r.comparison||'No region-specific comparison was recorded for this layer. See the attributed whole-object catalogue description below.'));d.append(c);
 }
 function renderRegions(){
  const layers=enabled(),rs=object.regions.filter(r=>layers.has(r.layer));if(!rs.some(r=>r.id===selected))selected=rs[0]?.id;
  $('regions').replaceChildren();$('overlays').replaceChildren();
  for(const r of rs){const active=r.id===selected;const choose=()=>{selected=r.id;renderRegions();$('regions').querySelector(`[data-region="${r.id}"]`).focus({preventScroll:true});};
   const b=el('button',title(r));b.type='button';b.dataset.region=r.id;b.setAttribute('aria-pressed',String(active));b.addEventListener('click',choose);$('regions').append(b);
   const box=el('button');box.type='button';box.className='region-box '+r.layer;box.dataset.region=r.id;box.tabIndex=-1;box.setAttribute('aria-label',title(r)+' on photograph; also selectable in region list');box.setAttribute('aria-pressed',String(active));const [l,t,rr,bb]=r.bbox;Object.assign(box.style,{left:l*100+'%',top:t*100+'%',width:(rr-l)*100+'%',height:(bb-t)*100+'%'});box.append(el('span',r.layer==='motif'?'M'+r.id.slice(1):r.layer==='damage'?'D'+r.id.slice(-1):names[r.layer]));box.addEventListener('click',choose);$('overlays').append(box);
  }detail(rs.find(r=>r.id===selected));
 }
 function chooseObject(o){object=o;selected=o.inventory==='AO23477'?'d3':o.inventory==='AO23296'?'d2':'d1';for(const b of $('objects').children)b.setAttribute('aria-pressed',String(b.dataset.inventory===o.inventory));
  $('inventory').textContent=o.object_id+' · '+o.date_label;
  $('photo').src='../'+o.photo.file;$('photo').alt='Unmodified photograph of Carthaginian stele '+o.inventory+'; Louvre. Overlay proposals are described in the adjacent region list.';
  $('credit').replaceChildren(el('span',o.inventory+' · Photograph: '+o.photo.author+' · '),link('CC0 1.0',o.photo.license_url),el('span',' · '),link('Commons source',o.photo.source_page));
  $('text-context').textContent=o.object_id+' — Editorial inscription context, not model OCR: '+o.text_annotation.observation;
  $('catalogue').replaceChildren(el('strong','Louvre 2024 catalogue · attributed paraphrase. '),el('span',o.catalogue_description_paraphrase+' '),link('Read the catalogue entry',o.catalogue_url));
  $('object-provenance').replaceChildren(el('p',o.concordance+' · '+o.date_label+'. '+o.date_basis+'.'),el('p',o.uncertainty),el('p',o.original_script_status),link('Louvre museum record',o.museum_url),el('span',' · '),link('Edition and line readings',o.catalogue_url),el('p','Photo SHA-256: '+o.photo.sha256));
  $('abstentions').replaceChildren(...o.abstentions.map(t=>el('li',t)));renderRegions();
 }
 $('layers').addEventListener('change',renderRegions);
 fetch('../snapshot/iconography.json').then(r=>{if(!r.ok)throw new Error('Snapshot unavailable');return r.json();}).then(d=>{data=d;
  for(const o of data.objects){const b=el('button',o.inventory);b.type='button';b.dataset.inventory=o.inventory;b.append(el('span',examples[o.inventory]));b.addEventListener('click',()=>chooseObject(o));$('objects').append(b);}
  for(const [k,v] of Object.entries(data.provenance))$('technical').append(el('p',k.replaceAll('_',' ')+': '+v));
  $('technical').append(...data.model_limitations.map(t=>el('p',t)));$('loading').hidden=true;$('experiment').hidden=false;chooseObject(data.objects[0]);
 }).catch(()=>{$('loading').textContent='The recorded snapshot could not be loaded. Serve this static site over local HTTP, or use the curated JSON download below.';});
})();
