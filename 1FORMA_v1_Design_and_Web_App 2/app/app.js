
const KEY='forma-v1-data';
const defaults={
 morning:['Gratitude','Resonant breathing','Affirmation','Water','Supplements'],
 evening:['Read 10 pages','Skincare','Magnesium / zinc','Gentle stretch','Reflection','Plan tomorrow'],
 workouts:[
  {name:'Glute Builder',day:'Wednesday',exercises:[
   {name:'Hip Thrust',sets:'4',reps:'8–10',weight:'',rpe:'8',notes:''},
   {name:'Bulgarian Split Squat',sets:'3',reps:'10–12',weight:'',rpe:'8',notes:''},
   {name:'Romanian Deadlift',sets:'3',reps:'10',weight:'',rpe:'7–8',notes:''}]},
  {name:'Upper Sculpt + Weighted Abs',day:'Saturday',exercises:[
   {name:'Lat Pulldown',sets:'4',reps:'8–10',weight:'',rpe:'8',notes:''},
   {name:'Cable Crunch',sets:'4',reps:'10–15',weight:'',rpe:'8',notes:''},
   {name:'Weighted Decline Sit-up',sets:'3',reps:'10–12',weight:'',rpe:'8',notes:''},
   {name:'Pallof Press',sets:'3',reps:'12–15/side',weight:'',rpe:'7',notes:''}]}
 ],
 supplements:[
  {name:'PHGG',timing:'Morning / with food',done:false},{name:'Creatine',timing:'Daily',done:false},
  {name:'Glutamine',timing:'As preferred',done:false},{name:'Digestive enzymes',timing:'Around meals',done:false},
  {name:'Gut motility support',timing:'As directed',done:false},{name:'Magnesium',timing:'Evening',done:false},
  {name:'Zinc',timing:'Most nights',done:false}
 ],
 meals:[],scans:[],photos:[],checks:{}
};
let data=JSON.parse(localStorage.getItem(KEY)||'null')||structuredClone(defaults);
const save=()=>localStorage.setItem(KEY,JSON.stringify(data));

document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{
 document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('active'));
 document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
 b.classList.add('active');document.getElementById(b.dataset.page).classList.add('active');
});

function ritualRow(name,group,i){
 const row=document.createElement('div');row.className='ritual-row';
 const c=document.createElement('input');c.type='checkbox';c.checked=!!data.checks[group+'-'+name];c.onchange=()=>{data.checks[group+'-'+name]=c.checked;save();renderToday()};
 const inp=document.createElement('input');inp.value=name;inp.onchange=()=>{data[group][i]=inp.value;save();renderAll()};
 const del=document.createElement('button');del.className='btn soft';del.textContent='×';del.onclick=()=>{data[group].splice(i,1);save();renderAll()};
 row.append(c,inp,del);return row
}
function renderRituals(){morningList.innerHTML='';eveningList.innerHTML='';data.morning.forEach((x,i)=>morningList.append(ritualRow(x,'morning',i)));data.evening.forEach((x,i)=>eveningList.append(ritualRow(x,'evening',i)))}
function addRitual(group){data[group].push('New ritual');save();renderAll()}
function renderToday(){
 todayRituals.innerHTML='';const all=[...data.morning,...data.evening];
 all.slice(0,9).forEach(name=>{const r=document.createElement('label');r.className='ritual-row';const c=document.createElement('input');c.type='checkbox';c.checked=!!data.checks['today-'+name];c.onchange=()=>{data.checks['today-'+name]=c.checked;save();renderToday()};const s=document.createElement('span');s.textContent=name;r.append(c,s);todayRituals.append(r)});
 const done=all.slice(0,9).filter(n=>data.checks['today-'+n]).length,pct=Math.round(done/Math.max(1,Math.min(9,all.length))*100);
 ritualBar.style.width=pct+'%';ritualPct.textContent=pct+'% complete';crystal.classList.toggle('unlocked',pct===100);
}
function newAffirmation(){const a=['I am building strength with care.','I can be disciplined without being harsh.','My body deserves nourishment and respect.','Consistency creates confidence.'];affirmation.textContent=a[Math.floor(Math.random()*a.length)]}

