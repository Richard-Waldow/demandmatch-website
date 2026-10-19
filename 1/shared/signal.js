/* Signal-only motion. Each explanatory sequence runs once, with optional replay. */
(() => {
  'use strict';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const scene = document.querySelector('[data-signal-scene]');
  const flow = document.querySelector('[data-flow]');
  if (!scene || !flow) return;
  const statuses = flow.dataset.statuses.split('|');
  const sceneStatus = scene.querySelector('[data-scene-status]');
  const stepButtons = [...flow.querySelectorAll('[data-step-button]')];
  const play = flow.querySelector('[data-flow-play]');
  const controllers = [];

  function sequence(render) {
    let timers = [];
    const cancel = () => { timers.forEach(clearTimeout); timers = []; };
    const finish = () => { cancel(); render(2, true); };
    const run = immediate => {
      cancel();
      if (immediate || motion.matches || document.hidden) { finish(); return; }
      render(0, false);
      timers = [setTimeout(() => render(1, false), 950), setTimeout(() => { render(2, false); timers = []; }, 2000)];
    };
    controllers.push({ cancel, finish });
    return { run, cancel, finish };
  }
  const sceneSequence = sequence(phase => {
    scene.dataset.phase = phase;
    sceneStatus.textContent = statuses[phase];
  });
  const flowSequence = sequence((step, immediate) => {
    stepButtons[step].click();
    flow.classList.toggle('keyboard-change', immediate);
  });
  scene.querySelector('[data-scene-replay]').addEventListener('click', event => sceneSequence.run(event.detail === 0));
  play.addEventListener('click', event => {
    flowSequence.run(event.detail === 0);
    play.querySelector('span').textContent = document.body.dataset.replay;
  });
  stepButtons.forEach(button => button.addEventListener('pointerdown', () => flowSequence.cancel()));
  stepButtons.forEach(button => button.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') flowSequence.cancel();
  }));

  // Initial scenes explain the match without an endless decorative loop.
  if (!motion.matches) {
    document.body.classList.add('signal-motion');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (entry.target === scene) sceneSequence.run(false);
          else flowSequence.run(false);
          observer.unobserve(entry.target);
        });
      }, { threshold: .4 });
      observer.observe(scene);
      observer.observe(flow);
      controllers.push({ cancel: () => observer.disconnect(), finish: () => observer.disconnect() });
    }
  }
  const settle = () => controllers.forEach(controller => controller.finish());
  motion.addEventListener('change', () => {
    if (motion.matches) { document.body.classList.remove('signal-motion'); settle(); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) settle(); });
  window.addEventListener('pagehide', () => controllers.forEach(controller => controller.cancel()));
})();
