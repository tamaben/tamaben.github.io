/* =====================================================================
   🔧 設定・デザイン管理
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

const TIME_OF_DAY = {
    morning: { hours: [5, 6, 7, 8, 9, 10], label: "おはよう！", icon: "sunrise", overlay: "bg-orange-100/30" },
    day: { hours: [11, 12, 13, 14, 15, 16], label: "こんにちは！", icon: "sun", overlay: "bg-transparent" },
    evening: { hours: [17, 18], label: "こんばんは。", icon: "sunset", overlay: "bg-indigo-900/20" },
    night: { hours: [19, 20, 21, 22, 23, 0, 1, 2, 3, 4], label: "おつかれさま。", icon: "moon", overlay: "bg-slate-900/60", isDark: true }
};

// 現在の季節を取得
const getSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
};

// 現在の時間帯を取得
const getTimeOfDay = () => {
    const hour = new Date().getHours();
    return Object.entries(TIME_OF_DAY).find(([key, val]) => val.hours.includes(hour))[1];
};

/* =====================================================================
   🎨 SVGジェネレーター
   ===================================================================== */
const getTamabenLogo = () => {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.2 28.05" class="w-full h-auto">
        <g transform="translate(-184.9,-165.975)">
            <path d="M190.659,184.74c0,-5.43 1.84,-9.84 6.65,-9.84c4.8,0 6.65,4.4 6.65,9.84c0,5.43 -2.66,6.65 -6.65,6.65c-3.98,0 -6.65,-1.21 -6.65,-6.65z" fill="#f7f7cb"/>
            <path d="M190.659,184.74c0,-5.43 1.84,-9.84 6.65,-9.84c4.8,0 6.65,4.4 6.65,9.84c0,5.43 -2.66,6.65 -6.65,6.65c-3.98,0 -6.65,-1.21 -6.65,-6.65z" fill="none" stroke="#474742" stroke-width="1"/>
            <path d="M194.9,181.65c0,-0.75 0.18,-1.51 0.93,-1.51c0.75,0 0.89,0.75 0.89,1.51c0,0.75 -0.13,1.37 -0.89,1.37c-0.75,0 -0.93,-0.61 -0.93,-1.37z" fill="#f7c7b2"/>
            <path d="M197.88,181.65c0,-0.75 0.18,-1.51 0.93,-1.51c0.75,0 0.89,0.75 0.89,1.51c0,0.75 -0.13,1.37 -0.89,1.37c-0.75,0 -0.93,-0.61 -0.93,-1.37z" fill="#f7c7b2"/>
            <path d="M196.18,184.92c0,-0.62 0.5,-0.81 1.12,-0.81c0.62,0 1.12,0.19 1.12,0.81c0,0.62 -0.5,1 -1.12,1c-0.62,0 -1.12,-0.37 -1.12,-1z" fill="#f7b2b2" stroke="#474742" stroke-width="0.5"/>
            <path d="M192.7,176.58c0.05,-1.59 0,-3.41 0,-3.41h9.18c0,0 0.04,2.7 0,3.41c-0.35,1.5 -2.9,1.95 -4.43,1.95c-1.52,0 -4.5,-0.25 -4.75,-1.95z" fill="#4d4d4d"/>
            <g stroke="#324738" stroke-width="3.5" stroke-linecap="round" fill="none">
                <path d="M233.67,174.32c0,0 13.75,-0.09 14.75,0c1.41,-0.03 -7.94,9.41 -7.94,9.41"/>
                <path d="M243.09,187.37l-7.14,-6.8"/>
                <path d="M219.4,172.63c0,0 -1.33,2.93 -2.41,4.4c-1.03,1.4 -2.34,2.29 -2.34,2.29"/>
                <path d="M218.5,175.47c0,0 7.39,-0.42 8.05,0c0.69,0.69 -1.04,4.66 -3.72,7.39c-3.1,3.16 -5.57,4.06 -5.57,4.06"/>
                <path d="M219.86,179.89l2.95,2.38"/>
                <path d="M252.13,183.1c0,0 5.3,-6.6 6.01,-6.58c0.69,-0.49 9.87,9.3 9.87,9.3"/>
                <path d="M252.36,183c0,0 5.3,-6.6 6.01,-6.58c0.69,-0.49 9.87,9.3 9.87,9.3"/>
                <path d="M266.6,177.77l-1.7,-3.1"/>
                <path d="M267.9,173.77l1.7,3.1"/>
                <path d="M280.34,177.53l-4.4,-4"/>
                <path d="M289.34,177.73c0,0 -3.3,4.5 -5.48,5.98c-2.43,1.64 -8.41,3.41 -8.41,3.41"/>
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
    const time = getTimeOfDay();

    // 1. テーマカラー適用
    document.getElementById('season-name').textContent = season.name;
    document.getElementById('season-name').className = `inline-block animate-bounce-slow ${colors.accent}`;
    document.getElementById('hero-section').className = `relative rounded-[3rem] overflow-hidden ${colors.secondary} shadow-xl shadow-emerald-900/10 text-white p-8 md:p-16 text-center md:text-left transition-colors duration-700 mb-20`;
    
    document.getElementById('bg-gradient').className = `absolute inset-0 transition-colors duration-1000 bg-gradient-to-br ${colors.gradient}`;
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

    // 時間帯表示
    document.getElementById('time-text').textContent = time.label;
    document.getElementById('time-icon').setAttribute('data-lucide', time.icon);
    document.getElementById('time-badge').className = `ml-2 px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-2 bg-white/50 backdrop-blur-sm ${time.isDark ? 'text-white bg-slate-800 border-slate-700' : 'text-slate-600 border-slate-200'}`;
    document.getElementById('bg-gradient').classList.add(time.overlay); // 時間帯によるオーバーレイ適用

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
    if (typeof LEARNING_DATA !== 'undefined') {
        renderMaterials(LEARNING_DATA);
    } else {
        console.error("LEARNING_DATAが見つかりません。data.jsが読み込まれているか確認してください。");
    }
    
    // アイコン更新
    lucide.createIcons();
};

