/* =====================================================================
   🔧 デザイン・環境設定
   ===================================================================== */
const UI_CONFIG = {
    seasons: {
        spring: {
            months: [3, 4, 5],
            name: "春",
            theme: { primary: "bg-pink-400", bg: "bg-pink-50", accent: "text-pink-500", border: "border-pink-200" },
            icon: "flower-2",
            particleShape: "cherry-blossom"
        },
        summer: {
            months: [6, 7, 8],
            name: "夏",
            theme: { primary: "bg-sky-500", bg: "bg-sky-50", accent: "text-sky-600", border: "border-sky-200" },
            icon: "sun",
            particleShape: "sun-ray"
        },
        autumn: {
            months: [9, 10, 11],
            name: "秋",
            theme: { primary: "bg-orange-500", bg: "bg-orange-50", accent: "text-orange-600", border: "border-orange-200" },
            icon: "leaf",
            particleShape: "maple"
        },
        winter: {
            months: [12, 1, 2],
            name: "冬",
            theme: { primary: "bg-indigo-400", bg: "bg-indigo-50", accent: "text-indigo-500", border: "border-indigo-200" },
            icon: "snowflake",
            particleShape: "snow"
        }
    },
    timeOfDay: {
        morning: {
            hours: [5, 6, 7, 8, 9, 10],
            greeting: "おはよう！",
            skyGradient: "from-orange-100 via-rose-100 to-sky-100",
            overlayColor: "bg-orange-50/30"
        },
        day: {
            hours: [11, 12, 13, 14, 15, 16],
            greeting: "こんにちは！",
            skyGradient: "from-sky-200 via-sky-100 to-white",
            overlayColor: "bg-transparent"
        },
        evening: {
            hours: [17, 18],
            greeting: "こんばんは。",
            skyGradient: "from-indigo-300 via-purple-300 to-orange-300",
            overlayColor: "bg-orange-100/40"
        },
        night: {
            hours: [19, 20, 21, 22, 23, 0, 1, 2, 3, 4],
            greeting: "今日もおつかれさま。",
            skyGradient: "from-slate-900 via-indigo-900 to-slate-800",
            overlayColor: "bg-slate-900/80",
            isDark: true
        }
    }
};

/* =====================================================================
   🎨 SVGジェネレーター（ロゴ＆パーティクル）
   ===================================================================== */

