/* =====================================================================
   📚 教材データベース (全学年・全教科・全単元の枠組み)
   ===================================================================== */
const MATERIAL_DATA = [
    // --- 小学校 ---
    { id:"e1-j", tab:"elementary", grade:"小学1年生", subject:"国語", color:"rose", title:"ひらがな・カタカナ", tags:["文字","五十音","1年","書写","基本"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"e1-m", tab:"elementary", grade:"小学1年生", subject:"算数", color:"sky", title:"かずとたしざん・ひきざん", tags:["計算","1年","基本","数","さんすう"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    
    { id:"e2-j", tab:"elementary", grade:"小学2年生", subject:"国語", color:"rose", title:"かん字の読み書き", tags:["2年","漢字","書写","語彙"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"e2-m", tab:"elementary", grade:"小学2年生", subject:"算数", color:"sky", title:"ひっ算・かけ算(九九)", tags:["計算","九九","かけ算","筆算","2年"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    
    { id:"e3-j", tab:"elementary", grade:"小学3年生", subject:"国語", color:"rose", title:"こそあど言葉・物語", tags:["3年","読解","文法"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"e3-m", tab:"elementary", grade:"小学3年生", subject:"算数", color:"sky", title:"わり算・円と球", tags:["計算","割り算","図形","3年"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"e3-s", tab:"elementary", grade:"小学3年生", subject:"理科", color:"emerald", title:"昆虫と植物の育ち方", tags:["生き物","虫","3年","観察"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"e3-ss", tab:"elementary", grade:"小学3年生", subject:"社会", color:"amber", title:"わたしたちの町とくらし", tags:["地図","地域","3年"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    
    { id:"e4-m", tab:"elementary", grade:"小学4年生", subject:"算数", color:"sky", title:"小数・分数・面積", tags:["4年","計算","図形","小数","分数"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"e4-s", tab:"elementary", grade:"小学4年生", subject:"理科", color:"emerald", title:"月と星・水のゆくえ", tags:["4年","天体","自然"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"e4-ss", tab:"elementary", grade:"小学4年生", subject:"社会", color:"amber", title:"都道府県とくらし", tags:["日本地図","県庁所在地","4年"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    
    { id:"e5-m", tab:"elementary", grade:"小学5年生", subject:"算数", color:"sky", title:"割合・速さ・体積", tags:["5年","重要","計算","難しい"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"e5-s", tab:"elementary", grade:"小学5年生", subject:"理科", color:"emerald", title:"植物の実り・流れる水", tags:["5年","実験","植物"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"e5-ss", tab:"elementary", grade:"小学5年生", subject:"社会", color:"amber", title:"食料生産と国土", agriculture:["米","産業","5年"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"e5-e", tab:"elementary", grade:"小学5年生", subject:"英語", color:"violet", title:"Alphabet & Greeting", tags:["5年","はじめて","えいご"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    
    { id:"e6-m", tab:"elementary", grade:"小学6年生", subject:"算数", color:"sky", title:"比・対称な図形", tags:["6年","まとめ","比例"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"e6-s", tab:"elementary", grade:"小学6年生", subject:"理科", color:"emerald", title:"人体のつくり・電気", tags:["6年","生物","物理"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"e6-ss", tab:"elementary", grade:"小学6年生", subject:"社会", color:"amber", title:"日本の歴史・政治", tags:["歴史","れきし","6年","江戸","明治","侍"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    
    // --- 中学校 ---
    { id:"j1-m", tab:"junior", grade:"中学1年生", subject:"数学", color:"sky", title:"正負の数・方程式", tags:["中1","数学","計算","基本"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"j1-e", tab:"junior", grade:"中学1年生", subject:"英語", color:"violet", title:"be動詞・一般動詞", tags:["中1","えいご","文法"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"j1-s", tab:"junior", grade:"中学1年生", subject:"理科", color:"emerald", title:"植物の分類・光と音", tags:["中1","生物","物理"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"j1-ss", tab:"junior", grade:"中学1年生", subject:"社会", color:"amber", title:"世界の地域・古代史", tags:["地理","歴史","中1"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    
    { id:"j2-m", tab:"junior", grade:"中学2年生", subject:"数学", color:"sky", title:"連立方程式・一次関数", tags:["中2","計算","関数","難しい"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"j2-e", tab:"junior", grade:"中学2年生", subject:"英語", color:"violet", title:"過去形・不定詞", tags:["中2","文法"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"j2-s", tab:"junior", grade:"中学2年生", subject:"理科", color:"emerald", title:"化学変化・天気", tags:["中2","化学","気象"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"j2-ss", tab:"junior", grade:"中学2年生", subject:"社会", color:"amber", title:"日本の地域・近世史", tags:["地理","歴史","江戸","明治","中2"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    
    { id:"j3-m", tab:"junior", grade:"中学3年生", subject:"数学", color:"sky", title:"因数分解・平方根・2次関数", tags:["中3","まとめ","受験","関数"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"j3-e", tab:"junior", grade:"中学3年生", subject:"英語", color:"violet", title:"現在完了・関係代名詞", tags:["中3","受験","文法"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"j3-s", tab:"junior", grade:"中学3年生", subject:"理科", color:"emerald", title:"イオン・天体・運動", tags:["中3","化学","天文","物理"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
    { id:"j3-ss", tab:"junior", grade:"中学3年生", subject:"社会", color:"amber", title:"現代史・公民", tags:["歴史","政治","経済","中3"], pdfBasic:"#", pdfAdv:"#", pdfAns:"#" },
];

let currentTab = 'elementary';

/* =====================================================================
   🔍 検索・描画エンジン
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
                <div class="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-300 group-hover:bg-stone-700 group-hover:text-white transition-all shadow-sm">
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </div>
            </div>
        </div>
    `).join('');
    
    if(filtered.length === 0) {
        container.innerHTML = `<div class="col-span-full py-20 text-center text-stone-300 font-bold">教材が見つかりませんでした</div>`;
    }
    lucide.createIcons();
};

/* =====================================================================
   🛠️ 学年設定・保存 (localStorage)
   ===================================================================== */
window.saveBirthDate = () => {
    const val = document.getElementById('birthdate-input').value;
    if (!val) return;
    localStorage.setItem('tamaben_birthdate', val);
    applySettings(val);
    closeSettingsModal();
};

window.clearBirthDate = () => {
    localStorage.removeItem('tamaben_birthdate');
    location.reload();
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

const calculateGrade = (birthStr) => {
    const today = new Date();
    const birth = new Date(birthStr);
    let schoolYear = today.getFullYear();
    if (today.getMonth() + 1 < 4) schoolYear--;
    let birthYear = birth.getFullYear();
    if (birth.getMonth() + 1 < 4 || (birth.getMonth() + 1 === 4 && birth.getDate() === 1)) birthYear--;
    const age = schoolYear - birthYear;
    if (age >= 6 && age <= 11) return { type: 'elementary', label: `小学${age - 5}年生` };
    if (age >= 12 && age <= 14) return { type: 'junior', label: `中学${age - 11}年生` };
    return { type: 'other', label: '対象外' };
};

/* =====================================================================
   🖥️ UIアクション
   ===================================================================== */
window.switchTab = (tab) => {
    currentTab = tab;
    document.getElementById('tab-elementary').classList.toggle('active', tab === 'elementary');
    document.getElementById('tab-junior').classList.toggle('active', tab === 'junior');
    renderMaterials();
};

window.openDetail = (item) => {
    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-detail').classList.remove('hidden');
    const content = document.getElementById('detail-content');
    content.innerHTML = `
        <div class="p-10 md:p-16 text-center">
            <div class="inline-block px-4 py-1.5 bg-stone-50 text-stone-400 text-[10px] font-black rounded-full mb-6 border border-stone-100">
                ${item.grade} / ${item.subject}
            </div>
            <h2 class="text-3xl md:text-5xl font-black text-stone-700 mb-12">${item.title}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <button onclick="window.open('${item.pdfBasic}')" class="flex flex-col items-center gap-4 p-8 bg-[#fdf2f0] rounded-[2rem] hover:bg-[#fae8e5] transition-all">
                    <i data-lucide="file-text" class="w-8 h-8 text-[#e89a8e]"></i>
                    <span class="font-black text-stone-600">基本問題(PDF)</span>
                </button>
                <button onclick="window.open('${item.pdfAdv}')" class="flex flex-col items-center gap-4 p-8 bg-stone-50 rounded-[2rem] hover:bg-stone-100 transition-all">
                    <i data-lucide="zap" class="w-8 h-8 text-stone-300"></i>
                    <span class="font-black text-stone-600">応用問題(PDF)</span>
                </button>
                <button onclick="window.open('${item.pdfAns}')" class="md:col-span-2 flex items-center justify-center gap-4 p-6 bg-stone-800 text-white rounded-[2.5rem] hover:bg-stone-900 transition-all">
                    <i data-lucide="check-circle" class="w-5 h-5 text-stone-400"></i>
                    <span class="font-black">解答を確認する</span>
                </button>
            </div>
        </div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
};

window.goHome = () => {
    document.getElementById('view-home').classList.remove('hidden');
    document.getElementById('view-detail').classList.add('hidden');
};

window.openSettingsModal = () => document.getElementById('settings-modal').classList.add('active');
window.closeSettingsModal = () => document.getElementById('settings-modal').classList.remove('active');

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('tamaben_birthdate');
    if (saved) {
        document.getElementById('birthdate-input').value = saved;
        applySettings(saved);
    }
    renderMaterials();
});
document.getElementById('search-input').addEventListener('input', renderMaterials);
