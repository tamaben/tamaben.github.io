/* =====================================================================
   📚 教材データベース
   ===================================================================== */
const MATERIAL_DATA = [
  { id: "e1-math-1", tab: "elementary", grade: "小学1年生", subject: "算数", color: "rose", title: "かずとすうじ", tags: ["1年", "算数", "基本", "数"], pdfBasic: "#", pdfAdv: "#", pdfAns: "#" },
  { id: "e1-math-2", tab: "elementary", grade: "小学1年生", subject: "算数", color: "rose", title: "たしざんのきほん", tags: ["1年", "計算", "足し算"], pdfBasic: "#", pdfAdv: "#", pdfAns: "#" },
  { id: "e2-math-1", tab: "elementary", grade: "小学2年生", subject: "算数", color: "orange", title: "ひっ算のやりかた", tags: ["2年", "計算", "筆算"], pdfBasic: "#", pdfAdv: "#", pdfAns: "#" },
  { id: "e3-sci-1", tab: "elementary", grade: "小学3年生", subject: "理科", color: "emerald", title: "昆虫のひみつ", tags: ["3年", "生き物", "虫"], pdfBasic: "#", pdfAdv: "#", pdfAns: "#" },
  { id: "e6-soc-1", tab: "elementary", grade: "小学6年生", subject: "社会", color: "amber", title: "日本の歴史(江戸)", tags: ["6年", "歴史", "江戸時代"], pdfBasic: "#", pdfAdv: "#", pdfAns: "#" },
  { id: "j1-math-1", tab: "junior", grade: "中学1年生", subject: "数学", color: "indigo", title: "正の数・負の数", tags: ["中1", "数学", "マイナス"], pdfBasic: "#", pdfAdv: "#", pdfAns: "#" }
];

let currentTab = 'elementary';

/* =====================================================================
   🔍 検索・描画
   ===================================================================== */
const renderMaterials = () => {
    const container = document.getElementById('learning-materials-container');
    const input = document.getElementById('search-input');
    const query = input ? input.value.toLowerCase().trim() : "";
    if (!container) return;

    const filtered = MATERIAL_DATA.filter(item => {
        const matchTab = item.tab === currentTab;
        const matchText = item.title.toLowerCase().includes(query) || 
                          item.subject.toLowerCase().includes(query) || 
                          item.grade.toLowerCase().includes(query) ||
                          (item.tags && item.tags.some(t => t.toLowerCase().includes(query)));
        return matchTab && (query === "" || matchText);
    });

    container.innerHTML = filtered.map(item => `
        <div onclick='openDetail(${JSON.stringify(item)})' class="soft-card p-8 reveal active cursor-pointer group">
            <div class="flex items-center gap-3 mb-6">
                <span class="px-3 py-1 bg-${item.color}-50 text-${item.color}-400 text-[9px] font-black rounded-lg uppercase border border-${item.color}-100">
                    ${item.subject}
                </span>
                <span class="text-[9px] font-bold text-stone-300">${item.grade}</span>
            </div>
            <h3 class="text-lg font-black text-stone-700 group-hover:text-stone-900 transition-colors">${item.title}</h3>
            <div class="mt-8 flex justify-end">
                <div class="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-300 group-hover:bg-stone-700 group-hover:text-white transition-all">
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
};

/* =====================================================================
   🎂 学年計算ロジック
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

    const age = schoolYear - birthYear;

    if (age >= 6 && age <= 11) {
        return { type: 'elementary', label: `小学${age - 5}年生` };
    } else if (age >= 12 && age <= 14) {
        return { type: 'junior', label: `中学${age - 11}年生` };
    } else {
        return { type: 'other', label: '対象外' };
    }
};

/* =====================================================================
   🛠️ 設定の保存・読込 (localStorageを使用)
   ===================================================================== */
window.saveBirthDate = () => {
    const input = document.getElementById('birthdate-input');
    const dateVal = input.value;
    if (!dateVal) return;

    // localStorageに保存
    localStorage.setItem('tamaben_birthdate', dateVal);
    
    applySettings(dateVal);
    closeSettingsModal();
};

window.clearBirthDate = () => {
    localStorage.removeItem('tamaben_birthdate');
    location.reload(); // リセットして再読み込み
};

const applySettings = (dateStr) => {
    const result = calculateGrade(dateStr);
    if (result) {
        const badge = document.getElementById('grade-badge');
        const label = document.getElementById('user-grade-label');
        if(badge) badge.classList.remove('hidden');
        if(label) label.textContent = result.label;
        
        if (result.type === 'elementary' || result.type === 'junior') {
            switchTab(result.type);
        }
    }
};

/* =====================================================================
   🖥️ UI制御
   ===================================================================== */
window.switchTab = (tab) => {
    currentTab = tab;
    document.getElementById('tab-elementary').classList.toggle('active', tab === 'elementary');
    document.getElementById('tab-junior').classList.toggle('active', tab === 'junior');
    renderMaterials();
};

window.openSettingsModal = () => document.getElementById('settings-modal').classList.add('active');
window.closeSettingsModal = () => document.getElementById('settings-modal').classList.remove('active');

window.openDetail = (item) => {
    const home = document.getElementById('view-home');
    const detail = document.getElementById('view-detail');
    const content = document.getElementById('detail-content');

    content.innerHTML = `
        <div class="p-10 md:p-16 text-center">
            <h2 class="text-3xl md:text-5xl font-black text-stone-700 mb-12">${item.title}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <button onclick="window.open('${item.pdfBasic}')" class="p-8 bg-[#fdf2f0] rounded-[2rem] font-black text-stone-600">基本問題</button>
                <button onclick="window.open('${item.pdfAdv}')" class="p-8 bg-stone-50 rounded-[2rem] font-black text-stone-600">応用問題</button>
                <button onclick="window.open('${item.pdfAns}')" class="md:col-span-2 p-6 bg-stone-800 text-white rounded-[2rem] font-black">解答を確認</button>
            </div>
        </div>`;
    home.classList.add('hidden');
    detail.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
};

window.goHome = () => {
    document.getElementById('view-home').classList.remove('hidden');
    document.getElementById('view-detail').classList.add('hidden');
};

// 初期化：保存されたデータを読み込む
document.addEventListener('DOMContentLoaded', () => {
    const savedDate = localStorage.getItem('tamaben_birthdate');
    if (savedDate) {
        document.getElementById('birthdate-input').value = savedDate;
        applySettings(savedDate);
    }
    renderMaterials();
});

document.getElementById('search-input').addEventListener('input', renderMaterials);
