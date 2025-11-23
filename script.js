/* =====================================================================
   🔧 季節・デザイン設定
   ===================================================================== */
const SEASONS = {
    spring: {
      name: "春",
      colors: { primary: "bg-emerald-400", secondary: "bg-pink-300", accent: "text-pink-500", gradient: "from-pink-100 to-emerald-50", border: "border-pink-100" },
      icon: "flower-2",
      particleColor: "text-pink-300"
    },
    summer: {
      name: "夏",
      colors: { primary: "bg-emerald-500", secondary: "bg-sky-400", accent: "text-sky-500", gradient: "from-sky-100 to-emerald-50", border: "border-sky-100" },
      icon: "sun",
      particleColor: "text-yellow-300"
    },
    autumn: {
      name: "秋",
      colors: { primary: "bg-emerald-600", secondary: "bg-orange-400", accent: "text-orange-500", gradient: "from-orange-100 to-emerald-50", border: "border-orange-100" },
      icon: "leaf",
      particleColor: "text-orange-300"
    },
    winter: {
      name: "冬",
      colors: { primary: "bg-emerald-400", secondary: "bg-indigo-300", accent: "text-indigo-500", gradient: "from-indigo-50 to-emerald-50", border: "border-indigo-100" },
      icon: "snowflake",
      particleColor: "text-sky-200"
    }
};

const getSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
};

/* =====================================================================
   🎨 SVGジェネレーター
   ===================================================================== */
