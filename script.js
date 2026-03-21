/* =====================================================================
   📚 教材データベース（類義語・タグを強化）
   ===================================================================== */
const BACKUP_DATA = [
  {
    "grade": "小学1年生", "gradeId": "e1", "subjects": [
      { 
        "name": "算数", "color": "lime", "icon": "calculator", 
        "units": [
          { 
            "title": "かずとすうじ", 
            "tags": ["数", "すうじ", "基本", "はじめて", "導入", "1年生", "算数", "さんすう", "かず"],
            "pdfBasic": "#"
          },
          { 
            "title": "たしざん（１）", 
            "tags": ["計算", "けいさん", "足し算", "たす", "＋", "さんすう", "基本計算", "ドリル", "1年生"],
            "pdfBasic": "#"
          }
        ]
      },
      {
        "name": "国語", "color": "rose", "icon": "pencil",
        "units": [
          { "title": "ひらがなのれんしゅう", "tags": ["文字", "国語", "書き方", "あいうえお", "練習", "こくご", "1年生", "基本"], "pdfBasic": "#" }
        ]
      }
    ]
  },
  {
    "grade": "小学6年生", "gradeId": "e6", "subjects": [
      {
        "name": "社会", "color": "amber", "icon": "globe",
        "units": [
          { 
            "title": "日本の歴史", 
            "tags": ["歴史", "れきし", "社会", "日本", "昔", "むかし", "武士", "江戸", "侍", "6年生", "テスト対策", "日本史"], 
            "pdfBasic": "#" 
          }
        ]
      }
    ]
  },
  {
    "grade": "中学1年生", "gradeId": "j1", "subjects": [
      {
        "name": "数学", "color": "violet", "icon": "sigma",
        "units": [
          { "title": "正の数・負の数", "tags": ["数学", "計算", "マイナス", "プラス", "負の数", "中1", "基本", "導入", "数"], "pdfBasic": "#" }
        ]
      }
    ]
  }
];

let cachedData = BACKUP_DATA;
let currentTab = 'elementary';

/* =====================================================================
   🔍 検索・描画ロジック
   ===================================================================== */
const renderMaterials = () => {
    const container = document.getElementById('learning-materials-container');
    const searchInput = document.getElementById('search-input');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    
    if (!container) return;

    // タブで大まかにフィルター
    let filteredData = cachedData.filter(d => {
        if(currentTab === 'elementary') return d.gradeId.startsWith('e');
        if(currentTab === 'junior') return d.gradeId.startsWith('j');
        return false;
    });

    let hasMatch = false;
    const cardsHtml = filteredData.map(data => {
        // 学年がヒットするか（例：小1、1年生）
        const gradeMatches = data.grade.toLowerCase().includes(query);

        const subjectsHtml = data.subjects.map(sub => {
            // 教科名がヒットするか（例：算数、数学）
            const subjectMatches = sub.name.toLowerCase().includes(query);

            // 単元ごとの詳細・抽象・キーワード検索
            const matchedUnits = sub.units.filter(unit => {
                const titleMatches = unit.title.toLowerCase().includes(query);
                // 抽象キーワード（タグ）のどれかにヒットするか
                const tagMatches = unit.tags ? unit.tags.some(tag => tag.toLowerCase().includes(query)) : false;
                
                return gradeMatches || subjectMatches || titleMatches || tagMatches;
            });

            if (matchedUnits.length === 0) return '';
            hasMatch = true;

            const unitsList = matchedUnits.map(unit => `
                <div onclick="alert('${unit.title}を開きます')" class="flex items-center justify-between p-4 rounded-2xl hover:bg-orange-50/50 transition-all cursor-pointer group mb-1 border border-transparent hover:border-orange-100">
                    <span class="text-sm font-bold text-slate-500 group-hover:text-orange-600 transition-colors">${unit.title}</span>
                    <i data-lucide="chevron-right" class="w-4 h-4 text-slate-200 group-hover:text-orange-400"></i>
                </div>
            `).join('');

            return `
                <div class="mb-8">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 rounded-xl bg-${sub.color}-50 flex items-center justify-center text-${sub.color}-400 border border-${sub.color}-100">
                            <i data-lucide="${sub.icon}" width="20" height="20"></i>
                        </div>
                        <h4 class="font-black text-slate-700">${sub.name}</h4>
                    </div>
                    <div>${unitsList}</div>
                </div>`;
        }).join('');

        if (subjectsHtml.trim() === "") return '';

        return `
            <div class="material-card p-8 reveal active">
                <div class="flex items-center justify-between mb-8 border-b-2 border-orange-50/50 pb-4">
                    <h3 class="text-2xl font-black text-slate-800">${data.grade}</h3>
                    <span class="text-[10px] font-black text-slate-300 tracking-widest uppercase">Unit</span>
                </div>
                ${subjectsHtml}
            </div>`;
    }).join('');

    // ヒットなしの時
    if (!hasMatch && query !== "") {
        container.innerHTML = `
            <div class="col-span-full py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div class="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i data-lucide="search-x" class="w-10 h-10 text-orange-200"></i>
                </div>
                <p class="font-black text-slate-400">「${query}」で見つかりませんでした。<br><span class="text-[10px] opacity-60">もっとざっくりした言葉で探してみてね！</span></p>
            </div>`;
    } else {
        container.innerHTML = cardsHtml;
    }
    
    lucide.createIcons();
};

// イベント登録
document.getElementById('search-input').addEventListener('input', renderMaterials);

window.switchTab = (tab) => {
    currentTab = tab;
    document.getElementById('tab-elementary').classList.toggle('active', tab === 'elementary');
    document.getElementById('tab-junior').classList.toggle('active', tab === 'junior');
    renderMaterials();
};

document.addEventListener('DOMContentLoaded', renderMaterials);
