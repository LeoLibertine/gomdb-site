/* Banco Continental pre-read — shared section navigation (drawer menu) */
(function(){
  var S=[
    {href:'index.html',     page:'index',      n:'00', t:'Cover',                       s:'Start here'},
    {href:'01-heart.html',  page:'01-heart',   n:'01', t:"The heart that won't move",   s:'Cloud journey & the core'},
    {href:'02-outage.html', page:'02-outage',  n:'02', t:'The day it stopped',          s:'The outage, felt'},
    {href:'03-ambition.html',page:'03-ambition',n:'03', t:'What customers expect now',   s:'Neobanks & the AI shift'},
    {href:'04-stakes.html', page:'04-stakes',  n:'04', t:"What's really at stake",      s:'Pain points & objectives'},
    {href:'05-roles.html',  page:'05-roles',   n:'05', t:'Your seat at the table',      s:'Roles & the session'}
  ];
  function cur(){
    var p=(location.pathname.split('/').pop()||'index.html');
    if(p==='') p='index.html';
    return p.replace('.html','');
  }
  function build(){
    var meta=document.querySelector('.topnav-meta');
    if(!meta) return;
    // hamburger button (lives in the right zone of the top bar)
    var btn=document.createElement('button');
    btn.className='menu-btn';
    btn.setAttribute('aria-label','Open section menu');
    btn.innerHTML='<span class="bars"><i></i><i></i><i></i></span> Menu';
    meta.appendChild(btn);
    // drawer
    var here=cur();
    var list=S.map(function(x){
      var a=(x.page===here)?' class="active"':'';
      return '<a href="'+x.href+'"'+a+'><span class="nd-n">'+x.n+'</span>'+
             '<span class="nd-t">'+x.t+'<small>'+x.s+'</small></span></a>';
    }).join('');
    var d=document.createElement('div');
    d.className='navdrawer';
    d.innerHTML='<div class="navdrawer-overlay" data-close></div>'+
      '<aside class="navdrawer-panel" role="dialog" aria-label="Sections">'+
        '<div class="navdrawer-head"><span>Banco Continental — Sections</span>'+
        '<button class="navdrawer-x" data-close aria-label="Close menu">&#10005;</button></div>'+
        '<nav class="navdrawer-list">'+list+'</nav>'+
        '<div class="navdrawer-foot">Confidential pre-read · do not forward</div>'+
      '</aside>';
    document.body.appendChild(d);
    function open(){d.classList.add('open');document.body.classList.add('nav-open');}
    function close(){d.classList.remove('open');document.body.classList.remove('nav-open');}
    btn.addEventListener('click',open);
    d.addEventListener('click',function(e){if(e.target.hasAttribute('data-close'))close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }
  if(document.readyState!=='loading')build();
  else document.addEventListener('DOMContentLoaded',build);
})();