// タマベンロゴSVG生成（夜モードに対応）
const getTamabenLogo = (isDark) => {
    // ダークモード時の色設定
    const strokeColor = isDark ? "#ffffff" : "#324738";  // メインの線（白/深緑）
    const highlightColor = isDark ? "#a7f0ba" : "#a7f0ba"; // アクセントの緑（維持）
    
    // SVG文字列（提供されたコードをベースに色を変数化）
    return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.2 28.05" class="w-full h-auto">
        <g transform="translate(-184.9,-165.975)">
            <g stroke-miterlimit="10">
                <!-- 背景図形 -->
                <path d="M190.659,184.74c0,-5.43 1.84,-9.84 6.65,-9.84c4.8,0 6.65,4.4 6.65,9.84c0,5.43 -2.66,6.65 -6.65,6.65c-3.98,0 -6.65,-1.21 -6.65,-6.65z" fill="#f7f7cb" stroke="none"/>
                <path d="M190.659,184.74c0,-5.43 1.84,-9.84 6.65,-9.84c4.8,0 6.65,4.4 6.65,9.84c0,5.43 -2.66,6.65 -6.65,6.65c-3.98,0 -6.65,-1.21 -6.65,-6.65z" fill="none" stroke="#474742" stroke-width="1"/>
                
                <!-- 顔のパーツ -->
                <path d="M194.9,181.65c0,-0.75 0.18,-1.51 0.93,-1.51c0.75,0 0.89,0.75 0.89,1.51c0,0.75 -0.13,1.37 -0.89,1.37c-0.75,0 -0.93,-0.61 -0.93,-1.37z" fill="#f7c7b2"/>
                <path d="M197.88,181.65c0,-0.75 0.18,-1.51 0.93,-1.51c0.75,0 0.89,0.75 0.89,1.51c0,0.75 -0.13,1.37 -0.89,1.37c-0.75,0 -0.93,-0.61 -0.93,-1.37z" fill="#f7c7b2"/>
                <path d="M196.18,184.92c0,-0.62 0.5,-0.81 1.12,-0.81c0.62,0 1.12,0.19 1.12,0.81c0,0.62 -0.5,1 -1.12,1c-0.62,0 -1.12,-0.37 -1.12,-1z" fill="#f7b2b2" stroke="#474742" stroke-width="0.5"/>
                
                <!-- 帽子 -->
                <path d="M192.7,176.58c0.05,-1.59 0,-3.41 0,-3.41h9.18c0,0 0.04,2.7 0,3.41c-0.35,1.5 -2.9,1.95 -4.43,1.95c-1.52,0 -4.5,-0.25 -4.75,-1.95z" fill="#4d4d4d"/>
                
                <!-- タマベン文字部分 (Stroke色を変数化) -->
                <g fill="none" stroke-linecap="round">
                    <g> <!-- タ -->
                        <path d="M233.67,174.32c0,0 13.75,-0.09 14.75,0c1.41,-0.03 -7.94,9.41 -7.94,9.41" stroke="${strokeColor}" stroke-width="6"/>
                        <path d="M243.09,187.37l-7.14,-6.8" stroke="${strokeColor}" stroke-width="6"/>
                        <path d="M233.67,174.32c0,0 13.75,-0.09 14.75,0c1.41,-0.03 -7.94,9.41 -7.94,9.41" stroke="${highlightColor}" stroke-width="3.5"/>
                        <path d="M243.09,187.37l-7.14,-6.8" stroke="${highlightColor}" stroke-width="3.5"/>
                    </g>
                    <g> <!-- マ -->
                        <path d="M219.4,172.63c0,0 -1.33,2.93 -2.41,4.4c-1.03,1.4 -2.34,2.29 -2.34,2.29" stroke="${strokeColor}" stroke-width="6"/>
                        <path d="M218.5,175.47c0,0 7.39,-0.42 8.05,0c0.69,0.69 -1.04,4.66 -3.72,7.39c-3.1,3.16 -5.57,4.06 -5.57,4.06" stroke="${strokeColor}" stroke-width="6"/>
                        <path d="M219.86,179.89l2.95,2.38" stroke="${strokeColor}" stroke-width="6"/>
                        <path d="M219.4,172.62c0,0 -1.33,2.93 -2.41,4.4c-1.03,1.4 -2.34,2.29 -2.34,2.29" stroke="${highlightColor}" stroke-width="3.5"/>
                        <path d="M218.49,175.46c0,0 7.39,-0.42 8.05,0c0.69,0.69 -1.04,4.66 -3.72,7.39c-3.1,3.16 -5.57,4.06 -5.57,4.06" stroke="${highlightColor}" stroke-width="3.5"/>
                        <path d="M219.85,179.89l2.95,2.38" stroke="${highlightColor}" stroke-width="3.5"/>
                    </g>
                    <g> <!-- ベ -->
                        <path d="M252.13,183.1c0,0 5.3,-6.6 6.01,-6.58c0.69,-0.49 9.87,9.3 9.87,9.3" stroke="${strokeColor}" stroke-width="6"/>
                        <path d="M252.36,183c0,0 5.3,-6.6 6.01,-6.58c0.69,-0.49 9.87,9.3 9.87,9.3" stroke="${strokeColor}" stroke-width="6"/>
                        <path d="M266.6,177.77l-1.7,-3.1" stroke="${strokeColor}" stroke-width="5"/>
                        <path d="M267.9,173.77l1.7,3.1" stroke="${strokeColor}" stroke-width="5"/>
                        <path d="M252.14,183.05c0,0 5.3,-6.6 6.01,-6.58c0.69,-0.49 9.87,9.3 9.87,9.3" stroke="${highlightColor}" stroke-width="3.5"/>
                        <path d="M266.62,177.72l-1.7,-3.1" stroke="${highlightColor}" stroke-width="2.5"/>
                        <path d="M269.62,176.82l-1.7,-3.1" stroke="${highlightColor}" stroke-width="2.5"/>
                    </g>
                    <g> <!-- ン -->
                        <path d="M280.34,177.53l-4.4,-4" stroke="${strokeColor}" stroke-width="6"/>
                        <path d="M289.34,177.73c0,0 -3.3,4.5 -5.48,5.98c-2.43,1.64 -8.41,3.41 -8.41,3.41" stroke="${strokeColor}" stroke-width="6"/>
                        <path d="M280.34,177.53l-4.4,-4" stroke="${highlightColor}" stroke-width="3.5"/>
                        <path d="M289.34,177.73c0,0 -3.3,4.5 -5.48,5.98c-2.43,1.64 -8.41,3.41 -8.41,3.41" stroke="${highlightColor}" stroke-width="3.5"/>
                    </g>
                </g>
            </g>
        </g>
    </svg>`;
};

// パーティクル形状SVG
const getParticleSvg = (type, isNight) => {
    const shapes = {
        "cherry-blossom": '<path d="M12,2 C12,2 14,5 17,6 C20,7 22,10 21,13 C20,16 17,17 15,16 C13,15.5 12,14 12,14 C12,14 11,15.5 9,16 C7,17 4,16 3,13 C2,10 4,7 7,6 C10,5 12,2 12,2 Z" fill="currentColor"/>',
        "sun-ray": '<circle cx="12" cy="12" r="8" fill="currentColor"/>',
        "maple": '<path d="M12,2 L14,8 L20,6 L17,11 L22,14 L16,16 L15,22 L12,18 L9,22 L8,16 L2,14 L7,11 L4,6 L10,8 L12,2 Z" fill="currentColor"/>',
        "snow": '<circle cx="12" cy="12" r="6" fill="currentColor"/>'
    };
    const star = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />';
    return `<svg viewBox="0 0 24 24" class="w-full h-full">${isNight ? star : shapes[type]}</svg>`;
};

/* =====================================================================
   🖥️ メインレンダリングロジック
   ===================================================================== */

const render = async () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const hour = now.getHours();

    // 季節・時間の判定
    const seasonKey = Object.keys(UI_CONFIG.seasons).find(key => UI_CONFIG.seasons[key].months.includes(month)) || 'spring';
    const timeKey = Object.keys(UI_CONFIG.timeOfDay).find(key => UI_CONFIG.timeOfDay[key].hours.includes(hour)) || 'day';

    const season = UI_CONFIG.seasons[seasonKey];
    const time = UI_CONFIG.timeOfDay[timeKey];
    const isDark = time.isDark || false;

    // 配色定義
    const textColor = isDark ? "text-slate-100" : "text-slate-700";
    const glassClass = isDark 
        ? "bg-slate-900/40 border-slate-700 text-white backdrop-blur-md" 
        : "bg-white/70 border-white/50 text-slate-800 backdrop-blur-md";

    // 1. 全体背景（Body）
    document.body.className = `min-h-screen selection:bg-lime-300 selection:text-lime-900 bg-gradient-to-b ${time.skyGradient} transition-colors duration-1000`;
    
    // 2. パーティクル背景
    const particleContainer = document.getElementById('background-particles');
    if (!particleContainer.hasChildNodes() || particleContainer.getAttribute('data-season') !== seasonKey) {
        particleContainer.innerHTML = ''; // リセット
        particleContainer.setAttribute('data-season', seasonKey);
        
        const particleCount = timeKey === 'night' ? 20 : 12;
        const particleColor = isDark ? 'text-white' : season.theme.accent;
        let particlesHtml = '';

        for(let i=0; i<particleCount; i++) {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const size = 10 + Math.random() * 20;
            const duration = 10 + Math.random() * 15;
            const delay = Math.random() * 5;
            particlesHtml += `
                <div class="absolute opacity-30 ${particleColor} animate-float"
                     style="left:${left}%; top:${top}%; width:${size}px; height:${size}px; animation-duration:${duration}s; animation-delay:${delay}s;">
                     ${getParticleSvg(season.particleShape, timeKey === 'night')}
                </div>`;
        }
        particleContainer.innerHTML = particlesHtml;
    }

    // 3. オーバーレイレイヤー
    document.getElementById('background-overlay').className = `fixed-bg ${time.overlayColor}`;

    // 4. ヘッダー
    const header = document.getElementById('header-container');
    header.className = `sticky top-4 z-50 flex items-center justify-between mb-10 px-6 py-4 rounded-[2rem] border shadow-sm transition-all duration-1000 ${glassClass}`;
    
    // ロゴ注入 (夜は線が白くなる)
    const logoSvg = getTamabenLogo(isDark);
    document.getElementById('logo-wrapper').innerHTML = logoSvg;
    document.getElementById('footer-logo').innerHTML = logoSvg;

    // 日付
    const dateEl = document.getElementById('header-date');
    dateEl.textContent = now.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' });
    dateEl.className = `${isDark ? 'text-white' : 'text-slate-600'} hidden md:inline transition-colors duration-1000`;

    // 季節バッジ
    const seasonBadge = document.getElementById('season-badge');
    seasonBadge.className = `flex items-center gap-2 px-3 py-1 rounded-full border ${isDark ? 'border-slate-600 bg-slate-800' : 'border-slate-200 bg-white'}`;
    document.getElementById('season-icon').setAttribute('data-lucide', season.icon);
    document.getElementById('season-icon').className = `w-4 h-4 ${season.theme.accent}`;
    const seasonName = document.getElementById('season-name');
    seasonName.textContent = season.name;
    seasonName.className = isDark ? 'text-slate-200' : 'text-slate-600';

    // 5. ヒーローセクション
    const hero = document.getElementById('hero-section');
    hero.className = `relative rounded-[3rem] overflow-hidden p-8 md:p-12 mb-16 text-center md:text-left shadow-xl transition-all duration-1000 ${isDark ? 'shadow-black/20' : 'shadow-emerald-900/5'}`;
    document.getElementById('hero-glass').className = `absolute inset-0 z-0 transition-all duration-1000 ${glassClass} border-0`;

    const greetingBadge = document.getElementById('greeting-badge');
    greetingBadge.className = `inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm transition-all duration-1000 ${isDark ? 'bg-white/10 border-white/20 text-yellow-200' : 'bg-white/50 border-white/50 text-slate-600'}`;
    document.getElementById('greeting-text').textContent = time.greeting;

    document.getElementById('hero-title').className = `text-3xl md:text-5xl font-black leading-tight tracking-tight transition-colors duration-1000 ${textColor}`;

    // イラストカード
    const illCard = document.getElementById('illustration-card');
    illCard.className = `w-full h-full rounded-[2.5rem] rotate-3 border-4 shadow-2xl flex items-center justify-center transform transition-transform duration-500 hover:rotate-0 backdrop-blur-sm ${isDark ? 'bg-slate-800/50 border-white/20' : 'bg-white/40 border-white/60'}`;
    const mainIcon = document.getElementById('main-season-icon');
    mainIcon.setAttribute('data-lucide', season.icon);
    mainIcon.className = isDark ? "text-yellow-100 drop-shadow-[0_0_15px_rgba(255,255,0,0.5)]" : season.theme.accent;

    // 6. メインコンテンツ（教材リスト）のスタイル適用
    document.getElementById('main-heading-icon').className = `p-3 rounded-2xl ${season.theme.primary} text-white shadow-lg`;
    document.getElementById('main-heading-text').className = `text-2xl md:text-3xl font-bold transition-colors duration-1000 ${textColor}`;
    
    // 7. フッター
    const footer = document.getElementById('footer');
    footer.className = `mt-24 py-10 text-center border-t transition-colors duration-1000 ${isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200/50 text-slate-400'}`;

    // 8. 教材リストの生成（初回のみ）
    const materialsContainer = document.getElementById('learning-materials-container');
    if (materialsContainer.children.length <= 1) { // ローディング表示のみの場合
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error("JSON load failed");
            const data = await response.json();
            
            // JSON読み込み成功後の描画
            renderMaterials(data, isDark);
        } catch (e) {
            console.error(e);
            materialsContainer.innerHTML = `
                <div class="text-center p-10 bg-red-50 rounded-3xl text-red-600 border border-red-100">
                    <p class="font-bold">データの読み込みに失敗しました。</p>
                    <p class="text-sm mt-2">※ローカルで開く場合は、セキュリティ制限によりJSONが読み込めないことがあります。<br>Webサーバー経由で開くか、Firefoxを使用してみてください。</p>
                </div>`;
        }
    } else {
        // すでに描画済みならダークモードの色だけ更新したい場合はここでクラス操作を行う
        // 今回はシンプルに再描画はせず、コンテナ自体のクラス調整はCSS変数や親クラス依存にするのが理想ですが、
        // JSでstyleを当てているので、簡易的に中身を更新する関数を呼ぶ
        // ※パフォーマンス考慮のため今回はリロード時のみ反映とします（色はTailwindのクラス依存なので再描画しないと変わらない部分があるため）
        // 完全なリアクティブにするにはReact等が必要ですが、ここではDOMを再構築します
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            renderMaterials(data, isDark);
        } catch (e) { /* ignore */ }
    }

    // Lucideアイコン適用
    lucide.createIcons();
};

