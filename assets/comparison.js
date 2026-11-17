'use strict';
document.querySelector('#transliteration-toggle').addEventListener('change',event=>{
 document.body.classList.toggle('hide-transliteration',!event.target.checked);
});

document.querySelector('#presentation-toggle').addEventListener('change',event=>{
 document.body.classList.toggle('comparison-presentation',event.target.checked);
});