const getTamabenLogo = () => {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.2 28.05" class="w-full h-auto" aria-label="タマベン">
    <g transform="translate(-184.9,-165.975)">
      <path d="M190.659,184.74034c0,-5.43841 1.84671,-9.84711 6.65,-9.84711c4.80329,0 6.65,4.4087 6.65,9.84711c0,5.43841 -2.66537,6.65 -6.65,6.65c-3.98463,0 -6.65,-1.21159 -6.65,-6.65z" fill="#f7f7cb" stroke="none"/>
      <path d="M190.659,184.74034c0,-5.43841 1.84671,-9.84711 6.65,-9.84711c4.80329,0 6.65,4.4087 6.65,9.84711c0,5.43841 -2.66537,6.65 -6.65,6.65c-3.98463,0 -6.65,-1.21159 -6.65,-6.65z" fill="none" stroke="#474742" strokeWidth="1"/>
      <path d="M194.902,181.651c0,-0.757 0.181,-1.516 0.938,-1.516c0.757,0 0.89,0.758 0.89,1.516c0,0.757 -0.133,1.372 -0.89,1.372c-0.757,0 -0.938,-0.614 -0.938,-1.372z" fill="#f7c7b2"/>
      <path d="M197.886,181.651c0,-0.757 0.181,-1.516 0.938,-1.516c0.757,0 0.89,0.758 0.89,1.516c0,0.757 -0.133,1.372 -0.89,1.372c-0.757,0 -0.938,-0.614 -0.938,-1.372z" fill="#f7c7b2"/>
      <path d="M196.184,184.923c0,-0.621 0.504,-0.812 1.125,-0.812c0.621,0 1.125,0.191 1.125,0.812c0,0.621 -0.505,1 -1.125,1c-0.62,0 -1.125,-0.379 -1.125,-1z" fill="#f7b2b2" stroke="#474742" strokeWidth="0.5"/>
      <path d="M192.704,176.589c0.058,-1.593 0,-3.416 0,-3.416h9.187c0,0 0.048,2.7 0,3.416c-0.35,1.5 -2.901,1.959 -4.437,1.959c-1.526,0 -4.504,-0.251 -4.75,-1.959z" fill="#4d4d4d"/>
      <g stroke="#324738" strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M233.676,174.321c0,0 13.756,-0.091 14.752,0c1.415,-0.03 -7.944,9.419 -7.944,9.419"/>
        <path d="M243.095,187.371l-7.149,-6.809"/>
        <path d="M219.408,172.636c0,0 -1.335,2.931 -2.418,4.4c-1.033,1.402 -2.348,2.295 -2.348,2.295"/>
        <path d="M218.5,175.473c0,0 7.395,-0.42 8.057,0c0.695,0.693 -1.046,4.669 -3.726,7.398c-3.107,3.165 -5.579,4.063 -5.579,4.063"/>
        <path d="M219.862,179.898l2.95,2.383"/>
        <path d="M252.13,183.109c0,0 5.308,-6.602 6.014,-6.582c0.693,-0.492 9.873,9.305 9.873,9.305"/>
        <path d="M252.364,183.002c0,0 5.308,-6.602 6.014,-6.582c0.693,-0.492 9.873,9.305 9.873,9.305"/>
        <path d="M266.609,177.779l-1.7,-3.1"/>
        <path d="M267.909,173.779l1.7,3.1"/>
        <path d="M280.341,177.534l-4.4,-4"/>
        <path d="M289.341,177.734c0,0 -3.306,4.509 -5.481,5.98c-2.43,1.643 -8.419,3.42 -8.419,3.42"/>
      </g>
    </g>
  </svg>`;
};

const getParticleSvg = (seasonKey) => {
    const shapes = {
        "spring": '<path d="M12,2 C12,2 14,5 17,6 C20,7 22,10 21,13 C20,16 17,17 15,16 C13,15.5 12,14 12,14 C12,14 11,15.5 9,16 C7,17 4,16 3,13 C2,10 4,7 7,6 C10,5 12,2 12,2 Z" fill="currentColor"/>',
        "summer": '<circle cx="12" cy="12" r="6" fill="currentColor"/> <path d="M12,2 L12,4 M12,20 L12,22 M4.93,4.93 L6.34,6.34 M17.66,17.66 L19.07,19.07 M2,12 L4,12 M20,12 L22,12 M4.93,19.07 L6.34,17.66 M17.66,6.34 L19.07,4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" />',
        "autumn": '<path d="M12,2 L14,8 L20,6 L17,11 L22,14 L16,16 L15,22 L12,18 L9,22 L8,16 L2,14 L7,11 L4,6 L10,8 L12,2 Z" fill="currentColor"/>',
        "winter": '<path d="M12,2 L12,22 M2,12 L22,12 M4.93,4.93 L19.07,19.07 M4.93,19.07 L19.07,4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
    };
    return `<svg viewBox="0 0 24 24" class="w-full h-full">${shapes[seasonKey] || shapes.spring}</svg>`;
};

/* =====================================================================
   🖥️ メインロジック
   ===================================================================== */
const render = () => {
    const seasonKey = getSeason();
    const season = SEASONS[seasonKey];
    const colors = season.colors;

    // 1. テーマカラー適用
    document.getElementById('season-name').textContent = season.name;
    document.getElementById('season-name').className = `inline-block animate-bounce-slow ${colors.accent}`;
    document.getElementById('hero-section').className = `relative rounded-[3rem] overflow-hidden ${colors.secondary} shadow-xl shadow-emerald-900/10 text-white p-8 md:p-16 text-center md:text-left transition-colors duration-700 mb-20`;
    
    // 背景グラデーション
    document.getElementById('bg-gradient').className = `absolute inset-0 opacity-30 bg-gradient-to-br ${colors.gradient} transition-colors duration-1000`;
    document.getElementById('footer-line').className = `absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors.gradient}`;
    
    // ロゴ周り
    document.getElementById('logo-glow').className = `absolute inset-0 ${colors.primary} rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity`;
    document.getElementById('header-logo-wrapper').innerHTML = getTamabenLogo();
    document.getElementById('footer-logo-wrapper').innerHTML = getTamabenLogo();

    // アイコン
    const mainIcon = document.getElementById('main-season-icon');
    mainIcon.setAttribute('data-lucide', season.icon);
    
    const subjectIconBg = document.getElementById('subject-icon-bg');
    subjectIconBg.className = `p-4 rounded-2xl ${colors.primary} text-white shadow-lg rotate-3 transition-colors duration-500`;

    // 2. パーティクル背景
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer.hasChildNodes() || particlesContainer.getAttribute('data-season') !== seasonKey) {
        particlesContainer.innerHTML = '';
        particlesContainer.setAttribute('data-season', seasonKey);
        let particlesHtml = '';
        for(let i=0; i<12; i++) {
            const left = Math.random() * 100;
            const isFall = seasonKey === 'autumn' || seasonKey === 'winter';
            const top = isFall ? '-10vh' : '110vh';
            const animName = isFall ? 'float-down' : 'float-up';
            const dur = 10 + Math.random() * 15;
            const dly = Math.random() * 10;
            const size = 20 + Math.random() * 30;
            
            particlesHtml += `
                <div class="particle ${season.particleColor}" style="left:${left}%; top:${top}; animation:${animName} ${dur}s ${dly}s infinite; width:${size}px; height:${size}px;">
                    ${getParticleSvg(seasonKey)}
                </div>`;
        }
        particlesContainer.innerHTML = particlesHtml;
    }

    // 3. 教科グリッド生成
    const subGrid = document.getElementById('subjects-grid-container');
    if (!subGrid.hasChildNodes()) {
        const subjects = [
            { name: '算数', icon: 'calculator', color: 'bg-lime-400', shadow: 'shadow-lime-200' },
            { name: '数学', icon: 'calculator', color: 'bg-blue-400', shadow: 'shadow-blue-200' },
            { name: '国語', icon: 'pencil', color: 'bg-rose-400', shadow: 'shadow-rose-200' },
            { name: '理科', icon: 'flask-conical', color: 'bg-emerald-400', shadow: 'shadow-emerald-200' },
            { name: '社会', icon: 'globe', color: 'bg-amber-400', shadow: 'shadow-amber-200' },
            { name: '英語', icon: 'languages', color: 'bg-violet-400', shadow: 'shadow-violet-200' },
        ];
        subGrid.innerHTML = subjects.map(s => `
            <button class="group relative aspect-square glass-card rounded-[2rem] hover:border-emerald-300 hover:scale-[1.03] transition-all duration-300 overflow-hidden flex flex-col items-center justify-center gap-4">
                <div class="w-20 h-20 md:w-24 md:h-24 ${s.color} rounded-[1.5rem] flex items-center justify-center text-white shadow-lg ${s.shadow} transform rotate-3 group-hover:rotate-12 transition-transform duration-500">
                    <i data-lucide="${s.icon}" width="40" height="40" stroke-width="2.5"></i>
                </div>
                <span class="font-bold text-xl text-slate-700 group-hover:text-emerald-600 transition-colors">${s.name}</span>
                <div class="absolute -bottom-10 -right-10 w-24 h-24 ${s.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </button>
        `).join('');
    }

    // 4. 教材リスト生成
    renderMaterials();
    
    // アイコン更新
    lucide.createIcons();
};

const renderMaterials = () => {
    const container = document.getElementById('learning-materials-container');
    if (!container || typeof LEARNING_DATA === 'undefined') return;

    container.innerHTML = LEARNING_DATA.map(data => {
        const iconColor = data.subjects[0]?.color || 'lime'; // 簡易的に色決定
        
        const unitsHtml = data.subjects.map(sub => {
            const bgClass = `bg-${sub.color}-400`;
            const shadowClass = `shadow-${sub.color}-200`;
            
            return sub.units.map(unit => `
                <a href="${unit.pdf}" target="_blank" class="text-left group bg-white/60 hover:bg-white p-6 rounded-[2rem] transition-all border border-slate-100 hover:border-emerald-300 hover:shadow-lg flex flex-col justify-between h-full relative overflow-hidden cursor-pointer">
                    <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <span class="w-2 h-2 rounded-full bg-${sub.color}-400"></span>
                            ${sub.name}
                        </div>
                        <h4 class="font-bold text-lg text-slate-700 group-hover:text-emerald-700 mb-2 flex items-center justify-between">
                            ${unit.title}
                            <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                <i data-lucide="chevron-right" width="18" height="18"></i>
                            </div>
                        </h4>
                        <p class="text-sm text-slate-500 font-medium line-clamp-2">練習問題と解説PDF</p>
                    </div>
                </a>
            `).join('');
        }).join('');

        return `
            <div id="grade-${data.gradeId}" class="glass-card rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden scroll-mt-32">
                <div class="absolute top-0 left-0 w-2 h-full bg-emerald-400"></div>
                <div class="flex items-center gap-4 mb-8 relative z-10">
                    <span class="text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm ${data.grade.includes('小学') ? 'bg-orange-400' : 'bg-blue-500'}">
                        ${data.grade.includes('小学') ? '小学生' : '中学生'}
                    </span>
                    <h3 class="text-3xl font-black text-slate-800 tracking-tight">${data.grade}</h3>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                    ${unitsHtml}
                </div>
            </div>
        `;
    }).join('');
};

// スクロール関数
window.scrollToGrade = (gradeId) => {
    const el = document.getElementById(`grade-${gradeId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    render();
});
