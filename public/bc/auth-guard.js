(function(){
  var V=[
    'ad21acb889da17fe038f780b19e02f0110bbcba66f3248f4912d9f6539919c8f',
    '8f69820dedb462b55879a0cf3c485b37f6e2c543f0304e264de948bd20ddcca8'
  ];
  var S='\x5f\x62\x63\x5f\x61';

  function p(h){return h[3]+h[11]+h[23]+h[37]+h[47]+h[55]+h[7]+h[19];}

  function c(){
    try{var v=localStorage.getItem(S);if(!v)return false;
    for(var i=0;i<V.length;i++)if(v===p(V[i]))return true;}catch(e){}
    return false;
  }

  async function k(s){
    var b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));
    return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0');}).join('');
  }

  if(c()){
    document.addEventListener('DOMContentLoaded',function(){document.body.classList.remove('bc-pending');});
    return;
  }

  document.addEventListener('DOMContentLoaded',function(){
    document.body.classList.remove('bc-pending');
    document.body.style.overflow='hidden';
    document.body.style.height='100vh';

    var g=document.createElement('div');
    g.id='_ag';
    g.style.cssText='position:fixed;inset:0;z-index:10000;background:rgba(5,8,13,.97);backdrop-filter:blur(20px);display:flex;align-items:center;justify-content:center;padding:24px;transition:opacity .5s;font-family:Manrope,system-ui,sans-serif;';

    g.innerHTML='<div id="_gc" style="width:100%;max-width:420px;background:#0C111A;border:1px solid rgba(255,255,255,.16);border-radius:22px;padding:38px 34px;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.6);position:relative;overflow:hidden">'+
      '<div style="position:absolute;inset:0;background:radial-gradient(80% 60% at 50% 0%,rgba(47,123,255,.16),transparent 70%);pointer-events:none"></div>'+
      '<div style="width:46px;height:46px;margin:0 auto 18px;border-radius:13px;background:#172234;border:1px solid rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;position:relative;z-index:1">'+
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5C9CFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></svg>'+
      '</div>'+
      '<div style="font-family:IBM Plex Mono,monospace;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:#5C9CFF;position:relative;z-index:1">Confidential Pre-Read</div>'+
      '<h3 style="font-family:Bricolage Grotesque,sans-serif;font-weight:700;font-size:1.4rem;color:#EAF0F8;margin:8px 0 6px;position:relative;z-index:1">Banco Continental</h3>'+
      '<p style="color:#98A6BC;font-size:.92rem;margin:0 0 22px;position:relative;z-index:1;line-height:1.5">This brief was prepared for a private session.<br>Enter the access phrase you were given.</p>'+
      '<div style="display:flex;flex-direction:column;gap:12px;position:relative;z-index:1">'+
        '<input id="_ai" type="password" placeholder="access phrase" autocomplete="off" spellcheck="false" style="width:100%;background:#070A10;border:1px solid rgba(255,255,255,.16);border-radius:12px;padding:14px 16px;color:#EAF0F8;font-family:IBM Plex Mono,monospace;font-size:.95rem;letter-spacing:.05em;text-align:center;outline:none;transition:border-color .2s;box-sizing:border-box">'+
        '<div id="_ae" style="color:#FF6B5C;font-family:IBM Plex Mono,monospace;font-size:.72rem;letter-spacing:.04em;min-height:16px"></div>'+
        '<button id="_ab" style="background:linear-gradient(135deg,#2F7BFF,#1450CC);color:#fff;border:none;border-radius:12px;padding:14px 22px;font-family:Bricolage Grotesque,sans-serif;font-weight:700;font-size:.98rem;cursor:pointer;transition:filter .2s,transform .15s;display:flex;justify-content:center">Enter</button>'+
      '</div>'+
    '</div>';

    document.body.appendChild(g);

    var inp=document.getElementById('_ai'),err=document.getElementById('_ae'),btn=document.getElementById('_ab');

    function unlock(){
      g.style.opacity='0';
      setTimeout(function(){g.remove();document.body.style.overflow='';document.body.style.height='';},500);
    }

    async function tryU(){
      var code=inp.value.trim();
      if(!code){err.textContent='Please enter the access phrase.';return;}
      var hv=await k(code.toLowerCase());
      for(var i=0;i<V.length;i++){
        if(hv===V[i]){
          try{localStorage.setItem(S,p(V[i]));}catch(e){}
          unlock();return;
        }
      }
      err.textContent='Not quite. Check the phrase you were given.';
      var card=document.getElementById('_gc');
      card.style.animation='none';card.offsetHeight;card.style.animation='bcShake .4s';
      inp.select();
    }

    btn.addEventListener('click',tryU);
    inp.addEventListener('keydown',function(e){if(e.key==='Enter')tryU();});
    inp.addEventListener('focus',function(){this.style.borderColor='#2F7BFF';});
    inp.addEventListener('blur',function(){this.style.borderColor='rgba(255,255,255,.16)';});
    setTimeout(function(){inp.focus();},400);

    var st=document.createElement('style');
    st.textContent='@keyframes bcShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}';
    document.head.appendChild(st);
  });
})();
