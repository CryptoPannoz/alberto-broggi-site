/* eventi.js — clic importanti contati come "eventi" in GoatCounter (30 set 2026).

   Stesso strumento delle visite: niente cookie, niente dati personali, solo contatori
   per nome. Un solo ascoltatore dei clic per tutto il sito (fase di cattura). Nel
   pannello GoatCounter gli eventi sono nella sezione "Events", con la forma
   "categoria: dettaglio" e come titolo la pagina da cui arriva il clic:

     prenota call: menu|hero|contatti|<pagina>   link a Google Calendar
     esperienza: <id>                            schede che aprono il pop-up (data-open)
     apri sezione: <id o classe>                 gruppi a scomparsa (<details>)
     lingua: it|en                               selettore IT / EN
     esce: <sito>                                link verso altri siti (titolo = indirizzo completo)
     email                                       link mailto
     fiscalninja: lead <profilo>                 modulo email di FiscalNinja (mai l'indirizzo)

   GoatCounter invia con sendBeacon: il conteggio arriva anche se il clic cambia pagina.
   Su localhost GoatCounter non conta nulla (è normale). Per contare altro da una pagina:
   window.bbConta("nome evento"). */
(function () {
  "use strict";
  var pagina = location.pathname.replace(/^\/+|\/+$/g, "").replace(/(^|\/)index\.html$/, "") || "home";
  var ultimo = {}, coda = [], attesa = null;

  function pronto() { return !!(window.goatcounter && typeof window.goatcounter.count === "function"); }
  function invia(d) { try { window.goatcounter.count(d); } catch (e) {} }

  function conta(nome, titolo) {
    var ora = Date.now();
    if (ultimo[nome] && ora - ultimo[nome] < 1500) return;   // doppio clic: un evento solo
    ultimo[nome] = ora;
    var d = { path: nome, title: titolo || pagina, event: true };
    if (pronto()) { invia(d); return; }
    // count.js (asincrono) non ancora arrivato: tengo l'evento finché carica, al massimo 15 s
    coda.push(d);
    if (attesa) return;
    var giri = 0;
    attesa = setInterval(function () {
      if (pronto()) { coda.splice(0).forEach(invia); }
      else if (++giri < 30) return;
      clearInterval(attesa); attesa = null; coda = [];
    }, 500);
  }
  window.bbConta = conta;

  document.addEventListener("click", function (ev) {
    var t = ev.target;
    if (!t || !t.closest) return;
    var el;

    if ((el = t.closest("[data-open]"))) return conta("esperienza: " + el.getAttribute("data-open"));
    if ((el = t.closest("details > summary"))) {
      var det = el.parentElement;
      var nomeSez = det.id || String(det.className || "").trim().split(/\s+/)[0] || el.textContent.replace(/\s+/g, " ").trim().slice(0, 40);
      if (!det.open && nomeSez) conta("apri sezione: " + nomeSez);
      // un summary può contenere link: si prosegue con i controlli sotto
    }

    if (!(el = t.closest("a[href]"))) return;
    var href = el.getAttribute("href") || "";
    if (el.closest(".lang-switch")) return conta("lingua: " + (el.getAttribute("lang") || href));
    if (/^mailto:/i.test(href)) return conta("email");
    if (/^https?:\/\//i.test(href) && el.hostname && el.hostname !== location.hostname) {
      var host = el.hostname.replace(/^www\./i, "");
      if (host === "calendar.app.google") {
        var dove = el.closest(".topbar") ? "menu" : el.closest(".hero") ? "hero" : el.closest("#contact") ? "contatti" : pagina;
        return conta("prenota call: " + dove);
      }
      return conta("esce: " + host, href.slice(0, 200));
    }
  }, true);

  document.addEventListener("submit", function (ev) {
    var f = ev.target;
    if (!f || f.id !== "gate-form") return;
    var email = document.getElementById("g-email"), ok = document.getElementById("g-ok"), prof = document.getElementById("g-prof");
    if (!email || !email.value.trim() || !email.validity.valid || (ok && !ok.checked)) return;   // modulo incompleto: non parte nulla
    conta("fiscalninja: lead " + (prof ? prof.value : "?"));
  }, true);
})();
