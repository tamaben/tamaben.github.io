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

// 時間帯のデザイン定義 (時間はSunCalcで動的に判定するため、ここでは見た目のみ定義)
const TIME_THEMES = {
    morning: { label: "おはよう！", icon: "sunrise", overlay: "bg-orange-100/30", isDark: false },
    day: { label: "こんにちは！", icon: "sun", overlay: "bg-transparent", isDark: false },
    evening: { label: "こんばんは。", icon: "sunset", overlay: "bg-indigo-900/20", isDark: false },
    night: { label: "おつかれさま。", icon: "moon", overlay: "bg-slate-900/80", isDark: true }
};

// デフォルト位置 (東京)
let userLocation = { lat: 35.6895, lon: 139.6917, name: "東京 (標準)" };

// 位置情報を取得して更新する関数
const initLocation = () => {
    const locationText = document.getElementById('location-text');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    name: "あなたの場所"
                };
                locationText.textContent = "あなたの場所に合わせて表示中";
                render(); // 位置情報取得後に再描画
            },
            (error) => {
                console.log("位置情報の取得に失敗しました。東京の時間を表示します。", error);
                locationText.textContent = "東京 (標準設定)";
                render();
            }
        );
    } else {
        locationText.textContent = "東京 (標準設定)";
        render();
    }
};

/* =====================================================================
   🌞 自然な時間判定ロジック (SunCalc使用)
   ===================================================================== */