function addWorkout(){if(!workoutName.value.trim())return;data.workouts.push({name:workoutName.value.trim(),day:'Unscheduled',exercises:[]});workoutName.value='';save();renderWorkouts()}
function renderWorkouts(){workoutCards.innerHTML='';data.workouts.forEach((w,wi)=>{const c=document.createElement('div');c.className='card';c.style.marginBottom='14px';c.innerHTML=`<div style="display:flex;gap:8px"><input value="${w.name}" data-name><select data-day>${['Unscheduled','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d=>`<option ${d===w.day?'selected':''}>${d}</option>`).join('')}</select><button class="btn soft" data-del>Remove</button></div><div data-ex></div><button class="btn mocha" data-add style="margin-top:10px">Add exercise</button>`;c.querySelector('[data-name]').onchange=e=>{w.name=e.target.value;save()};c.querySelector('[data-day]').onchange=e=>{w.day=e.target.value;save()};c.querySelector('[data-del]').onclick=()=>{data.workouts.splice(wi,1);save();renderWorkouts()};const exroot=c.querySelector('[data-ex]');w.exercises.forEach((e,ei)=>{const r=document.createElement('div');r.className='exercise-grid';['name','sets','reps','weight','rpe','notes'].forEach(k=>{const i=document.createElement('input');i.value=e[k]||'';i.placeholder=k;i.onchange=()=>{e[k]=i.value;save()};r.append(i)});const b=document.createElement('button');b.className='btn soft';b.textContent='×';b.onclick=()=>{w.exercises.splice(ei,1);save();renderWorkouts()};r.append(b);exroot.append(r)});c.querySelector('[data-add]').onclick=()=>{w.exercises.push({name:'New exercise',sets:'3',reps:'8–12',weight:'',rpe:'8',notes:''});save();renderWorkouts()};workoutCards.append(c)})}

function renderSupp(){suppList.innerHTML='';data.supplements.forEach((s,i)=>{const r=document.createElement('div');r.className='ritual-row';const c=document.createElement('input');c.type='checkbox';c.checked=s.done;c.onchange=()=>{s.done=c.checked;save()};const t=document.createElement('div');t.innerHTML=`<strong>${s.name}</strong><div class="small">${s.timing}</div>`;const b=document.createElement('button');b.className='btn soft';b.textContent='×';b.onclick=()=>{data.supplements.splice(i,1);save();renderSupp()};r.append(c,t,b);suppList.append(r)})}
function addSupp(){if(!suppName.value.trim())return;data.supplements.push({name:suppName.value.trim(),timing:suppTiming.value.trim(),done:false});suppName.value='';suppTiming.value='';save();renderSupp()}
function saveMeal(){if(!mealName.value.trim())return;data.meals.unshift({name:mealName.value,p:mealProtein.value,c:mealCarbs.value,f:mealFat.value,date:new Date().toLocaleDateString()});mealName.value=mealProtein.value=mealCarbs.value=mealFat.value='';save();renderMeals()}
function renderMeals(){mealList.innerHTML='';data.meals.slice(0,8).forEach(m=>{const r=document.createElement('div');r.className='item';r.innerHTML=`<span><strong>${m.name}</strong><br><span class="small">${m.date}</span></span><strong>P ${m.p||0} · C ${m.c||0} · F ${m.f||0}</strong>`;mealList.append(r)})}
function saveScan(){if(!scanDate.value)return;data.scans.unshift({date:scanDate.value,w:scanWeight.value,smm:scanSMM.value,bf:scanBF.value});save();renderScans()}
function renderScans(){scanList.innerHTML='';data.scans.forEach(s=>{const r=document.createElement('div');r.className='item';r.innerHTML=`<span>${s.date}</span><strong>${s.w} kg · SMM ${s.smm} · BF ${s.bf}%</strong>`;scanList.append(r)})}
function savePhoto(){const f=photoInput.files[0];if(!f)return;const reader=new FileReader();reader.onload=()=>{data.photos.push({src:reader.result,pose:pose.value,date:new Date().toLocaleDateString()});save();renderPhotos()};reader.readAsDataURL(f)}
function renderPhotos(){photoGallery.innerHTML='';data.photos.forEach(p=>{const d=document.createElement('div');d.innerHTML=`<img src="${p.src}"><div class="small">${p.pose} · ${p.date}</div>`;photoGallery.append(d)})}
let timerInt;function startBreath(){clearInterval(timerInt);let s=300;timerInt=setInterval(()=>{s--;timer.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');if(s<=0){clearInterval(timerInt);timer.textContent='Complete'}},1000)}
[g1,g2,g3,box,resilience].forEach(el=>el.onchange=()=>{data[el.id]=el.value;save()});
function renderAll(){renderToday();renderRituals();renderWorkouts();renderSupp();renderMeals();renderScans();renderPhotos();['g1','g2','g3','box','resilience'].forEach(id=>{if(data[id])document.getElementById(id).value=data[id]})}
renderAll();if('serviceWorker'in navigator)navigator.serviceWorker.register('service-worker.js');
