/**
 * Auth Guard for static HTML pages under /clientes/bancolombia/qm/
 * Uses same access codes as the React app (accessCodes.js)
 * Include this script at the top of <body> in any HTML file to protect it.
 */
(function() {
  var CLIENT = 'bancolombia';
  var CLIENT_CODE = 'BCO-7k9m2Lx4Pq-2025';
  var MASTER_CODE = 'MDB-MASTER-2025';
  var STORAGE_KEY = 'access_' + CLIENT;
  var MASTER_KEY = 'access_mongodb_master';

  function hasAccess() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === CLIENT_CODE) return true;
      var master = localStorage.getItem(MASTER_KEY);
      if (master === MASTER_CODE) return true;
    } catch(e) {}
    return false;
  }

  function grantAccess(code) {
    if (code === MASTER_CODE) {
      localStorage.setItem(MASTER_KEY, code);
      return true;
    }
    if (code === CLIENT_CODE) {
      localStorage.setItem(STORAGE_KEY, code);
      return true;
    }
    return false;
  }

  if (hasAccess()) return;

  // Hide page content
  document.documentElement.style.overflow = 'hidden';
  var originalBody = document.body.innerHTML;
  document.body.innerHTML = '';
  document.body.style.cssText = 'margin:0;padding:0;background:#0B1215;overflow:hidden;';

  // Create modal
  var overlay = document.createElement('div');
  overlay.innerHTML = '\
    <div style="position:fixed;inset:0;z-index:99999;background:#0B1215;display:flex;align-items:center;justify-content:center;font-family:DM Sans,system-ui,sans-serif;">\
      <div style="background:#131F24;border:1px solid rgba(0,237,100,0.12);border-radius:16px;padding:3rem;width:90%;max-width:400px;text-align:center;position:relative;overflow:hidden;">\
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#00ED64,#00684A);"></div>\
        <div style="width:48px;height:48px;margin:0 auto 1.5rem;background:rgba(0,237,100,0.08);border-radius:12px;display:flex;align-items:center;justify-content:center;">\
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ED64" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>\
        </div>\
        <h2 style="color:#E8ECEE;font-size:1.3rem;font-weight:500;margin:0 0 0.4rem;">Contenido protegido</h2>\
        <p style="color:#6B7D85;font-size:0.82rem;margin:0 0 1.8rem;line-height:1.5;">Este documento es confidencial.<br>Ingresa tu código de acceso.</p>\
        <div style="position:relative;">\
          <input id="auth-code" type="password" placeholder="Código de acceso" autocomplete="off" \
            style="width:100%;padding:0.85rem 1rem;background:#0B1215;border:1px solid rgba(255,255,255,0.08);border-radius:8px;color:#E8ECEE;font-size:0.9rem;font-family:IBM Plex Mono,monospace;outline:none;box-sizing:border-box;transition:border-color 0.3s;" \
            onfocus="this.style.borderColor=\'rgba(0,237,100,0.3)\'" \
            onblur="this.style.borderColor=\'rgba(255,255,255,0.08)\'" />\
          <p id="auth-error" style="color:#FF6B6B;font-size:0.75rem;margin:0.6rem 0 0;display:none;">Código incorrecto. Intenta de nuevo.</p>\
        </div>\
        <button id="auth-submit" style="width:100%;margin-top:1.2rem;padding:0.85rem;background:linear-gradient(135deg,#00ED64,#00684A);border:none;border-radius:8px;color:#001E2B;font-size:0.85rem;font-weight:600;font-family:DM Sans,sans-serif;cursor:pointer;transition:opacity 0.2s,transform 0.1s;" \
          onmouseover="this.style.opacity=\'0.9\'" \
          onmouseout="this.style.opacity=\'1\'" \
          onmousedown="this.style.transform=\'scale(0.98)\'" \
          onmouseup="this.style.transform=\'scale(1)\'">Acceder</button>\
        <p style="color:#6B7D85;font-size:0.6rem;margin:1.5rem 0 0;letter-spacing:0.1em;text-transform:uppercase;">MongoDB × Bancolombia · Confidencial</p>\
      </div>\
    </div>';
  document.body.appendChild(overlay);

  var input = document.getElementById('auth-code');
  var error = document.getElementById('auth-error');
  var btn = document.getElementById('auth-submit');

  function tryAccess() {
    var code = input.value.trim();
    if (grantAccess(code)) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s';
      setTimeout(function() {
        document.body.removeChild(overlay);
        document.body.innerHTML = originalBody;
        document.body.style.cssText = '';
        document.documentElement.style.overflow = '';
        // Re-execute scripts
        var scripts = document.body.querySelectorAll('script');
        scripts.forEach(function(old) {
          var s = document.createElement('script');
          if (old.src) { s.src = old.src; } else { s.textContent = old.textContent; }
          old.parentNode.replaceChild(s, old);
        });
      }, 300);
    } else {
      error.style.display = 'block';
      input.style.borderColor = 'rgba(255,107,107,0.5)';
      input.style.animation = 'none';
      input.offsetHeight;
      input.style.animation = 'shake 0.4s ease';
      setTimeout(function() { input.style.borderColor = 'rgba(255,255,255,0.08)'; }, 1500);
    }
  }

  btn.addEventListener('click', tryAccess);
  input.addEventListener('keydown', function(e) { if (e.key === 'Enter') tryAccess(); });
  setTimeout(function() { input.focus(); }, 100);

  // Shake animation
  var style = document.createElement('style');
  style.textContent = '@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}';
  document.head.appendChild(style);
})();