const getNaturalTimeOfDay = () => {
    const now = new Date();
    // SunCalcで現在の位置・日付の太陽時間を計算
    const times = SunCalc.getTimes(now, userLocation.lat, userLocation.lon);
    
    // 判定ロジック
    // 1. 夜明け前 (night)
    if (now < times.dawn) return TIME_THEMES.night;
    
    // 2. 朝 (morning): 夜明け 〜 ゴールデンアワー終了まで (朝日が昇り切るまで)
    if (now >= times.dawn && now < times.goldenHourEnd) return TIME_THEMES.morning;
    
    // 3. 昼 (day): ゴールデンアワー終了 〜 日没1時間前まで
    // ※冬は日没が早いので、昼の時間が短くなります
    const oneHourBeforeSunset = new Date(times.sunset.getTime() - 60 * 60 * 1000);
    if (now >= times.goldenHourEnd && now < oneHourBeforeSunset) return TIME_THEMES.day;
    
    // 4. 夕方 (evening): 日没1時間前 〜 薄暮終了 (dusk) まで
    if (now >= oneHourBeforeSunset && now < times.dusk) return TIME_THEMES.evening;
    
    // 5. 夜 (night): 薄暮以降
    return TIME_THEMES.night;
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
const getTamabenLogo = (isDark) => {
    // 夜モードなら線を白くする
    const strokeColor = isDark ? "#ffffff" : "#324738"; 
    
    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.2 28.05" class="w-full h-auto">
        <g transform="translate(-184.9,-165.975)">
            <path d="M190.659,184.74c0,-5.43 1.84,-9.84 6.65,-9.84c4.8,0 6.65,4.4 6.65,9.84c0,5.43 -2.66,6.65 -6.65,6.65c-3.98,0 -6.65,-1.21 -6.65,-6.65z" fill="#f7f7cb" stroke="none"/>
            <path d="M190.659,184.74c0,-5.43 1.84,-9.84 6.65,-9.84c4.8,0 6.65,4.4 6.65,9.84c0,5.43 -2.66,6.65 -6.65,6.65c-3.98,0 -6.65,-1.21 -6.65,-6.65z" fill="none" stroke="#474742" stroke-width="1"/>
            <path d="M194.9,181.65c0,-0.75 0.18,-1.51 0.93,-1.51c0.75,0 0.89,0.75 0.89,1.51c0,0.75 -0.13,1.37 -0.89,1.37c-0.75,0 -0.93,-0.61 -0.93,-1.37z" fill="#f7c7b2"/>
            <path d="M197.88,181.65c0,-0.75 0.18,-1.51 0.93,-1.51c0.75,0 0.89,0.75 0.89,1.51c0,0.75 -0.13,1.37 -0.89,1.37c-0.75,0 -0.93,-0.61 -0.93,-1.37z" fill="#f7c7b2"/>
            <path d="M196.18,184.92c0,-0.62 0.5,-0.81 1.12,-0.81c0.62,0 1.12,0.19 1.12,0.81c0,0.62 -0.5,1 -1.12,1c-0.62,0 -1.12,-0.37 -1.12,-1z" fill="#f7b2b2" stroke="#474742" stroke-width="0.5"/>
            <path d="M192.7,176.58c0.05,-1.59 0,-3.41 0,-3.41h9.18c0,0 0.04,2.7 0,3.41c-0.35,1.5 -2.9,1.95 -4.43,1.95c-1.52,0 -4.5,-0.25 -4.75,-1.95z" fill="#4d4d4d"/>
            <g stroke="${strokeColor}" stroke-width="3.5" stroke-linecap="round" fill="none">
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

const getParticleSvg = (seasonKey, isNight) => {
    // 夜は星にする
    if (isNight) {
        return '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />';
    }

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
const render = async () => {
    const seasonKey = getSeason();
    const season = SEASONS[seasonKey];
    const colors = season.colors;
    const time = getNaturalTimeOfDay(); // ここがSunCalcベースの動的な時間

    // 1. テーマカラー適用
    document.getElementById('season-name').textContent = season.name;
    document.getElementById('season-name').className = `inline-block animate-bounce-slow ${colors.accent}`;
    
    // ヒーロー背景：夜の場合は暗くする
    const heroBg = time.isDark ? 'bg-slate-800' : colors.secondary;
    document.getElementById('hero-section').className = `relative rounded-[3rem] overflow-hidden ${heroBg} shadow-xl shadow-emerald-900/10 text-white p-8 md:p-16 text-center md:text-left transition-colors duration-700 mb-20`;
    
    // 背景グラデーション：時間帯オーバーレイを合成
    document.getElementById('bg-gradient').className = `absolute inset-0 transition-colors duration-1000 bg-gradient-to-br ${colors.gradient} ${time.overlay}`;
    document.getElementById('footer-line').className = `absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors.gradient}`;
    
    // ロゴ (夜モード対応)
    document.getElementById('logo-glow').className = `absolute inset-0 ${colors.primary} rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity`;
    document.getElementById('header-logo-wrapper').innerHTML = getTamabenLogo(time.isDark);
    document.getElementById('footer-logo-wrapper').innerHTML = getTamabenLogo(time.isDark);

    // アイコン
    const mainIcon = document.getElementById('main-season-icon');
    mainIcon.setAttribute('data-lucide', season.icon);
    
    const subjectIconBg = document.getElementById('subject-icon-bg');
    subjectIconBg.className = `p-4 rounded-2xl ${colors.primary} text-white shadow-lg rotate-3 transition-colors duration-500`;

    // 時間帯表示バッジ
    document.getElementById('time-text').textContent = time.label;
    document.getElementById('time-icon').setAttribute('data-lucide', time.icon);
    // 夜はバッジも暗く
    const badgeClass = time.isDark 
        ? 'text-yellow-200 bg-slate-800 border-slate-700' 
        : 'text-slate-600 border-slate-200 bg-white/50';
    document.getElementById('time-badge').className = `ml-2 px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-2 backdrop-blur-sm transition-all duration-500 ${badgeClass}`;

    // 2. パーティクル背景
    const particlesContainer = document.getElementById('particles-container');
    // 季節が変わるか、昼夜が切り替わったらパーティクル再生成
    const currentPhaseState = `${seasonKey}-${time.isDark ? 'night' : 'day'}`;
    
    if (!particlesContainer.hasChildNodes() || particlesContainer.getAttribute('data-state') !== currentPhaseState) {
        particlesContainer.innerHTML = '';
        particlesContainer.setAttribute('data-state', currentPhaseState);
        let particlesHtml = '';
        // 夜は星を多くする
        const pCount = time.isDark ? 20 : 12;
        
        for(let i=0; i<pCount; i++) {
            const left = Math.random() * 100;
            const isFall = seasonKey === 'autumn' || seasonKey === 'winter';
            const top = isFall ? '-10vh' : '110vh';
            const animName = isFall ? 'float-down' : 'float-up';
            const dur = 10 + Math.random() * 15;
            const dly = Math.random() * 10;
            const size = 15 + Math.random() * 25;
            const pColor = time.isDark ? 'text-white opacity-40' : season.particleColor;
            
            particlesHtml += `
                <div class="particle ${pColor}" style="left:${left}%; top:${top}; animation:${animName} ${dur}s ${dly}s infinite; width:${size}px; height:${size}px;">
                    ${getParticleSvg(seasonKey, time.isDark)}
                </div>`;
        }
        particlesContainer.innerHTML = particlesHtml;
    }

    // 3. 教科グリッド生成 (初回のみ)
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

    // 4. JSONデータをFetchして描画
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        renderMaterials(data);
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('learning-materials-container').innerHTML = `
            <div class="text-center py-10 bg-red-50 rounded-[2rem] border border-red-100">
                <p class="text-red-500 font-bold">データの読み込みに失敗しました。</p>
                <p class="text-sm text-red-400 mt-2">※ローカル環境ではセキュリティ制限のため、Webサーバー経由で開いてください。<br>(VS CodeのLive Serverなど)</p>
            </div>
        `;
    }
    
    lucide.createIcons();
};

const renderMaterials = (learningData) => {
    const container = document.getElementById('learning-materials-container');
    
    container.innerHTML = learningData.map(data => {
        // 教材がない場合
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
    
    lucide.createIcons();
};

// スクロール関数
window.scrollToGrade = (gradeId) => {
    const el = document.getElementById(`grade-${gradeId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    initLocation(); // 位置情報取得開始 -> 完了後render()
    
    // 位置情報が取れない場合等の安全策として初期描画もしておく
    render();

    // 1分ごとに更新（日の出・日の入り時間をまたぐ可能性があるため）
    setInterval(render, 60000);
});
