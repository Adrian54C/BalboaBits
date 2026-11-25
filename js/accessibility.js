(()=>{
  const root=document.documentElement;
  const storageKey='bb_accessibility_preferences';
  const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
  const defaults={
    textScale:1,
    highContrast:false,
    enhancedContrast:false,
    grayscale:false,
    highlightLinks:false,
    highlightInteractive:false,
    readableFont:false,
    letterSpacing:false,
    lineSpacing:false,
    visibleCursor:false,
    readingMode:false,
    highlightSelection:false,
    reduceMotion:motionQuery.matches,
    reduceMotionOverride:false,
    disableAnimations:false,
    disableParallax:false,
    rate:1,
    voiceURI:''
  };
  const booleanKeys=Object.keys(defaults).filter(key=>typeof defaults[key]==='boolean');
  const loadPreferences=()=>{
    try{
      const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');
      if(!saved||typeof saved!=='object'||Array.isArray(saved))return {...defaults};
      const result={...defaults};
      booleanKeys.forEach(key=>{if(typeof saved[key]==='boolean')result[key]=saved[key]});
      if(Number.isFinite(saved.textScale))result.textScale=Math.min(1.4,Math.max(.9,Math.round(saved.textScale*10)/10));
      if(Number.isFinite(saved.rate))result.rate=Math.min(1.4,Math.max(.7,Math.round(saved.rate*10)/10));
      if(typeof saved.voiceURI==='string')result.voiceURI=saved.voiceURI;
      return result;
    }catch(error){
      console.warn('No se pudieron cargar las preferencias de accesibilidad.',error);
      return {...defaults};
    }
  };
  const preferences=loadPreferences();
  const skipLink=document.createElement('a');
  skipLink.className='access-skip-link';
  skipLink.href='#main';
  skipLink.textContent='Saltar al contenido principal';
  document.body.prepend(skipLink);
  const main=document.querySelector('main');
  if(main&&!main.hasAttribute('tabindex'))main.tabIndex=-1;

  const panel=document.createElement('dialog');
  panel.id='accessibility-panel';
  panel.className='accessibility-panel';
  panel.setAttribute('aria-modal','false');
  panel.setAttribute('aria-labelledby','accessibility-title');
  panel.innerHTML=`
    <header class="access-panel-header">
      <div>
        <span class="access-panel-kicker">BALBOABITS</span>
        <h2 id="accessibility-title">ACCESS</h2>
        <p>Adapta la tienda a tu forma de navegar.</p>
      </div>
      <button class="access-close" type="button" aria-label="Cerrar BALBOABITS ACCESS">×</button>
    </header>
    <div class="access-panel-content">
      <section class="access-section access-primary-section" aria-labelledby="access-visual-title">
        <h3 id="access-visual-title">Lo más usado</h3>
        <div class="access-text-size">
          <span>Tamaño del texto</span>
          <div class="access-size-controls">
            <button type="button" data-text-step="-0.1" aria-label="Disminuir tamaño del texto">A−</button>
            <output data-text-size>100%</output>
            <button type="button" data-text-step="0.1" aria-label="Aumentar tamaño del texto">A+</button>
          </div>
        </div>
        <label class="access-toggle"><input type="checkbox" data-setting="highContrast"><span><b>Alto contraste</b><small>Fondo oscuro y texto claro más definidos.</small></span></label>
        <label class="access-toggle"><input type="checkbox" data-setting="highlightLinks"><span><b>Resaltar enlaces</b><small>Subraya los enlaces del contenido.</small></span></label>
        <label class="access-toggle"><input type="checkbox" data-setting="reduceMotion"><span><b>Reducir movimiento</b><small>Limita animaciones y desplazamientos.</small></span></label>
      </section>
      <section class="access-section access-primary-section" aria-labelledby="access-reading-title">
        <h3 id="access-reading-title">Lectura en voz alta</h3>
        <div class="access-read-actions access-read-primary">
          <button type="button" data-read-page>Leer esta página</button>
          <button type="button" data-speech-pause disabled>Pausar lectura</button>
          <button type="button" data-speech-stop disabled>Detener lectura</button>
        </div>
        <p class="access-speech-status" role="status" aria-live="polite" data-speech-status>La lectura usa la voz de tu dispositivo.</p>
      </section>
      <details class="access-advanced">
        <summary>Más ajustes</summary>
        <div class="access-advanced-content">
          <section class="access-section" aria-labelledby="access-additional-visual-title">
            <h3 id="access-additional-visual-title">Visualización</h3>
            <label class="access-toggle"><input type="checkbox" data-setting="enhancedContrast"><span><b>Contraste mejorado</b><small>Refuerza texto secundario y bordes.</small></span></label>
            <label class="access-toggle"><input type="checkbox" data-setting="grayscale"><span><b>Escala de grises</b><small>Reduce los colores de la página.</small></span></label>
            <label class="access-toggle"><input type="checkbox" data-setting="highlightInteractive"><span><b>Resaltar controles</b><small>Marca botones y elementos interactivos.</small></span></label>
            <label class="access-toggle"><input type="checkbox" data-setting="readableFont"><span><b>Tipografía legible</b><small>Usa una familia sans-serif del sistema.</small></span></label>
            <label class="access-toggle"><input type="checkbox" data-setting="letterSpacing"><span><b>Más espacio entre letras</b><small>Mejora la separación de caracteres.</small></span></label>
            <label class="access-toggle"><input type="checkbox" data-setting="lineSpacing"><span><b>Más espacio entre líneas</b><small>Facilita seguir cada renglón.</small></span></label>
            <label class="access-toggle"><input type="checkbox" data-setting="readingMode"><span><b>Modo de lectura</b><small>Mejora el ancho y la separación de los textos.</small></span></label>
            <label class="access-toggle"><input type="checkbox" data-setting="highlightSelection"><span><b>Resaltar texto seleccionado</b><small>Usa una selección de alto contraste.</small></span></label>
          </section>
          <section class="access-section" aria-labelledby="access-additional-reading-title">
            <h3 id="access-additional-reading-title">Lectura</h3>
            <button class="access-extra-read" type="button" data-read-selection>Leer texto seleccionado</button>
            <label class="access-field">Velocidad de lectura <output data-rate-value>1.0×</output><input type="range" min="0.7" max="1.4" step="0.1" value="1" data-speech-rate></label>
            <label class="access-field">Voz e idioma disponibles en el dispositivo<select data-speech-voice><option value="">Voz predeterminada</option></select></label>
          </section>
          <section class="access-section" aria-labelledby="access-navigation-title">
            <h3 id="access-navigation-title">Navegación</h3>
            <p class="access-section-note">Usa Tab y Mayús+Tab para recorrer controles; Enter o Espacio para activarlos. Escape cierra este panel.</p>
            <label class="access-toggle"><input type="checkbox" data-setting="visibleCursor"><span><b>Cursor visible</b><small>También puedes recorrer todo el sitio con teclado.</small></span></label>
          </section>
          <section class="access-section" aria-labelledby="access-motion-title">
            <h3 id="access-motion-title">Movimiento</h3>
            <label class="access-toggle"><input type="checkbox" data-setting="disableAnimations"><span><b>Desactivar animaciones</b><small>Detiene animaciones decorativas y el carrusel automático.</small></span></label>
            <label class="access-toggle"><input type="checkbox" data-setting="disableParallax"><span><b>Desactivar parallax</b><small>Evita desplazamientos ligados al scroll.</small></span></label>
          </section>
          <section class="access-section access-language-note" aria-labelledby="access-language-title">
            <h3 id="access-language-title">Idioma</h3>
            <p>La tienda aún no tiene traducciones completas para todos sus productos y páginas. El selector se añadirá cuando el contenido de cada idioma esté listo.</p>
          </section>
        </div>
      </details>
    </div>
    <footer class="access-panel-footer">
      <button class="access-reset" type="button" data-reset-preferences>RESTABLECER CONFIGURACIÓN</button>
      <span>Las preferencias se guardan solo en este navegador.</span>
    </footer>`;
  document.body.appendChild(panel);
  const trigger=document.createElement('button');
  trigger.className='accessibility-trigger';
  trigger.type='button';
  trigger.setAttribute('aria-label','Abrir centro de accesibilidad BALBOABITS ACCESS');
  trigger.setAttribute('aria-haspopup','dialog');
  trigger.setAttribute('aria-expanded','false');
  trigger.setAttribute('aria-controls',panel.id);
  trigger.dataset.accessibilityOpen='';
  trigger.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4.3" r="2"/><path d="M4.5 8.3h15M12 8.5v5.2m0 0-4.2 6m4.2-6 4.2 6M7.5 8.5l1 4.3m8-4.3-1 4.3"/></svg>';
  document.body.appendChild(trigger);
  const openers=[...document.querySelectorAll('[data-accessibility-open]')];
  openers.forEach(button=>button.setAttribute('aria-expanded','false'));
  const closeButton=panel.querySelector('.access-close');
  const speechStatus=panel.querySelector('[data-speech-status]');
  let lastTrigger=trigger,closeTimer=0;
  const announce=message=>{speechStatus.textContent=message};
  const savePreferences=()=>{
    try{localStorage.setItem(storageKey,JSON.stringify(preferences))}
    catch(error){console.warn('No se pudieron guardar las preferencias de accesibilidad.',error);announce('No se pudieron guardar los ajustes en este navegador.')}
  };
  const classBindings={
    highContrast:'access-high-contrast',
    enhancedContrast:'access-enhanced-contrast',
    grayscale:'access-grayscale',
    highlightLinks:'access-highlight-links',
    highlightInteractive:'access-highlight-interactive',
    readableFont:'access-readable-font',
    letterSpacing:'access-letter-spacing',
    lineSpacing:'access-line-spacing',
    visibleCursor:'access-visible-cursor',
    readingMode:'access-reading-mode',
    highlightSelection:'access-highlight-selection',
    reduceMotion:'access-reduced-motion',
    disableAnimations:'access-disable-animations',
    disableParallax:'access-disable-parallax'
  };
  const applyPreferences=(persist=true)=>{
    root.style.setProperty('--access-text-scale',String(preferences.textScale));
    Object.entries(classBindings).forEach(([key,className])=>root.classList.toggle(className,preferences[key]));
    panel.querySelectorAll('[data-setting]').forEach(input=>{input.checked=preferences[input.dataset.setting]});
    panel.querySelector('[data-text-size]').textContent=`${Math.round(preferences.textScale*100)}%`;
    panel.querySelector('[data-rate-value]').textContent=`${preferences.rate.toFixed(1)}×`;
    panel.querySelector('[data-speech-rate]').value=String(preferences.rate);
    panel.querySelectorAll('[data-text-step]').forEach(button=>{
      const next=Math.round((preferences.textScale+Number(button.dataset.textStep))*10)/10;
      button.disabled=next<.9||next>1.4;
    });
    if(persist)savePreferences();
    document.dispatchEvent(new Event('bb-accessibility-motion-change'));
  };
  const openPanel=source=>{
    window.clearTimeout(closeTimer);
    lastTrigger=source;
    if(!panel.open)panel.show();
    panel.inert=false;
    panel.classList.remove('is-closing');
    requestAnimationFrame(()=>panel.classList.add('is-open'));
    openers.forEach(button=>button.setAttribute('aria-expanded','true'));
    requestAnimationFrame(()=>closeButton.focus());
  };
  const closePanel=(restoreFocus=true)=>{
    if(!panel.open)return;
    panel.classList.remove('is-open');
    panel.classList.add('is-closing');
    openers.forEach(button=>button.setAttribute('aria-expanded','false'));
    if(restoreFocus&&lastTrigger.isConnected)lastTrigger.focus();
    panel.inert=true;
    window.clearTimeout(closeTimer);
    closeTimer=window.setTimeout(()=>{
      if(panel.classList.contains('is-closing'))panel.close();
      panel.inert=false;
      panel.classList.remove('is-closing');
    },180);
  };
  openers.forEach(button=>button.addEventListener('click',()=>{
    if(panel.open&&!panel.classList.contains('is-closing')){closePanel(true);return}
    openPanel(button);
  }));
  closeButton.addEventListener('click',()=>closePanel(true));
  panel.addEventListener('cancel',event=>{event.preventDefault();closePanel(true)});
  panel.addEventListener('click',event=>{if(event.target===panel)closePanel(false)});
  document.addEventListener('click',event=>{
    if(panel.open&&!panel.contains(event.target)&&!openers.some(button=>button===event.target||button.contains(event.target)))closePanel(false);
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&panel.open){event.preventDefault();closePanel(true)}
  });
  panel.querySelectorAll('[data-setting]').forEach(input=>input.addEventListener('change',()=>{
    preferences[input.dataset.setting]=input.checked;
    if(input.dataset.setting==='reduceMotion')preferences.reduceMotionOverride=true;
    applyPreferences();
  }));
  panel.querySelectorAll('[data-text-step]').forEach(button=>button.addEventListener('click',()=>{
    preferences.textScale=Math.min(1.4,Math.max(.9,Math.round((preferences.textScale+Number(button.dataset.textStep))*10)/10));
    applyPreferences();
  }));
  const speechSupported='speechSynthesis' in window&&'SpeechSynthesisUtterance' in window;
  const voiceSelect=panel.querySelector('[data-speech-voice]');
  const rateInput=panel.querySelector('[data-speech-rate]');
  const pauseButton=panel.querySelector('[data-speech-pause]');
  const stopButton=panel.querySelector('[data-speech-stop]');
  let activeUtterance=null;
  const updateVoiceOptions=()=>{
    if(!speechSupported)return;
    const voices=window.speechSynthesis.getVoices();
    voiceSelect.innerHTML='<option value="">Voz predeterminada del dispositivo</option>';
    voices.forEach(voice=>{
      const option=document.createElement('option');
      option.value=voice.voiceURI;
      option.textContent=`${voice.name} · ${voice.lang}`;
      voiceSelect.appendChild(option);
    });
    voiceSelect.value=voices.some(voice=>voice.voiceURI===preferences.voiceURI)?preferences.voiceURI:'';
  };
  const updateSpeechButtons=active=>{
    pauseButton.disabled=!speechSupported||!active;
    stopButton.disabled=!speechSupported||!active;
    pauseButton.textContent=window.speechSynthesis?.paused?'Continuar lectura':'Pausar lectura';
  };
  const speak=text=>{
    if(!speechSupported){announce('Este navegador no ofrece síntesis de voz.');return}
    const content=text.trim();
    if(!content){announce('No hay texto disponible para leer.');return}
    activeUtterance=null;
    window.speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(content);
    const selectedVoice=window.speechSynthesis.getVoices().find(voice=>voice.voiceURI===preferences.voiceURI);
    if(selectedVoice){utterance.voice=selectedVoice;utterance.lang=selectedVoice.lang}
    else utterance.lang=document.documentElement.lang||'es-PA';
    utterance.rate=preferences.rate;
    utterance.onstart=()=>{activeUtterance=utterance;updateSpeechButtons(true);announce('Lectura en voz alta iniciada.')};
    utterance.onend=()=>{if(activeUtterance===utterance){activeUtterance=null;updateSpeechButtons(false);announce('Lectura finalizada.')}};
    utterance.onerror=event=>{if(activeUtterance===utterance){activeUtterance=null;updateSpeechButtons(false);announce(`No se pudo completar la lectura (${event.error}).`)}};
    activeUtterance=utterance;
    updateSpeechButtons(true);
    window.speechSynthesis.speak(utterance);
  };
  panel.querySelector('[data-read-page]').addEventListener('click',()=>{
    const content=document.querySelector('main');
    if(!content){announce('No se encontró el contenido principal de esta página.');return}
    const copy=content.cloneNode(true);
    copy.querySelectorAll('button,svg,script,style,input,select,textarea,code,pre,[aria-hidden="true"],[hidden]').forEach(element=>element.remove());
    speak(copy.innerText.replace(/\s+/g,' '));
  });
  panel.querySelector('[data-read-selection]').addEventListener('click',()=>{
    const selection=window.getSelection();
    const selectedNode=selection?.anchorNode?.nodeType===Node.ELEMENT_NODE?selection.anchorNode:selection?.anchorNode?.parentElement;
    if(selectedNode?.closest('button,input,textarea,select,[aria-hidden="true"],code,pre')){announce('Selecciona texto de lectura, no un control o código.');return}
    speak(selection?.toString()||'');
  });
  pauseButton.addEventListener('click',()=>{
    if(!speechSupported||!activeUtterance)return;
    if(window.speechSynthesis.paused){window.speechSynthesis.resume();announce('Lectura reanudada.')}
    else{window.speechSynthesis.pause();announce('Lectura en pausa.')}
    updateSpeechButtons(true);
  });
  stopButton.addEventListener('click',()=>{
    if(!speechSupported)return;
    activeUtterance=null;
    window.speechSynthesis.cancel();
    updateSpeechButtons(false);
    announce('Lectura detenida.');
  });
  if(speechSupported){
    updateVoiceOptions();
    if('onvoiceschanged' in window.speechSynthesis)window.speechSynthesis.addEventListener('voiceschanged',updateVoiceOptions);
    else window.speechSynthesis.onvoiceschanged=updateVoiceOptions;
  }else{
    voiceSelect.disabled=true;
    panel.querySelector('[data-read-page]').disabled=true;
    panel.querySelector('[data-read-selection]').disabled=true;
    announce('La síntesis de voz no está disponible en este navegador.');
  }
  voiceSelect.addEventListener('change',()=>{
    preferences.voiceURI=voiceSelect.value;
    savePreferences();
  });
  rateInput.addEventListener('input',()=>{
    preferences.rate=Number(rateInput.value);
    panel.querySelector('[data-rate-value]').textContent=`${preferences.rate.toFixed(1)}×`;
  });
  rateInput.addEventListener('change',savePreferences);
  panel.querySelector('[data-reset-preferences]').addEventListener('click',()=>{
    activeUtterance=null;
    if(speechSupported)window.speechSynthesis.cancel();
    updateSpeechButtons(false);
    Object.assign(preferences,defaults,{reduceMotion:motionQuery.matches,reduceMotionOverride:false});
    voiceSelect.value='';
    applyPreferences();
    announce('Se restablecieron las preferencias de accesibilidad.');
  });
  applyPreferences(false);
  motionQuery.addEventListener('change',event=>{
    if(!preferences.reduceMotionOverride)preferences.reduceMotion=event.matches;
    applyPreferences(false);
  });
})();
