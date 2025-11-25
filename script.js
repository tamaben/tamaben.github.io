/* =====================================================================
   🔧 設定・状態管理
   ===================================================================== */
let userLocation = { lat: 35.6895, lon: 139.6917, name: "東京" };
let cachedData = [];
let currentTab = 'elementary';
let currentUserGradeId = null; 
let currentDetailUnit = null;

// クッキー操作
const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const deleteCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

/* =====================================================================
   🎂 学年判定・誕生日チェック
   ===================================================================== */
const calculateGrade = (birthDateString) => {
    if (!birthDateString) return null;
    
    const today = new Date();
    const birthDate = new Date(birthDateString);
    
    // 誕生日チェック
    if (today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate()) {
        if (!sessionStorage.getItem('birthday_celebrated')) {
            triggerBirthdayMode();
            sessionStorage.setItem('birthday_celebrated', 'true');
        }
    }

    let schoolYear = today.getFullYear();
    if (today.getMonth() + 1 < 4) schoolYear -= 1;

    let birthYear = birthDate.getFullYear();
    if (birthDate.getMonth() + 1 < 4 || (birthDate.getMonth() + 1 === 4 && birthDate.getDate() === 1)) {
        birthYear -= 1;
    }

    const ageInSchoolYears = schoolYear - birthYear;

    if (ageInSchoolYears >= 6 && ageInSchoolYears <= 11) {
        const grade = ageInSchoolYears - 5;
        return { type: 'elementary', gradeId: `e${grade}`, label: `小学${grade}年生` };
    } else if (ageInSchoolYears >= 12 && ageInSchoolYears <= 14) {
        const grade = ageInSchoolYears - 11;
        return { type: 'junior', gradeId: `j${grade}`, label: `中学${grade}年生` };
    } else {
        return { type: 'other', label: '対象外' };
    }
};

