const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const $$m=n=>'$'+n.toFixed(2);
/* ===== Datos centralizados (sustituir por API en el futuro) ===== */
const SALE_PRODUCT_IDS=new Set([
 'nova-anc','speaker-home',
 'atlas-14','webcam-4k',
 'mouse-x','capture-card',
 'phone-fold','tablet-kids',
 'cam-ip','vacuum-robot',
 'ssd-portable','powerbank-20k'
]);
const P=[
['nova-anc','Samsung Galaxy Buds FE con cancelación de ruido','Audio',79,89,'Cancelación activa de ruido|Hasta 30 h de batería|Cambio automático entre dispositivos Galaxy|Carga USB-C'],
['pulse-bar','JBL Bar 500 5.1 con subwoofer inalámbrico','Audio',119,139,'Sonido 5.1 canales|Conexión HDMI ARC|Subwoofer inalámbrico|Bluetooth'],
['atlas-14','ASUS Vivobook 15 Core i5 para estudio','Computadoras',579,649,'Pantalla Full HD de 15.6"|8 GB RAM|SSD de 512 GB|Wi-Fi 6'],
['atlas-16','ASUS Zenbook 16 Core i7 con 16 GB RAM','Computadoras',899,999,'Pantalla 16" Full HD|16 GB RAM|SSD de 1 TB|Conexión Wi-Fi 6'],
['mon-27','Samsung Monitor S3 de 24" Full HD','Computadoras',109,129,'Pantalla IPS Full HD|Tamaño de 24"|Entrada HDMI|Base ajustable'],
['kb-mech','Razer BlackWidow V4 X teclado mecánico RGB','Gaming',49,59,'Iluminación RGB|Conexión USB|Teclas mecánicas|Distribución español'],
['mouse-x','Razer Cobra mouse gamer con RGB','Gaming',19,25,'Sensor óptico ajustable|Iluminación RGB|Conexión USB|Seis botones'],
['chair-g','Corsair TC100 Relaxed silla gaming lumbar','Gaming',149,169,'Soporte lumbar|Altura ajustable|Respaldo reclinable|Reposabrazos acolchados'],
['phone-z','Xiaomi Redmi Note 14 Pro 5G de 256 GB','Móviles',399,449,'Pantalla AMOLED de 6.67"|Cámara principal de 200 MP|Almacenamiento de 256 GB|Carga rápida USB-C'],
['tab-10','Samsung Galaxy Tab S9 FE Wi-Fi de 10.9"','Móviles',199,229,'Pantalla de 10.9"|Almacenamiento de 128 GB|Cámara frontal para videollamadas|Wi-Fi'],
['cam-ip','TP-Link Tapo C225 cámara Wi-Fi para interiores','Hogar',35,45,'Video 2K QHD|Visión nocturna|Audio bidireccional|Control desde el móvil'],
['router-6','ASUS router Wi-Fi 6 de doble banda','Hogar',59,69,'Doble banda 2.4 y 5 GHz|Tres antenas|Puertos Ethernet|Configuración desde app'],
['wave-studio','Sony WH-CH720N audífonos inalámbricos con ANC','Audio',29,39,'Micrófono integrado|Hasta 35 h de batería|Bluetooth|Carga USB-C'],
['pods-air','Xiaomi Redmi Buds 6 Pro audífonos TWS','Audio',22,29,'Estuche de carga|Controles táctiles|Micrófono integrado|Hasta 36 h con estuche'],
['mic-stream','HyperX SoloCast micrófono USB para streaming','Audio',35,45,'Conexión USB plug-and-play|Patrón de captura cardioide|Control de silencio|Base de escritorio'],
['speaker-go','JBL Flip 6 bocina Bluetooth portátil','Audio',32,39,'Conexión Bluetooth|Hasta 12 h de reproducción|Resistencia a salpicaduras|Emparejamiento estéreo'],
['dac-stereo','Logitech Z207 bocinas estéreo 2.0 para PC','Audio',39,49,'Sonido estéreo|Conexión USB y 3.5 mm|Control de volumen|Alimentación USB'],
['soundbar-mini','Amazon Echo Dot (5.ª gen.) bocina inteligente','Audio',49,59,'Control por voz|Conexión Wi-Fi|Bluetooth|Reproducción desde el móvil'],
['headset-comfort','Soundcore by Anker Q20i audífonos over-ear','Audio',45,59,'Diseño circumaural|Micrófono integrado|Hasta 40 h con ANC|Bluetooth'],
['speaker-home','JBL PartyBox Encore Essential bocina portátil','Audio',99,119,'Woofer de 5.25 pulgadas|Conexión Bluetooth|Entrada para micrófono|Luces LED'],
['laptop-lite','ASUS Chromebook CX1 de 14" para clases','Computadoras',229,249,'Pantalla de 14" HD|4 GB RAM|Almacenamiento eMMC|Wi-Fi y Bluetooth'],
['desktop-creator','Dell Inspiron Desktop Core i5 para creadores','Computadoras',549,599,'Procesador Intel Core i5|16 GB RAM|SSD de 512 GB|Wi-Fi integrado'],
['monitor-24','ASUS ProArt Display PA278QV de 27" QHD','Computadoras',189,219,'Pantalla QHD de 27"|Panel IPS|Entrada HDMI|Filtro de luz azul'],
['ssd-portable','Samsung T7 Shield SSD externo portátil de 1 TB','Gadgets',79,89,'Capacidad de 1 TB|Conexión USB-C|Compatible con PC y móvil|Carcasa compacta'],
['dock-pro','UGREEN Revodok 7 en 1 hub USB-C para laptop','Gadgets',29,39,'Salida HDMI|Tres puertos USB|Lector SD y microSD|Carga USB-C'],
['usb-sandisk','SanDisk Ultra Flair USB 3.0 de 128 GB','Gadgets',13,16,'Capacidad de 128 GB|Interfaz USB 3.0|Conector USB-A|Cuerpo metálico'],
['usb-kingston','Kingston DataTraveler Max USB-C de 256 GB','Gadgets',28,35,'Capacidad de 256 GB|Interfaz USB 3.2|Conector USB-C|Carcasa compacta'],
['hdd-seagate','Seagate Expansion HDD portátil de 2 TB','Gadgets',79,89,'Capacidad de 2 TB|Conexión USB 3.0|Alimentación por USB|Compatible con PC y Mac'],
['hdd-wd','WD My Passport HDD portátil de 2 TB','Gadgets',85,99,'Capacidad de 2 TB|Conexión USB 3.2|Copia de seguridad|Carcasa compacta'],
['ssd-crucial','Crucial X9 Pro SSD portátil de 1 TB','Gadgets',89,99,'Capacidad de 1 TB|Interfaz USB-C|Lectura de alta velocidad|Resistente a golpes'],
['ssd-990','Samsung 990 EVO Plus NVMe SSD de 1 TB','Gadgets',109,129,'Capacidad de 1 TB|Interfaz NVMe PCIe|Formato M.2 2280|Disipación térmica'],
['keyboard-office','Logitech MK270 combo inalámbrico de teclado y mouse','Computadoras',24,29,'Conexión inalámbrica 2.4 GHz|Receptor USB incluido|Teclas silenciosas|Mouse óptico'],
['webcam-4k','Logitech C920s HD Pro webcam Full HD','Computadoras',29,39,'Video Full HD 1080p|Micrófono integrado|Enfoque automático|Conexión USB'],
['controller-pro','Xbox Wireless Controller Bluetooth','Gaming',39,49,'Conexión Bluetooth|Vibración dual|Dos pilas AA|Compatible con PC'],
['keyboard-rgb','HyperX Cloud Stinger 2 audífonos gamer','Gaming',35,45,'Audio estéreo|Micrófono ajustable|Almohadillas acolchadas|Conexión 3.5 mm'],
['mouse-compact','Xbox Series X consola de videojuegos de 1 TB','Gaming',499,549,'Almacenamiento de 1 TB|Salida HDMI|Conexión Wi-Fi|Incluye control inalámbrico'],
['headset-arena','Xbox Wireless Controller Carbon Black','Gaming',49,59,'Conexión inalámbrica|Vibración integrada|Botón de captura|Puerto USB-C'],
['mousepad-xl','Razer Gigantus V2 XXL mousepad gamer','Gaming',12,16,'Superficie de baja fricción|Base antideslizante|Bordes reforzados|Tamaño extendido'],
['capture-card','ASUS TUF Gaming VG249Q1A monitor 24" 165 Hz','Gaming',159,179,'Pantalla Full HD de 24"|Frecuencia de 165 Hz|Tiempo de respuesta 1 ms|Entrada HDMI'],
['chair-compact','Logitech G923 volante con pedales para simulador','Gaming',179,199,'Volante con giro de 900°|Pedales incluidos|Vibración realista|Compatible con consola y PC'],
['phone-luma','Xiaomi Redmi Note 13 smartphone de 128 GB','Móviles',169,199,'Pantalla de 6.6"|Cámara principal de 50 MP|Almacenamiento de 128 GB|Batería de 5.000 mAh'],
['phone-fold','Samsung Galaxy Z Flip6 5G de 256 GB','Móviles',599,649,'Pantalla AMOLED de 120 Hz|Cámara principal de 50 MP|Carga rápida|Conectividad 5G'],
['iphone-13-pro-max','Apple iPhone 13 Pro Max de 128 GB','Móviles',499,549,'Pantalla Super Retina XDR de 6.7"|ProMotion de hasta 120 Hz|Chip A15 Bionic|Sistema de cámaras Pro'],
['iphone-16-pro','Apple iPhone 16 Pro de 256 GB','Móviles',899,999,'Pantalla Super Retina XDR de 6.3"|Chip A18 Pro|Cámara Fusion de 48 MP|Conectividad 5G'],
['iphone-17-pro-max','Apple iPhone 17 Pro Max de 256 GB','Móviles',1199,1299,'Pantalla Super Retina XDR de 6.9"|Chip A19 Pro|Sistema de cámaras Pro|Conectividad 5G'],
['iphone-15-pro','Apple iPhone 15 Pro de 128 GB','Móviles',699,799,'Pantalla Super Retina XDR de 6.1"|Chip A17 Pro|Diseño de titanio|Sistema de cámaras Pro'],
['tablet-kids','Amazon Fire HD 10 Kids Pro tablet Wi-Fi','Móviles',119,139,'Pantalla de 10"|Funda protectora incluida|Control parental|Batería recargable'],
['watch-active','Xiaomi Smart Band 9 Pro reloj inteligente','Móviles',39,49,'Seguimiento de actividad|Medición de ritmo cardíaco|Notificaciones del móvil|Resistencia al agua'],
['reader-ink','Anker 313 cargador inalámbrico Qi de 10 W','Gadgets',19,25,'Carga inalámbrica Qi|Potencia de hasta 10 W|Base antideslizante|Indicador LED'],
['powerbank-20k','Anker 325 Power Bank de 20.000 mAh','Gadgets',25,32,'Capacidad de 20.000 mAh|Dos puertos USB|Carga rápida|Indicador de batería'],
['phone-rugged','Ulefone smartphone rugerizado con batería de larga duración','Móviles',149,169,'Pantalla de 6.6"|Batería de 6.000 mAh|Cámara principal de 50 MP|Desbloqueo por huella'],
['tablet-pro','Lenovo Tab P11 tablet Wi-Fi con teclado','Móviles',249,279,'Pantalla de 11.5"|Teclado desmontable|Almacenamiento de 128 GB|Wi-Fi'],
['lamp-smart','Philips Hue White and Color A19 bombillo inteligente','Hogar',14,19,'Luz blanca y colores regulables|Control desde el móvil|Programación horaria|Conexión Wi-Fi'],
['plug-wifi','TP-Link Tapo P110 enchufe inteligente con app','Hogar',12,15,'Encendido remoto|Programación horaria|Control por voz|Conexión Wi-Fi'],
['vacuum-robot','Xiaomi Robot Vacuum S10 aspiradora inteligente','Hogar',79,99,'Navegación láser LDS|Mapeo inteligente|Control desde app|Retorno automático a base'],
['air-purifier','Ninja AF101 freidora de aire de 3.8 litros','Hogar',69,79,'Capacidad de 3.8 litros|Control de temperatura|Temporizador|Canasta antiadherente'],
['lock-smart','Samsung Crystal UHD DU7000 Smart TV de 50"','Hogar',329,379,'Pantalla 4K UHD de 50"|Wi-Fi integrado|Apps de streaming|Entradas HDMI'],
['doorbell-view','Panasonic NN-SB458S horno microondas de 0.9 pies cúbicos','Hogar',89,99,'Capacidad de 0.9 pies cúbicos|Varios niveles de potencia|Descongelado rápido|Plato giratorio'],
['sensor-leak','Aroma ARC-914SBD arrocera digital de 8 tazas','Hogar',39,49,'Capacidad de 8 tazas cocidas|Función mantener caliente|Olla antiadherente|Tapa de vidrio'],
['thermostat-smart','Midea U Inverter aire acondicionado de 12.000 BTU','Hogar',399,449,'Capacidad de 12.000 BTU|Tecnología inverter|Control remoto|Modo de ahorro energético']
].map(a=>({id:a[0],n:a[1],c:a[2],p:a[3],o:SALE_PRODUCT_IDS.has(a[0])?a[4]:a[3],s:a[5].split('|')}));
const CATS=[...new Set(P.map(p=>p.c))],CATALOG_CATS=CATS.filter(c=>c!=='Gadgets'),CATALOG_PRODUCTS=P.filter(p=>p.c!=='Gadgets'),byId=id=>P.find(p=>p.id===id);
const categoryHref=c=>c==='Gadgets'?'gadgets.html':`catalogo.html?cat=${encodeURIComponent(c)}`;
const CATALOG_LANDINGS={
  'Audio':{eyebrow:'SONIDO Y AUDIO',title:'Audio para<br><em>sentir cada detalle.</em>',description:'Escucha lo que te gusta con la mejor calidad.'},
  'Computadoras':{eyebrow:'COMPUTADORAS Y TECNOLOGÍA',title:'Computadoras para<br><em>crear sin límites.</em>',description:'Equipos para trabajar, estudiar y dar vida a tus ideas.'},
  'Gaming':{eyebrow:'JUEGA A TU MANERA',title:'Gaming para<br><em>ganar cada partida.</em>',description:'Rendimiento, precisión y comodidad para jugar a tu manera.'},
  'Móviles':{eyebrow:'TECNOLOGÍA CONTIGO',title:'Móviles para<br><em>seguir conectado.</em>',description:'Conecta, crea y disfruta estés donde estés.'},
  'Hogar':{eyebrow:'TECNOLOGÍA PARA TU HOGAR',title:'Hogar para<br><em>vivir más cómodo.</em>',description:'Haz tu día más cómodo con soluciones inteligentes.'}
};
const CAT_ICONS={
  'Audio':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14v-4M8 18V6M12 21V3M16 17V7M20 14v-4"/><circle cx="12" cy="12" r="1.5"/></svg>',
  'Computadoras':'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  'Gaming':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 8h7a5.5 5.5 0 0 1 5.3 7l-.7 2.5a2.1 2.1 0 0 1-3.4 1l-2.1-2H9.4l-2.1 2a2.1 2.1 0 0 1-3.4-1L3.2 15a5.5 5.5 0 0 1 5.3-7Z"/><path d="M8 12v3M6.5 13.5h3M16.5 13h.01M18.5 15h.01"/></svg>',
  'Móviles':'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M10 5h4M11 18.5h2"/></svg>',
  'Hogar':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8"/><path d="M5 9.5V21h14V9.5M9 21v-7h6v7"/></svg>',
  'Gadgets':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0-12-3 3m3-3 3 3M12 15l-4 4h8l-4-4M7 9v4m10-4v4"/><circle cx="7" cy="7" r="1"/><circle cx="17" cy="7" r="1"/></svg>'
};
const CATEGORY_MARQUEE_ROWS=[
  [['AUDIO',false],['GAMING',true],['COMPUTADORAS',false],['MÓVILES',true],['HOGAR',false],['GADGETS',true]],
  [['TECNOLOGÍA',true],['INNOVACIÓN',false],['RENDIMIENTO',true],['SONIDO',false],['CONECTIVIDAD',true]],
  [['HOGAR',true],['GAMING',false],['AUDIO',true],['MÓVILES',false],['COMPUTADORAS',true],['GADGETS',false]]
];
const categoryMarquee=CATEGORY_MARQUEE_ROWS.map((words,index)=>{
  const content=words.map(([word,outline])=>`<span class="category-marquee-word${outline?' category-marquee-word--outline':''}">${word}</span>`).join('');
  const group=`<div class="category-marquee-group">${content}</div>`;
  return `<div class="category-marquee-track category-marquee-track--${index+1}">${group}${group}</div>`;
}).join('');
const SPEC_ICONS={
 battery:'<svg viewBox="0 0 24 24"><rect x="3" y="7" width="17" height="10" rx="2"/><path d="M22 10v4M12 8.5 9.5 12H13l-1 3.5 3-4H12z"/></svg>',
 display:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8M12 16v5"/></svg>',
 connection:'<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.3 10.8 7.3-3.6M8.3 13.2l7.3 3.6"/></svg>',
 storage:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h.01M12 16h.01M16 16h.01"/></svg>',
 camera:'<svg viewBox="0 0 24 24"><path d="M4 7h3l1.5-2h7L17 7h3v12H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
 audio:'<svg viewBox="0 0 24 24"><path d="M3 10v4M7 6v12M11 3v18M15 7v10M19 9v6M22 11v2"/></svg>',
 charge:'<svg viewBox="0 0 24 24"><path d="M13 2 5 13h6l-1 9 9-12h-6z"/></svg>',
 shield:'<svg viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
 gaming:'<svg viewBox="0 0 24 24"><path d="M8 8h8a5 5 0 0 1 4.8 6.4l-.7 2.4a2 2 0 0 1-3.2 1l-2-1.8H9.1l-2 1.8a2 2 0 0 1-3.2-1l-.7-2.4A5 5 0 0 1 8 8Z"/><path d="M8 11v4M6 13h4M16 12h.01M18 14h.01"/></svg>',
 phone:'<svg viewBox="0 0 24 24"><rect x="6" y="2.5" width="12" height="19" rx="2"/><path d="M10 5h4M11 18.5h2"/></svg>',
 settings:'<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="18" r="2"/></svg>',
 home:'<svg viewBox="0 0 24 24"><path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7"/></svg>'
};
const specIcon=(p,s)=>{
 const t=s.toLowerCase();
 let type;
 if(/bater[ií]a|mah|horas de reproducci[oó]n/.test(t))type='battery';
 else if(/pantalla|resoluci[oó]n|full hd|qhd|4k|hz|hdmi|pulgadas/.test(t))type='display';
 else if(/c[aá]mara|visi[oó]n nocturna|video|webcam/.test(t))type='camera';
 else if(/audio|sonido|bocina|aud[ií]fonos|micr[oó]fono|ruido|reproducci[oó]n|est[eé]reo|subwoofer|voz/.test(t))type='audio';
 else if(/carga|cargador|watts|potencia/.test(t))type='charge';
 else if(/almacenamiento|ssd|ram|emmc|capacidad/.test(t))type='storage';
 else if(/bluetooth|wi-?fi|5g|usb|inal[aá]mbric|conexi[oó]n|puerto|ethernet|compatible|hdmi/.test(t))type='connection';
 else if(/resistencia|resistente|antideslizante|protecci[oó]n|filtro|agua/.test(t))type='shield';
 else if(/consola|gamer|juego|pedales|vibraci[oó]n/.test(t))type='gaming';
 else if(/control|programaci[oó]n|temporizador|ajustable|app|remoto|parental/.test(t))type='settings';
 else type=({Audio:'audio',Computadoras:'display',Gaming:'gaming',Móviles:'phone',Hogar:'home'})[p.c]||'connection';
 return SPEC_ICONS[type];
};
/* Los archivos usan el nombre del producto; las pulgadas se omiten en los nombres. */
const PRODUCT_IMAGES=P.reduce((images,p)=>{
 images[p.id]=`${p.n.replace(/"/g,'')}.webp`;
 return images;
},{});
const PRODUCT_IMAGES_WHITE_BACKGROUND=new Set(['cam-ip','phone-fold','lamp-smart','plug-wifi','soundbar-mini']);
const PRODUCT_ART_TYPES={
 'atlas-14':'laptop','atlas-16':'laptop','laptop-lite':'laptop',
 'mon-27':'monitor','monitor-24':'monitor','capture-card':'monitor',
 'kb-mech':'keyboard','keyboard-office':'keyboard-mouse','mouse-x':'mouse','chair-g':'chair',
 'phone-z':'phone','phone-luma':'phone','phone-rugged':'phone','iphone-13-pro-max':'iphone',
 'iphone-16-pro':'iphone','iphone-17-pro-max':'iphone','iphone-15-pro':'iphone','phone-fold':'foldable',
 'tab-10':'tablet','tablet-kids':'tablet','tablet-pro':'tablet','cam-ip':'camera','router-6':'router',
 'wave-studio':'headphones','headset-comfort':'headphones','keyboard-rgb':'headphones','pods-air':'earbuds',
 'mic-stream':'microphone','speaker-go':'speaker','soundbar-mini':'smart-speaker','speaker-home':'party-speaker',
 'dac-stereo':'desktop-speakers','desktop-creator':'desktop','ssd-portable':'portable-ssd','ssd-crucial':'portable-ssd',
 'dock-pro':'hub','usb-sandisk':'usb','usb-kingston':'usb','hdd-seagate':'external-drive','hdd-wd':'external-drive',
 'ssd-990':'m2-ssd','webcam-4k':'webcam','controller-pro':'controller','headset-arena':'controller',
 'mouse-compact':'console','mousepad-xl':'mousepad','chair-compact':'steering-wheel','watch-active':'watch',
 'reader-ink':'wireless-charger','powerbank-20k':'powerbank','lamp-smart':'bulb','plug-wifi':'smart-plug',
 'vacuum-robot':'robot-vacuum','air-purifier':'air-fryer','lock-smart':'television','doorbell-view':'microwave',
 'sensor-leak':'rice-cooker','thermostat-smart':'air-conditioner'
};
const productArtwork=(p)=>{
 const type=PRODUCT_ART_TYPES[p.id]||'phone';
 const hash=[...p.id].reduce((value,character)=>((value*31)+character.charCodeAt(0))>>>0,7);
 const hue=198+(hash%38),accent=hash%2?'#65adff':'#d21034';
 const parts={
  laptop:`<rect x="215" y="86" width="330" height="242" rx="18" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="231" y="102" width="298" height="209" rx="8" fill="url(#screen)"/><path d="M239 270 332 156l61 67 52-56 78 93z" fill="#65adff" opacity=".22"/><path d="M202 336h356l35 25q-2 12-18 12H188q-16 0-19-12z" fill="url(#shell)" stroke="#8193aa" stroke-opacity=".55" stroke-width="4"/><path d="M332 341h96l-8 9h-80z" fill="#d2dbe7" opacity=".32"/>`,
  monitor:`<rect x="164" y="70" width="432" height="282" rx="18" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="180" y="86" width="400" height="250" rx="8" fill="url(#screen)"/><circle cx="380" cy="345" r="4" fill="${accent}"/><path d="M345 356v66h70v-66M300 429h160q12 0 8 10l-8 11H300l-8-11q-4-10 8-10" fill="url(#shell)" stroke="#75859a" stroke-width="4"/><path d="m192 297 100-124 78 93 66-77 122 132H192z" fill="#65adff" opacity=".2"/>`,
  phone:`<rect x="279" y="49" width="202" height="411" rx="38" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="292" y="64" width="176" height="380" rx="27" fill="url(#screen)"/><path d="M300 342 365 211l42 71 29-39 31 66v127H300z" fill="#65adff" opacity=".24"/><rect x="351" y="73" width="58" height="9" rx="5" fill="#05070a"/><circle cx="420" cy="77" r="4" fill="#536477"/><circle cx="380" cy="427" r="4" fill="#dce8f6" opacity=".55"/>`,
  iphone:`<rect x="197" y="100" width="190" height="325" rx="34" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="211" y="115" width="162" height="294" rx="24" fill="url(#screen)"/><path d="M219 321 278 205l52 74 35-45v160H219z" fill="#65adff" opacity=".2"/><rect x="264" y="122" width="58" height="9" rx="5" fill="#05070a"/><rect x="416" y="86" width="158" height="340" rx="33" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="429" y="100" width="132" height="312" rx="24" fill="#111722"/><circle cx="455" cy="127" r="20" fill="#10151c" stroke="#71839a" stroke-width="4"/><circle cx="455" cy="127" r="9" fill="#253b54"/><circle cx="505" cy="127" r="20" fill="#10151c" stroke="#71839a" stroke-width="4"/><circle cx="505" cy="127" r="9" fill="#253b54"/><circle cx="455" cy="177" r="20" fill="#10151c" stroke="#71839a" stroke-width="4"/><circle cx="455" cy="177" r="9" fill="#253b54"/><circle cx="525" cy="177" r="7" fill="#e9f1fb"/>`,
  foldable:`<rect x="262" y="63" width="236" height="394" rx="37" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="276" y="78" width="208" height="182" rx="25" fill="url(#screen)"/><rect x="276" y="272" width="208" height="170" rx="23" fill="url(#screen)"/><path d="M277 260h207v14H277z" fill="#05070a" stroke="#71839a" stroke-opacity=".4"/><circle cx="380" cy="267" r="4" fill="#dce8f6" opacity=".7"/><path d="M285 218 340 142l48 57 37-41 53 62H285z" fill="#65adff" opacity=".19"/>`,
  tablet:`<rect x="235" y="51" width="290" height="416" rx="29" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="250" y="68" width="260" height="380" rx="17" fill="url(#screen)"/><path d="m254 337 84-120 60 67 42-46 70 85v116H254z" fill="#65adff" opacity=".22"/><circle cx="380" cy="457" r="4" fill="#dce8f6" opacity=".6"/>`,
  keyboard:`<rect x="135" y="144" width="490" height="230" rx="28" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/>${Array.from({length:5},(_,row)=>Array.from({length:13},(_,column)=>`<rect x="${158+column*35}" y="${168+row*36}" width="27" height="25" rx="5" fill="${row===4&&column===6?accent:'url(#key)'}" stroke="#8fa2ba" stroke-opacity=".25"/>`).join('')).join('')}<rect x="291" y="349" width="150" height="9" rx="4" fill="#9db0c7" opacity=".32"/>`,
  'keyboard-mouse':`<rect x="135" y="155" width="390" height="205" rx="24" fill="url(#shell)" stroke="url(#edge)" stroke-width="6"/>${Array.from({length:4},(_,row)=>Array.from({length:10},(_,column)=>`<rect x="${155+column*35}" y="${176+row*37}" width="27" height="25" rx="5" fill="url(#key)" stroke="#8fa2ba" stroke-opacity=".25"/>`).join('')).join('')}<path d="M559 204q-48 0-48 58v45q0 52 48 52t48-52v-45q0-58-48-58z" fill="url(#shell)" stroke="url(#edge)" stroke-width="6"/><path d="M559 210v47m-11 0h22" stroke="#a8b8cb" stroke-width="4"/>`,
  mouse:`<path d="M380 118c-77 0-112 52-112 132v51c0 78 38 116 112 116s112-38 112-116v-51c0-80-35-132-112-132z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M380 123v102m-48-1h96" stroke="#97a8bd" stroke-width="5"/><rect x="369" y="145" width="22" height="42" rx="10" fill="${accent}"/><path d="M282 285h196" stroke="#65adff" stroke-opacity=".3" stroke-width="3"/>`,
  chair:`<path d="M302 72q0-20 22-20h112q22 0 22 20v174q0 22-22 22H324q-22 0-22-22z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M326 111h108M326 148h108M326 185h108" stroke="#8395ab" stroke-opacity=".45" stroke-width="7"/><path d="M285 280q0-23 23-23h144q23 0 23 23v83q0 21-23 21H308q-23 0-23-21z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M278 301h-55v52h63m196-52h55v52h-63M380 383v54m-104 25h208m-178 0-34 25m212-25 34 25m-126-25v28" fill="none" stroke="#899bb0" stroke-width="12" stroke-linecap="round"/><circle cx="241" cy="487" r="10" fill="#46566b"/><circle cx="346" cy="490" r="10" fill="#46566b"/><circle cx="414" cy="490" r="10" fill="#46566b"/><circle cx="519" cy="487" r="10" fill="#46566b"/>`,
  camera:`<path d="M195 165h92l24-35h138l27 35h88q18 0 18 18v201q0 18-18 18H195q-18 0-18-18V183q0-18 18-18z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><circle cx="385" cy="277" r="91" fill="#070a0f" stroke="#8799af" stroke-width="9"/><circle cx="385" cy="277" r="66" fill="#1a2e47" stroke="#3b5879" stroke-width="8"/><circle cx="385" cy="277" r="41" fill="#080d15" stroke="#65adff" stroke-opacity=".6" stroke-width="8"/><circle cx="399" cy="262" r="13" fill="#badcff" opacity=".75"/><circle cx="500" cy="203" r="9" fill="${accent}"/>`,
  router:`<path d="M183 276q0-17 18-17h358q18 0 18 17v102q0 19-18 19H201q-18 0-18-19z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M225 257 201 78m340 179 25-179m-286 179-4-127m196 127 4-127" stroke="#9eafc4" stroke-width="9" stroke-linecap="round"/><circle cx="236" cy="337" r="7" fill="${accent}"/><circle cx="266" cy="337" r="7" fill="#71d5a5"/><circle cx="296" cy="337" r="7" fill="#65adff"/><path d="M344 315h160" stroke="#71839a" stroke-width="5" stroke-linecap="round"/>`,
  headphones:`<path d="M235 282v-54q0-147 145-147t145 147v54" fill="none" stroke="#a7b6c8" stroke-width="28" stroke-linecap="round"/><path d="M242 254h-20q-27 0-27 29v103q0 28 27 28h47q22 0 22-22V275q0-21-22-21zm276 0h20q27 0 27 29v103q0 28-27 28h-47q-22 0-22-22V275q0-21 22-21z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M223 291h29v86h-29m285-86h29v86h-29" stroke="${accent}" stroke-opacity=".7" stroke-width="5"/>`,
  earbuds:`<rect x="221" y="241" width="318" height="183" rx="61" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M239 283q0-23 24-23h234q24 0 24 23" fill="none" stroke="#a4b2c5" stroke-opacity=".5" stroke-width="7"/><circle cx="380" cy="339" r="8" fill="${accent}"/><path d="M293 137q-30 0-30 31v36q0 30 30 30t30-30v-36q0-31-30-31zm174 0q-30 0-30 31v36q0 30 30 30t30-30v-36q0-31-30-31z" fill="url(#shell)" stroke="url(#edge)" stroke-width="6"/><path d="M293 152v55m174-55v55" stroke="#b3c2d4" stroke-opacity=".5" stroke-width="5"/>`,
  microphone:`<path d="M338 89q0-40 42-40t42 40v149q0 42-42 42t-42-42z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M326 180h108M326 205h108M332 230h96" stroke="#a2b3c8" stroke-opacity=".45" stroke-width="6"/><path d="M305 206v43q0 83 75 83t75-83v-43M380 332v67m-64 0h128m-103 29h78" fill="none" stroke="#9aabc0" stroke-width="10" stroke-linecap="round"/><circle cx="380" cy="198" r="6" fill="${accent}"/>`,
  speaker:`<rect x="279" y="93" width="202" height="338" rx="68" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><circle cx="380" cy="210" r="49" fill="#090d13" stroke="#8091a6" stroke-width="8"/><circle cx="380" cy="210" r="20" fill="#30435a" stroke="${accent}" stroke-width="5"/><circle cx="380" cy="322" r="64" fill="#090d13" stroke="#8091a6" stroke-width="8"/><circle cx="380" cy="322" r="28" fill="#30435a" stroke="#65adff" stroke-opacity=".5" stroke-width="5"/>`,
  'smart-speaker':`<path d="M283 349V218q0-114 97-114t97 114v131q0 54-97 54t-97-54z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><ellipse cx="380" cy="218" rx="96" ry="39" fill="#141c28" stroke="#8091a6" stroke-width="6"/><path d="M300 278h160M300 302h160" stroke="#7c8fa5" stroke-opacity=".27" stroke-width="5"/><circle cx="380" cy="373" r="8" fill="${accent}"/>`,
  'party-speaker':`<rect x="282" y="58" width="196" height="402" rx="36" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><circle cx="380" cy="176" r="57" fill="#080c12" stroke="#8193aa" stroke-width="8"/><circle cx="380" cy="176" r="24" fill="#294462" stroke="${accent}" stroke-width="6"/><circle cx="380" cy="328" r="76" fill="#080c12" stroke="#8193aa" stroke-width="8"/><circle cx="380" cy="328" r="37" fill="#294462" stroke="#65adff" stroke-opacity=".55" stroke-width="6"/><path d="M320 425h120" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>`,
  'desktop-speakers':`<rect x="218" y="100" width="126" height="326" rx="23" fill="url(#shell)" stroke="url(#edge)" stroke-width="6"/><rect x="416" y="100" width="126" height="326" rx="23" fill="url(#shell)" stroke="url(#edge)" stroke-width="6"/><circle cx="281" cy="228" r="34" fill="#080b10" stroke="#8091a6" stroke-width="6"/><circle cx="281" cy="339" r="54" fill="#080b10" stroke="#8091a6" stroke-width="6"/><circle cx="479" cy="228" r="34" fill="#080b10" stroke="#8091a6" stroke-width="6"/><circle cx="479" cy="339" r="54" fill="#080b10" stroke="#8091a6" stroke-width="6"/><circle cx="281" cy="339" r="19" fill="#2b4058"/><circle cx="479" cy="339" r="19" fill="#2b4058"/>`,
  desktop:`<rect x="246" y="64" width="268" height="390" rx="28" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M281 110h198M281 144h198" stroke="#9aabc0" stroke-opacity=".35" stroke-width="6"/><circle cx="380" cy="273" r="76" fill="#080c12" stroke="#73859a" stroke-width="6"/><circle cx="380" cy="273" r="48" fill="#17283c" stroke="${accent}" stroke-opacity=".8" stroke-width="6"/><circle cx="380" cy="273" r="14" fill="#65adff" opacity=".55"/><path d="M277 400h206" stroke="#7f91a7" stroke-width="5"/>`,
  'portable-ssd':`<rect x="225" y="174" width="310" height="190" rx="34" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M255 212h140" stroke="#91a2b7" stroke-opacity=".35" stroke-width="7" stroke-linecap="round"/><circle cx="482" cy="269" r="9" fill="${accent}"/><rect x="343" y="347" width="74" height="15" rx="6" fill="#080a0e" stroke="#8091a6" stroke-width="4"/>`,
  'm2-ssd':`<rect x="137" y="224" width="486" height="88" rx="17" fill="url(#shell)" stroke="url(#edge)" stroke-width="6"/><rect x="170" y="242" width="135" height="52" rx="8" fill="#111a25" stroke="#8294aa" stroke-width="4"/><rect x="325" y="242" width="112" height="52" rx="8" fill="#111a25" stroke="#8294aa" stroke-width="4"/><rect x="461" y="242" width="107" height="52" rx="8" fill="#111a25" stroke="#8294aa" stroke-width="4"/><path d="M137 250h-28v36h28" fill="#c5d0dc"/><circle cx="590" cy="268" r="5" fill="${accent}"/>`,
  hub:`<rect x="192" y="205" width="376" height="120" rx="31" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M246 238h39v44h-39zm65 0h39v44h-39zm65 0h39v44h-39zm65 0h39v44h-39z" fill="#080b10" stroke="#9aabc0" stroke-width="4"/><rect x="493" y="238" width="43" height="44" rx="5" fill="#080b10" stroke="#9aabc0" stroke-width="4"/><path d="M380 325v35" stroke="#d7e1ed" stroke-width="6"/><path d="M365 361h30" stroke="#d7e1ed" stroke-width="6"/>`,
  usb:`<path d="M266 177h200q26 0 26 26v114q0 26-26 26H266q-26 0-26-26V203q0-26 26-26z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M466 207h95v106h-95z" fill="#adb9c8" stroke="#e0e8f1" stroke-width="5"/><path d="M486 225h56v17h-56zm0 49h56v17h-56z" fill="#263346"/><circle cx="281" cy="233" r="8" fill="${accent}"/><path d="M298 293h106" stroke="#8d9eb2" stroke-opacity=".4" stroke-width="6"/>`,
  'external-drive':`<rect x="225" y="113" width="310" height="294" rx="43" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><circle cx="380" cy="244" r="88" fill="#090d13" stroke="#8294aa" stroke-width="7"/><circle cx="380" cy="244" r="49" fill="#1a2b3f" stroke="#53677f" stroke-width="6"/><circle cx="380" cy="244" r="12" fill="#b9c9dc"/><circle cx="465" cy="365" r="8" fill="${accent}"/>`,
  webcam:`<path d="M278 196q0-28 29-28h146q29 0 29 28v91q0 28-29 28H307q-29 0-29-28z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><circle cx="380" cy="242" r="42" fill="#080c12" stroke="#8a9bb0" stroke-width="7"/><circle cx="380" cy="242" r="19" fill="#243d59" stroke="${accent}" stroke-width="4"/><path d="M340 315v37h80v-37m-40 37v39m-70 0h140" fill="none" stroke="#98a9bd" stroke-width="9" stroke-linecap="round"/>`,
  controller:`<path d="M243 198q20-48 69-48h135q49 0 69 48l44 117q11 32-19 42l-19 7q-20 8-39-10l-45-40H321l-45 40q-19 18-39 10l-19-7q-30-10-19-42z" fill="url(#shell)" stroke="url(#edge)" stroke-width="8"/><path d="M296 230v68m-34-34h68" stroke="#c1ccda" stroke-width="11" stroke-linecap="round"/><circle cx="463" cy="244" r="9" fill="${accent}"/><circle cx="492" cy="275" r="9" fill="#65adff"/><circle cx="438" cy="275" r="9" fill="#d3deeb"/>`,
  console:`<path d="M273 70q0-20 22-20h170q22 0 22 20v374q0 20-22 20H295q-22 0-22-20z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M319 84v342" stroke="#8da0b7" stroke-opacity=".35" stroke-width="6"/><circle cx="437" cy="410" r="10" fill="${accent}"/><path d="M362 128h84m-84 26h84" stroke="#8da0b7" stroke-opacity=".28" stroke-width="5"/>`,
  mousepad:`<rect x="157" y="140" width="446" height="255" rx="39" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M391 183q-60 0-60 74v44q0 67 60 67t60-67v-44q0-74-60-74z" fill="#0b1017" stroke="#a3b2c4" stroke-width="6"/><path d="M391 189v57m-27 0h54" stroke="${accent}" stroke-width="5"/><path d="M183 365h390" stroke="#65adff" stroke-opacity=".32" stroke-width="5"/>`,
  'steering-wheel':`<circle cx="380" cy="234" r="149" fill="none" stroke="#b2becc" stroke-width="28"/><circle cx="380" cy="234" r="55" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="m339 267-103 84m185-84 103 84m-144-82v-70" stroke="#a7b5c7" stroke-width="24" stroke-linecap="round"/><rect x="449" y="418" width="87" height="38" rx="12" fill="url(#shell)" stroke="#8294aa" stroke-width="5"/><path d="M472 418v-23m43 23v-23" stroke="#bac6d4" stroke-width="7"/>`,
  watch:`<path d="M324 71h112l18 107H306zm0 378h112l18-107H306z" fill="url(#shell)" stroke="#8294aa" stroke-width="6"/><rect x="290" y="157" width="180" height="240" rx="45" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="306" y="174" width="148" height="207" rx="32" fill="url(#screen)"/><circle cx="380" cy="277" r="54" fill="none" stroke="${accent}" stroke-width="8"/><path d="m380 239v42l28 17" fill="none" stroke="#e5edf7" stroke-width="8" stroke-linecap="round"/>`,
  'wireless-charger':`<path d="M380 68 518 118v124q0 134-138 196-138-62-138-196V118z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="295" y="106" width="170" height="286" rx="33" fill="#111923" stroke="#899bb0" stroke-width="6"/><path d="M315 352 369 239l39 57 29-34 40 90H315z" fill="#65adff" opacity=".23"/><circle cx="380" cy="127" r="6" fill="${accent}"/><path d="M380 407v28m-25 0h50" stroke="#b5c3d3" stroke-width="8" stroke-linecap="round"/>`,
  powerbank:`<rect x="246" y="108" width="268" height="330" rx="38" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="334" y="85" width="92" height="27" rx="10" fill="#b8c5d5"/><rect x="285" y="155" width="190" height="127" rx="18" fill="#080c12" stroke="#71839a" stroke-width="5"/><path d="M311 220h138" stroke="${accent}" stroke-width="11" stroke-linecap="round"/><circle cx="310" cy="343" r="7" fill="#71d5a5"/><circle cx="342" cy="343" r="7" fill="#71d5a5"/><circle cx="374" cy="343" r="7" fill="#65adff"/><circle cx="406" cy="343" r="7" fill="#46566b"/>`,
  bulb:`<path d="M380 68q-117 0-117 113 0 65 58 112 23 18 24 48h70q1-30 24-48 58-47 58-112 0-113-117-113z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M345 340h70m-66 27h62m-54 27h46" stroke="#aab8c8" stroke-width="11" stroke-linecap="round"/><path d="M380 133v97m-42-36 42 36 42-36" fill="none" stroke="${accent}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  'smart-plug':`<rect x="262" y="101" width="236" height="327" rx="46" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><circle cx="380" cy="252" r="69" fill="#090d13" stroke="#8294aa" stroke-width="7"/><circle cx="380" cy="252" r="40" fill="#1b2b3e" stroke="${accent}" stroke-width="6"/><path d="M348 100V66m64 34V66" stroke="#bdc8d6" stroke-width="13" stroke-linecap="round"/><circle cx="380" cy="363" r="8" fill="#71d5a5"/>`,
  'robot-vacuum':`<ellipse cx="380" cy="309" rx="186" ry="112" fill="url(#shell)" stroke="url(#edge)" stroke-width="8"/><ellipse cx="380" cy="296" rx="157" ry="84" fill="#101720" stroke="#8294aa" stroke-width="5"/><path d="M340 238q40-39 80 0" fill="none" stroke="#9aabc0" stroke-width="8"/><circle cx="380" cy="250" r="14" fill="${accent}"/><path d="M226 347h308" stroke="#65adff" stroke-opacity=".32" stroke-width="5"/><circle cx="243" cy="372" r="9" fill="#080b10"/><circle cx="517" cy="372" r="9" fill="#080b10"/>`,
  'air-fryer':`<rect x="250" y="69" width="260" height="380" rx="45" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="283" y="104" width="194" height="87" rx="25" fill="#090d13" stroke="#8294aa" stroke-width="5"/><circle cx="327" cy="148" r="19" fill="#1b2b3e" stroke="${accent}" stroke-width="5"/><circle cx="433" cy="148" r="19" fill="#1b2b3e" stroke="#65adff" stroke-width="5"/><rect x="279" y="220" width="202" height="166" rx="23" fill="#080b10" stroke="#8294aa" stroke-width="6"/><path d="M304 250h152m-152 100h152" stroke="#586b82" stroke-width="5"/><path d="M356 386v17h48v-17" fill="none" stroke="#9aabc0" stroke-width="7"/>`,
  television:`<rect x="112" y="84" width="536" height="318" rx="20" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="130" y="102" width="500" height="280" rx="9" fill="url(#screen)"/><path d="m143 342 130-157 106 120 81-90 157 167H143z" fill="#65adff" opacity=".22"/><path d="M347 402v39m66-39v39m-115 12h296" stroke="#98a9bd" stroke-width="10" stroke-linecap="round"/>`,
  microwave:`<rect x="139" y="122" width="482" height="284" rx="30" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><rect x="171" y="153" width="317" height="220" rx="19" fill="#080b10" stroke="#8294aa" stroke-width="6"/><path d="M192 174h275v177H192z" fill="url(#screen)" opacity=".7"/><circle cx="547" cy="190" r="19" fill="#121a25" stroke="#9baabd" stroke-width="5"/><circle cx="547" cy="252" r="19" fill="#121a25" stroke="#9baabd" stroke-width="5"/><path d="M522 306h50" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`,
  'rice-cooker':`<path d="M233 206q0-88 147-88t147 88v150q0 84-147 84t-147-84z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M236 220h288M268 174q112-91 224 0" fill="none" stroke="#a3b1c2" stroke-width="8"/><rect x="322" y="272" width="116" height="72" rx="14" fill="#080b10" stroke="#8596ab" stroke-width="5"/><circle cx="350" cy="308" r="9" fill="${accent}"/><path d="M378 307h42" stroke="#8a9cb2" stroke-width="6"/><path d="M274 398v17m212-17v17" stroke="#8e9eb1" stroke-width="11" stroke-linecap="round"/>`,
  'air-conditioner':`<path d="M175 137q0-30 31-30h348q31 0 31 30v157q0 30-31 30H206q-31 0-31-30z" fill="url(#shell)" stroke="url(#edge)" stroke-width="7"/><path d="M216 181h328m-315 28h302m-288 28h274m-261 28h248" stroke="#91a2b7" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/><path d="M273 328v66m107-66v79m107-79v66" stroke="#65adff" stroke-opacity=".7" stroke-width="7" stroke-linecap="round"/><circle cx="494" cy="149" r="7" fill="${accent}"/>`
 };
 const object=parts[type]||parts.phone;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 520"><defs><radialGradient id="scene" cx="50%" cy="42%"><stop stop-color="hsl(${hue},58%,24%)"/><stop offset="1" stop-color="#090c12"/></radialGradient><linearGradient id="shell" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#687589"/><stop offset=".18" stop-color="#252e3a"/><stop offset=".58" stop-color="#121720"/><stop offset="1" stop-color="#080b10"/></linearGradient><linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dce6f3" stop-opacity=".85"/><stop offset=".5" stop-color="#8393a8" stop-opacity=".48"/><stop offset="1" stop-color="#536174" stop-opacity=".8"/></linearGradient><linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#16283c"/><stop offset=".56" stop-color="#0b121d"/><stop offset="1" stop-color="#243b56"/></linearGradient><linearGradient id="key" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#566477"/><stop offset="1" stop-color="#202834"/></linearGradient><filter id="shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="#000" flood-opacity=".56"/></filter></defs><rect width="760" height="520" fill="url(#scene)"/><circle cx="380" cy="254" r="206" fill="none" stroke="#a9ceff" stroke-opacity=".07"/><circle cx="380" cy="254" r="244" fill="none" stroke="${accent}" stroke-opacity=".035"/><path d="M0 437h760M76 0v520M684 0v520" stroke="#a9ceff" stroke-opacity=".035"/>${`<g filter="url(#shadow)">${object}</g>`}<path d="M91 96h54m470 328h54" stroke="${accent}" stroke-width="3" stroke-opacity=".75"/><circle cx="145" cy="96" r="4" fill="${accent}"/><circle cx="615" cy="424" r="4" fill="${accent}"/></svg>`;
 return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
const productTransitionName=p=>`product-${p.id.replace(/[^a-z0-9_-]/gi,'-')}`;
const img=(p,w=400,h=300,eager,shared=false)=>{const productImage=PRODUCT_IMAGES[p.id],transition=shared?` style="view-transition-name:${productTransitionName(p)}"`:'';
if(productImage)return `<img class="product-zoom product-image-real${PRODUCT_IMAGES_WHITE_BACKGROUND.has(p.id)?' product-image-white-background':''}"${transition} src="images/products/optimized/${encodeURIComponent(productImage)}?v=9" width="${w}" height="${h}" alt="${p.n}" decoding="async" ${eager?'fetchpriority="high"':'loading="lazy"'}>`;
return `<img class="product-zoom product-image-art"${transition} src="${productArtwork(p)}" width="${w}" height="${h}" alt="${p.n}" decoding="async" ${eager?'fetchpriority="high"':'loading="lazy"'}>`};
/* ===== Carrito ===== */
const cart={get:()=>{try{return JSON.parse(localStorage.getItem('bb_cart'))||{}}catch{return{}}},
set(c){try{localStorage.setItem('bb_cart',JSON.stringify(c))}catch{}cart.badge()},
add(id,q=1){const c=cart.get();c[id]=Math.min(10,(c[id]||0)+q);cart.set(c);toast('Agregado al carrito');const b=$('.cartb');b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')},
badge(){$('#cn').textContent=Object.values(cart.get()).reduce((a,b)=>a+b,0)}};
let tt;const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200)};
const discountPercent=p=>Math.round((p.o-p.p)/p.o*100);
const card=p=>`<article class="card rv"><a href="producto.html?id=${p.id}"><span class="card-media">${img(p,400,300,false,true)}${p.o>p.p?`<span class="card-offer-badge"><span>OFERTA</span><b>-${discountPercent(p)}%</b></span>`:''}</span><div class="in"><span class="mut">${p.c}</span><h3>${p.n}</h3><div class="pr"><b>${$$m(p.p)}</b>${p.o>p.p?`<s>${$$m(p.o)}</s>`:''}</div></div></a><button class="btn" data-add="${p.id}">Agregar al carrito</button></article>`;
const newsArtwork=p=>{
  const key=`news-${p.id}`;
  const keyboardKeys=Array.from({length:4},(_,row)=>Array.from({length:12},(_,column)=>`<rect x="${186+column*34}" y="${178+row*34}" width="27" height="23" rx="5" fill="${row===3&&column===5?'#285c98':'url(#'+key+'-key)'}" stroke="#71839a" stroke-opacity=".24"/>`).join('')).join('');
  const objects={
    'mon-27':`<g filter="url(#${key}-shadow)"><rect x="165" y="95" width="430" height="276" rx="23" fill="url(#${key}-frame)" stroke="#8193aa" stroke-opacity=".72" stroke-width="2"/><rect x="180" y="110" width="400" height="246" rx="13" fill="#09111d"/><rect x="187" y="117" width="386" height="232" rx="9" fill="url(#${key}-screen)"/><circle cx="380" cy="233" r="92" fill="url(#${key}-orb)" opacity=".8"/><path d="M188 287c76-83 128-17 194-82s117-28 191-95v239H188z" fill="#102b4b" opacity=".7"/><path d="M188 310c91-78 147-10 230-61 54-33 94-56 155-43" fill="none" stroke="#8abfff" stroke-opacity=".65" stroke-width="2"/><path d="M347 372v48h66v-48M306 421h148" fill="none" stroke="#8797aa" stroke-linecap="round" stroke-width="10"/></g>`,
    'kb-mech':`<g transform="rotate(-7 380 260)" filter="url(#${key}-shadow)"><rect x="148" y="148" width="464" height="226" rx="24" fill="url(#${key}-frame)" stroke="#8193aa" stroke-opacity=".7" stroke-width="2"/><rect x="161" y="161" width="438" height="200" rx="16" fill="#0b1019"/>${keyboardKeys}<rect x="188" y="318" width="288" height="25" rx="6" fill="url(#${key}-key)" stroke="#71839a" stroke-opacity=".3"/><path d="M182 355h400" stroke="#65adff" stroke-opacity=".36" stroke-width="2"/></g>`,
    'mouse-x':`<g transform="rotate(-13 380 250)" filter="url(#${key}-shadow)"><path d="M380 109c-87 0-143 68-143 164v30c0 89 53 141 143 141s143-52 143-141v-30c0-96-56-164-143-164Z" fill="url(#${key}-frame)" stroke="#9badc1" stroke-opacity=".7" stroke-width="2"/><path d="M380 111v125m-141 21c70 21 212 21 282 0" fill="none" stroke="#9badc1" stroke-opacity=".5" stroke-width="2"/><rect x="366" y="155" width="28" height="54" rx="13" fill="#182433" stroke="#9badc1" stroke-opacity=".55"/><rect x="376" y="165" width="8" height="20" rx="4" fill="#65adff"/><path d="M246 296c21 79 246 89 269 0" fill="none" stroke="#d21034" stroke-opacity=".72" stroke-width="3"/></g>`,
    'chair-g':`<g filter="url(#${key}-shadow)"><path d="M315 78h130c21 0 36 17 36 38v153H279V116c0-21 15-38 36-38Z" fill="url(#${key}-frame)" stroke="#8999ad" stroke-opacity=".68" stroke-width="2"/><rect x="326" y="101" width="108" height="121" rx="28" fill="#121a26" stroke="#45566e" stroke-width="2"/><path d="M293 273h174c23 0 42 17 42 38v31H251v-31c0-21 19-38 42-38Z" fill="url(#${key}-frame)" stroke="#8999ad" stroke-opacity=".7" stroke-width="2"/><path d="M263 321h232M380 343v72m-112 47 112-32 112 32m-183 0 29-34m154 34-29-34" fill="none" stroke="#74869c" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/><path d="M315 153h130" stroke="#d21034" stroke-opacity=".7" stroke-width="3"/></g>`,
    'phone-z':`<g transform="rotate(8 380 260)" filter="url(#${key}-shadow)"><rect x="288" y="54" width="184" height="412" rx="34" fill="url(#${key}-frame)" stroke="#9aabc0" stroke-opacity=".82" stroke-width="2"/><rect x="300" y="69" width="160" height="382" rx="25" fill="url(#${key}-screen)"/><path d="M300 325c48-72 76-81 160-155v281H300z" fill="#123359" opacity=".8"/><path d="M300 362c61-42 91-107 160-113" fill="none" stroke="#a9d1ff" stroke-opacity=".72" stroke-width="2"/><circle cx="380" cy="108" r="4" fill="#161c27"/><rect x="360" y="423" width="40" height="4" rx="2" fill="#a9b7c8" opacity=".6"/></g>`,
    'tab-10':`<g transform="rotate(-5 380 260)" filter="url(#${key}-shadow)"><rect x="178" y="95" width="404" height="326" rx="25" fill="url(#${key}-frame)" stroke="#9aabc0" stroke-opacity=".8" stroke-width="2"/><rect x="192" y="109" width="376" height="298" rx="16" fill="url(#${key}-screen)"/><circle cx="380" cy="258" r="85" fill="url(#${key}-orb)" opacity=".78"/><path d="M193 320c70-20 114-101 189-94 72 8 103 85 186 60v121H193z" fill="#102744" opacity=".75"/><circle cx="380" cy="112" r="3" fill="#aebdce"/><path d="m604 132 28 8-101 294-24-9z" fill="url(#${key}-frame)" stroke="#8395aa" stroke-opacity=".6"/></g>`
  };
  return `<svg class="news-art" style="view-transition-name:${productTransitionName(p)}" viewBox="0 0 760 520" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="${key}-bg"><stop stop-color="#17335a"/><stop offset="1" stop-color="#080b10"/></radialGradient><radialGradient id="${key}-orb"><stop stop-color="#72b4ff" stop-opacity=".8"/><stop offset="1" stop-color="#277be8" stop-opacity="0"/></radialGradient><linearGradient id="${key}-frame" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#3b4a60"/><stop offset=".48" stop-color="#111823"/><stop offset="1" stop-color="#06080c"/></linearGradient><linearGradient id="${key}-screen" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#18365c"/><stop offset=".55" stop-color="#0b1524"/><stop offset="1" stop-color="#10121b"/></linearGradient><linearGradient id="${key}-key" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#36445a"/><stop offset="1" stop-color="#121923"/></linearGradient><filter id="${key}-shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="24" stdDeviation="22" flood-color="#000" flood-opacity=".56"/></filter></defs><rect width="760" height="520" fill="url(#${key}-bg)"/><circle cx="380" cy="245" r="215" fill="url(#${key}-orb)" opacity=".48"/><circle cx="380" cy="260" r="206" fill="none" stroke="#8bbfff" stroke-opacity=".08"/><circle cx="380" cy="260" r="244" fill="none" stroke="#fff" stroke-opacity=".045"/><path d="M0 416h760M0 453h760M0 490h760M88 0v520M164 0v520M596 0v520M672 0v520" stroke="#8bbfff" stroke-opacity=".045"/>${objects[p.id]||objects['mon-27']}<path d="M103 89h60m434 342h61" stroke="#d21034" stroke-opacity=".62" stroke-width="2"/></svg>`;
};
const newsSlide=(p,index,total)=>`<article class="news-slide" data-news-slide="${index}" role="group" aria-roledescription="diapositiva" aria-label="Producto ${index+1} de ${total}" aria-hidden="${index!==0}" ${index?'inert':''}>
  <a class="news-visual" href="producto.html?id=${p.id}" aria-label="Ver ${p.n}">${PRODUCT_IMAGES[p.id]?img(p,760,520,false,true):newsArtwork(p)}<span class="news-visual-index">${String(index+1).padStart(2,'0')} <i>/ ${String(total).padStart(2,'0')}</i></span><span class="news-visual-mark" aria-hidden="true">BB<span>.</span></span></a>
  <div class="news-copy">
    <div class="news-copy-top"><span class="news-category">${p.c}</span><span class="news-edition">SELECCIÓN BALBOABITS</span></div>
    <h3>${p.n}</h3><p>${p.s.slice(0,2).join(' · ')}</p>
    <div class="news-actions"><a class="news-detail-link" href="producto.html?id=${p.id}">Ver producto <span aria-hidden="true">↗</span></a><button class="btn small" type="button" data-add="${p.id}">Agregar al carrito</button></div>
    <div class="news-price-row"><div><span class="news-price-label">PRECIO ESPECIAL</span><div class="news-price"><b>${$$m(p.p)}</b>${p.o>p.p?`<s>${$$m(p.o)}</s>`:''}</div></div>${p.o>p.p?`<span class="news-discount">-${discountPercent(p)}%</span>`:''}</div>
  </div>
</article>`;
const initNewsCarousel=()=>{
  const carousel=$('[data-news-carousel]');
  if(!carousel)return;
  const section=carousel.closest('.news-section');
  const stage=$('[data-news-stage]',carousel),slides=$$('[data-news-slide]',stage);
  const dots=$('[data-news-dots]',carousel),current=$('[data-news-current]');
  const previous=$('[data-news-previous]'),next=$('[data-news-next]');
  const motionButton=$('[data-news-motion]'),reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let active=0,timer,resizeTimer,hovered=false,focused=false,manuallyPaused=false,inView=false,touchStart=null,touchMoved=false,suppressClick=false;
  dots.innerHTML=slides.map((slide,index)=>`<button class="news-dot" type="button" data-news-dot="${index}" aria-label="Mostrar producto ${index+1}" ${index===0?'aria-current="true"':''}><span></span></button>`).join('');
  const accessMotionDisabled=()=>document.documentElement.classList.contains('access-reduced-motion')||document.documentElement.classList.contains('access-disable-animations');
  const canAutoplay=()=>!reducedMotion.matches&&!accessMotionDisabled()&&!manuallyPaused&&!hovered&&!focused&&inView&&document.visibilityState==='visible';
  const syncAutoplay=()=>{clearInterval(timer);const running=canAutoplay();current.setAttribute('aria-live',running?'off':'polite');if(running)timer=setInterval(()=>show(active+1),5200)};
  const updateMotionButton=()=>{
    motionButton.hidden=reducedMotion.matches||accessMotionDisabled();
    motionButton.setAttribute('aria-label',manuallyPaused?'Reanudar movimiento automático':'Pausar movimiento automático');
    motionButton.innerHTML=manuallyPaused?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
  };
  const show=target=>{
    active=(target+slides.length)%slides.length;
    const width=slides[0].getBoundingClientRect().width;
    const step=Math.min(width*.78+28,stage.clientWidth*.7);
    slides.forEach((slide,index)=>{
      let offset=index-active;
      if(offset>slides.length/2)offset-=slides.length;
      if(offset< -slides.length/2)offset+=slides.length;
      const distance=Math.abs(offset),scale=distance===0?1:distance===1?.86:distance===2?.72:.58;
      slide.style.transform=`translate(-50%,-50%) translate3d(${offset*step}px,0px,${-distance*96}px) rotateY(${offset*-14}deg) scale(${scale})`;
      slide.style.opacity=distance===0?'1':distance===1?'.72':distance===2?'.17':'0';
      slide.style.zIndex=String(20-distance);
      slide.setAttribute('aria-hidden',String(index!==active));
      slide.inert=index!==active;
    });
    $$('[data-news-dot]',dots).forEach((dot,index)=>{
      if(index===active)dot.setAttribute('aria-current','true');
      else dot.removeAttribute('aria-current');
    });
    current.textContent=String(active+1).padStart(2,'0');
  };
  previous.addEventListener('click',()=>{show(active-1);syncAutoplay()});
  next.addEventListener('click',()=>{show(active+1);syncAutoplay()});
  dots.addEventListener('click',event=>{
    const dot=event.target.closest('[data-news-dot]');
    if(dot){show(Number(dot.dataset.newsDot));syncAutoplay()}
  });
  motionButton.addEventListener('click',()=>{manuallyPaused=!manuallyPaused;updateMotionButton();syncAutoplay()});
  stage.addEventListener('keydown',event=>{
    if(event.target!==stage)return;
    if(event.key==='ArrowLeft'){event.preventDefault();show(active-1);syncAutoplay()}
    if(event.key==='ArrowRight'){event.preventDefault();show(active+1);syncAutoplay()}
  });
  section.addEventListener('mouseenter',()=>{hovered=true;syncAutoplay()});
  section.addEventListener('mouseleave',()=>{hovered=false;syncAutoplay()});
  section.addEventListener('focusin',()=>{focused=true;syncAutoplay()});
  section.addEventListener('focusout',event=>{
    if(!section.contains(event.relatedTarget)){focused=false;syncAutoplay()}
  });
  stage.addEventListener('pointerdown',event=>{
    if(event.pointerType!=='touch'||event.target.closest('button'))return;
    touchStart=event.clientX;touchMoved=false;
  });
  stage.addEventListener('pointermove',event=>{
    if(touchStart!==null&&Math.abs(event.clientX-touchStart)>12)touchMoved=true;
  });
  stage.addEventListener('pointerup',event=>{
    if(touchStart===null)return;
    const delta=event.clientX-touchStart;
    if(touchMoved&&Math.abs(delta)>48){event.preventDefault();show(active+(delta<0?1:-1));syncAutoplay();suppressClick=true;setTimeout(()=>{suppressClick=false},0)}
    touchStart=null;touchMoved=false;
  });
  stage.addEventListener('pointercancel',()=>{touchStart=null;touchMoved=false});
  stage.addEventListener('click',event=>{
    if(suppressClick){event.preventDefault();event.stopPropagation();suppressClick=false}
  },true);
  document.addEventListener('visibilitychange',syncAutoplay);
  document.addEventListener('bb-accessibility-motion-change',()=>{updateMotionButton();syncAutoplay()});
  reducedMotion.addEventListener('change',()=>{updateMotionButton();syncAutoplay()});
  window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>show(active),120)},{passive:true});
  new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;syncAutoplay()},{threshold:.3}).observe(carousel);
  updateMotionButton();
  show(active);
};
const initRecommendationsCarousel=()=>{
  const section=$('[data-recommendations]');
  if(!section)return;
  const grid=$('[data-recommendations-grid]',section);
  const previous=$('[data-recommendation-previous]',section);
  const next=$('[data-recommendation-next]',section);
  const motionButton=$('[data-recommendation-motion]',section);
  const current=$('[data-recommendation-current]',section);
  const total=$('[data-recommendation-total]',section);
  const products=CATALOG_PRODUCTS;
  const pageSize=4;
  const pageCount=Math.ceil(products.length/pageSize);
  if(!products.length)return;
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let page=0,timer=null,inView=false,hovered=false,focused=false,paused=false;
  const accessMotionDisabled=()=>document.documentElement.classList.contains('access-reduced-motion')||document.documentElement.classList.contains('access-disable-animations');
  const render=()=>{
    const start=page*pageSize;
    const visible=Array.from({length:Math.min(pageSize,products.length)},(_,index)=>products[(start+index)%products.length]);
    grid.innerHTML=visible.map(product=>card(product).replace('rv','rv in')).join('');
    current.textContent=String(page+1).padStart(2,'0');
    total.textContent=String(pageCount).padStart(2,'0');
  };
  const updateMotionButton=()=>{
    const playing=!paused&&!reducedMotion.matches&&!accessMotionDisabled();
    motionButton.hidden=reducedMotion.matches||accessMotionDisabled();
    motionButton.setAttribute('aria-label',playing?'Pausar rotación automática de recomendaciones':'Reanudar rotación automática de recomendaciones');
    motionButton.setAttribute('aria-pressed',String(paused));
    motionButton.innerHTML=playing
      ?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>'
      :'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>';
  };
  const syncAutoplay=()=>{
    clearInterval(timer);
    timer=null;
    const playing=pageCount>1&&inView&&!hovered&&!focused&&!document.hidden&&!paused&&!reducedMotion.matches&&!accessMotionDisabled();
    grid.setAttribute('aria-live',playing?'off':'polite');
    if(playing)timer=setInterval(()=>{page=(page+1)%pageCount;render()},10000);
    updateMotionButton();
  };
  const move=direction=>{
    page=(page+direction+pageCount)%pageCount;
    render();
    syncAutoplay();
  };
  previous.addEventListener('click',()=>move(-1));
  next.addEventListener('click',()=>move(1));
  motionButton.addEventListener('click',()=>{paused=!paused;syncAutoplay()});
  section.addEventListener('pointerenter',()=>{hovered=true;syncAutoplay()});
  section.addEventListener('pointerleave',()=>{hovered=false;syncAutoplay()});
  section.addEventListener('focusin',()=>{focused=true;syncAutoplay()});
  section.addEventListener('focusout',event=>{if(!event.relatedTarget||!section.contains(event.relatedTarget)){focused=false;syncAutoplay()}});
  document.addEventListener('visibilitychange',syncAutoplay);
  document.addEventListener('bb-accessibility-motion-change',syncAutoplay);
  reducedMotion.addEventListener('change',syncAutoplay);
  new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;syncAutoplay()},{threshold:.25}).observe(section);
  previous.disabled=next.disabled=pageCount<2;
  render();
  syncAutoplay();
};
const initHomeParticleNetwork=()=>{
  const clusters=[
    {x:.92,y:.065,depth:'near',nodes:[[-76,-34,2.2],[-25,-49,3.4],[27,-19,2.3],[76,-42,3.8],[92,5,2.2],[37,25,2.7],[-31,48,3.2],[26,68,2.2],[91,58,2.6]],edges:[[0,1],[1,2],[1,3],[2,3],[2,4],[2,5],[5,6],[5,7],[4,8],[7,8]],glow:[1,3]},
    {x:.11,y:.18,mobileY:.085,depth:'far',nodes:[[-90,-50,2.1],[-45,-23,3.1],[4,-42,2.3],[53,-14,3.7],[89,17,2.2],[26,26,2.6],[-22,58,3.3],[43,67,2.1]],edges:[[0,1],[1,2],[1,5],[2,3],[3,4],[5,3],[5,6],[5,7],[6,7]],glow:[3,6]},
    {x:.42,y:.305,depth:'mid',nodes:[[-67,-59,2],[-19,-31,3.6],[38,-51,2.3],[83,-17,3.2],[22,8,2.2],[-37,37,2.8],[28,55,3.7],[78,42,2.1]],edges:[[0,1],[1,2],[1,4],[2,3],[4,3],[4,5],[4,6],[6,7],[5,6]],glow:[1,6]},
    {x:.25,y:.425,depth:'near',nodes:[[-88,-45,2.4],[-41,-16,3.5],[12,-46,2],[65,-24,3.1],[84,18,2.5],[28,18,2.1],[-25,56,3.8],[38,70,2.4]],edges:[[0,1],[1,2],[2,3],[3,4],[1,5],[5,3],[5,6],[5,7],[6,7]],glow:[1,6]},
    {x:.72,y:.555,depth:'far',nodes:[[-58,-53,2],[-4,-27,3.4],[43,-55,2.5],[88,-22,3.6],[28,5,2.3],[-37,35,3],[17,63,2.2],[70,48,3.4]],edges:[[0,1],[1,2],[2,3],[1,4],[4,5],[4,6],[4,7],[6,7],[3,7]],glow:[1,7]},
    {x:.09,y:.675,depth:'mid',nodes:[[-92,-44,2.3],[-38,-56,3.1],[11,-24,2.1],[62,-47,3.6],[91,-5,2.5],[29,20,2.7],[-21,55,3.5],[45,68,2.3]],edges:[[0,1],[1,2],[1,3],[2,3],[2,4],[2,5],[5,6],[5,7],[6,7]],glow:[3,6]},
    {x:.48,y:.805,depth:'near',nodes:[[-72,-52,2.2],[-19,-28,3.7],[35,-57,2.2],[84,-20,3.2],[35,4,2.1],[-31,40,3.5],[21,66,2.4],[77,47,2.3]],edges:[[0,1],[1,2],[2,3],[1,4],[4,3],[4,5],[4,6],[6,7],[5,6]],glow:[1,5]},
    {x:.19,y:.925,depth:'far',nodes:[[-84,-44,2.1],[-34,-17,3.4],[19,-48,2.4],[64,-14,3.3],[91,24,2.2],[18,22,2.5],[-33,56,3.2],[38,69,2]],edges:[[0,1],[1,2],[2,3],[3,4],[1,5],[5,3],[5,6],[5,7],[6,7]],glow:[2,6]}
  ];
  const distantPoints=[[.17,.03],[.29,.115],[.45,.055],[.71,.12],[.57,.225],[.34,.265],[.68,.37],[.23,.42],[.43,.505],[.74,.56],[.28,.635],[.59,.735],[.39,.845],[.76,.895],[.47,.96]];
  const clusterMarkup=clusters.map((cluster,index)=>{
    const edges=cluster.edges.map(([from,to],edgeIndex)=>{
      const start=cluster.nodes[from],end=cluster.nodes[to];
      return `<line class="network-edge${edgeIndex%4===0?' network-edge--lit':''}" pathLength="1" x1="${start[0]}" y1="${start[1]}" x2="${end[0]}" y2="${end[1]}" style="--edge-delay:${(edgeIndex*.17).toFixed(2)}s"/>`;
    }).join('');
    const nodes=cluster.nodes.map(([x,y,r],node)=>`<circle class="network-node${r>=3.3?' network-node--bright':''}" cx="${x}" cy="${y}" r="${r}" style="--node-delay:-${(index*.8+node*.63).toFixed(1)}s"/>`).join('');
    const glows=cluster.glow.map(node=>{
      const [x,y,r]=cluster.nodes[node];
      return `<circle class="network-node-glow" cx="${x}" cy="${y}" r="${r*8}" style="--node-delay:-${(index*.8+node*.63).toFixed(1)}s"/>`;
    }).join('');
    return `<g class="network-anchor${index%4===3?' network-anchor--mobile-sparse':''}"><g class="particle-cluster particle-depth-${cluster.depth}" style="--cluster-delay:-${(index*1.7).toFixed(1)}s;--formation-duration:${12+index%4*2}s">${glows}<g class="network-edges">${edges}</g>${nodes}</g></g>`;
  }).join('');
  const pointsMarkup=distantPoints.map(([x,y],index)=>`<circle class="network-distant" data-x="${x}" data-y="${y}" r="${index%4===0?1.8:1.2}" style="--node-delay:-${(index*.47).toFixed(1)}s"/>`).join('');
  const definitions='<defs><radialGradient id="network-node-glow"><stop stop-color="#b8dcff" stop-opacity=".48"/><stop offset=".45" stop-color="#65adff" stop-opacity=".2"/><stop offset="1" stop-color="#277be8" stop-opacity="0"/></radialGradient></defs>';
  document.body.insertAdjacentHTML('afterbegin',`<div class="home-particle-network" id="home-particle-network" aria-hidden="true"><svg preserveAspectRatio="none" focusable="false">${definitions}<g class="network-distant-field">${pointsMarkup}</g>${clusterMarkup}</svg></div>`);
  const layer=$('#home-particle-network');
  const svg=layer.querySelector('svg');
  const footer=$('footer.site-footer');
  if(!footer)throw new Error('Home particle network requires the site footer as its lower boundary.');
  const anchors=[...layer.querySelectorAll('.network-anchor')];
  const distant=[...layer.querySelectorAll('.network-distant')];
  const resize=()=>{
    const width=document.documentElement.clientWidth;
    const height=Math.max(1,footer.offsetTop-1);
    const scale=Math.max(.68,Math.min(1,width/760));
    layer.style.height=`${height}px`;
    svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
    anchors.forEach((anchor,index)=>{
      const y=width<650&&clusters[index].mobileY!==undefined?clusters[index].mobileY:clusters[index].y;
      anchor.setAttribute('transform',`translate(${width*clusters[index].x} ${height*y}) scale(${scale})`);
    });
    distant.forEach(point=>point.setAttribute('cx',String(width*Number(point.dataset.x))));
    distant.forEach(point=>point.setAttribute('cy',String(height*Number(point.dataset.y))));
  };
  resize();
  new ResizeObserver(resize).observe(document.body);
  window.addEventListener('load',resize,{once:true});
  window.addEventListener('resize',resize,{passive:true});
};
const initHomeHeroMotion=()=>{
  const hero=$('.hero');
  if(!hero)return;
  const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,pointerPosition=null;
  const motionDisabled=()=>!finePointer.matches||reducedMotion.matches||
    document.documentElement.classList.contains('access-reduced-motion')||
    document.documentElement.classList.contains('access-disable-animations')||
    document.documentElement.classList.contains('access-disable-parallax');
  const reset=()=>{
    if(frame)cancelAnimationFrame(frame);
    frame=0;
    pointerPosition=null;
    hero.style.removeProperty('--hero-motion-x');
    hero.style.removeProperty('--hero-motion-y');
    hero.removeAttribute('data-hero-pointer-active');
  };
  hero.addEventListener('pointermove',event=>{
    if(motionDisabled()||event.pointerType==='touch'){reset();return}
    const bounds=hero.getBoundingClientRect();
    if(!bounds.width||!bounds.height)return;
    pointerPosition={
      x:((event.clientX-bounds.left)/bounds.width-.5)*24,
      y:((event.clientY-bounds.top)/bounds.height-.5)*16
    };
    if(frame)return;
    frame=requestAnimationFrame(()=>{
      if(pointerPosition){
        hero.style.setProperty('--hero-motion-x',`${Math.round(pointerPosition.x)}px`);
        hero.style.setProperty('--hero-motion-y',`${Math.round(pointerPosition.y)}px`);
        hero.dataset.heroPointerActive='';
      }
      frame=0;
    });
  },{passive:true});
  hero.addEventListener('pointerleave',reset,{passive:true});
  hero.addEventListener('pointercancel',reset,{passive:true});
  const syncMotion=()=>{if(motionDisabled())reset()};
  finePointer.addEventListener('change',syncMotion);
  reducedMotion.addEventListener('change',syncMotion);
  document.addEventListener('visibilitychange',syncMotion);
  document.addEventListener('bb-accessibility-motion-change',syncMotion);
};
const NAV_ICONS={
  inicio:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-7h5v7"/></svg>',
  catalogo:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  ofertas:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 13.5 12 22l-9-9V4h9z"/><circle cx="8" cy="8" r="1.5"/><path d="m14 8 2.5 2.5M10.5 11.5l-4 4"/></svg>',
  empresas:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V5h10v16M14 9h6v12"/><path d="M7 9h4M7 13h4M7 17h4M17 13h1M17 17h1"/></svg>',
  contacto:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
  ingresar:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 21c.8-4.2 3.3-6.5 7.5-6.5s6.7 2.3 7.5 6.5"/></svg>'
};
const NAV=[['index.html','inicio','Inicio'],['ofertas.html','ofertas','Ofertas'],['empresas.html','empresas','Empresas'],['contacto.html','contacto','Contacto'],['login.html','ingresar','Ingresar']];
const page=document.body.dataset.page;
const navLink=n=>`<a href="${n[0]}" ${n[0].startsWith(page)?'aria-current="page"':''}><span class="nav-icon">${NAV_ICONS[n[1]]}</span><span>${n[2]}</span></a>`;
const selectedCategory=new URLSearchParams(location.search).get('cat')||'';
const catalogMenu=`<div class="nav-dropdown"><button class="nav-dropdown-toggle" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="nav-catalog-menu"><span class="nav-icon">${NAV_ICONS.catalogo}</span><span>Catálogo</span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m2 4 4 4 4-4"/></svg></button><div class="nav-dropdown-menu" id="nav-catalog-menu" role="group" aria-label="Catálogo y categorías"><a class="nav-dropdown-all" href="catalogo.html" ${page==='catalogo'&&!selectedCategory?'aria-current="page"':''}><span class="nav-dropdown-icon">${NAV_ICONS.catalogo}</span><span>Todo el catálogo</span></a>${CATS.map(c=>`<a href="${categoryHref(c)}" ${(page==='catalogo'&&selectedCategory===c)||(page==='gadgets'&&c==='Gadgets')?'aria-current="page"':''}><span class="nav-dropdown-icon">${CAT_ICONS[c]||''}</span><span>${c}</span></a>`).join('')}</div></div>`;
document.body.insertAdjacentHTML('afterbegin',`<div id="bar"></div><header><div class="wrap nav"><a class="logo" href="index.html" aria-label="BALBOABITS inicio"><img class="brand-mark" src="images/brand/balboabits-logo.webp" alt="BALBOABITS" width="210" height="70"></a><button id="mb" type="button" aria-expanded="false" aria-controls="nv" aria-label="Abrir menú"><svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg><span class="menu-label">Menú</span></button><nav id="nv" aria-label="Principal">${NAV.slice(0,1).map(navLink).join('')}${catalogMenu}${NAV.slice(1).map(navLink).join('')}</nav><a class="cartb" href="carrito.html" aria-label="Carrito"><svg class="cart-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L20.5 8H7"/><circle cx="10" cy="19" r="1.5"/><circle cx="18" cy="19" r="1.5"/></svg><span>Carrito</span><b id="cn">0</b></a></div></header>`);
document.body.insertAdjacentHTML('beforeend',`
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-main">
      <section class="footer-brand" aria-label="Acerca de BALBOABITS">
        <a class="logo" href="index.html" aria-label="BALBOABITS inicio"><img class="brand-mark" src="images/brand/balboabits-logo.webp" alt="BALBOABITS" width="210" height="70"></a>
        <p>Encuentra tecnología para todo lo que te mueve.</p>
        <span class="footer-status"><i aria-hidden="true"></i> Explora BALBOABITS</span>
      </section>
      <nav class="footer-column" aria-label="Explorar">
        <h2>Explorar</h2>
        <a href="catalogo.html">Catálogo</a>
        <a href="gadgets.html">Gadgets</a>
        <a href="ofertas.html">Ofertas</a>
        <a href="empresas.html">Soluciones para empresas</a>
      </nav>
      <nav class="footer-column" aria-label="Asistencia">
        <h2>Asistencia</h2>
        <a href="contacto.html">Contacto</a>
        <a href="login.html">Ingresar</a>
        <a href="registro.html">Crear cuenta</a>
      </nav>
      <nav class="footer-column" aria-label="Información del sitio">
        <h2>Información</h2>
        <a href="cookies.html">Cookies y privacidad</a>
        <a href="colaboradores.html">Colaboradores</a>
        <a href="agradecimiento.html">Carta de agradecimiento</a>
        <button type="button" class="footer-action" data-cookie-open>Aviso del sitio</button>
        <button type="button" class="footer-action" data-accessibility-open aria-haspopup="dialog" aria-expanded="false" aria-controls="accessibility-panel">Accesibilidad</button>
      </nav>
    </div>
    <section class="footer-team" id="colaboradores" aria-labelledby="footer-team-title">
      <div class="footer-team-copy">
        <span class="footer-kicker">El equipo detrás de BalboaBits</span>
        <h2 id="footer-team-title">Colaboradores</h2>
      </div>
      <ul class="footer-names">
        <li>Adrián Cisneros</li>
        <li>Tomas Juárez</li>
        <li>Carlos Castillo</li>
      </ul>
      <div class="footer-academic">
        <img src="images/brand/facultad-fiec.png" alt="Emblema de la Facultad de Informática, Electrónica y Comunicación" width="76" height="76">
        <div>
          <span>Facultad de Informática,<br>Electrónica y Comunicación</span>
          <strong>Licenciatura en Comercio Electrónico</strong>
        </div>
      </div>
    </section>
    <div class="footer-bottom">
      <p>© 2026 BALBOABITS <span>·</span> Proyecto demostrativo</p>
      <div class="footer-payments" aria-label="Métodos de pago simulados">
        <span class="payment-label">Métodos de pago</span>
        <span class="payment-mark payment-visa">VISA</span>
        <span class="payment-mark payment-mastercard"><i></i><i></i></span>
        <img class="payment-mark payment-brand-logo payment-yappy" src="images/payments/yappy-logo.png" alt="Yappy" width="74" height="28">
        <img class="payment-mark payment-brand-logo payment-banco" src="images/payments/banco-general-logo.png" alt="Banco General" width="88" height="28">
        <span class="payment-mark payment-paypal">PayPal</span>
        <img class="payment-mark payment-brand-logo payment-clave" src="images/payments/clave-logo.png" alt="Clave" width="74" height="28">
      </div>
      <p>CH9661 · Herramientas para el Desarrollo de Sitios Web I</p>
    </div>
  </div>
</footer>
<div id="toast" role="status" aria-live="polite"></div>
<dialog id="privacyNotice" class="privacy-dialog" aria-labelledby="privacy-title">
  <div class="privacy-dialog-content">
    <span class="eyebrow">BALBOABITS · AVISO DEL SITIO</span>
    <h2 id="privacy-title">Una demo, con claridad.</h2>
    <p>Este sitio es un proyecto demostrativo. Los formularios no envían ni guardan datos personales y no procesamos compras. No usamos cookies de analítica ni publicidad.</p>
    <p class="privacy-dialog-note">El carrito y la preferencia para no repetir este aviso pueden mantenerse solo en este navegador. No se envían a nuestros servidores.</p>
    <div class="privacy-actions">
      <a class="btn o" href="cookies.html" data-cookie-mark-seen>Leer aviso completo</a>
      <button class="btn" type="button" data-cookie-dismiss>Entendido</button>
    </div>
  </div>
</dialog>`);
const privacyNotice=$('#privacyNotice');
const markPrivacyNoticeSeen=()=>{
  try{sessionStorage.setItem('bbPrivacyNoticeSeen','1')}
  catch(error){console.warn('No se pudo recordar el cierre del aviso en esta sesión.',error)}
};
document.addEventListener('click',e=>{
  const open=e.target.closest('[data-cookie-open]');
  if(open){if(!privacyNotice.open)privacyNotice.show();return}
  const dismiss=e.target.closest('[data-cookie-dismiss]');
  if(dismiss&&privacyNotice.open)privacyNotice.close();
  if(e.target.closest('[data-cookie-mark-seen]'))markPrivacyNoticeSeen();
});
privacyNotice.addEventListener('close',markPrivacyNoticeSeen);
if(page!=='cookies'){
  try{if(sessionStorage.getItem('bbPrivacyNoticeSeen')!=='1')privacyNotice.show()}
  catch(error){console.warn('No se pudo comprobar si el aviso ya se mostró en esta sesión.',error);privacyNotice.show()}
}
const mobileMenuButton=$('#mb'),mobileNav=$('#nv');
const categoryDropdown=$('.nav-dropdown'),categoryToggle=$('.nav-dropdown-toggle');
const setCategoryDropdownOpen=open=>{categoryDropdown.classList.toggle('open',open);categoryToggle.setAttribute('aria-expanded',String(open))};
const setMobileMenuOpen=open=>{
  mobileNav.classList.toggle('open',open);
  mobileMenuButton.setAttribute('aria-expanded',String(open));
  mobileMenuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  mobileMenuButton.querySelector('.menu-label').textContent=open?'Cerrar':'Menú';
  if(!open)setCategoryDropdownOpen(false);
};
mobileMenuButton.addEventListener('click',()=>setMobileMenuOpen(!mobileNav.classList.contains('open')));
categoryDropdown.addEventListener('focusout',e=>{if(!categoryDropdown.contains(e.relatedTarget))setCategoryDropdownOpen(false)});
categoryToggle.addEventListener('click',()=>setCategoryDropdownOpen(!categoryDropdown.classList.contains('open')));
mobileNav.addEventListener('click',e=>{if(e.target.closest('a'))setMobileMenuOpen(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobileNav.classList.contains('open')){setMobileMenuOpen(false);mobileMenuButton.focus()}});
document.addEventListener('click',e=>{if(mobileNav.classList.contains('open')&&!mobileNav.contains(e.target)&&!mobileMenuButton.contains(e.target))setMobileMenuOpen(false)});
document.addEventListener('click',e=>{if(!categoryDropdown.contains(e.target))setCategoryDropdownOpen(false)});
cart.badge();
document.addEventListener('click',e=>{const a=e.target.closest('[data-add]');if(a)cart.add(a.dataset.add,+(a.dataset.q||1))});
const crumb=t=>`<nav class="crumb wrap" aria-label="Ruta"><a href="index.html">Inicio</a> / ${t}</nav>`;
const main=$('main');
let productNavigationPending=false;
document.addEventListener('click',event=>{
  if(!(event.target instanceof Element))return;
  const link=event.target.closest('a[href]');
  if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.hasAttribute('download')||link.target&&link.target!=='_self')return;
  const destination=new URL(link.href,location.href);
  if(destination.origin!==location.origin||destination.pathname!==new URL('producto.html',location.href).pathname||destination.href===location.href)return;
  if(productNavigationPending){event.preventDefault();return}
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  event.preventDefault();
  productNavigationPending=true;
  document.documentElement.classList.add('product-navigation-out');
  window.setTimeout(()=>location.assign(destination.href),240);
});
window.addEventListener('pageshow',()=>{
  productNavigationPending=false;
  document.documentElement.classList.remove('product-navigation-out');
});
const SERVICE_BENEFITS=[
 {className:'service-robot--warranty',label:'Robot que revisa y protege un producto',art:`<svg class="benefit-character benefit-character--warranty" viewBox="0 0 260 230" role="presentation" focusable="false">
  <defs>
   <linearGradient id="w-shell" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f8fbff"/><stop offset=".48" stop-color="#c5d4e7"/><stop offset="1" stop-color="#7286a1"/></linearGradient>
   <linearGradient id="w-screen" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#16283e"/><stop offset="1" stop-color="#09121f"/></linearGradient>
   <linearGradient id="w-blue" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#87c7ff"/><stop offset=".52" stop-color="#277be8"/><stop offset="1" stop-color="#17449b"/></linearGradient>
   <linearGradient id="w-shield" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a7dbff"/><stop offset=".5" stop-color="#4d9dff"/><stop offset="1" stop-color="#2457b2"/></linearGradient>
  </defs>
  <ellipse cx="126" cy="210" rx="60" ry="10" fill="#02050a" opacity=".58"/>
  <path d="M106 173h18v23q0 8-9 8t-9-8zm28 0h18v23q0 8-9 8t-9-8z" fill="url(#w-shell)" stroke="#8195ae" stroke-width="2"/>
  <path d="M100 196h23q7 0 7 7v3h-36v-3q0-7 6-7m34 0h23q7 0 7 7v3h-36v-3q0-7 6-7" fill="#60738c"/>
  <g class="benefit-arm benefit-arm--wave"><path d="M94 133q-18 2-22 18l-9 16" fill="none" stroke="url(#w-shell)" stroke-width="15" stroke-linecap="round"/><circle cx="61" cy="167" r="10" fill="url(#w-blue)"/><path d="M57 159q-8-16 0-23m8 25q9-14 3-23" fill="none" stroke="#dcecff" stroke-width="6" stroke-linecap="round"/></g>
  <g class="benefit-arm"><path d="M164 135q20 2 24 18l4 15" fill="none" stroke="url(#w-shell)" stroke-width="15" stroke-linecap="round"/><circle cx="192" cy="169" r="9" fill="url(#w-blue)"/></g>
  <rect x="91" y="119" width="79" height="65" rx="23" fill="url(#w-blue)" stroke="#9bcfff" stroke-opacity=".55" stroke-width="2"/>
  <path d="M101 131q25-13 57 0" fill="none" stroke="#d5ecff" stroke-opacity=".45" stroke-width="4" stroke-linecap="round"/>
  <circle cx="130" cy="153" r="15" fill="#11253d" stroke="#8ac4ff" stroke-opacity=".58" stroke-width="2"/>
  <path d="m123 153 5 5 10-12" fill="none" stroke="#a9dcff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="84" y="47" width="94" height="79" rx="31" fill="url(#w-shell)" stroke="#fff" stroke-opacity=".8" stroke-width="2"/>
  <path d="M100 56q28-16 58 0" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="5" stroke-linecap="round"/>
  <rect x="94" y="62" width="74" height="48" rx="19" fill="url(#w-screen)" stroke="#92a8c6" stroke-opacity=".8" stroke-width="2"/>
  <ellipse cx="116" cy="84" rx="5" ry="7" fill="#83d4ff"/><ellipse cx="145" cy="84" rx="5" ry="7" fill="#83d4ff"/>
  <path d="M119 97q11 8 23 0" fill="none" stroke="#7abfff" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="80" cy="85" r="9" fill="url(#w-blue)"/><circle cx="181" cy="85" r="9" fill="url(#w-blue)"/>
  <path d="M130 48V37" stroke="#8195ae" stroke-width="5" stroke-linecap="round"/><circle cx="130" cy="33" r="7" fill="#e34c65"/><circle cx="128" cy="31" r="2" fill="#fff" opacity=".8"/>
  <g class="benefit-shield"><path d="M203 74 226 83v17q0 22-23 34-23-12-23-34V83z" fill="url(#w-shield)" stroke="#d7efff" stroke-width="2"/><path d="m192 99 8 8 15-18" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>
  <path d="m43 101 3 7 7 3-7 3-3 7-3-7-7-3 7-3zm174 77 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#d6e9ff"/>
 </svg>`},
 {className:'service-robot--delivery',label:'Robot que prepara y entrega un paquete',art:`<svg class="benefit-character benefit-character--delivery" viewBox="0 0 260 230" role="presentation" focusable="false">
  <defs>
   <linearGradient id="d-shell" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".52" stop-color="#d5dfed"/><stop offset="1" stop-color="#8093ac"/></linearGradient>
   <linearGradient id="d-screen" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#17283c"/><stop offset="1" stop-color="#080f1a"/></linearGradient>
   <linearGradient id="d-red" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff9b89"/><stop offset=".5" stop-color="#e34c65"/><stop offset="1" stop-color="#a91e42"/></linearGradient>
   <linearGradient id="d-box" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffe2a1"/><stop offset=".55" stop-color="#e8a84b"/><stop offset="1" stop-color="#a86628"/></linearGradient>
  </defs>
  <ellipse cx="127" cy="210" rx="62" ry="10" fill="#02050a" opacity=".58"/>
  <path d="M105 174h19v23q0 8-9 8t-10-8zm29 0h19v23q0 8-10 8t-9-8z" fill="url(#d-shell)" stroke="#8195ae" stroke-width="2"/>
  <path d="M101 196h23q7 0 7 7v3H95v-3q0-7 6-7m35 0h23q7 0 7 7v3h-36v-3q0-7 6-7" fill="#60738c"/>
  <g class="benefit-delivery-pack"><rect x="165" y="105" width="40" height="48" rx="7" fill="url(#d-box)" stroke="#ffe0a2" stroke-width="2"/><path d="M185 106v46m-19-30h38m-27-15 8 10 8-10" fill="none" stroke="#9d6127" stroke-width="3" stroke-linejoin="round"/></g>
  <g class="benefit-arm benefit-arm--delivery"><path d="M95 133q-20 1-24 18l-5 14" fill="none" stroke="url(#d-shell)" stroke-width="15" stroke-linecap="round"/><circle cx="65" cy="166" r="9" fill="url(#d-red)"/><path d="M59 159q-8-13-2-20m10 22q10-12 5-22" fill="none" stroke="#e8f4ff" stroke-width="5" stroke-linecap="round"/></g>
  <g class="benefit-arm"><path d="M164 137q19 0 22 17l-2 12" fill="none" stroke="url(#d-shell)" stroke-width="15" stroke-linecap="round"/><circle cx="184" cy="167" r="9" fill="url(#d-red)"/></g>
  <rect x="91" y="121" width="78" height="63" rx="22" fill="url(#d-red)" stroke="#ffb5a8" stroke-opacity=".65" stroke-width="2"/>
  <path d="M102 132q28-13 55 0" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/>
  <rect x="112" y="144" width="37" height="24" rx="8" fill="#f1f5fb" opacity=".92"/><path d="m118 151 8 7 15-13" fill="none" stroke="#d75a61" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="84" y="49" width="94" height="78" rx="30" fill="url(#d-shell)" stroke="#fff" stroke-opacity=".8" stroke-width="2"/>
  <path d="M84 70q44-35 95-1l-5 14H88z" fill="url(#d-red)" stroke="#ffc2b4" stroke-width="2"/>
  <path d="M94 81q34-14 72 0v28q0 13-13 13h-46q-13 0-13-13z" fill="url(#d-screen)" stroke="#9eb1c8" stroke-width="2"/>
  <ellipse cx="115" cy="95" rx="5" ry="7" fill="#83d4ff"/><ellipse cx="145" cy="95" rx="5" ry="7" fill="#83d4ff"/>
  <path d="M119 108q11 7 22 0" fill="none" stroke="#7abfff" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="80" cy="94" r="9" fill="url(#d-red)"/><circle cx="181" cy="94" r="9" fill="url(#d-red)"/>
  <path d="M130 50V40" stroke="#8195ae" stroke-width="5" stroke-linecap="round"/><circle cx="130" cy="36" r="6" fill="#65adff"/>
  <g class="benefit-delivery-spark"><path d="m53 111 3 7 7 3-7 3-3 7-3-7-7-3 7-3zm168 38 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ffd6a2"/></g>
 </svg>`},
 {className:'service-robot--invoice',label:'Robot que prepara la factura del pedido',art:`<svg class="benefit-character benefit-character--invoice" viewBox="0 0 260 230" role="presentation" focusable="false">
  <defs>
   <linearGradient id="i-shell" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".5" stop-color="#d4dfef"/><stop offset="1" stop-color="#8294ac"/></linearGradient>
   <linearGradient id="i-screen" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#152a43"/><stop offset="1" stop-color="#080f1a"/></linearGradient>
   <linearGradient id="i-suit" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8fc8ff"/><stop offset=".52" stop-color="#3476c5"/><stop offset="1" stop-color="#193d75"/></linearGradient>
   <linearGradient id="i-paper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#c6d4e5"/></linearGradient>
  </defs>
  <ellipse cx="124" cy="210" rx="59" ry="10" fill="#02050a" opacity=".58"/>
  <path d="M103 173h19v24q0 8-10 8t-9-8zm29 0h19v24q0 8-10 8t-9-8z" fill="url(#i-shell)" stroke="#8195ae" stroke-width="2"/>
  <path d="M99 196h23q7 0 7 7v3H93v-3q0-7 6-7m35 0h23q7 0 7 7v3h-36v-3q0-7 6-7" fill="#60738c"/>
  <g class="benefit-invoice-receipt"><path d="M189 57h42v76l-7-5-7 5-7-5-7 5-7-5-7 5z" fill="url(#i-paper)" stroke="#fff" stroke-width="2"/><path d="M197 73h26m-26 10h26m-26 10h17" stroke="#7388a3" stroke-width="3" stroke-linecap="round"/><circle cx="215" cy="116" r="8" fill="#277be8"/><path d="m211 116 3 3 6-7" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g class="benefit-arm"><path d="M95 137q-20 0-24 17l-5 13" fill="none" stroke="url(#i-shell)" stroke-width="15" stroke-linecap="round"/><circle cx="64" cy="168" r="9" fill="url(#i-suit)"/></g>
  <g class="benefit-arm benefit-arm--wave"><path d="M164 134q20 0 23 17l2 15" fill="none" stroke="url(#i-shell)" stroke-width="15" stroke-linecap="round"/><circle cx="190" cy="166" r="9" fill="url(#i-suit)"/><path d="M186 159q-7-13-1-20m10 22q9-13 4-22" fill="none" stroke="#e7f2ff" stroke-width="5" stroke-linecap="round"/></g>
  <rect x="91" y="120" width="78" height="65" rx="22" fill="url(#i-suit)" stroke="#afd8ff" stroke-opacity=".65" stroke-width="2"/>
  <path d="m117 124 13 17 13-17" fill="#fff" opacity=".88"/><path d="m126 140 4 0 7 29-8 9-8-9z" fill="#d95868"/>
  <path d="M102 132q28-12 55 0" fill="none" stroke="#e4f2ff" stroke-opacity=".52" stroke-width="4" stroke-linecap="round"/>
  <rect x="84" y="48" width="94" height="79" rx="30" fill="url(#i-shell)" stroke="#fff" stroke-opacity=".82" stroke-width="2"/>
  <path d="M101 57q29-15 58 0" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="5" stroke-linecap="round"/>
  <rect x="94" y="64" width="74" height="47" rx="18" fill="url(#i-screen)" stroke="#9eb1c8" stroke-width="2"/>
  <g fill="none" stroke="#89c5ff" stroke-width="2.5"><rect x="105" y="78" width="22" height="17" rx="7"/><rect x="135" y="78" width="22" height="17" rx="7"/><path d="M127 85h8"/></g>
  <circle cx="80" cy="87" r="9" fill="url(#i-suit)"/><circle cx="181" cy="87" r="9" fill="url(#i-suit)"/>
  <path d="M130 48V38" stroke="#8195ae" stroke-width="5" stroke-linecap="round"/><circle cx="130" cy="34" r="6" fill="#d95868"/>
  <path d="m43 105 3 7 7 3-7 3-3 7-3-7-7-3 7-3zm179 58 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#c6dcff"/>
 </svg>`}
];
const SERVICE_REVIEWS=[
 {rating:5,text:'Buen sonido para trabajar y escuchar música.'},
 {rating:4,text:'La laptop llegó bien protegida y funciona excelente.'},
 {rating:3,text:'Buena relación calidad-precio; quisiera más colores.'},
 {rating:5,text:'Fácil de elegir y con opciones para cada presupuesto.'},
 {rating:4,text:'Me gustó la variedad de accesorios disponibles.'},
 {rating:3,text:'Cumple lo esperado; me gustaría ver más modelos.'}
];
/* ===== Páginas ===== */
const V={
index(){const f=CATALOG_PRODUCTS.filter(p=>p.o>p.p).slice(0,4),news=CATALOG_PRODUCTS.slice(4,10),serviceRobots=SERVICE_BENEFITS.map(benefit=>`<div class="service-robot ${benefit.className}" role="img" aria-label="${benefit.label}">${benefit.art}</div>`).join(''),reviewCards=SERVICE_REVIEWS.map(review=>`<article class="service-review-card"><div class="service-review-meta"><span class="service-review-stars" aria-label="${review.rating} de 5 estrellas">${'★'.repeat(review.rating)}<span>${'☆'.repeat(5-review.rating)}</span></span></div><p>${review.text}</p></article>`).join(''),reviewGroup=`<div class="service-review-group">${reviewCards}</div>`,reviewBackdrop=`<div class="service-review-marquee" aria-hidden="true"><div class="service-review-track">${reviewGroup}${reviewGroup}</div><div class="service-review-track service-review-track--reverse">${reviewGroup}${reviewGroup}</div></div>`;main.innerHTML=`
<section class="hero"><div class="wrap"><span class="eyebrow">BALBOABITS · TECNOLOGÍA SELECCIONADA</span><h1>La tecnología<br><em>con otra energía.</em></h1><p>Audio, computadoras, móviles y gaming seleccionados para quienes buscan algo más que lo de siempre. Descubre una experiencia tecnológica con identidad panameña.</p><div class="btns"><a class="btn" href="catalogo.html">Explorar catálogo <span aria-hidden="true">↗</span></a><a class="btn o" href="ofertas.html">Descubrir ofertas</a></div></div></section>
<section class="sec"><div class="wrap"><h2 class="rv">Destacados</h2><div class="grid">${f.map(card).join('')}</div></div></section>
<section class="sec news-section" aria-labelledby="news-title"><div class="wrap">
  <div class="news-heading rv"><div><span class="eyebrow">TECNOLOGÍA SELECCIONADA · PANAMÁ</span><h2 id="news-title">Novedades<span>.</span></h2><p>Diseño, rendimiento y tecnología para tu día a día.</p></div>
    <div class="news-heading-controls"><div class="news-counter" aria-live="polite"><b data-news-current>01</b><span>/</span><span>${String(news.length).padStart(2,'0')}</span></div><button class="news-control news-motion" type="button" data-news-motion aria-label="Pausar movimiento automático"></button></div>
  </div>
  <div class="news-carousel" data-news-carousel role="region" aria-roledescription="carrusel" aria-label="Novedades de productos">
    <div class="news-stage" data-news-stage tabindex="0" aria-label="Productos destacados. Usa las flechas izquierda y derecha para explorar."><button class="news-control" type="button" data-news-previous aria-label="Producto anterior"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m7 7-7-7 7-7"/></svg></button><button class="news-control" type="button" data-news-next aria-label="Producto siguiente"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></button>${news.map((p,index)=>newsSlide(p,index,news.length)).join('')}</div>
    <div class="news-footer"><div class="news-dots" data-news-dots role="group" aria-label="Seleccionar producto"></div><span class="news-hint">Desliza o utiliza las flechas para explorar</span></div>
  </div>
</div></section>
<section class="sec category-section">
  <div class="category-marquee" aria-hidden="true">${categoryMarquee}</div>
  <div class="wrap cats">
    <div class="cats-header rv"><div><span class="eyebrow">Explora por necesidades</span><h2>Categorías</h2></div><a class="text-link" href="catalogo.html">Ver todo el catálogo <span aria-hidden="true">↗</span></a></div>
    <div class="category-grid">${CATS.map((c,i)=>`<a class="category-card rv" href="${categoryHref(c)}"><div class="category-card-top"><span class="category-overline">EXPLORAR</span><span class="category-index">${String(i+1).padStart(2,'0')}</span></div><span class="category-art" aria-hidden="true">${CAT_ICONS[c]||''}</span><div class="category-card-copy"><h3>${c}</h3><p><b>${P.filter(p=>p.c===c).length}</b> productos</p></div><span class="category-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>
  </div>
</section>
<section class="sec"><div class="wrap"><div class="band rv"><div><h2 style="margin:0">Equipa tu empresa.</h2><p>Cotizaciones por volumen y facturación empresarial.</p></div><a class="btn" style="background:#08090B" href="empresas.html">Pedir cotización</a></div></div></section>
<section class="sec recommendation-section" data-recommendations aria-labelledby="recommendations-title"><div class="wrap">
  <div class="recommendation-heading"><div><span class="eyebrow">MÁS OPCIONES PARA DESCUBRIR</span><h2 class="rv" id="recommendations-title">Recomendados</h2><p>Explora una selección de productos que cambia con calma para que puedas descubrir más.</p></div>
    <div class="recommendation-controls"><div class="news-counter" aria-live="off"><b data-recommendation-current>01</b><span>/</span><span data-recommendation-total></span></div><button class="news-control" type="button" data-recommendation-previous aria-label="Ver recomendaciones anteriores"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m7 7-7-7 7-7"/></svg></button><button class="news-control news-motion" type="button" data-recommendation-motion></button><button class="news-control" type="button" data-recommendation-next aria-label="Ver más recomendaciones"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></button></div>
  </div>
  <div class="grid recommendation-grid" data-recommendations-grid role="group" aria-label="Productos recomendados" aria-live="off"></div>
</div></section>
<section class="sec service-benefits" aria-label="Robots colaborando en las etapas de una compra y opiniones de muestra, no reseñas reales">${reviewBackdrop}<div class="service-review-note">OPINIONES DE MUESTRA</div><div class="wrap"><div class="service-benefits-stage">${serviceRobots}</div></div></section>`},
catalogo(){const q0=new URLSearchParams(location.search);if(q0.get('cat')==='Gadgets'){location.replace('gadgets.html');return}let S={q:q0.get('q')||'',c:q0.get('cat')||'',o:'rel',page:1,pageSize:10},timer;const landingCategory=CATALOG_LANDINGS[S.c];
main.innerHTML=`<div id="catalog-heading">${crumb('Catálogo')}</div><div class="wrap sec catalog-page" style="padding-top:0"><h1 class="catalog-title" id="catalog-title">Catálogo</h1><div class="catalog-tools"><input id="q" type="search" placeholder="Buscar productos" aria-label="Buscar productos"><div class="catalog-sort" aria-label="Ordenar catálogo"><button type="button" class="sort-option active" data-sort="rel">Relevancia</button><button type="button" class="sort-option" data-sort="lo">Precio menor</button><button type="button" class="sort-option" data-sort="hi">Precio mayor</button></div></div><div class="bar" id="ch"></div><p class="mut" id="st" aria-live="polite"></p><div class="grid" id="gr"></div><nav class="pagination" id="pg" aria-label="Páginas del catálogo"></nav></div>`;
$('#q').value=S.q;
const draw=()=>{const category=landingCategory;$('#catalog-heading').innerHTML=category?crumb(S.c)+`<section class="page-hero catalog-category-hero" aria-labelledby="catalog-category-title"><div class="wrap"><span class="eyebrow">${category.eyebrow}</span><h1 class="page-title" id="catalog-category-title">${category.title}</h1><p>${category.description}</p></div></section>`:crumb('Catálogo');$('#catalog-title').hidden=Boolean(category);$('#ch').hidden=Boolean(category);document.title=category?`${S.c} | BALBOABITS`:'Catálogo | BALBOABITS';let l=CATALOG_PRODUCTS.filter(p=>{const hay=[p.n,p.c,...p.s].join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const q=S.q.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();return (!S.c||p.c===S.c)&&hay.includes(q)});if(S.o==='lo')l.sort((a,b)=>a.p-b.p);if(S.o==='hi')l.sort((a,b)=>b.p-a.p);
$('#ch').innerHTML=['',...CATALOG_CATS].map(c=>`<button class="chip" data-c="${c}" aria-pressed="${S.c===c}">${c||'Todo'}</button>`).join('');
const pages=Math.ceil(l.length/S.pageSize);S.page=Math.min(S.page,Math.max(1,pages));const start=(S.page-1)*S.pageSize;
$('#gr').innerHTML=l.length?l.slice(start,start+S.pageSize).map(p=>card(p).replace('rv','rv in')).join(''):`<div class="empty" style="grid-column:1/-1"><h3>Por el momento no tenemos este producto disponible.</h3><p>Prueba otra palabra o quita el filtro de categoría.</p></div>`;
$('#st').textContent=l.length?`${start+1}–${Math.min(start+S.pageSize,l.length)} de ${l.length} productos`:'0 productos';
$('#pg').innerHTML=pages>1?`<button type="button" class="page-button" data-page="${S.page-1}" aria-label="Página anterior" ${S.page===1?'disabled':''}>Anterior</button>${Array.from({length:pages},(_,i)=>i+1).map(page=>`<button type="button" class="page-button" data-page="${page}" aria-label="Página ${page}" ${S.page===page?'aria-current="page"':''}>${page}</button>`).join('')}<button type="button" class="page-button" data-page="${S.page+1}" aria-label="Página siguiente" ${S.page===pages?'disabled':''}>Siguiente</button>`:''};
const run=()=>{S.page=1;draw()};
$('#q').oninput=e=>{clearTimeout(timer);$('#st').textContent='Buscando…';$('#gr').innerHTML=Array(4).fill('<div class="sk"></div>').join('');timer=setTimeout(()=>{S.q=e.target.value.trim();run()},300)};
$$('.sort-option').forEach(button=>button.onclick=()=>{$$('.sort-option').forEach(b=>b.classList.remove('active'));button.classList.add('active');S.o=button.dataset.sort;run()});$('#ch').onclick=e=>{const c=e.target.closest('[data-c]');if(c){S.c=c.dataset.c;run()}};$('#pg').onclick=e=>{const button=e.target.closest('[data-page]');if(button&&!button.disabled){const nextPage=Number(button.dataset.page);if(nextPage!==S.page){S.page=nextPage;draw();$('#gr').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}}};draw()},
gadgets(){
const items=['usb-sandisk','usb-kingston','hdd-seagate','hdd-wd','ssd-portable','ssd-crucial','ssd-990','dock-pro','reader-ink','powerbank-20k'].map(byId);
document.title='Gadgets | BALBOABITS';
main.innerHTML=crumb('Gadgets')+`<section class="page-hero"><div class="wrap"><span class="eyebrow">ALMACENAMIENTO Y ACCESORIOS</span><h1 class="page-title">Gadgets para<br><em>llevar más lejos.</em></h1><p>Memorias USB, discos HDD y SSD portátiles, almacenamiento NVMe y accesorios seleccionados.</p></div></section><section class="wrap sec"><div class="section-head"><div><span class="eyebrow">SELECCIÓN BALBOABITS</span><h2>USB, HDD y SSD</h2></div><span class="mut">${items.length} productos</span></div><div class="grid">${items.map(card).join('')}</div></section>`;
},
producto(){const p=byId(new URLSearchParams(location.search).get('id'));
if(!p){main.innerHTML=crumb('Producto')+'<div class="wrap empty"><h2>Producto no encontrado</h2><a class="btn" href="catalogo.html">Volver al catálogo</a></div>';return}
document.title=p.n+' | BALBOABITS';
const relatedPool=p.c==='Gadgets'?P:CATALOG_PRODUCTS;
const returnPage=p.c==='Gadgets'?'gadgets.html':'catalogo.html',returnLabel=p.c==='Gadgets'?'Gadgets':'Catálogo';
main.innerHTML=crumb(`<a href="${returnPage}">${returnLabel}</a> / ${p.n}`)+`<div class="wrap sec product-page" style="padding-top:0"><div class="split"><div>${img(p,800,600,1,true)}</div><div><div class="product-detail-top"><span class="mut">${p.c}</span><button class="detail-close" id="detailBack" type="button" aria-label="Volver a la página anterior" title="Volver atrás">×</button></div><h1 style="font-size:clamp(2rem,4.5vw,3.6rem);margin:8px 0 16px">${p.n}</h1><p style="font-size:1.8rem;font-weight:800">${$$m(p.p)} ${p.o>p.p?`<s class="mut" style="font-size:1rem">${$$m(p.o)}</s>`:''}</p><p class="tag" style="color:#5fd38d">Disponible: en stock</p><ul class="specs" style="margin:22px 0">${p.s.map(s=>`<li><span class="spec-icon" aria-hidden="true">${specIcon(p,s)}</span><span>${s}</span></li>`).join('')}</ul><div class="bar"><div class="qty"><button id="m" aria-label="Menos">−</button><span id="v" aria-live="polite">1</span><button id="pl" aria-label="Más">+</button></div><button class="btn" id="ad">Agregar al carrito</button></div></div></div><h2 style="margin-top:80px">Relacionados</h2><div class="grid">${relatedPool.filter(x=>x.c===p.c&&x.id!==p.id).concat(relatedPool.filter(x=>x.c!==p.c)).slice(0,4).map(card).join('')}</div></div>`;
let n=1;$('#detailBack').onclick=()=>{
  if(history.length>1){
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
      productNavigationPending=true;
      document.documentElement.classList.add('product-navigation-out');
      window.setTimeout(()=>history.back(),240);
    }else history.back();
    return;
  }
  const previousUrl=document.referrer;
  if(previousUrl&&new URL(previousUrl).origin===location.origin){location.assign(previousUrl);return}
  location.assign(returnPage)
};$('#m').onclick=()=>$('#v').textContent=n=Math.max(1,n-1);$('#pl').onclick=()=>$('#v').textContent=n=Math.min(10,n+1);$('#ad').onclick=()=>cart.add(p.id,n)},
carrito(){const draw=()=>{const c=cart.get(),ids=Object.keys(c).filter(byId);let t=0;
main.innerHTML=crumb('Carrito')+`<div class="wrap sec checkout-page" style="padding-top:0"><div class="checkout-heading"><div><span class="eyebrow">COMPRA DEMOSTRATIVA</span><h1>Finaliza tu pedido</h1></div><div class="checkout-steps"><span class="active"><b>1</b>Carrito</span><i></i><span><b>2</b>Datos</span><i></i><span><b>3</b>Pago</span></div></div>`+(ids.length?`
<div class="checkout-layout">
  <div class="checkout-main">
    <section class="checkout-card cart-items-card"><div class="checkout-card-heading"><span>01</span><div><h2>Productos seleccionados</h2><p>${ids.length} artículo${ids.length===1?'':'s'} en tu pedido</p></div></div>${ids.map(id=>{const p=byId(id),s=p.p*c[id];t+=s;return`<div class="checkout-row"><a href="producto.html?id=${id}">${img(p,96,72,false,true)}</a><div class="checkout-product"><h3>${p.n}</h3><span>${p.c}</span><div class="qty"><button data-d="${id}" data-v="-1" aria-label="Disminuir">−</button><span>${c[id]}</span><button data-d="${id}" data-v="1" aria-label="Aumentar">+</button></div><button class="link" data-rm="${id}">Eliminar</button></div><b>${$$m(s)}</b></div>`}).join('')}</section>
    <form id="checkoutForm" novalidate>
      <section class="checkout-card"><div class="checkout-card-heading"><span>02</span><div><h2>Datos del comprador</h2><p>Información necesaria para preparar la entrega.</p></div></div><div class="checkout-grid">
        <label>Nombre completo *<input name="fullName" type="text" placeholder="Nombre y apellido" required></label>
        <label>Cédula / identificación *<input name="idNumber" type="text" placeholder="Ej. 8-123-456" required></label>
        <label>Correo electrónico *<input name="email" type="email" placeholder="nombre@correo.com" required></label>
        <label>Teléfono / WhatsApp *<input name="phone" type="tel" placeholder="+507 0000-0000" required></label>
        <label class="checkout-full">Dirección de entrega *<input name="address" type="text" placeholder="Provincia, corregimiento, calle, edificio y referencia" required></label>
        <label class="checkout-full">Provincia *<select name="province" required><option value="" selected disabled>Selecciona una provincia</option><option>Ciudad de Panamá</option><option>Panamá Oeste</option><option>Colón</option><option>Coclé</option><option>Chiriquí</option><option>Veraguas</option><option>Herrera</option><option>Los Santos</option><option>Darién</option><option>Bocas del Toro</option></select></label>
        <label>Distrito / corregimiento *<input name="district" type="text" placeholder="Ej. San Francisco" required></label>
        <label>Código postal<input name="postal" type="text" placeholder="Ej. 0801"></label>
        <label class="checkout-full">Tipo de entrega *<select name="delivery" required><option value="" selected disabled>Selecciona tipo de entrega</option><option value="Entrega estándar — 2 a 5 días">Estándar · 2–5 días · $4</option><option value="Entrega express — 24 a 48 horas">Express · 24–48 h · $8</option><option value="Recoger en tienda">Recoger en tienda · Gratis</option></select></label>
      </div></section>
      <section class="checkout-card"><div class="checkout-card-heading"><span>03</span><div><h2>Método de pago</h2><p>Selecciona una opción simulada.</p></div></div>
        <div class="payment-grid">
          <label class="payment-option"><input type="radio" name="payment" value="Tarjeta Visa" required><span class="pay-badge pay-visa">VISA</span><strong>Tarjeta Visa</strong><small>Débito o crédito</small></label>
          <label class="payment-option"><input type="radio" name="payment" value="Mastercard"><span class="pay-badge pay-master"><i></i><i></i></span><strong>Mastercard</strong><small>Débito o crédito</small></label>
          <label class="payment-option"><input type="radio" name="payment" value="Yappy"><img class="pay-badge payment-brand-logo" src="images/payments/yappy-logo.png" alt="" aria-hidden="true" width="104" height="36"><strong>Yappy Panamá</strong><small>Pago móvil</small></label>
          <label class="payment-option"><input type="radio" name="payment" value="Banco General"><img class="pay-badge payment-brand-logo" src="images/payments/banco-general-logo.png" alt="" aria-hidden="true" width="104" height="36"><strong>Banco General</strong><small>Transferencia</small></label>
          <label class="payment-option"><input type="radio" name="payment" value="PayPal"><span class="pay-badge pay-paypal">PayPal</span><strong>PayPal</strong><small>Billetera digital</small></label>
          <label class="payment-option"><input type="radio" name="payment" value="Clave"><img class="pay-badge payment-brand-logo" src="images/payments/clave-logo.png" alt="" aria-hidden="true" width="104" height="36"><strong>Clave</strong><small>Pago electrónico</small></label>
        </div>
        <div id="paymentDetails" class="payment-details"></div>
      </section>
      <label class="checkout-consent"><input type="checkbox" name="terms" required><span>Confirmo que revisé los datos y acepto las condiciones de esta compra demostrativa.</span></label>
      <button class="btn checkout-submit" type="submit">Confirmar pedido <span aria-hidden="true">↗</span></button>
    </form>
  </div>
  <aside class="checkout-summary"><div class="summary-glow" aria-hidden="true"></div><span class="summary-kicker">RESUMEN</span><h2>Tu pedido</h2><div class="summary-lines"><div><span>Subtotal</span><b>${$$m(t)}</b></div><div><span>Entrega</span><b id="checkoutShipping">Por calcular</b></div><div class="summary-total-line"><span>Total</span><b id="checkoutTotal">${$$m(t)}</b></div></div><div class="secure-note"><span>✓</span><div><b>Compra simulada segura</b><small>No se procesan pagos reales ni se guardan datos sensibles.</small></div></div><a class="btn o checkout-back" href="catalogo.html">Seguir comprando</a></aside>
</div>
<dialog id="checkoutResult" class="checkout-result" aria-labelledby="checkout-result-title"><div class="checkout-result-content"><div class="checkout-success-icon" aria-hidden="true">✓</div><span>COMPRA DEMOSTRATIVA COMPLETADA</span><h2 id="checkout-result-title">¡Pedido realizado exitosamente!</h2><p id="checkoutThankYou"></p><div class="checkout-result-actions"><button type="button" class="btn" id="checkoutDone">Volver a la tienda</button></div></div></dialog>`:`<div class="empty"><h2>Tu carrito está vacío</h2><a class="btn" href="catalogo.html">Explorar catálogo</a></div>`)+'</div>';cart.badge();bindCheckout(ids)};
const bindCheckout=ids=>{
 const form=$('#checkoutForm');if(!form)return;
 const paymentDetails=$('#paymentDetails'),delivery=$('[name="delivery"]',form);
 const paymentFields=()=>{
  const payment=$('[name="payment"]:checked',form)?.value||'';let html='';
  if(payment==='Tarjeta Visa'||payment==='Mastercard'){
   html=`<div class="card-fields"><label>Nombre en la tarjeta *<input name="cardName" type="text" placeholder="Como aparece en la tarjeta" required></label><label>Número de tarjeta *<input name="cardNumber" inputmode="numeric" maxlength="19" pattern="[0-9 ]{19}" placeholder="0000 0000 0000 0000" required></label><label>Vencimiento *<input name="cardExpiry" inputmode="numeric" maxlength="5" pattern="[0-9]{2}/[0-9]{2}" placeholder="MM/AA" required></label><label>CVV *<input name="cardCvv" type="password" inputmode="numeric" maxlength="4" pattern="[0-9]{3,4}" placeholder="•••" required></label></div>`;
  }else if(payment==='Yappy'){
   html=`<div class="single-payment-field"><label>Teléfono Yappy *<input name="yappyPhone" type="tel" inputmode="numeric" pattern="[0-9+ ()-]+" placeholder="+507 0000-0000" required></label></div>`;
  }else if(payment==='Banco General'){
   html=`<fieldset class="choice-field bank-fields"><legend>Tipo de cuenta *</legend><div class="choice-grid"><label><input type="radio" name="bankAccount" value="Cuenta corriente" required><span>Cuenta corriente</span></label><label><input type="radio" name="bankAccount" value="Cuenta de ahorros"><span>Cuenta de ahorros</span></label></div></fieldset><label>Referencia / token de aprobación *<input name="bankRef" type="text" inputmode="numeric" pattern="[0-9]+" placeholder="Ej. 123456" required></label>`;
  }else if(payment==='PayPal'){
   html=`<div class="single-payment-field"><label>Correo PayPal demostrativo *<input name="paypalEmail" type="email" placeholder="usuario@ejemplo.com" required></label></div>`;
  }else if(payment==='Clave'){
   html=`<div class="single-payment-field"><label>Usuario o teléfono Clave *<input name="claveUser" type="text" placeholder="Usuario o teléfono" required></label></div>`;
  }paymentDetails.innerHTML=html;
 };
 form.addEventListener('change',event=>{
  if(event.target.name==='payment')paymentFields();
  $('#checkoutShipping').textContent=delivery?.value.startsWith('Entrega express')?'$8.00':delivery?.value.startsWith('Entrega estándar')?'$4.00':delivery?.value==='Recoger en tienda'?'Gratis':'Por calcular';
  const base=ids.reduce((sum,id)=>sum+byId(id).p*cart.get()[id],0);
  const extra=delivery?.value.startsWith('Entrega express')?8:delivery?.value.startsWith('Entrega estándar')?4:0;
  $('#checkoutTotal').textContent=$$m(base+extra);
 });
 paymentFields();
 form.addEventListener('submit',event=>{
  event.preventDefault();
  const required=[...$$('[required]',form)].filter(i=>i.type==='radio'?(!$('[name="'+i.name+'"]:checked',form)):i.type==='checkbox'?(!i.checked):(!i.value.trim()||!i.checkValidity()));
  required.forEach(i=>i.classList.add('checkout-invalid'));
  if(required.length){required[0].focus();toast('Completa los datos y el método de pago');return}
  const name=$('[name="fullName"]',form).value.trim();
  $('#checkoutThankYou').textContent=`Gracias por comprar, ${name}.`;
  $('#checkoutResult').showModal();
  cart.set({});
 });
 $$('[required]',form).forEach(i=>i.addEventListener('input',()=>i.classList.remove('checkout-invalid')));
 $('#checkoutDone')?.addEventListener('click',()=>{location.href='index.html'});
};
draw();main.onclick=e=>{const d=e.target.closest('[data-d]'),r=e.target.closest('[data-rm]'),c=cart.get();
if(d){c[d.dataset.d]=Math.max(1,Math.min(10,c[d.dataset.d]+ +d.dataset.v));cart.set(c);draw()}
if(r&&confirm('¿Eliminar este producto del carrito?')){delete c[r.dataset.rm];cart.set(c);draw()}
}},
ofertas(){
const o=CATALOG_PRODUCTS.filter(p=>p.o>p.p).sort((a,b)=>(b.o-b.p)-(a.o-a.p));
main.innerHTML=crumb('Ofertas')+`<section class="page-hero"><div class="wrap"><span class="eyebrow">SELECCIÓN ESPECIAL · BALBOABITS</span><h1 class="page-title">Ofertas que<br><em>valen la pena.</em></h1><p>Precios promocionales disponibles en los productos seleccionados. La disponibilidad y vigencia se confirman al consultar.</p><p class="live-clock" id="offer-clock" aria-live="off"></p></div></section><div class="wrap sec" style="padding-top:42px"><div class="offer-intro"><span class="live-dot"></span><span>SELECCIÓN PROMOCIONAL</span><span class="mut">·</span><span id="offer-count">${o.length} ofertas disponibles en este catálogo</span></div><div class="grid">${o.length?o.map(card).join(''):'<div class="empty"><h2>No hay ofertas activas</h2><p>Vuelve pronto para descubrir nuevas promociones.</p></div>'}</div></div>`;
const clock=$('#offer-clock');const tick=()=>{if(clock)clock.textContent='HORA LOCAL PANAMÁ · '+new Intl.DateTimeFormat('es-PA',{hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:'America/Panama'}).format(new Date())};tick();setInterval(tick,1000)
},
 empresas(){document.title='Cotización empresarial | BALBOABITS';main.innerHTML=crumb('Empresas')+`
<section class="enterprise-hero"><div class="enterprise-fx" aria-hidden="true"><span></span><span></span><span></span></div><div class="wrap">
  <div class="enterprise-heading"><span class="eyebrow">SOLUCIONES CORPORATIVAS</span><h1>Equipamiento que<br><em>impulsa tu empresa.</em></h1><p>Cuéntanos qué necesita tu empresa y te ayudaremos a preparar una cotización.</p></div>
  <div class="enterprise-benefits"><div><b>01</b><span>Precios por volumen</span></div><div><b>02</b><span>Facturación empresarial</span></div><div><b>03</b><span>Configuración e instalación</span></div></div>
</div></section>
<section class="wrap enterprise-quote">
  <form id="enterpriseQuote" aria-labelledby="quote-form-title">
    <div class="quote-form-heading"><span class="eyebrow">COTIZACIÓN RÁPIDA</span><h2 id="quote-form-title">Solicita una cotización</h2><p>Completa los datos obligatorios. La cantidad y los detalles son opcionales.</p></div>
    <div class="quote-simple-grid">
      <label>Empresa *<input id="companyName" name="company" type="text" autocomplete="organization" placeholder="Ej. Comercial del Pacífico" required></label>
      <label>Nombre de contacto *<input name="contactName" type="text" autocomplete="name" placeholder="Nombre y apellido" required></label>
      <label>Correo electrónico *<input name="email" type="email" autocomplete="email" placeholder="nombre@empresa.com" required></label>
      <label>Teléfono o WhatsApp (opcional)<input name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+507 0000-0000"></label>
      <fieldset class="quote-needs full-field"><legend>¿Qué necesitas? (opcional; puedes elegir varias opciones)</legend><div class="quote-need-list">
        <label><input type="checkbox" name="needs" value="Computadoras"><span>Computadoras</span></label>
        <label><input type="checkbox" name="needs" value="Audio y video"><span>Audio y video</span></label>
        <label><input type="checkbox" name="needs" value="Móviles y accesorios"><span>Móviles y accesorios</span></label>
        <label><input type="checkbox" name="needs" value="Redes y seguridad"><span>Redes y seguridad</span></label>
        <label><input type="checkbox" name="needs" value="Instalación y soporte"><span>Instalación y soporte</span></label>
        <label><input type="checkbox" name="needs" value="Otro"><span>Otro</span></label>
      </div></fieldset>
      <label>Cantidad aproximada (opcional)<select name="quantity"><option value="">Aún no lo sé</option><option value="1–5 unidades">1–5 unidades</option><option value="6–15 unidades">6–15 unidades</option><option value="16–50 unidades">16–50 unidades</option><option value="51–100 unidades">51–100 unidades</option><option value="Más de 100 unidades">Más de 100 unidades</option></select></label>
      <label class="full-field">Detalles adicionales (opcional)<textarea name="details" rows="4" maxlength="500" placeholder="Productos, cantidades o servicios que te interesan."></textarea></label>
    </div>
    <button class="btn enterprise-submit" type="submit">Preparar solicitud <span aria-hidden="true">↗</span></button>
    <p class="enterprise-demo-note" id="enterpriseDemoNote">Este formulario solo prepara un resumen en tu navegador; no envía la solicitud.</p>
  </form>
</section>
<dialog id="quoteResult" class="quote-result" aria-labelledby="quote-result-title"><div class="quote-result-content"><button type="button" class="quote-result-close" aria-label="Cerrar">×</button><span class="quote-result-status">SOLICITUD PREPARADA</span><h2 id="quote-result-title">Revisa tu cotización</h2><p id="quoteResultText"></p><pre id="quoteResultCode"></pre><div class="quote-result-actions"><button type="button" class="btn o" id="quoteCopy">Copiar resumen</button><button type="button" class="btn" id="quotePrint">Imprimir / PDF</button></div></div></dialog>`;
const quote=$('#enterpriseQuote');if(!quote)return;
const quoteDialog=$('#quoteResult');
$('.quote-result-close',quoteDialog)?.addEventListener('click',()=>quoteDialog.close());
quote.addEventListener('submit',event=>{
  event.preventDefault();
  if(!quote.reportValidity())return;
  const data=new FormData(quote);
  const needs=data.getAll('needs');
  const request=[
    `EMPRESA: ${data.get('company')}`,
    `CONTACTO: ${data.get('contactName')}`,
    `CORREO: ${data.get('email')}`,
    `TELÉFONO: ${data.get('phone')||'No proporcionado'}`,
    `NECESIDADES: ${needs.join(', ')||'Por definir'}`,
    `CANTIDAD: ${data.get('quantity')||'Por definir'}`,
    `DETALLES: ${data.get('details')||'No proporcionados'}`
  ].join('\n');
  $('#quoteResultText').textContent=`Solicitud preparada para ${data.get('company')}. Puedes copiarla o imprimirla.`;
  $('#quoteResultCode').textContent=request;
  quoteDialog.showModal();
});
$('#quoteCopy')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#quoteResultCode').textContent);toast('Resumen copiado')}catch{toast('No se pudo copiar el resumen')}});
$('#quotePrint')?.addEventListener('click',()=>window.print());
},
contacto(){document.title='Contacto | BALBOABITS';main.innerHTML=crumb('Contacto')+`
<section class="contact-hero"><div class="contact-hero-fx" aria-hidden="true"><span></span><span></span><span></span></div><div class="wrap"><span class="eyebrow">HABLEMOS · BALBOABITS</span><h1>¿En qué podemos<br><em>ayudarte?</em></h1><p>Elige un motivo y cuéntanos brevemente. El formulario solo prepara un resumen en este navegador.</p></div></section>
<section class="wrap contact-page">
 <form id="contactForm" class="contact-form" aria-labelledby="contact-form-title">
   <div class="contact-form-heading"><span>CONTACTO DIRECTO</span><h2 id="contact-form-title">Cuéntanos qué necesitas</h2><p>Los campos con * son obligatorios.</p></div>
   <div class="contact-grid">
     <label>Nombre completo *<input name="name" type="text" autocomplete="name" placeholder="Nombre y apellido" required></label>
     <label>Correo electrónico *<input name="email" type="email" autocomplete="email" placeholder="nombre@correo.com" required></label>
     <label>Teléfono o WhatsApp (opcional)<input name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+507 0000-0000"></label>
     <label>Motivo *<select name="topic" required><option value="" selected disabled>Selecciona una opción</option><option value="Consulta sobre un producto">Producto</option><option value="Estado de compra o pedido">Compra o pedido</option><option value="Garantía o devolución">Garantía o devolución</option><option value="Cotización empresarial">Cotización empresarial</option><option value="Soporte técnico">Soporte técnico</option><option value="Otro asunto">Otro</option></select></label>
     <label class="contact-message full-field">Mensaje *<textarea name="message" rows="4" maxlength="800" placeholder="¿Cómo podemos ayudarte?" required></textarea></label>
   </div>
   <button class="btn contact-submit" type="submit">Preparar mensaje <span aria-hidden="true">↗</span></button>
   <p class="contact-demo-note" id="contactDemoNote">Demostración: no se envían datos. No incluyas contraseñas ni información bancaria.</p>
 </form>
 <details class="contact-faq"><summary>Preguntas frecuentes (opcional)</summary><div class="contact-faq-grid">
   <article><h3>¿Cuánto tarda el envío?</h3><p>Ciudad de Panamá: 1 a 2 días hábiles. Interior: 3 a 5 días hábiles.</p></article>
   <article><h3>¿Qué garantía tienen los productos?</h3><p>Los productos mostrados indican una garantía mínima de 12 meses con soporte local.</p></article>
   <article><h3>¿Puedo devolver un producto?</h3><p>La política demostrativa permite devoluciones dentro de 7 días si el producto está sin uso y en su empaque.</p></article>
   <article><h3>¿Se puede completar una compra real?</h3><p>Este sitio es una demostración: no procesa pagos ni solicitudes reales.</p></article>
 </div></details>
</section>
<dialog id="contactResult" class="contact-result" aria-labelledby="contact-result-title"><div class="contact-result-content"><button type="button" class="contact-result-close" aria-label="Cerrar">×</button><span class="contact-result-status">MENSAJE PREPARADO</span><h2 id="contact-result-title">Revisa antes de continuar</h2><dl id="contactResultData"></dl><pre id="contactResultMessage"></pre><div class="contact-result-actions"><button type="button" class="btn o" id="contactCopy">Copiar mensaje</button><button type="button" class="btn" id="contactClose">Cerrar</button></div></div></dialog>`;const form=$('#contactForm');if(!form)return;
const dialog=$('#contactResult');
$('.contact-result-close',dialog)?.addEventListener('click',()=>dialog.close());
$('#contactClose')?.addEventListener('click',()=>dialog.close());
form.addEventListener('submit',event=>{
 event.preventDefault();
 if(!form.reportValidity())return;
 const data=new FormData(form);
 const resultRows=[['Nombre',data.get('name')],['Correo',data.get('email')],['Teléfono',data.get('phone')||'No proporcionado'],['Motivo',data.get('topic')]];
 $('#contactResultData').replaceChildren(...resultRows.map(([label,value])=>{
   const row=document.createElement('div'),term=document.createElement('dt'),description=document.createElement('dd');
   term.textContent=label;description.textContent=String(value||'');
   row.append(term,description);return row;
 }));
 $('#contactResultMessage').textContent=data.get('message');
 dialog.showModal();
});
$('#contactCopy')?.addEventListener('click',async()=>{const text=`${$('#contactResultData').innerText}\n\n${$('#contactResultMessage').textContent}`;try{await navigator.clipboard.writeText(text);toast('Mensaje copiado')}catch{toast('No se pudo copiar el mensaje')}});
},
login(){document.title='Ingresar | BALBOABITS';main.innerHTML=crumb('Ingresar')+`
<section class="auth-page">
  <div class="auth-visual"><div class="auth-visual-fx" aria-hidden="true"><span class="auth-visual-orbit auth-visual-orbit--outer"></span><span class="auth-visual-orbit auth-visual-orbit--inner"></span><span class="auth-visual-core"></span></div><div class="auth-visual-content"><span class="eyebrow">BALBOABITS · CUENTA</span><h1>Tu tecnología,<br><em>siempre contigo.</em></h1><p>Accede a tu experiencia BALBOABITS y prepara tus compras, favoritos y solicitudes empresariales.</p><div class="auth-feature-list"><span><b>01</b>Perfil demostrativo</span><span><b>02</b>Acceso rápido</span><span><b>03</b>Datos protegidos</span></div></div></div>
  <div class="auth-panel"><div class="auth-shell">
    <div class="auth-heading"><span class="auth-kicker">BIENVENIDO DE NUEVO</span><h2>Iniciar sesión</h2><p>Elige cómo deseas continuar.</p></div>
    <div class="auth-method-switch" role="group" aria-label="Método de acceso">
      <button class="auth-method" type="button" data-login-mode="email" aria-pressed="true"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>Correo</button>
      <button class="auth-method" type="button" data-login-mode="phone" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h3l1.5 5-2 1.5a14 14 0 0 0 5 5l1.5-2 5 1.5v3a3 3 0 0 1-3 3C10.8 20 4 13.2 4 6a3 3 0 0 1 3-3Z"/></svg>Teléfono</button>
    </div>
    <form id="loginForm" novalidate>
      <label><span id="loginIdentifierLabel">Correo electrónico</span><div class="auth-input"><svg data-login-identifier-icon viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg><input id="loginIdentifier" name="identifier" type="email" inputmode="email" autocomplete="email" placeholder="nombre@correo.com" required></div></label>
      <label>Contraseña<div class="auth-input"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><input id="loginPassword" name="password" type="password" placeholder="Ingresa tu contraseña" minlength="8" required><button type="button" id="togglePassword" aria-label="Mostrar contraseña">Mostrar</button></div></label>
      <div class="auth-options"><label><input type="checkbox" name="remember"><span>Mantener sesión iniciada</span></label><button type="button" class="auth-link" id="forgotPassword">¿Olvidaste tu contraseña?</button></div>
      <button class="btn auth-submit" type="submit">Iniciar sesión <span aria-hidden="true">↗</span></button>
    </form>
    <div class="auth-divider"><span>o continúa con</span></div>
    <div class="auth-providers">
      <button type="button" class="auth-provider auth-google" data-auth-provider="Google"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.3a4.5 4.5 0 0 1-2 2.9v2.5h3.2c1.9-1.7 3-4.2 3-7.2Z"/><path d="M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2.1 1-3.5 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10.2 10.2 0 0 0 12 22Z"/><path d="M6.4 13.9a6.1 6.1 0 0 1 0-3.8V7.5H3.1a10.2 10.2 0 0 0 0 9l3.3-2.6Z"/><path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.8 9.8 0 0 0 12 2a10.2 10.2 0 0 0-8.9 5.5l3.3 2.6A6.2 6.2 0 0 1 12 6Z"/></svg><span>Google</span></button>
      <button type="button" class="auth-provider auth-facebook" data-auth-provider="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z"/></svg><span>Facebook</span></button>
      <button type="button" class="auth-provider auth-apple" data-auth-provider="Apple"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.4 12.7c0-2 1.6-3 1.7-3.1-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.7.8-3.5 2.1-1.5 2.6-.4 6.6 1.1 8.8.7 1.1 1.4 2.1 2.5 2.1 1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7 1.2 0 1.9-1.1 2.6-2.2.8-1.2 1.1-2.4 1.1-2.5-.1 0-2.1-.8-2.1-3.6ZM14.3 6.6c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6.9.1 1.9-.5 2.5-1.2Z"/></svg><span>Apple</span></button>
      <button type="button" class="auth-provider auth-microsoft" data-auth-provider="Microsoft"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg><span>Microsoft</span></button>
    </div>
    <p class="auth-register">¿Aún no tienes cuenta? <a href="registro.html">Crear una cuenta</a></p>
    <p class="auth-guest">¿Solo quieres explorar? <a href="catalogo.html">Continuar como visitante</a></p>
    <p class="auth-demo"><span></span>Modo demostrativo · No se almacenan credenciales reales</p>
  </div></div>
</section>
<dialog id="authModal" class="auth-modal" aria-labelledby="auth-modal-title"><div class="auth-modal-content"><button type="button" class="auth-modal-close" aria-label="Cerrar">×</button><span class="auth-modal-status">INICIO DE SESIÓN DEMOSTRATIVO</span><h2 id="auth-modal-title">Continuar</h2><p id="authModalText"></p><div class="auth-modal-actions"><button type="button" class="btn" id="authModalClose">Entendido</button></div></div></dialog>`;const loginForm=$('#loginForm');
const password=$('#loginPassword'),toggle=$('#togglePassword'),identifier=$('#loginIdentifier'),identifierLabel=$('#loginIdentifierLabel'),identifierIcon=$('[data-login-identifier-icon]');
toggle?.addEventListener('click',()=>{const visible=password.type==='text';password.type=visible?'password':'text';toggle.textContent=visible?'Mostrar':'Ocultar';toggle.setAttribute('aria-label',visible?'Mostrar contraseña':'Ocultar contraseña')});
$$('[data-login-mode]').forEach(button=>button.addEventListener('click',()=>{
  const phone=button.dataset.loginMode==='phone';
  identifier.type=phone?'tel':'email';
  identifier.inputMode=phone?'tel':'email';
  identifier.autocomplete=phone?'tel':'email';
  identifier.placeholder=phone?'+507 6000-0000':'nombre@correo.com';
  identifierLabel.textContent=phone?'Teléfono o WhatsApp':'Correo electrónico';
  identifierIcon.innerHTML=phone?'<path d="M7 3h3l1.5 5-2 1.5a14 14 0 0 0 5 5l1.5-2 5 1.5v3a3 3 0 0 1-3 3C10.8 20 4 13.2 4 6a3 3 0 0 1 3-3Z"/>':'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>';
  identifier.value='';
  identifier.classList.remove('auth-invalid');
  identifier.setAttribute('aria-invalid','false');
  $$('[data-login-mode]').forEach(modeButton=>modeButton.setAttribute('aria-pressed',String(modeButton===button)));
}));
const authModal=$('#authModal');
$('.auth-modal-close',authModal)?.addEventListener('click',()=>authModal.close());$('#authModalClose')?.addEventListener('click',()=>authModal.close());
authModal.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();authModal.close()}});
$$('[data-auth-provider]').forEach(button=>button.addEventListener('click',()=>{
  $('#auth-modal-title').textContent=`Continuar con ${button.dataset.authProvider}`;
  $('#authModalText').textContent=`Esta opción se muestra como ejemplo visual. En esta demostración no se conecta con ${button.dataset.authProvider} ni se solicita ni almacena información real.`;
  authModal.showModal();
}));
$('#forgotPassword')?.addEventListener('click',()=>{$('#auth-modal-title').textContent='Recuperación de contraseña';$('#authModalText').textContent='Esta acción sería el inicio del proceso de recuperación. En el modo demostrativo no se envían correos ni se almacenan cuentas.';authModal.showModal()});
loginForm?.addEventListener('submit',event=>{
  event.preventDefault();
  if(identifier.type==='email'&&identifier.value.trim().toLowerCase()==='admin'&&password.value==='admin'){
    window.location.assign('404.html');
    return;
  }
  const fields=[...$$('[required]',loginForm)];
  const phoneMode=identifier.type==='tel',phoneDigits=identifier.value.replace(/\D/g,'');
  const invalid=fields.filter(i=>!i.value.trim()||(i===identifier&&(phoneMode?phoneDigits.length<8||phoneDigits.length>15:!i.checkValidity()))||(i===password&&i.value.length<8));
  fields.forEach(i=>{const bad=invalid.includes(i);i.classList.toggle('auth-invalid',bad);i.setAttribute('aria-invalid',String(bad))});
  if(invalid.length){invalid[0].focus();toast(`Revisa ${phoneMode?'el teléfono':'el correo'} y la contraseña`);return}
  $('#auth-modal-title').textContent='Inicio preparado';
  $('#authModalText').textContent='Los datos cumplen el formato demostrativo. No se creó ninguna sesión ni se enviaron credenciales a un servidor.';
  authModal.showModal();
});
loginForm?.querySelectorAll('[required]').forEach(i=>i.addEventListener('input',()=>{i.classList.remove('auth-invalid');i.setAttribute('aria-invalid','false')}));
},
registro(){main.innerHTML=crumb('Registro')+`<div class="wrap sec" style="padding-top:0"><h1 style="font-size:clamp(2.2rem,6vw,4.5rem);margin-bottom:24px">Crear cuenta</h1><div class="tabs bar"><button class="chip" data-t="p" aria-pressed="true">Personal</button><button class="chip" data-t="e" aria-pressed="false">Empresa</button></div><div id="fm"></div></div>`;
const show=t=>{$('#fm').innerHTML=F('Crear cuenta',[['Nombre'+(t==='e'?' del contacto':''),'text'],...(t==='e'?[['Empresa','text'],['RUC','text']]:[]),['Correo','email'],['Contraseña (mín. 8 caracteres)','password']]);$$('[data-t]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===t))};
show('p');$('.tabs').onclick=e=>{const b=e.target.closest('[data-t]');if(b)show(b.dataset.t)}},
agradecimiento(){document.title='Carta de agradecimiento | BALBOABITS';main.innerHTML=crumb('Carta de agradecimiento')+`
<section class="page-hero acknowledgement-hero"><div class="wrap">
  <span class="eyebrow">BALBOABITS · DOCUMENTO ACADÉMICO</span>
  <h1 class="page-title">Carta de<br><em>agradecimiento.</em></h1>
  <p>Una reflexión sobre el trabajo colaborativo, el aprendizaje responsable y el desarrollo de una experiencia tecnológica creada con criterio humano.</p>
</div></section>
<section class="wrap sec acknowledgement-page">
  <article class="acknowledgement-document">
    <header class="document-heading">
      <div>
        <span class="document-label">PROYECTO DEMOSTRATIVO</span>
        <h2>BALBOABITS</h2>
      </div>
      <img src="images/brand/facultad-fiec.png" alt="Emblema de la Facultad de Informática, Electrónica y Comunicación" width="96" height="96">
    </header>
    <div class="document-rule"></div>
    <p class="document-lead">Con profunda gratitud, reconocemos el acompañamiento recibido durante el desarrollo de este proyecto académico y el compromiso compartido por aprender tecnología de forma creativa, ética y responsable.</p>
    <p>BALBOABITS nace como una propuesta demostrativa que integra diseño web, programación, identidad visual y comercio electrónico. Su construcción fue posible gracias a la colaboración de Adrián Cisneros, Tomas Juárez y Carlos Castillo, quienes aportaron ideas, habilidades y tiempo para convertir un concepto inicial en una experiencia digital organizada y funcional.</p>
    <p>Este proyecto también reconoce el valor de las herramientas de inteligencia artificial utilizadas como apoyo para investigar, estructurar ideas, resolver dudas técnicas y mejorar aspectos visuales. Sin embargo, cada decisión significativa fue revisada, comprendida y dirigida por criterio humano. La tecnología se utilizó como una guía de trabajo, no como sustituto del razonamiento, la responsabilidad ni la autoría intelectual.</p>

    <h3>Del entorno local a la publicación web</h3>
    <p>Como parte de la formación técnica, aprendimos a vincular el proyecto desarrollado localmente con un repositorio en GitHub. Este proceso nos permitió conservar una copia organizada del código, revisar cambios, mantener versiones y comprender cómo los equipos colaborativos comparten un mismo trabajo sin depender exclusivamente de archivos individuales.</p>
    <p>También aprendimos a reconocer la diferencia entre el entorno de desarrollo y el entorno de producción. En la computadora, el sitio se visualiza y prueba en un servidor local. Desde el repositorio, los archivos se mantienen en un proyecto remoto; posteriormente, una plataforma como Vercel puede obtener el código, interpretarlo y publicar una versión accesible mediante una dirección pública.</p>
    <ul class="document-principles">
      <li><b>01</b><span><strong>Control de versiones con Git</strong>Identificar cambios, preparar archivos, crear confirmaciones y conservar un historial comprensible del proyecto.</span></li>
      <li><b>02</b><span><strong>Repositorio remoto en GitHub</strong>Vincular el proyecto local, subir las versiones aprobadas y utilizar el repositorio como fuente central del desarrollo.</span></li>
      <li><b>03</b><span><strong>Preparación para despliegue</strong>Verificar rutas, recursos, nombres de archivos y funcionamiento responsive antes de publicar una versión.</span></li>
      <li><b>04</b><span><strong>Publicación con Vercel</strong>Conectar el repositorio, iniciar el despliegue y revisar la página publicada para confirmar que los enlaces y recursos funcionan.</span></li>
      <li><b>05</b><span><strong>Pruebas después de publicar</strong>Comparar la versión local con la versión alojada y corregir cualquier diferencia técnica o visual.</span></li>
    </ul>
    <p>Este flujo nos permitió comprender conceptos fundamentales del trabajo profesional: trazabilidad del código, colaboración remota, automatización del despliegue, revisión de versiones y responsabilidad técnica. Más allá de “subir una página”, aprendimos que publicar implica verificar, documentar y mantener el proyecto de manera organizada.</p>

    <h3>Aprendizaje y uso responsable</h3>
    <p>Durante el proceso aprendimos que desarrollar código no consiste solamente en lograr que una página funcione. Implica comprender su estructura, verificar su comportamiento, proteger la privacidad, evitar afirmaciones engañosas y aceptar la responsabilidad sobre el producto que se publica.</p>
    <ul class="document-principles">
      <li><b>01</b><span><strong>Comprender antes de implementar</strong>Analizar la necesidad, revisar el código y explicar por qué una solución es adecuada.</span></li>
      <li><b>02</b><span><strong>Validar siempre el resultado</strong>Probar la navegación, la adaptación móvil, la accesibilidad y los posibles errores.</span></li>
      <li><b>03</b><span><strong>Respetar la privacidad</strong>No solicitar ni almacenar datos reales innecesarios y declarar claramente el carácter demostrativo del sitio.</span></li>
      <li><b>04</b><span><strong>Reconocer las fuentes y herramientas</strong>Dar crédito al trabajo ajeno, revisar licencias y mantener transparencia sobre el apoyo tecnológico recibido.</span></li>
      <li><b>05</b><span><strong>Asumir criterio humano</strong>Usar la inteligencia artificial con prudencia, contrastar sus respuestas y tomar decisiones informadas.</span></li>
    </ul>

    <h3>Un proyecto hecho para seguir aprendiendo</h3>
    <p>Este sitio representa un punto de partida y no una meta definitiva. Cada componente, sección y interacción nos permitió practicar HTML, CSS y JavaScript, así como observar cómo el diseño, la lógica y la experiencia de usuario se relacionan en una aplicación real. Las dificultades encontradas formaron parte esencial del proceso y mostraron la importancia de la paciencia, la investigación y el trabajo en equipo.</p>
    <p>Agradecemos a quienes nos orientaron, revisaron nuestras propuestas y nos permitieron presentar este trabajo como parte de nuestra formación en la Licenciatura en Comercio Electrónico. Reconocemos también a la Facultad de Informática, Electrónica y Comunicación por brindar el entorno académico donde podemos desarrollar competencias técnicas y profesionales.</p>
    <blockquote>“Aprender no significa delegar el pensamiento. Significa usar las herramientas disponibles con conocimiento, conciencia y responsabilidad.”</blockquote>
    <p>Con esta carta, dejamos constancia de nuestro propósito: continuar creando soluciones con una visión ética, humana y accesible, manteniendo siempre el respeto por las personas que utilizan la tecnología y por el conocimiento que representa el trabajo responsable.</p>

    <footer class="document-signatures">
      <div><img src="images/people/signature-adrian.png" alt="Firma manuscrita de Adrián Cisneros" width="220" height="62"><strong>Adrián Cisneros</strong><span>Colaborador</span></div>
      <div><img src="images/people/signature-tomas.png" alt="Firma manuscrita de Tomas Juárez" width="220" height="62"><strong>Tomas Juárez</strong><span>Colaborador</span></div>
      <div><img src="images/people/signature-carlos.png" alt="Firma manuscrita de Carlos Castillo" width="220" height="62"><strong>Carlos Castillo</strong><span>Colaborador</span></div>
    </footer>
    <aside class="project-facilitator document-facilitator">
      <div class="facilitator-mark" aria-hidden="true">BG</div>
      <div>
        <span>FACILITADORA DEL PROYECTO</span>
        <h2>Bohen Gisela Solis Tejedor</h2>
        <p>Orientación, acompañamiento y guía durante el proceso de aprendizaje y desarrollo del proyecto.</p>
      </div>
    </aside>
  </article>
</section>`},
colaboradores(){document.title='Colaboradores | BALBOABITS';main.innerHTML=crumb('Colaboradores')+`
<section class="page-hero collaborators-hero"><div class="wrap">
  <span class="eyebrow">BALBOABITS · EQUIPO PROYECTO</span>
  <h1 class="page-title">Las personas detrás<br><em>de la experiencia.</em></h1>
  <p>Conoce al equipo que dio forma a BALBOABITS mediante diseño, desarrollo web, colaboración creativa y aprendizaje responsable.</p>
</div></section>
<section class="wrap sec collaborators-page">
  <div class="collaborators-constellation" aria-hidden="true">
    <span class="constellation-star star-a"></span><span class="constellation-star star-b"></span><span class="constellation-star star-c"></span><span class="constellation-star star-d"></span><span class="constellation-star star-e"></span><span class="constellation-star star-f"></span><span class="constellation-line line-a"></span><span class="constellation-line line-b"></span><span class="constellation-line line-c"></span>
  </div>
  <div class="collaborators-intro">
    <span class="collaborators-index">NUESTRO EQUIPO / 2026</span>
    <p>BALBOABITS fue construido como un proyecto académico demostrativo. Cada colaborador aportó una perspectiva distinta para integrar tecnología, identidad visual y una experiencia coherente.</p>
  </div>
  <div class="collaborators-grid">
    <article class="collaborator-card">
      <span class="collaborator-sheen" aria-hidden="true"></span>
      <div class="collaborator-head"><span class="student-badge adrian-badge" aria-label="Diseño y desarrollo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 9l-3 3 3 3"/><path d="M16 9l3 3-3 3"/><path d="M14 5l-4 14"/></svg></span><i aria-hidden="true"></i></div>
      <div class="collaborator-avatar"><img src="images/people/avatar-adrian.jpg" alt="Avatar de Adrián Cisneros" width="160" height="160"></div>
      <h2>Adrián Cisneros</h2>
      <p>Colaborador y desarrollo de la propuesta digital.</p>
      <ul><li>Diseño de interfaz</li><li>Desarrollo web</li><li>Identidad visual y diseño de logo</li><li>Presentación del proyecto</li><li>Estructura de inicio, catálogo y producto</li><li>Acceso, registro y sección de empresas</li><li>Carrito, ofertas y contacto</li><li>Animaciones, carrusel dinámico y gadgets</li><li>Métodos de pago y pie de página</li><li>Cookies, privacidad y accesibilidad</li><li>Aviso del sitio, agradecimientos y colaboraciones</li></ul>
    </article>
    <article class="collaborator-card">
      <span class="collaborator-sheen" aria-hidden="true"></span>
      <div class="collaborator-head"><span class="student-badge tomas-badge" aria-label="Redacción y revisión"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4"/><path d="M9 11h6M9 15h6M9 18h4"/></svg></span><i aria-hidden="true"></i></div>
      <div class="collaborator-avatar"><img src="images/people/avatar-tomas.png" alt="Avatar de Tomas Juárez" width="160" height="160"></div>
      <h2>Tomas Juárez</h2>
      <p>Colaborador y apoyo en la construcción del proyecto.</p>
      <ul><li>Elección del animal representativo</li><li>Redacción del documento</li><li>Revisión de contenido</li><li>Pruebas visuales en inicio, catálogo y producto</li><li>Verificación de categorías y vista de producto</li><li>Recorrido en ofertas y empresas</li><li>Revisión de acceso y registro de usuarios</li><li>Apoyo en organización de secciones</li></ul>
    </article>
    <article class="collaborator-card">
      <span class="collaborator-sheen" aria-hidden="true"></span>
      <div class="collaborator-head"><span class="student-badge carlos-badge" aria-label="Organización y validación"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2"/><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5"/><path d="M15 14c2.8 0 5 1.7 5 4v1"/></svg></span><i aria-hidden="true"></i></div>
      <div class="collaborator-avatar"><img src="images/people/avatar-carlos.png" alt="Avatar de Carlos Castillo" width="160" height="160"></div>
      <h2>Carlos Castillo</h2>
      <p>Colaborador y apoyo en el desarrollo colaborativo.</p>
      <ul><li>Propuesta del nombre del proyecto</li><li>Redacción y estructura del documento escrito</li><li>Organización de la información del informe</li><li>Validación de enlaces y navegación básica</li><li>Pruebas visuales en carrito, ofertas y contacto</li><li>Revisión de datos de envíos y garantías</li><li>Verificación de información de contacto</li></ul>
    </article>
  </div>
  <div class="collaborators-academic">
    <div class="academic-institution academic-institution-primary">
      <img src="images/brand/universidad-panama-transparent.png" alt="Emblema de la Universidad de Panamá" width="82" height="82">
      <div>
        <span>Universidad de Panamá</span>
        <span>Extensión Universitaria de Aguadulce</span>
        <strong>EXUA</strong>
      </div>
    </div>
    <div class="academic-institution">
      <img src="images/brand/facultad-fiec.png" alt="Emblema de la Facultad de Informática, Electrónica y Comunicación" width="82" height="82">
      <div>
        <span>Facultad de Informática, Electrónica y Comunicación</span>
        <strong>Licenciatura en Comercio Electrónico</strong>
      </div>
    </div>
  </div>
</section>`},
cookies(){document.title='Cookies y privacidad | BALBOABITS';main.innerHTML=crumb('Cookies y privacidad')+`
<section class="page-hero"><div class="wrap">
  <span class="eyebrow">TRANSPARENCIA · PROYECTO DEMOSTRATIVO</span>
  <h1 class="page-title">Privacidad, sin<br><em>letra pequeña.</em></h1>
  <p>Este sitio es una demostración académica. No hay ventas, registros ni solicitudes reales; aquí explicamos con precisión qué ocurre con la información que introduces.</p>
</div></section>
<section class="wrap sec privacy-page">
  <div class="privacy-grid">
    <article class="privacy-card">
      <span class="privacy-index">01 / FORMULARIOS</span>
      <h2>Lo que escribes no se envía</h2>
      <p>Los formularios de contacto, ingreso y registro solo validan los campos en tu navegador. No crean cuentas ni envían o guardan nombres, correos, contraseñas o mensajes.</p>
    </article>
    <article class="privacy-card">
      <span class="privacy-index">02 / CARRITO</span>
      <h2>Una simulación local</h2>
      <p>Los productos y cantidades del carrito se conservan en el almacenamiento local de este navegador para simular una compra. No incluyen datos personales ni se transmiten a un servidor. Puedes vaciar el carrito o borrar los datos del sitio desde tu navegador.</p>
    </article>
    <article class="privacy-card">
      <span class="privacy-index">03 / COOKIES</span>
      <h2>Sin seguimiento publicitario</h2>
      <p>Este proyecto no utiliza cookies propias de analítica o publicidad ni integra píxeles de seguimiento. Para la simulación se usan mecanismos de almacenamiento del navegador: el carrito y las preferencias de accesibilidad usan almacenamiento local; el aviso y la intro usan almacenamiento de sesión. Las preferencias de accesibilidad no contienen datos personales y se pueden borrar desde BALBOABITS ACCESS.</p>
    </article>
    <article class="privacy-card">
      <span class="privacy-index">04 / SERVICIOS EXTERNOS</span>
      <h2>Tipografías de Google Fonts</h2>
      <p>Las familias tipográficas se cargan desde Google Fonts. Al solicitarlas, el proveedor puede recibir información técnica de la conexión, como la dirección IP, conforme a sus propias políticas. El sitio no utiliza esa información ni la recibe.</p>
    </article>
  </div>
  <p class="privacy-disclaimer">No introduzcas información real o sensible. El catálogo, los precios, las cuentas y el proceso de compra son únicamente ilustrativos.</p>
</section>`}
};
function F(btn,fs){return`<form novalidate data-form>${fs.map((f,i)=>`<label>${f[0]}${f[1]==='area'?`<textarea required rows="4"></textarea>`:`<input type="${f[1]}" required ${f[1]==='password'?'minlength="8"':''}>`}<span class="err" aria-live="polite"></span></label>`).join('')}<button class="btn">${btn}</button><p class="note" hidden></p></form>`}
document.addEventListener('submit',e=>{const f=e.target.closest('[data-form]');if(!f)return;e.preventDefault();let ok=1;
$$('input,textarea',f).forEach(i=>{const bad=!i.checkValidity();i.classList.toggle('bad',bad);i.nextElementSibling.textContent=bad?(i.validity.valueMissing?'Este campo es obligatorio.':i.validity.typeMismatch?'Escribe un correo válido.':'Mínimo 8 caracteres.'):'';if(bad)ok=0});
const n=$('.note',f);n.hidden=!ok;if(ok)n.textContent='Datos válidos. Este sitio es una demostración: no hay servidor, así que nada se envió ni se guardó.'});
V[page]&&V[page]();
if(page==='index'){initHomeHeroMotion();initHomeParticleNetwork()}
initNewsCarousel();
initRecommendationsCarousel();
document.addEventListener('input',event=>{
  const input=event.target;
  if(!(input instanceof HTMLInputElement))return;
  if(input.type==='tel'||['yappyPhone','bankRef','claveUser','cardCvv','cardNumber','postal'].includes(input.name)){
    if(input.name==='cardCvv'||input.name==='postal'||input.name==='bankRef')input.value=input.value.replace(/[^0-9]/g,'');
    else if(input.name==='cardNumber')input.value=input.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
    else if(input.name==='yappyPhone'||input.type==='tel')input.value=input.value.replace(/[^\d+\- ()]/g,'');
  }
  if(input.name==='cardExpiry')input.value=input.value.replace(/\D/g,'').slice(0,4).replace(/(\d{2})(\d+)/,'$1/$2');
});
/* ===== Animaciones y rendimiento ===== */
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{rootMargin:'0px 0px -8% 0px'});
$$('.rv').forEach(el=>io.observe(el));
let tk=0;const bar=$('#bar');addEventListener('scroll',()=>{if(tk)return;tk=requestAnimationFrame(()=>{const scrollOffset=Math.min(scrollY,700);document.documentElement.style.setProperty('--sy',scrollOffset);bar.style.transform=`scaleX(${scrollY/(document.documentElement.scrollHeight-innerHeight||1)})`;tk=0})},{passive:true});


/* ===== BALBOABITS · Preloader lifecycle ===== */
(()=>{
  const overlay=document.getElementById('site-preloader');
  if(!overlay)return;
  if(document.documentElement.classList.contains('bb-intro-seen')){
    overlay.remove();
    return;
  }
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileViewport=matchMedia('(max-width: 600px)').matches;
  const started=performance.now();
  let pageReady=document.readyState==='complete';
  let minimumTimePassed=false;
  let finished=false;
  const deerRevealDelay=reducedMotion?2200:mobileViewport?3250:2950;
  window.setTimeout(()=>{
    overlay.classList.add('show-deer');
    const brand=overlay.querySelector('.preloader-stage-brand');
    const deer=overlay.querySelector('.preloader-stage-deer');
    if(brand)brand.setAttribute('aria-hidden','true');
    if(deer)deer.setAttribute('aria-hidden','false');
  },deerRevealDelay);
  const dismiss=()=>{
    if(finished || !pageReady || !minimumTimePassed)return;
    finished=true;
    overlay.classList.add('is-leaving');
    window.setTimeout(()=>overlay.remove(),reducedMotion?0:600);
  };
  const minimumDuration=reducedMotion?4600:mobileViewport?6500:5200;
  window.setTimeout(()=>{minimumTimePassed=true;dismiss()},Math.max(0,minimumDuration-(performance.now()-started)));
  const onReady=()=>{pageReady=true;dismiss()};
  if(!pageReady)window.addEventListener('load',onReady,{once:true});
  window.setTimeout(()=>{pageReady=true;dismiss()},7500);
})();

const accessibilityStyles=document.createElement('link');
accessibilityStyles.rel='stylesheet';
accessibilityStyles.href='css/accessibility.css';
document.head.appendChild(accessibilityStyles);
const accessibilityScript=document.createElement('script');
accessibilityScript.src='js/accessibility.js';
document.body.appendChild(accessibilityScript);