const renderMaterials = (learningData) => {
    const container = document.getElementById('learning-materials-container');
    
    container.innerHTML = learningData.map(data => {
        // 教材がない場合（subjectsが空）
        if (!data.subjects || data.subjects.length === 0) {
            return `
                <div id="grade-${data.gradeId}" class="glass-card rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden scroll-mt-32 opacity-80">
                    <div class="absolute top-0 left-0 w-2 h-full bg-slate-300"></div>
                    <div class="flex items-center gap-4 mb-4 relative z-10">
                        <span class="text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm bg-slate-400">
                            その他
                        </span>
                        <h3 class="text-3xl font-black text-slate-500 tracking-tight">${data.grade}</h3>
                    </div>
                    <div class="bg-slate-50 rounded-2xl p-8 text-center border-2 border-dashed border-slate-200">
                        <p class="text-slate-400 font-bold">現在、教材はありません。</p>
                    </div>
                </div>
            `;
        }

        // 教材がある場合
        const unitsHtml = data.subjects.map(sub => {
            // sub.colorが定義されていれば使用、なければlime
            const colorName = sub.color || 'lime'; 
            
            return sub.units.map(unit => `
                <a href="${unit.pdf}" target="_blank" class="text-left group bg-white/60 hover:bg-white p-6 rounded-[2rem] transition-all border border-slate-100 hover:border-emerald-300 hover:shadow-lg flex flex-col justify-between h-full relative overflow-hidden cursor-pointer">
                    <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <span class="w-2 h-2 rounded-full bg-${colorName}-400"></span>
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
    
    // 新しく挿入された要素のアイコンをレンダリング
    lucide.createIcons();
};

// スクロール関数
window.scrollToGrade = (gradeId) => {
    const el = document.getElementById(`grade-${gradeId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    render();
    // 時間帯の変化に対応するため1分ごとに再レンダリング
    setInterval(render, 60000);
});
