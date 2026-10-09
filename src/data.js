// ============================================================
// 站点配置 —— 修改这里就能把示例博客换成你自己的内容。
// 留空的项目会自动隐藏。
// 文章不用写在这个文件里：往 src/articles/ 文件夹丢 .md 文件即可，
// 写作模板见 src/articles/_TEMPLATE.md。
// ============================================================
export const site = {
  name: '远山Sec',
  terminal: { user: 'xiaoxian', host: 'sec-lab' },
  accentColor: '#c9e894',
  handle: '@xiaoxiansec',
  role: '个人博客',
  bio: '2026 年正式入行，在抓包、测试与复盘中慢慢成长，陪你走过网络安全的入门长路。',
  portrait: '/assets/xiaoxiansec-avatar.jpg',
  focus: '',
  contactEmail: '',
  interests: [],
  about: [
    '2026 年，我正式走进网络安全这个行业。真正开始之后才发现，入门没有捷径，前面的路很长，也常常伴着迷茫和挫败。',
    '渗透测试并不总是惊心动魄。更多时候，是一次次抓包、改包、观察响应，再从细节里寻找线索。可当页面终于出现预想之外的变化，那一刻就像推开了一扇新门。每一次测试，都让我重新认识一个站点，也重新认识自己的边界。',
    '当然，更多时候等来的是失败、无效请求，或是不得不从头再来。但每次失败都会留下一点经验，让下一次尝试走得更稳一些。',
    '我想把这里做成一盏一直亮着的小灯，记录学习中的尝试、踩过的坑和一点点积累起来的经验。如果你也正在这段漫长又枯燥的路上，希望这些文字能陪你走一程。变强的路上，我们一起走。'
  ],
  stats: [],
  focusAreas: [],
  toolkit: [],
  links: [],
  friends: [],
  timeline: [],
  projects: [
    {
      icon: 'book',
      year: '当前阶段 · 大三 → 大四',
      name: '大三到大四',
      description: '在考研目标与安全热爱之间，走好大三到大四的每一步。',
      sections: [
        {
          kind: 'goal',
          eyebrow: 'ONE CLEAR GOAL',
          title: '考研目标',
          subtitle: '北京大学 · 软件与微电子学院',
          text: '大三到大四，朝着目标稳步前进。考研路漫长而孤独，每一页书、每一道题，都是靠近理想的一步。大雪深埋来时路，也别让梦想被埋没。',
          image: '/assets/exam-goal-campus.png'
        },
        {
          kind: 'passion',
          eyebrow: 'KEEP THE CURIOSITY',
          title: '热爱与坚持',
          subtitle: '网络安全 · 渗透测试',
          text: '无论未来选择哪条路，只要还热爱网络安全、热爱渗透测试，就别轻易放弃。方向可以调整，步子可以慢一点，但好奇心和持续学习的劲头值得守住。把每一次抓包、每一次复盘都当作能力的积累，持续提升自己的价值。愿我们把热爱沉淀成能力、把坚持磨成底气，最终走向更高的山。'
        }
      ],
      tags: ['考研', '渗透测试', '持续成长'],
      url: '#/guestbook',
      linkLabel: '和同路人聊聊'
    }
  ],
  quote: '越努力越幸运',
  footerNote: 'Build · Learn · Share.',
  copyrightYear: '2026',

  // 文章列表由下方从 src/articles/*.md 自动加载，无需手动维护
  articles: []
};

/* ============================================================
   文章加载：src/articles/*.md
   - front-matter 支持：title / date / category / tags / summary / link
   - link 有值时为外链文章（点击跳转），否则正文在站内阅读
   - 下划线 _ 开头的文件（如写作模板）会被忽略
   ============================================================ */
const mdFiles = import.meta.glob('./articles/*.md', { query: '?raw', import: 'default', eager: true });

const parseMeta = (raw) => {
  const text = String(raw).replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const matched = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!matched) return { meta: {}, body: text };
  const meta = {};
  for (const line of matched[1].split('\n')) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let value = kv[2].trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      // 数组写法：tags: [SSRF, 云安全]
      meta[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      meta[key] = value.replace(/^["']|["']$/g, '');
    }
  }
  return { meta, body: text.slice(matched[0].length) };
};

const articleList = Object.entries(mdFiles)
  .filter(([path]) => !path.split('/').pop().startsWith('_'))
  .map(([path, raw]) => {
    const { meta, body } = parseMeta(raw);
    const tags = Array.isArray(meta.tags)
      ? meta.tags
      : String(meta.tags || '').split(/[,，]/).map(s => s.trim()).filter(Boolean);
    const link = meta.link || meta.url || '';
    return {
      file: path.split('/').pop(),
      title: meta.title || '未命名文章',
      date: meta.date || '',
      category: meta.category || '',
      summary: meta.summary || '',
      tags,
      // 外链文章：url 有值时点击跳转外部，否则站内阅读
      url: link,
      content: link ? '' : body.trim()
    };
  })
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

site.articles = articleList;

// Hero 统计条数字自动同步文章 / 项目数量，无需手动维护
for (const s of site.stats) {
  if (s.label === '原创文章') s.value = String(site.articles.length);
  if (s.label === '开源项目') s.value = String(site.projects.length);
}

/* ============================================================
   文章资源解析：图片放 src/articles/images/，附件（压缩包）放
   src/articles/files/，md 里写 ./images/xxx.png 或 ./files/xxx.zip
   （只按文件名匹配）。外链（http/https 开头）直接使用。
   ============================================================ */
const imageFiles = import.meta.glob('./articles/images/**/*.{png,jpg,jpeg,gif,webp,svg,avif}', { import: 'default', eager: true });
const imageMap = Object.fromEntries(
  Object.entries(imageFiles).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
);

const attachFiles = import.meta.glob('./articles/files/**/*', { query: '?url', import: 'default', eager: true });
const fileMap = Object.fromEntries(
  Object.entries(attachFiles).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
);

export const asset = (src) => {
  const s = String(src || '').trim();
  if (!s || /^(https?:)?\/\//i.test(s) || s.startsWith('data:') || s.startsWith('/')) return s;
  const name = s.split('/').pop().toLowerCase();
  return imageMap[name] || fileMap[name] || s;
};
