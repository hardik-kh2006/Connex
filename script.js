// Year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const mobile = document.getElementById('mobileMenu');
    document.getElementById('hamburger').addEventListener('click',()=>{
      mobile.style.display = mobile.style.display === 'flex' ? 'none' : 'flex';
    });

    // Toast helper
    function toast(msg){
      const t = document.getElementById('toast');
      document.getElementById('toastText').textContent = msg;
      t.classList.add('show');
      setTimeout(()=>t.classList.remove('show'),1600);
    }

    // Demo modal controls
    const demo = document.getElementById('demoModal');
    const openers = [document.getElementById('open-demo'), document.getElementById('openDemo2'), document.getElementById('openDemo3')];
    openers.forEach(btn=>btn && btn.addEventListener('click',()=>demo.showModal()));
    document.getElementById('closeModal').addEventListener('click',()=>demo.close());

    // Simple in‑memory people & messages
    const state = {
      people:[
        {id:'p1', name:'Person 1'},
        {id:'p2', name:'Person 2'},
        {id:'p3', name:'Study Buddy'},
        {id:'p4', name:'Project Group'},
      ],
      chats:{},
      active:null,
      theme:'dark'
    };

    const listEl = document.getElementById('peopleList');
    const chatPane = document.getElementById('chatPane');
    const activeName = document.getElementById('activeName');

    function renderPeople(filter=''){
      listEl.innerHTML = '';
      state.people
        .filter(p=>p.name.toLowerCase().includes(filter.toLowerCase()))
        .forEach(p=>{
          const row = document.createElement('button');
          row.type='button';
          row.style.cssText = 'all:unset;display:flex;gap:10px;align-items:center;padding:10px 12px;cursor:pointer;border-bottom:1px solid #1f2c33';
          row.innerHTML = `<div style="width:36px;height:36px;border-radius:50%;background:#1f2c33;display:grid;place-items:center">${p.name[0]}</div><div>${p.name}</div>`
          row.addEventListener('click',()=>openChat(p.id));
          listEl.appendChild(row);
        });
    }
    renderPeople();

    document.getElementById('searchPeople').addEventListener('input',e=>renderPeople(e.target.value));

    function openChat(id){
      state.active = id;
      activeName.textContent = state.people.find(p=>p.id===id)?.name || 'Chat';
      chatPane.innerHTML = '';
      const msgs = state.chats[id] || [];
      msgs.forEach(m=>appendBubble(m));
      setTimeout(()=>document.getElementById('msgInput').focus(),0);
    }

    function appendBubble(m){
      const b = document.createElement('div');
      b.style.cssText = `max-width:70%;padding:10px 12px;border-radius:16px;margin:2px 0;` + (m.role==='out'? 'background:#005c4b;border-top-right-radius:4px;align-self:flex-end' : 'background:#1f2c33;border-top-left-radius:4px');
      b.textContent = m.text;
      chatPane.appendChild(b);
      chatPane.scrollTop = chatPane.scrollHeight;
    }

    document.getElementById('composer').addEventListener('submit',e=>{
      e.preventDefault();
      const input = document.getElementById('msgInput');
      const text = input.value.trim();
      if(!text || !state.active){ toast('Select a chat first'); return; }
      const msg = {role:'out', text};
      state.chats[state.active] = state.chats[state.active] || [];
      state.chats[state.active].push(msg);
      appendBubble(msg);
      input.value='';
      // fake reply
      setTimeout(()=>{
        const reply = {role:'in', text:'Auto‑reply: "'+text.slice(0,40)+'" received ✅'};
        state.chats[state.active].push(reply);
        appendBubble(reply);
      }, 500);
    });

    // Theme toggle for demo
    document.getElementById('themeToggle').addEventListener('click',()=>{
      if(state.theme==='dark'){
        state.theme='light';
        document.documentElement.style.setProperty('--bg','#f2f2f2');
        document.documentElement.style.setProperty('--card','#ffffff');
        document.documentElement.style.setProperty('--text','#0b141a');
        document.documentElement.style.setProperty('--muted','#3b4a54');
        document.getElementById('chatPane').style.background = '#eef3f6';
      } else {
        state.theme='dark';
        document.documentElement.style.setProperty('--bg','#0b141a');
        document.documentElement.style.setProperty('--card','#111b21');
        document.documentElement.style.setProperty('--text','#e9edef');
        document.documentElement.style.setProperty('--muted','#8696a0');
        document.getElementById('chatPane').style.background = '#0b141a';
      }
    });