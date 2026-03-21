/* =====================================================================
   📚 教材データベース
   ===================================================================== */
let MATERIAL_DATA = [];
let currentTab = 'elementary';

// パスが有効かチェックする関数
const hasMaterial = (path) => {
    return path && path.startsWith('print/') && path.length > 7;
};

/* --- 1. 検索・描画 --- */
const renderMaterials = () => {
    const container = document.getElementById('learning-materials-container');
    const query = document.getElementById('search-input').value.toLowerCase().trim();
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
        <div onclick='openDetail(${JSON.stringify(item)})' class="premium-card p-10 reveal active group cursor-pointer">
            <div class="flex items-center gap-3 mb-6">
                <span class="px-4 py-1.5 bg-[#f5ebe0] text-[#a98467] text-[10px] font-black rounded-xl uppercase">${item.subject}</span>
                <span class="text-[10px] font-bold text-[#dcd0c6]">${item.grade}</span>
            </div>
            <h3 class="text-xl font-black text-[#5d5752] group-hover:text-[#d4a373] transition-colors">${item.title}</h3>
            <div class="mt-10 flex justify-end">
                <div class="w-10 h-10 rounded-full bg-[#faf6f2] flex items-center justify-center text-[#dcd0c6] group-hover:bg-[#5d5752] group-hover:text-white transition-all duration-500 shadow-sm">
                    <i data-lucide="arrow-right" class="w-5 h-5"></i>
                </div>
            </div>
        </div>
    `).join('');
    
    if(filtered.length === 0) container.innerHTML = `<div class="col-span-full py-24 text-center text-[#dcd0c6] font-black">準備中の教材です。</div>`;
    lucide.createIcons();
};

/* --- 2. 詳細画面 (教材の有無を判別) --- */
window.openDetail = (item) => {
    document.getElementById('view-home').classList.add('hidden');
    const detail = document.getElementById('view-detail');
    detail.classList.remove('hidden');

    const basicOk = hasMaterial(item.pdfBasic);
    const advOk = hasMaterial(item.pdfAdv);
    const ansOk = hasMaterial(item.pdfAns);

    document.getElementById('detail-content').innerHTML = `
        <div class="p-12 md:p-24 text-center">
            <div class="inline-block px-5 py-2 bg-[#f5ebe0] text-[#a98467] text-[11px] font-black rounded-full mb-10">${item.grade} / ${item.subject}</div>
            <h2 class="text-4xl md:text-6xl font-black text-[#5d5752] mb-16 leading-tight">${item.title}</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <!-- 基本問題ボタン -->
                <button onclick="${basicOk ? `window.open('${item.pdfBasic}')` : ''}" 
                    class="p-10 rounded-[3rem] font-black text-sm transition-all border ${basicOk ? 'bg-[#faf6f2] text-[#5d5752] border-[#ece4de] hover:bg-[#f5ebe0]' : 'btn-disabled bg-stone-50 border-stone-100'}">
                    <i data-lucide="file-text" class="w-6 h-6 mx-auto mb-4 ${basicOk ? 'text-[#d4a373]' : ''}"></i>
                    ${basicOk ? '基本問題をひらく' : '基本は準備中です'}
                </button>

                <!-- 応用問題ボタン -->
                <button onclick="${advOk ? `window.open('${item.pdfAdv}')` : ''}" 
                    class="p-10 rounded-[3rem] font-black text-sm transition-all border-2 ${advOk ? 'bg-white border-[#f5ebe0] text-[#5d5752] hover:border-[#d4a373]' : 'btn-disabled bg-stone-50 border-stone-100'}">
                    <i data-lucide="zap" class="w-6 h-6 mx-auto mb-4 ${advOk ? 'text-orange-300' : ''}"></i>
                    ${advOk ? '応用問題に挑戦' : '応用は準備中です'}
                </button>

                <!-- 解答ボタン -->
                <button onclick="${ansOk ? `window.open('${item.pdfAns}')` : ''}" 
                    class="md:col-span-2 p-8 rounded-[2.5rem] font-black text-sm transition-all ${ansOk ? 'bg-[#5d5752] text-white hover:bg-[#4a4541] shadow-xl' : 'btn-disabled bg-stone-100 text-stone-400'}">
                    ${ansOk ? '解答・解説を確認する' : '解答は準備中です'}
                </button>
            </div>
        </div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
};

/* --- 3. UI・設定制御 --- */
window.goHome = () => {
    document.getElementById('view-home').classList.remove('hidden');
    document.getElementById('view-detail').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.switchTab = (tab) => {
    currentTab = tab;
    document.getElementById('tab-elementary').classList.toggle('active', tab === 'elementary');
    document.getElementById('tab-junior').classList.toggle('active', tab === 'junior');
    renderMaterials();
};

window.saveBirthDate = () => {
    const val = document.getElementById('birthdate-input').value;
    if (!val) return;
    localStorage.setItem('tamaben_birthdate', val);
    location.reload();
};

window.clearBirthDate = () => {
    localStorage.removeItem('tamaben_birthdate');
    location.reload();
};

window.openSettingsModal = () => document.getElementById('settings-modal').classList.add('active');
window.closeSettingsModal = () => document.getElementById('settings-modal').classList.remove('active');

/* --- 4. 初期化 --- */
async function load() {
    try {
        const res = await fetch('data.json');
        MATERIAL_DATA = await res.json();
    } catch (e) {
        console.warn("Using Sample Data");
        MATERIAL_DATA = [
            { id:"1", tab:"elementary", grade:"小学1年生", subject:"算数", title:"かずと すうじ", tags:["1年","基本"], pdfBasic:"print/e1_math_basic.pdf", pdfAdv:"#", pdfAns:"#" }
        ];
    }
    
    // 学年復元
    const saved = localStorage.getItem('tamaben_birthdate');
    if (saved) {
        const birth = new Date(saved);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear() - (today.getMonth() + 1 < 4 ? 1 : 0);
        const label = document.getElementById('user-grade-label');
        const badge = document.getElementById('grade-badge');
        if (age >= 6 && age <= 11) { label.textContent = `小学${age-5}年生`; badge.classList.remove('hidden'); currentTab = 'elementary'; }
        else if (age >= 12 && age <= 14) { label.textContent = `中学${age-11}年生`; badge.classList.remove('hidden'); currentTab = 'junior'; }
    }
    
    switchTab(currentTab);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-input').addEventListener('input', renderMaterials);
    load();
});
