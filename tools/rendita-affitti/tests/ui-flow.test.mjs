import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('il flusso mostra i quattro scenari prima del CTA del verdetto', () => {
  const scenari = html.indexOf('<div class="scen-grid">');
  const verdetto = html.indexOf('<div class="card verdict" id="verdict"></div>');
  assert.ok(scenari >= 0, 'griglia scenari non trovata');
  assert.ok(verdetto > scenari, 'il CTA del verdetto deve venire dopo i quattro scenari');
});

test('il verdetto chiede l’email solo nella fase teaser', () => {
  const compila = html.indexOf("if (fase === 'compila')");
  const teaser = html.indexOf("else if (fase === 'teaser')");
  const formEmail = html.indexOf('<form class="gate-form"');
  assert.ok(compila >= 0 && teaser > compila && formEmail > teaser);
});

test('il calcolatore consumi vive in un pop-up aperto dal riquadro in pagina', () => {
  const launcher = html.indexOf('id="apri-consumi"');
  const dialog = html.indexOf('<dialog id="dlg-consumi"');
  const chiudi = html.indexOf('id="chiudi-consumi"');
  assert.ok(launcher >= 0 && dialog > launcher && chiudi > dialog);
  assert.ok(html.includes("dlgConsumi.showModal()"), 'manca l’apertura del dialog');
  assert.ok(html.includes('href="../consumi-casa/"'), 'manca il link al calcolatorino condivisibile');
});

test('gli occupanti arrivano fino a 12, anche nella precompilazione', () => {
  assert.ok(html.includes('id="occup" value="2" min="1" max="12"'));
  assert.ok(html.includes('Math.min(12, Math.max(1, Math.round(mq / 35)))'));
});

test('il metodo cita CIN, attestazione di rispondenza e fonti normative', () => {
  assert.ok(html.includes('Codice Identificativo Nazionale'), 'manca il CIN');
  assert.ok(html.includes('attestazione di rispondenza</b>'), 'manca l’attestazione di rispondenza');
  assert.ok(html.includes('normattiva.it'), 'mancano i riferimenti normativi');
  assert.ok(!html.includes('risparmiati'), 'il KPI deve dire «imposte in meno», non «risparmiati»');
});

test('il calcolatorino standalone importa lo stesso motore', () => {
  const mini = readFileSync(new URL('../../consumi-casa/index.html', import.meta.url), 'utf8');
  assert.ok(mini.includes("from '../rendita-affitti/logic.mjs"));
  assert.ok(mini.includes('max="12"'));
  assert.ok(mini.includes('calcolaConsumiVoci'));
});
