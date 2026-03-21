/* =====================================================================
   📚 バックアップ用データ (検索キーワードを追加)
   ===================================================================== */
const BACKUP_DATA = [
  {
    "grade": "小学1年生", "gradeId": "e1", "subjects": [
      { "name": "算数", "color": "lime", "icon": "calculator", "units": [
          { "title": "かずとすうじ", "pdfBasic": "#", "pdfAdv": "#", "pdfAnswer": "#", "months": [4, 5], "keywords": ["数", "すうじ", "基本", "はじめて"] },
          { "title": "いくつといくつ", "pdfBasic": "#", "pdfAdv": "#", "pdfAnswer": "#", "months": [5, 6], "keywords": ["数の分解", "あわせる", "算数"] },
          { "title": "たしざん（１）", "pdfBasic": "#", "pdfAdv": "#", "pdfAnswer": "#", "months": [6, 7], "keywords": ["計算", "足し算", "けいさん", "＋"] },
          { "title": "ひきざん（１）", "pdfBasic": "#", "pdfAdv": "#", "pdfAnswer": "#", "months": [9, 10], "keywords": ["計算", "引き算", "ひっさん", "－"] }
      ]},
      { "name": "国語", "color": "rose", "icon": "pencil", "units": [
          { "title": "ひらがなのれんしゅう", "pdfBasic": "#", "pdfAdv": "#", "pdfAnswer": "#", "months": [4, 5, 6], "keywords": ["文字", "書写", "あいうえお", "国語"] },
          { "title": "カタカナのれんしゅう", "pdfBasic": "#", "pdfAdv": "#", "pdfAnswer": "#", "months": [9, 10], "keywords": ["文字", "書写", "アイウエオ"] }
      ]}
    ]
  },
  {
    "grade": "小学2年生", "gradeId": "e2", "subjects": [
      { "name": "算数", "color": "lime", "icon": "calculator", "units": [
          { "title": "たし算とひき算のひっ算", "pdfBasic": "#", "pdfAdv": "#", "pdfAnswer": "#", "months": [4, 5], "keywords": ["計算", "筆算", "ひっさん", "2年"] },
          { "title": "かけ算（九九）", "pdfBasic": "#", "pdfAdv": "#", "pdfAnswer": "#", "months": [10, 11, 12], "keywords": ["計算", "くく", "掛け算", "暗記"] }
      ]}
    ]
  }
  // ... 他のデータも同様に keywords を追加可能
];

let userLocation = { lat: 35.6895, lon: 139.6917, name: "東京" };
let cachedData = [];
let currentTab = 'elementary';
let currentUserGradeId = null; 
let currentDetailUnit = null;

/* --- (クッキー・学年計算ロジックは変更なしのため中略) --- */

/* =====================================================================
   🖥️ 描画ロジック（検索・フィルタリング対応）
   ===================================================================== */
const renderMaterials = () => {
    const container = document.getElementById('learning-materials-container');
    const searchInput = document.getElementById('search-input');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    
    if (!container) return;
    
    // タブ（小学/中学）でまずフィルタリング
    let filteredData = cachedData.filter(d => {
        if(currentTab === 'elementary') return d.gradeId.startsWith('e');
        if(currentTab === 'junior') return d.gradeId.startsWith('j');
        return false;
    });

    // 検索キーワードによるフィルタリング
    let hasMatch = false;
    const html = filteredData.map(data => {
        // 学年名(小学1年生など)が検索にヒットするか
        const gradeMatches = data.grade.toLowerCase().includes(query);

        const subjectsHtml = data.subjects.map(sub => {
            // 教科名(算数など)が検索にヒットするか
            const subjectMatches = sub.name.toLowerCase().includes(query);

            // 教材(Unit)単位でのフィルタリング
            const matchedUnits = sub.units.filter(unit => {
                const titleMatches = unit.title.toLowerCase().includes(query);
                const keywordMatches = unit.keywords ? unit.keywords.some(k => k.toLowerCase().includes(query)) : false;
                
                // 「学年」「教科」「タイトル」「キーワード」のどれかがヒットすればOK
                return gradeMatches || subjectMatches || titleMatches || keywordMatches;
            });

            if (matchedUnits.length === 0) return ''; // ヒットする教材がない教科は表示しない

            hasMatch = true;
            const unitsList = matchedUnits.map(unit => {
                const unitData = { grade: data.grade, subjectName: sub.name, color: sub.color, ...unit };
                return `
                <div onclick='openDetail(${JSON.stringify(unitData)})' class="block p-4 rounded-2xl hover:bg-orange-50/50 transition-all group border border-transparent hover:border-orange-100 cursor-pointer mb-1">
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-bold text-slate-600 group-hover:text-orange-600 transition-colors line-clamp-1">${unit.title}</span>
                        <i data-lucide="chevron-right" class="w-4 h-4 text-slate-300 group-hover:text-orange-400"></i>
                    </div>
                </div>`;
            }).join('');

            return `
                <div class="mb-8 last:mb-0">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 rounded-xl bg-${sub.color || 'lime'}-50 flex items-center justify-center text-${sub.color || 'lime'}-500 border border-${sub.color || 'lime'}-100">
                            <i data-lucide="${sub.icon}" width="20" height="20"></i>
                        </div>
                        <h4 class="font-black text-slate-700">${sub.name}</h4>
                    </div>
                    <div class="grid grid-cols-1 gap-1">${unitsList}</div>
                </div>`;
        }).join('');

        if (subjectsHtml.trim() === "") return '';

        return `
            <div class="reveal active bg-white rounded-[2.5rem] p-8 border border-orange-50 shadow-sm hover:shadow-xl transition-all duration-500">
                <div class="flex items-center justify-between mb-8 border-b border-slate-50 pb-4">
                    <h3 class="text-2xl font-black text-slate-800 tracking-tight">${data.grade}</h3>
                    <span class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Materials</span>
                </div>
                <div>${subjectsHtml}</div>
            </div>`;
    }).join('');

    // 結果がない場合の表示
    if (!hasMatch && query !== "") {
        container.innerHTML = `
            <div class="col-span-full py-20 text-center animate-in fade-in zoom-in duration-500">
                <div class="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i data-lucide="search-x" class="w-10 h-10 text-orange-200"></i>
                </div>
                <p class="font-black text-slate-400">「${query}」に合う教材は見つかりませんでした</p>
                <button onclick="clearSearch()" class="mt-4 text-xs font-black text-orange-400 hover:text-orange-600 underline underline-offset-4">検索をクリアする</button>
            </div>`;
    } else {
        container.innerHTML = html;
    }
    
    lucide.createIcons();
};

// 検索クリア機能
window.clearSearch = () => {
    const input = document.getElementById('search-input');
    if (input) {
        input.value = "";
        renderMaterials();
    }
};

// 検索バーへのイベント割り当て
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', renderMaterials);
    }
    /* --- (他の初期化ロジック) --- */
    updateSky();
    fetchIpLocation();
    fetchAndRender();
    setInterval(updateSky, 60000);
});

/* --- (残りのUI操作・updateSky関数などは変更なしのため省略) --- */