const triggerBirthdayMode = () => {
    const overlay = document.getElementById('birthday-overlay');
    overlay.classList.add('active');
    
    if (window.confetti) {
        const duration = 5000;
        const end = Date.now() + duration;
        (function frame() {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#f472b6', '#fbbf24', '#34d399', '#60a5fa'] });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#f472b6', '#fbbf24', '#34d399', '#60a5fa'] });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }
};

window.closeBirthdayMode = () => {
    document.getElementById('birthday-overlay').classList.remove('active');
};

const renderRecommendations = () => {
    if (!currentUserGradeId || cachedData.length === 0) {
        document.getElementById('recommendation-section').classList.add('hidden');
        return;
    }

    const currentMonth = new Date().getMonth() + 1;
    document.getElementById('recommend-month').textContent = currentMonth;

    const gradeData = cachedData.find(d => d.gradeId === currentUserGradeId);
    if (!gradeData) return;

    let recommendedUnits = [];
    gradeData.subjects.forEach(subject => {
        subject.units.forEach(unit => {
            if (unit.months && unit.months.includes(currentMonth)) {
                recommendedUnits.push({
                    grade: gradeData.grade,
                    subjectName: subject.name,
                    color: subject.color,
                    ...unit
                });
            }
        });
    });

    const container = document.getElementById('recommendation-container');
    if (recommendedUnits.length > 0) {
        document.getElementById('recommendation-section').classList.remove('hidden');
        container.innerHTML = recommendedUnits.map((unit, idx) => `
            <div onclick='openDetail(${JSON.stringify(unit)})' class="flex items-center justify-between p-4 bg-white/80 rounded-2xl border border-slate-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all group cursor-pointer backdrop-blur-sm">
                <div class="flex items-center gap-3 overflow-hidden">
                    <div class="w-10 h-10 rounded-xl bg-${unit.color}-100 flex-shrink-0 flex items-center justify-center text-${unit.color}-600 font-bold text-xs">
                        ${unit.subjectName.substring(0,1)}
                    </div>
                    <div>
                        <span class="block text-xs font-bold text-slate-400 mb-0.5">おすすめ！</span>
                        <span class="block text-sm font-bold text-slate-700 group-hover:text-emerald-700 truncate">${unit.title}</span>
                    </div>
                </div>
                <i data-lucide="sparkles" class="w-4 h-4 text-yellow-400 flex-shrink-0"></i>
            </div>
        `).join('');
        lucide.createIcons();
    } else {
        document.getElementById('recommendation-section').classList.add('hidden');
    }
};

/* =====================================================================
   🌞 空のグラデーション
   ===================================================================== */
const SEASONS = {
    spring: { name: "春", colors: { primary: "bg-emerald-400", secondary: "bg-pink-300", accent: "text-pink-500", gradient: "from-pink-100 to-emerald-50", border: "border-pink-100" }, icon: "flower-2", particleColor: "text-pink-300" },
    summer: { name: "夏", colors: { primary: "bg-emerald-500", secondary: "bg-sky-400", accent: "text-sky-500", gradient: "from-sky-100 to-emerald-50", border: "border-sky-100" }, icon: "sun", particleColor: "text-yellow-300" },
    autumn: { name: "秋", colors: { primary: "bg-emerald-600", secondary: "bg-orange-400", accent: "text-orange-500", gradient: "from-orange-100 to-emerald-50", border: "border-orange-100" }, icon: "leaf", particleColor: "text-orange-300" },
    winter: { name: "冬", colors: { primary: "bg-emerald-400", secondary: "bg-indigo-300", accent: "text-indigo-500", gradient: "from-indigo-50 to-emerald-50", border: "border-indigo-100" }, icon: "snowflake", particleColor: "text-sky-200" }
};

const TIME_THEMES = {
    morning: { label: "おはよう！", icon: "sunrise", overlay: "bg-orange-100/30", isDark: false },
    day: { label: "こんにちは！", icon: "sun", overlay: "bg-transparent", isDark: false },
    evening: { label: "こんばんは。", icon: "sunset", overlay: "bg-indigo-900/20", isDark: false },
    night: { label: "おつかれさま。", icon: "moon", overlay: "bg-slate-900/80", isDark: true }
};

const getSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
};

const getNaturalTimeOfDay = () => {
    const now = new Date();
    const times = SunCalc.getTimes(now, userLocation.lat, userLocation.lon);
    if (now < times.dawn) return TIME_THEMES.night;
    if (now >= times.dawn && now < times.goldenHourEnd) return TIME_THEMES.morning;
    const oneHourBeforeSunset = new Date(times.sunset.getTime() - 60 * 60 * 1000);
    if (now >= times.goldenHourEnd && now < oneHourBeforeSunset) return TIME_THEMES.day;
    if (now >= oneHourBeforeSunset && now < times.dusk) return TIME_THEMES.evening;
    return TIME_THEMES.night;
};

const updateSky = () => {
    const now = new Date();
    const times = SunCalc.getTimes(now, userLocation.lat, userLocation.lon);
    const sky = document.getElementById('sky-background');
    const stars = document.getElementById('stars');
    
    const gradients = {
        night: "linear-gradient(to bottom, #0f172a, #1e293b)", 
        dawn: "linear-gradient(to bottom, #312e81, #f472b6, #fbbf24)", 
        day: "linear-gradient(to bottom, #38bdf8, #bae6fd, #e0f2fe)", 
        dusk: "linear-gradient(to bottom, #1e3a8a, #c026d3, #f97316)", 
    };

    let currentGradient = gradients.night;
    let starOpacity = 1;
    let seasonName = "冬";
    let seasonIcon = "snowflake";

    const month = now.getMonth() + 1;
    if (month >= 3 && month <= 5) { seasonName = "春"; seasonIcon = "flower-2"; }
    else if (month >= 6 && month <= 8) { seasonName = "夏"; seasonIcon = "sun"; }
    else if (month >= 9 && month <= 11) { seasonName = "秋"; seasonIcon = "leaf"; }

    if (now < times.nightEnd) { currentGradient = gradients.night; starOpacity = 1; }
    else if (now < times.goldenHourEnd) { currentGradient = gradients.dawn; starOpacity = 0; }
    else if (now < times.goldenHour) { currentGradient = gradients.day; starOpacity = 0; }
    else if (now < times.night) { currentGradient = gradients.dusk; starOpacity = 0.3; }
    else { currentGradient = gradients.night; starOpacity = 1; }

    sky.style.background = currentGradient;
    stars.style.opacity = starOpacity;
    
    document.getElementById('season-name').textContent = seasonName;
    document.getElementById('main-season-icon').setAttribute('data-lucide', seasonIcon);
    
    const seasonKey = getSeason();
    const season = SEASONS[seasonKey];
    const colors = season.colors;
    const time = getNaturalTimeOfDay();

    document.getElementById('hero-section').className = `relative rounded-[3rem] overflow-hidden ${time.isDark ? 'bg-slate-800' : colors.secondary} shadow-xl shadow-emerald-900/10 text-white p-8 md:p-16 text-center md:text-left transition-colors duration-700 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/30 backdrop-blur-sm`;
    document.getElementById('logo-glow').className = `absolute inset-0 ${colors.primary} rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity`;
    // SVGはHTMLに直接埋め込んだため、JSでの注入処理は削除

    document.getElementById('time-text').textContent = time.label;
    document.getElementById('time-icon').setAttribute('data-lucide', time.icon);
    const badgeClass = time.isDark 
        ? 'text-yellow-200 bg-slate-800 border-slate-700' 
        : 'text-slate-600 border-slate-200 bg-white/60';
    document.getElementById('time-badge').className = `hidden md:flex px-4 py-2 rounded-full border text-xs font-bold items-center gap-2 backdrop-blur-sm shadow-sm transition-all duration-500 ${badgeClass}`;

    const particlesContainer = document.getElementById('particles-container');
    const currentPhaseState = `${seasonKey}-${time.isDark ? 'night' : 'day'}`;
    if (!particlesContainer.hasChildNodes() || particlesContainer.getAttribute('data-state') !== currentPhaseState) {
        particlesContainer.innerHTML = '';
        particlesContainer.setAttribute('data-state', currentPhaseState);
        let particlesHtml = '';
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
            particlesHtml += `<div class="particle ${pColor}" style="left:${left}%; top:${top}; animation:${animName} ${dur}s ${dly}s infinite; width:${size}px; height:${size}px;">${getParticleSvg(seasonKey, time.isDark)}</div>`;
        }
        particlesContainer.innerHTML = particlesHtml;
    }

    lucide.createIcons();
};

const getParticleSvg = (seasonKey, isNight) => {
    if (isNight) return '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />';
    const shapes = {
        "spring": '<path d="M12,2 C12,2 14,5 17,6 C20,7 22,10 21,13 C20,16 17,17 15,16 C13,15.5 12,14 12,14 C12,14 11,15.5 9,16 C7,17 4,16 3,13 C2,10 4,7 7,6 C10,5 12,2 12,2 Z" fill="currentColor"/>',
        "summer": '<circle cx="12" cy="12" r="6" fill="currentColor"/> <path d="M12,2 L12,4 M12,20 L12,22 M4.93,4.93 L6.34,6.34 M17.66,17.66 L19.07,19.07 M2,12 L4,12 M20,12 L22,12 M4.93,19.07 L6.34,17.66 M17.66,6.34 L19.07,4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" />',
        "autumn": '<path d="M12,2 L14,8 L20,6 L17,11 L22,14 L16,16 L15,22 L12,18 L9,22 L8,16 L2,14 L7,11 L4,6 L10,8 L12,2 Z" fill="currentColor"/>',
        "winter": '<path d="M12,2 L12,22 M2,12 L22,12 M4.93,4.93 L19.07,19.07 M4.93,19.07 L19.07,4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
    };
    return `<svg viewBox="0 0 24 24" class="w-full h-full">${shapes[seasonKey] || shapes.spring}</svg>`;
};

/* =====================================================================
   🖥️ データ取得・描画 (堅牢化)
   ===================================================================== */
const fetchAndRender = async () => {
    const statusEl = document.getElementById('data-load-status');
    
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Load failed');
        cachedData = await response.json();
        if(statusEl) statusEl.textContent = "読み込み完了";
    } catch (error) {
        console.error("Load Error:", error);
        if(statusEl) statusEl.textContent = "データ読み込みエラー: " + error.message;
    }
    
    renderMaterials();
    renderRecommendations();
};

