/* Shared, decorative rewards. Call GameCelebration.celebrate({ milestone: true }) for a finale. */
(() => {
  const assetBase = new URL('audio/', document.currentScript.src);
  const sound = new Audio();
  sound.preload = 'auto';
  sound.volume = .35;
  let effectsOn = true;
  try { effectsOn = localStorage.getItem('game-effects') !== 'off'; } catch {}
  function stopSound() {
    sound.pause();
    sound.currentTime = 0;
  }
  function playSound(milestone) {
    if (!effectsOn) return;
    sound.src = new URL(milestone ? 'complete.wav' : 'success.wav', assetBase).href;
    // A blocked or unavailable sound must never interrupt a child's answer.
    sound.play().catch(() => {});
  }
  function setupSoundToggle() {
    const button = document.querySelector('[data-game-effects]');
    if (!button) return;
    function paint() {
      button.textContent = effectsOn ? '♫ Effects on' : '♫ Effects off';
      button.setAttribute('aria-pressed', String(effectsOn));
    }
    paint();
    button.addEventListener('click', () => {
      effectsOn = !effectsOn;
      try { localStorage.setItem('game-effects', effectsOn ? 'on' : 'off'); } catch {}
      stopSound();
      paint();
      if (effectsOn) playSound(false);
    });
  }
  document.addEventListener('DOMContentLoaded', setupSoundToggle, { once: true });
  let layer, timer;
  function clear() {
    stopSound();
    clearTimeout(timer);
    if (layer) layer.remove();
    layer = null;
  }
  function celebrate({ milestone = false } = {}) {
    clear();
    playSound(milestone);
    layer = document.createElement('div');
    layer.className = 'game-celebration';
    layer.setAttribute('aria-hidden', 'true');
    const badge = document.createElement('div');
    badge.className = 'game-celebration-badge';
    badge.textContent = milestone ? '🌟 Hooray! 🌟' : '👏 You did it!';
    layer.append(badge);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const colors = ['#f7c936', '#e65c46', '#287fba', '#37895b', '#ef83ad'];
      for (let i = 0; i < (milestone ? 42 : 22); i++) {
        const piece = document.createElement('i');
        piece.className = 'game-celebration-confetti';
        piece.style.cssText = `left:${Math.random() * 100}%;background:${colors[i % colors.length]};--drift:${Math.random() * 160 - 80}px;--spin:${Math.random() * 720 - 360}deg;animation-delay:${Math.random() * .2}s`;
        layer.append(piece);
      }
      if (milestone) for (let i = 0; i < 6; i++) {
        const balloon = document.createElement('span');
        balloon.className = 'game-celebration-balloon';
        balloon.textContent = '🎈';
        balloon.style.cssText = `left:${5 + i * 17}%;animation-delay:${i * .08}s`;
        layer.append(balloon);
      }
    }
    document.body.append(layer);
    timer = setTimeout(clear, milestone ? 2600 : 1200);
  }
  window.GameCelebration = { celebrate, clear };
  window.addEventListener('pagehide', clear);
})();
