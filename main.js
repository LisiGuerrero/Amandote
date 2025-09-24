(function(){
  // Contraseña por defecto (puedes cambiarla aquí)
  const CORRECT = '15072025';

  const lock = document.getElementById('lock');
  const pwd = document.getElementById('pwd');
  const tryBtn = document.getElementById('tryBtn');
  const clearBtn = document.getElementById('clearBtn');
  const pad = document.querySelectorAll('.pad .key');
  const back = document.getElementById('back');
  const ok = document.getElementById('ok');
  const reveal = document.getElementById('reveal');
  const confettiContainer = document.getElementById('confetti');

  function openLock(){
    lock.classList.remove('closed');
    lock.classList.add('open');
    reveal.classList.add('show');
    triggerConfetti();
  }

  function shake(){
    lock.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(0)' }
    ],{ duration: 420, iterations: 1, easing: 'cubic-bezier(.2,.9,.3,1)' });
  }

  function triggerConfetti(){
    const colors = ['#fde68a','#fb7185','#60a5fa','#86efac','#f472b6'];
    confettiContainer.innerHTML = '';
    for(let i=0;i<18;i++){
      const d = document.createElement('div');
      d.className = 'dot';
      d.style.left = (20 + Math.random()*60)+'%';
      d.style.top = (10 + Math.random()*30)+'%';
      d.style.background = colors[Math.floor(Math.random()*colors.length)];
      confettiContainer.appendChild(d);

      const dx = (Math.random()-0.5)*120;
      const dy = 160 + Math.random()*120;
      const rot = (Math.random()-0.5)*720;
      d.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity:1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity:0 }
      ],{ duration: 1400 + Math.random()*600, easing: 'cubic-bezier(.2,.9,.3,1)' });
    }
  }

  function check(){
    const val = pwd.value;
    if(val === CORRECT){
      openLock();
    } else {
      shake();
      pwd.value = '';
    }
  }

  tryBtn.addEventListener('click', check);
  ok.addEventListener('click', check);
  clearBtn.addEventListener('click',()=>pwd.value='');

  pad.forEach(b=>{
    b.addEventListener('click', (e)=>{
      const t = e.currentTarget.textContent;
      if(t === 'OK' || t === '←') return;
      pwd.value += t;
    })
  });

  back.addEventListener('click', ()=>{
    pwd.value = pwd.value.slice(0,-1);
  });

  pwd.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter') check();
  });

  pwd.addEventListener('input', ()=>{
    if(lock.classList.contains('open')){
      lock.classList.remove('open');
      lock.classList.add('closed');
      reveal.classList.remove('show');
      confettiContainer.innerHTML = '';
    }
  })

  const revealTitle = document.getElementById('revealTitle');
  const revealMsg = document.getElementById('revealMsg');
  revealTitle.textContent = '¡Sorpresa!';
  revealMsg.innerHTML = 'Has desbloqueado el regalo. ❤️<br><small>Nicole, Te amo un montón, sos lo más especial en mi vida. Gracias por existir y demostrarme cada día, porque debo estar en tu vida. </small>';

  pwd.focus();
})();