// 教材リスト描画関数
const renderMaterials = (data, isDark) => {
    const materialsContainer = document.getElementById('learning-materials-container');
    
    const colorsMap = {
        lime: { bg: "bg-lime-100", text: "text-lime-700", hover: "hover:bg-lime-50" },
        rose: { bg: "bg-rose-100", text: "text-rose-700", hover: "hover:bg-rose-50" },
        violet: { bg: "bg-violet-100", text: "text-violet-700", hover: "hover:bg-violet-50" },
        emerald: { bg: "bg-emerald-100", text: "text-emerald-700", hover: "hover:bg-emerald-50" },
        amber: { bg: "bg-amber-100", text: "text-amber-700", hover: "hover:bg-amber-50" },
        pink: { bg: "bg-pink-100", text: "text-pink-700", hover: "hover:bg-pink-50" },
    };

    materialsContainer.innerHTML = data.map(gradeData => {
        const subjectsHtml = gradeData.subjects.map(subject => {
            const c = colorsMap[subject.color] || colorsMap['lime'];
            
            const unitsHtml = subject.units.map(unit => `
                <a href="${unit.pdf}" target="_blank" class="flex items-center justify-between p-3 rounded-xl bg-white/80 border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all group cursor-pointer">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full ${c.bg} ${c.text} flex items-center justify-center">
                            <i data-lucide="file-text" width="14" height="14"></i>
                        </div>
                        <span class="text-sm font-bold text-slate-600 group-hover:text-slate-800">${unit.title}</span>
                    </div>
                    <i data-lucide="download" width="16" height="16" class="text-slate-300 group-hover:text-slate-500"></i>
                </a>
            `).join('');

            return `
                <div class="learning-card flex-1 min-w-[300px] p-6 rounded-[2rem] ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white/60 border-white/60'} border backdrop-blur-md shadow-sm">
                    <div class="flex items-center gap-3 mb-5">
                        <div class="p-3 rounded-xl shadow-sm transform -rotate-3 ${c.bg} ${c.text}">
                            <i data-lucide="${subject.icon}" width="24" height="24"></i>
                        </div>
                        <h4 class="font-bold text-xl ${isDark ? 'text-slate-200' : 'text-slate-700'}">${subject.name}</h4>
                    </div>
                    <div class="space-y-3">
                        ${unitsHtml}
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="space-y-6">
                <div class="flex items-center gap-3">
                    <div class="h-8 w-1 ${isDark ? 'bg-yellow-400' : 'bg-slate-400'} rounded-full"></div>
                    <h3 class="text-2xl font-black ${isDark ? 'text-slate-200' : 'text-slate-700'}">
                        ${gradeData.grade}
                    </h3>
                </div>
                <div class="flex flex-wrap gap-6">
                    ${subjectsHtml}
                </div>
            </div>
        `;
    }).join('');
    
    lucide.createIcons();
};

// 初期化とタイマー
document.addEventListener('DOMContentLoaded', () => {
    render();
    // 1分ごとに更新（時間帯変化に対応）
    setInterval(render, 60000);
});
