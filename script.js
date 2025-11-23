/* =====================================================================
   🔧 設定・状態管理
   ===================================================================== */
let userLocation = { lat: 35.6895, lon: 139.6917, name: "東京" };
let cachedData = [];
let currentTab = 'elementary';
let currentUserGradeId = null; // 判定された学年ID (e1, j1など)

// クッキー操作ユーティリティ
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
   🎂 学年判定 & おすすめ表示ロジック
   ===================================================================== */
const calculateGrade = (birthDateString) => {
    if (!birthDateString) return null;
    
    const today = new Date();
    const birthDate = new Date(birthDateString);
    
    let schoolYear = today.getFullYear();
    if (today.getMonth() + 1 < 4) schoolYear -= 1;

    let birthYear = birthDate.getFullYear();
    if (birthDate.getMonth() + 1 < 4 || (birthDate.getMonth() + 1 === 4 && birthDate.getDate() === 1)) {
        birthYear -= 1;
    }

    const ageInSchoolYears = schoolYear - birthYear;

    // 6歳=小1 (ageInSchoolYears)
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

// おすすめ教材を表示
const renderRecommendations = () => {
    if (!currentUserGradeId || cachedData.length === 0) {
        document.getElementById('recommendation-section').classList.add('hidden');
        return;
    }

    const currentMonth = new Date().getMonth() + 1;
    document.getElementById('recommend-month').textContent = currentMonth;

    // ユーザーの学年のデータを検索
    const gradeData = cachedData.find(d => d.gradeId === currentUserGradeId);
    if (!gradeData) return;

    // 今月の推奨教材をフィルタリング
    let recommendedUnits = [];
    gradeData.subjects.forEach(subject => {
        subject.units.forEach(unit => {
            if (unit.months && unit.months.includes(currentMonth)) {
                recommendedUnits.push({
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
        container.innerHTML = recommendedUnits.map(unit => `
            <a href="${unit.pdf}" target="_blank" class="flex items-center justify-between p-4 bg-white/80 rounded-2xl border border-slate-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all group cursor-pointer backdrop-blur-sm">
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
            </a>
        `).join('');
        lucide.createIcons();
    } else {
        document.getElementById('recommendation-section').classList.add('hidden');
    }
};

/* =====================================================================
   🌞 空のグラデーション生成 (SunCalc連動)
   ===================================================================== */
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
    
    const timeText = now.getHours() < 5 || now.getHours() > 18 ? "こんばんは" : now.getHours() < 11 ? "おはよう" : "こんにちは";
    document.getElementById('time-text').textContent = timeText;
    document.getElementById('time-icon').setAttribute('data-lucide', now.getHours() > 18 || now.getHours() < 5 ? "moon" : "sun");

    lucide.createIcons();
};

/* =====================================================================
   🎨 ロゴ生成
   ===================================================================== */
const getTamabenLogo = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.2 28.05" class="w-full h-auto"><g transform="translate(-184.9,-165.975)"><path d="M190.659,184.74c0,-5.43 1.84,-9.84 6.65,-9.84c4.8,0 6.65,4.4 6.65,9.84c0,5.43 -2.66,6.65 -6.65,6.65c-3.98,0 -6.65,-1.21 -6.65,-6.65z" fill="#f7f7cb" stroke="none"/><path d="M190.659,184.74c0,-5.43 1.84,-9.84 6.65,-9.84c4.8,0 6.65,4.4 6.65,9.84c0,5.43 -2.66,6.65 -6.65,6.65c-3.98,0 -6.65,-1.21 -6.65,-6.65z" fill="none" stroke="#474742" stroke-width="1"/><path d="M194.9,181.65c0,-0.75 0.18,-1.51 0.93,-1.51c0.75,0 0.89,0.75 0.89,1.51c0,0.75 -0.13,1.37 -0.89,1.37c-0.75,0 -0.93,-0.61 -0.93,-1.37z" fill="#f7c7b2"/><path d="M197.88,181.65c0,-0.75 0.18,-1.51 0.93,-1.51c0.75,0 0.89,0.75 0.89,1.51c0,0.75 -0.13,1.37 -0.89,1.37c-0.75,0 -0.93,-0.61 -0.93,-1.37z" fill="#f7c7b2"/><path d="M196.18,184.92c0,-0.62 0.5,-0.81 1.12,-0.81c0.62,0 1.12,0.19 1.12,0.81c0,0.62 -0.5,1 -1.12,1c-0.62,0 -1.12,-0.37 -1.12,-1z" fill="#f7b2b2" stroke="#474742" stroke-width="0.5"/><path d="M192.7,176.58c0.05,-1.59 0,-3.41 0,-3.41h9.18c0,0 0.04,2.7 0,3.41c-0.35,1.5 -2.9,1.95 -4.43,1.95c-1.52,0 -4.5,-0.25 -4.75,-1.95z" fill="#4d4d4d"/><g stroke="#324738" stroke-width="3.5" stroke-linecap="round" fill="none"><path d="M233.67,174.32c0,0 13.75,-0.09 14.75,0c1.41,-0.03 -7.94,9.41 -7.94,9.41"/><path d="M243.09,187.37l-7.14,-6.8"/><path d="M219.4,172.63c0,0 -1.33,2.93 -2.41,4.4c-1.03,1.4 -2.34,2.29 -2.34,2.29"/><path d="M218.5,175.47c0,0 7.39,-0.42 8.05,0c0.69,0.69 -1.04,4.66 -3.72,7.39c-3.1,3.16 -5.57,4.06 -5.57,4.06"/><path d="M219.86,179.89l2.95,2.38"/><path d="M252.13,183.1c0,0 5.3,-6.6 6.01,-6.58c0.69,-0.49 9.87,9.3 9.87,9.3"/><path d="M252.36,183c0,0 5.3,-6.6 6.01,-6.58c0.69,-0.49 9.87,9.3 9.87,9.3"/><path d="M266.6,177.77l-1.7,-3.1"/><path d="M267.9,173.77l1.7,3.1"/><path d="M280.34,177.53l-4.4,-4"/><path d="M289.34,177.73c0,0 -3.3,4.5 -5.48,5.98c-2.43,1.64 -8.41,3.41 -8.41,3.41"/></g></g></svg>`;
};

/* =====================================================================
   🖥️ データ取得・描画
   ===================================================================== */
const fetchAndRender = async () => {
    if(cachedData.length === 0) {
        try {
            const response = await fetch('data.json');
            cachedData = await response.json();
        } catch (error) {
            console.error("Load Error:", error);
            return;
        }
    }
    renderMaterials();
    renderRecommendations(); // おすすめを表示
};

const renderMaterials = () => {
    const container = document.getElementById('learning-materials-container');
    
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

            const unitsList = sub.units.map(unit => `
                <a href="${unit.pdf}" target="_blank" class="block p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-200">
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-bold text-slate-600 group-hover:text-emerald-600 transition-colors line-clamp-1">${unit.title}</span>
                        <i data-lucide="download" class="w-4 h-4 text-slate-300 group-hover:text-emerald-500"></i>
                    </div>
                </a>
            `).join('');

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
   🛠️ UI操作
   ===================================================================== */
window.switchTab = (tab) => {
    currentTab = tab;
    document.getElementById('tab-elementary').className = tab === 'elementary' ? "tab-active px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2" : "tab-inactive px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2";
    document.getElementById('tab-junior').className = tab === 'junior' ? "tab-active px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2" : "tab-inactive px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2";
    renderMaterials();
};

window.openGradeModal = () => {
    document.getElementById('grade-modal').classList.add('modal-open');
};
window.closeGradeModal = () => {
    document.getElementById('grade-modal').classList.remove('modal-open');
};

window.saveBirthDate = () => {
    const dateVal = document.getElementById('birthdate-input').value;
    if (!dateVal) return;
    
    setCookie('tamaben_birthdate', dateVal, 365);
    applyUserGrade(dateVal);
    closeGradeModal();
    renderRecommendations(); // おすすめを再描画
};

window.clearBirthDate = () => {
    deleteCookie('tamaben_birthdate');
    document.getElementById('user-grade-display').innerHTML = `<i data-lucide="user" class="w-4 h-4 text-slate-500"></i><span>学年を設定する</span>`;
    currentUserGradeId = null;
    renderRecommendations(); // おすすめを非表示
    lucide.createIcons();
    closeGradeModal();
    alert("設定を削除しました");
};

const applyUserGrade = (dateStr) => {
    const result = calculateGrade(dateStr);
    if (result) {
        const btn = document.getElementById('user-grade-display');
        btn.innerHTML = `<i data-lucide="user-check" class="w-4 h-4 text-emerald-500"></i><span class="text-emerald-600">${result.label}</span>`;
        
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
    } catch (e) {
        console.log("Location Default");
    }
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('header-logo-wrapper').innerHTML = getTamabenLogo();
    document.getElementById('footer-logo-wrapper').innerHTML = getTamabenLogo();
    
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