const renderMaterials = () => {
    const container = document.getElementById('learning-materials-container');
    if (!container) return;
    
    const filteredData = cachedData.filter(d => {
        if(currentTab === 'elementary') return d.gradeId.startsWith('e');
        if(currentTab === 'junior') return d.gradeId.startsWith('j');
        return false;
    });

    container.innerHTML = filteredData.map(data => {
        if (!data.subjects || data.subjects.length === 0) return '';

        const subjectsHtml = data.subjects.map(sub => {
            const colorMap = {
                lime: { bg: "bg-lime-100", text: "text-lime-700", iconBg: "bg-lime-500" },
                rose: { bg: "bg-rose-100", text: "text-rose-700", iconBg: "bg-rose-500" },
                violet: { bg: "bg-violet-100", text: "text-violet-700", iconBg: "bg-violet-500" },
                emerald: { bg: "bg-emerald-100", text: "text-emerald-700", iconBg: "bg-emerald-500" },
                amber: { bg: "bg-amber-100", text: "text-amber-700", iconBg: "bg-amber-500" },
                blue: { bg: "bg-blue-100", text: "text-blue-700", iconBg: "bg-blue-500" },
            };
            const theme = colorMap[sub.color] || colorMap.lime;

            const unitsList = sub.units.map(unit => {
                const unitData = {
                    grade: data.grade,
                    subjectName: sub.name,
                    color: sub.color,
                    ...unit
                };
                return `
                <div onclick='openDetail(${JSON.stringify(unitData)})' class="block p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-200 cursor-pointer">
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-bold text-slate-600 group-hover:text-emerald-600 transition-colors line-clamp-1">${unit.title}</span>
                        <i data-lucide="chevron-right" class="w-4 h-4 text-slate-300 group-hover:text-emerald-500"></i>
                    </div>
                </div>
            `}).join('');

            return `
                <div class="mb-6 last:mb-0">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-8 h-8 rounded-lg ${theme.iconBg} flex items-center justify-center text-white shadow-sm">
                            <i data-lucide="${sub.icon}" width="16" height="16"></i>
                        </div>
                        <h4 class="font-bold text-slate-700">${sub.name}</h4>
                    </div>
                    <div class="space-y-1">
                        ${unitsList}
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="glass-card rounded-[2rem] p-6 md:p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300 border border-white/60 bg-white/90">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 to-slate-100"></div>
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-black text-slate-800 tracking-tight">${data.grade}</h3>
                    <span class="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-500">
                        ${data.subjects.reduce((acc, curr) => acc + curr.units.length, 0)} 単元
                    </span>
                </div>
                <div>${subjectsHtml}</div>
            </div>
        `;
    }).join('');
    
    lucide.createIcons();
};

/* =====================================================================
   🛠️ UI操作・詳細ページ
   ===================================================================== */
window.openDetail = (unitData) => {
    currentDetailUnit = unitData;
    document.getElementById('detail-title').textContent = unitData.title;
    document.getElementById('detail-grade').textContent = unitData.grade;
    document.getElementById('detail-subject').textContent = unitData.subjectName;
    
    const colorMap = { lime: '#84cc16', rose: '#f43f5e', violet: '#8b5cf6', emerald: '#10b981', amber: '#f59e0b', blue: '#3b82f6' };
    document.getElementById('detail-header').style.backgroundColor = colorMap[unitData.color] || '#10b981';

    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-detail').classList.remove('hidden');
    window.scrollTo(0,0);
};

window.goHome = () => {
    document.getElementById('view-detail').classList.add('hidden');
    document.getElementById('view-home').classList.remove('hidden');
    window.scrollTo(0,0);
};

window.openPdf = (type) => {
    if(!currentDetailUnit) return;
    let url;
    if (type === 'basic') url = currentDetailUnit.pdfBasic;
    else if (type === 'advanced') url = currentDetailUnit.pdfAdv;
    else if (type === 'answer') url = currentDetailUnit.pdfAnswer;

    if(url && url !== '#') {
        window.open(url, '_blank');
    } else {
        alert('PDFは準備中です');
    }
};

window.switchTab = (tab) => {
    currentTab = tab;
    const elBtn = document.getElementById('tab-elementary');
    const juBtn = document.getElementById('tab-junior');
    if(elBtn && juBtn) {
        elBtn.className = tab === 'elementary' ? "tab-active px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2" : "tab-inactive px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2";
        juBtn.className = tab === 'junior' ? "tab-active px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2" : "tab-inactive px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2";
    }
    renderMaterials();
};

window.openSettingsModal = () => {
    document.getElementById('settings-modal').classList.add('modal-open');
};
window.closeSettingsModal = () => {
    document.getElementById('settings-modal').classList.remove('modal-open');
};

window.saveBirthDate = () => {
    const dateVal = document.getElementById('birthdate-input').value;
    if (!dateVal) return;
    setCookie('tamaben_birthdate', dateVal, 365);
    applyUserGrade(dateVal);
    closeSettingsModal();
    renderRecommendations();
};

window.clearBirthDate = () => {
    deleteCookie('tamaben_birthdate');
    const badge = document.getElementById('current-grade-badge');
    const label = document.getElementById('user-grade-label');
    if(badge) badge.classList.add('hidden');
    if(label) label.textContent = '未設定';
    currentUserGradeId = null;
    renderRecommendations();
    closeSettingsModal();
    alert("設定を削除しました");
};

const applyUserGrade = (dateStr) => {
    const result = calculateGrade(dateStr);
    if (result) {
        const badge = document.getElementById('current-grade-badge');
        const label = document.getElementById('user-grade-label');
        if(badge) badge.classList.remove('hidden');
        if(label) label.textContent = result.label;
        
        if (result.type === 'elementary' || result.type === 'junior') {
            switchTab(result.type);
            currentUserGradeId = result.gradeId;
        }
        lucide.createIcons();
    }
};

// IPロケーション
const fetchIpLocation = async () => {
    try {
        const response = await fetch('https://ipwho.is/');
        const data = await response.json();
        if(data.success) userLocation = { lat: data.latitude, lon: data.longitude, name: data.city };
        updateSky();
    } catch (e) { console.log("Location Default"); }
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    // ロゴ生成はHTML側で対応済み
    
    const savedDate = getCookie('tamaben_birthdate');
    if (savedDate) {
        document.getElementById('birthdate-input').value = savedDate;
        applyUserGrade(savedDate);
    }

    updateSky();
    fetchIpLocation();
    fetchAndRender();
    setInterval(updateSky, 60000);
});
