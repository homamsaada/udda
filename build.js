/**
 * عُدّة | Udda - Build Script v2
 * بناء مبسط وفعّال
 */

const fs = require('fs');
const path = require('path');

// ========================================
// Configuration
// ========================================
const config = {
  srcDir: path.join(__dirname, 'src'),
  distDir: path.join(__dirname, 'dist'),
  languages: ['ar', 'en'],
  baseUrl: 'https://udda.tools',
  year: new Date().getFullYear()
};

// ========================================
// Load Data
// ========================================
const i18n = JSON.parse(fs.readFileSync(path.join(config.srcDir, 'data/i18n.json'), 'utf8'));
const toolsData = JSON.parse(fs.readFileSync(path.join(config.srcDir, 'data/tools.json'), 'utf8'));

// ========================================
// Helpers
// ========================================
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDirRecursive(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// ========================================
// Build Related Tools HTML
// ========================================
function buildRelatedToolsHTML(toolId, lang, basePath) {
  const tool = toolsData.tools.find(t => t.id === toolId);
  const ui = i18n.ui[lang];
  if (!tool || !tool.related || tool.related.length === 0) return '';

  const relatedHTML = tool.related
    .map(relId => {
      const relTool = toolsData.tools.find(t => t.id === relId);
      const relI18n = i18n.tools[relId]?.[lang];
      if (!relTool || !relI18n) return '';
      return `
            <a href="${basePath}${lang}/tools/${relId}.html" class="similar-tool-card">
              <span class="similar-tool-icon">${relTool.icon}</span>
              <span>${relI18n.name}</span>
            </a>`;
    })
    .filter(Boolean)
    .join('');

  if (!relatedHTML) return '';

  return `
        <div class="similar-tools">
          <h3>🔗 ${ui.similarTools}</h3>
          <div class="similar-tools-grid">
            ${relatedHTML}
          </div>
        </div>`;
}

// ========================================
// Static Pages Definition
// ========================================
const staticPages = [
  {
    id: 'privacy',
    ar: { title: 'سياسة الخصوصية', description: 'سياسة الخصوصية لموقع عُدّة - كيفية جمعنا واستخدامنا وحماية معلوماتك' },
    en: { title: 'Privacy Policy', description: 'Udda Privacy Policy - How we collect, use and protect your information' }
  },
  {
    id: 'terms',
    ar: { title: 'شروط الاستخدام', description: 'شروط استخدام موقع عُدّة وأدواته المجانية' },
    en: { title: 'Terms of Service', description: 'Terms of Service for using Udda website and its free tools' }
  },
  {
    id: 'about',
    ar: { title: 'من نحن', description: 'تعرّف على موقع عُدّة - أدوات مجانية للجميع' },
    en: { title: 'About Us', description: 'Learn about Udda - Free tools for everyone' }
  },
  {
    id: 'contact',
    ar: { title: 'اتصل بنا', description: 'تواصل مع فريق عُدّة - اقتراحات، ملاحظات، أو استفسارات' },
    en: { title: 'Contact Us', description: 'Contact the Udda team - suggestions, feedback, or inquiries' }
  },
  {
    id: 'disclaimer',
    ar: { title: 'إخلاء المسؤولية', description: 'إخلاء المسؤولية لموقع عُدّة وأدواته' },
    en: { title: 'Disclaimer', description: 'Disclaimer for Udda website and its tools' }
  }
];

// ========================================
// Build Full Page HTML
// ========================================
function buildPageHTML(lang, options) {
  const {
    title,
    metaDescription,
    keywords,
    canonicalPath,
    toolId,
    toolName,
    categoryId,
    categoryName,
    content,
    isHome,
    isCategory
  } = options;
  
  const isArabic = lang === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';
  const meta = i18n.meta[lang];
  const ui = i18n.ui[lang];
  
  // Calculate base path for relative URLs
  const depth = (canonicalPath.match(/\//g) || []).length;
  const basePath = depth <= 1 ? '../' : '../../';
  
  // Breadcrumb
  let breadcrumbHTML = `<a href="${basePath}${lang}/" class="breadcrumb-link">${ui.home}</a>`;
  if (categoryName && categoryId) {
    if (isCategory) {
      // On category page, category name is current (not a link)
      breadcrumbHTML += `
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">${categoryName}</span>`;
    } else {
      // On tool page, category name is a link
      breadcrumbHTML += `
          <span class="breadcrumb-separator">›</span>
          <a href="${basePath}${lang}/category/${categoryId}.html" class="breadcrumb-link">${categoryName}</a>`;
    }
  }
  if (toolName && !isHome && !isCategory) {
    breadcrumbHTML += `
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">${toolName}</span>`;
  }

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>${title}</title>
  <meta name="description" content="${metaDescription}">
  <meta name="keywords" content="${keywords}">
  <meta name="author" content="Udda">
  <meta name="robots" content="index, follow">
  
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${metaDescription}">
  <meta property="og:url" content="${config.baseUrl}/${lang}${canonicalPath}">
  <meta property="og:site_name" content="${meta.siteName}">
  <meta property="og:locale" content="${meta.locale}">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${metaDescription}">
  
  <link rel="alternate" hreflang="ar" href="${config.baseUrl}/ar${canonicalPath}">
  <link rel="alternate" hreflang="en" href="${config.baseUrl}/en${canonicalPath}">
  <link rel="alternate" hreflang="x-default" href="${config.baseUrl}/ar${canonicalPath}">
  <link rel="canonical" href="${config.baseUrl}/${lang}${canonicalPath}">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${basePath}assets/css/main.css">

  <!-- Google AdSense -->
  <!-- TODO: Replace ca-pub-XXXXXXXXXXXXXXXX with your AdSense Publisher ID -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${toolName || meta.siteName}",
    "description": "${metaDescription}",
    "url": "${config.baseUrl}/${lang}${canonicalPath}",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "inLanguage": ["ar", "en"],
    "isAccessibleForFree": true
  }
  </script>
</head>
<body data-tool-id="${toolId || ''}">
  <div class="app-container">
    <div class="main-content">
      <header class="main-header">
        <nav class="header-breadcrumb">
          ${breadcrumbHTML}
        </nav>

        <div class="header-search">
          <div class="search-input-wrapper">
            <input type="text" class="search-input" placeholder="${ui.search}" aria-label="${ui.search}">
            <svg class="search-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        </div>

        <div class="header-actions">
          <button class="header-btn" data-open-settings aria-label="${ui.settings}">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>
      </header>

      ${isHome || isCategory ? `
      <main class="page-content page-content--full">
        ${content}
      </main>
      ` : `
      <div class="content-wrapper">
        <main class="page-content">
          ${content}
        </main>

        <aside class="ad-sidebar">
          <div class="ad-sticky">
            <div class="ad-unit">
              <ins class="adsbygoogle"
                style="display:inline-block;width:300px;height:250px"
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"></ins>
              <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>
            <div class="ad-unit">
              <ins class="adsbygoogle"
                style="display:inline-block;width:300px;height:250px"
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"></ins>
              <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>
          </div>
        </aside>
      </div>
      `}

      <footer class="main-footer">
        <p>${ui.madeWith} | ${ui.copyright} © ${config.year} ${meta.siteName}</p>
        <div class="footer-links">
          <a href="${basePath}${lang}/pages/about.html" class="footer-link">${isArabic ? 'من نحن' : 'About Us'}</a>
          <a href="${basePath}${lang}/pages/contact.html" class="footer-link">${isArabic ? 'اتصل بنا' : 'Contact Us'}</a>
          <a href="${basePath}${lang}/pages/privacy.html" class="footer-link">${isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
          <a href="${basePath}${lang}/pages/terms.html" class="footer-link">${isArabic ? 'شروط الاستخدام' : 'Terms of Service'}</a>
          <a href="${basePath}${lang}/pages/disclaimer.html" class="footer-link">${isArabic ? 'إخلاء المسؤولية' : 'Disclaimer'}</a>
        </div>
      </footer>
    </div>
  </div>
  
  <!-- Settings Panel -->
  <div class="settings-overlay"></div>
  <div class="settings-panel">
    <div class="settings-header">
      <h2 class="settings-title">${ui.settings}</h2>
      <button class="settings-close" aria-label="Close">✕</button>
    </div>
    <div class="settings-content">
      <div class="settings-section">
        <div class="settings-section-title">${ui.language}</div>
        <div class="settings-option">
          <button class="settings-btn ${isArabic ? 'active' : ''}" data-lang-btn="ar">العربية</button>
          <button class="settings-btn ${!isArabic ? 'active' : ''}" data-lang-btn="en">English</button>
        </div>
      </div>
      <div class="settings-section">
        <div class="settings-section-title">${ui.theme}</div>
        <div class="settings-option">
          <button class="settings-btn" data-theme-btn="light">☀️ ${ui.themeLight}</button>
          <button class="settings-btn" data-theme-btn="dark">🌙 ${ui.themeDark}</button>
          <button class="settings-btn active" data-theme-btn="auto">💻 ${ui.themeAuto}</button>
        </div>
      </div>
      <div class="settings-section">
        <div class="settings-section-title">${isArabic ? 'إجراءات' : 'Actions'}</div>
        <div class="settings-option settings-option--vertical">
          <button class="settings-btn" data-favorite-btn>☆ ${ui.addFavorite}</button>
          <button class="settings-btn" onclick="App.shareUrl('${toolName || meta.siteName}')">
            📤 ${ui.share}
          </button>
        </div>
      </div>
      <div class="settings-section">
        <button class="settings-btn" data-clear-data style="width:100%;justify-content:center;color:var(--error);">
          🗑️ ${ui.clearData}
        </button>
      </div>
    </div>
  </div>
  
  <div class="toast"></div>

  <!-- Mobile Bottom Sticky Ad - 320x50 Mobile Banner -->
  <div class="ad-bottom-sticky">
    <div class="ad-bottom-unit">
      <ins class="adsbygoogle"
        style="display:inline-block;width:320px;height:50px"
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  </div>

  <script src="${basePath}assets/js/app.js"></script>
</body>
</html>`;
}

// ========================================
// Build Homepage
// ========================================
function buildHomepage(lang) {
  const isArabic = lang === 'ar';
  const meta = i18n.meta[lang];
  const ui = i18n.ui[lang];
  const categories = i18n.categories[lang];
  const basePath = '../'; // Homepage is at /ar/ or /en/
  
  // Build tools data for search
  const allToolsData = toolsData.tools.map(t => ({
    id: t.id,
    icon: t.icon,
    name: i18n.tools[t.id]?.[lang]?.name || t.id,
    keywords: i18n.tools[t.id]?.[lang]?.keywords || '',
    searchTerms: i18n.tools[t.id]?.[lang]?.searchTerms || '',
    category: t.category,
    categoryName: categories[t.category]?.name || '',
    url: `${basePath}${lang}/tools/${t.id}.html`
  }));
  
  // Build category cards
  const categoriesHTML = toolsData.categoryOrder.map(catId => {
    const cat = categories[catId];
    if (!cat) return '';
    
    const count = toolsData.tools.filter(t => t.category === catId).length;
    
    return `
        <a href="${basePath}${lang}/category/${catId}.html" class="category-card">
          <div class="category-icon">${cat.icon}</div>
          <div class="category-name">${cat.name}</div>
          <div class="category-count">${count} ${ui.toolCount}</div>
        </a>`;
  }).join('');
  
  const adBannerHTML = `
    <div class="ad-banner">
      <!-- TODO: Replace data-ad-client and data-ad-slot with your values -->
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="horizontal"
        data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>`;

  const content = `
    <div class="hero">
      <h1 class="hero-title">${meta.siteName}</h1>
      <p class="hero-subtitle">${meta.siteSlogan}</p>
    </div>

    ${adBannerHTML}

    <div class="categories-grid">
      ${categoriesHTML}
    </div>

    <script>
      window.toolsData = ${JSON.stringify(allToolsData)};
    </script>
  `;
  
  return buildPageHTML(lang, {
    title: `${meta.siteName} - ${meta.siteSlogan}`,
    metaDescription: meta.siteDescription,
    keywords: isArabic ? 'أدوات مجانية، حاسبات، محولات، أدوات أونلاين' : 'free tools, calculators, converters, online tools',
    canonicalPath: '/',
    toolId: null,
    toolName: null,
    categoryName: null,
    content,
    isHome: true
  });
}

// ========================================
// Build Tool Page
// ========================================
function buildToolPage(toolId, lang) {
  const tool = toolsData.tools.find(t => t.id === toolId);
  const toolI18n = i18n.tools[toolId]?.[lang];
  const categories = i18n.categories[lang];
  const ui = i18n.ui[lang];
  const isArabic = lang === 'ar';
  const basePath = '../../'; // Tool pages are at /ar/tools/
  
  if (!tool || !toolI18n) {
    console.warn(`  ⚠ Tool translations not found: ${toolId}`);
    return null;
  }
  
  // Build tools data for search
  const allToolsData = toolsData.tools.map(t => ({
    id: t.id,
    icon: t.icon,
    name: i18n.tools[t.id]?.[lang]?.name || t.id,
    keywords: i18n.tools[t.id]?.[lang]?.keywords || '',
    searchTerms: i18n.tools[t.id]?.[lang]?.searchTerms || '',
    category: t.category,
    categoryName: categories[t.category]?.name || '',
    url: `${basePath}${lang}/tools/${t.id}.html`
  }));
  
  // Load tool template
  const toolTemplatePath = path.join(config.srcDir, `tools/${toolId}.html`);
  if (!fs.existsSync(toolTemplatePath)) {
    console.warn(`  ⚠ Tool template not found: ${toolId}`);
    return null;
  }
  
  let toolContent = fs.readFileSync(toolTemplatePath, 'utf8');
  
  // Add related tools section
  const relatedHTML = buildRelatedToolsHTML(toolId, lang, basePath);
  if (relatedHTML) {
    toolContent += relatedHTML;
  }

  // Add toolsData script
  toolContent += `
<script>
  window.toolsData = ${JSON.stringify(allToolsData)};
</script>`;
  
  // Replace all placeholders - dynamically get all tool translations
  const replacements = {
    'tool.name': toolI18n.name,
    'tool.description': toolI18n.description,
    'tool.howToUseText': toolI18n.howToUseText,
    'ui.calculate': ui.calculate,
    'ui.result': ui.result,
    'ui.howToUse': ui.howToUse,
    'validationMsg': isArabic ? 'أدخل أرقاماً صحيحة' : 'Enter valid numbers'
  };
  
  // Add all tool-specific translations dynamically
  Object.keys(toolI18n).forEach(key => {
    if (!['name', 'title', 'metaDescription', 'keywords', 'description', 'searchTerms', 'howToUseText'].includes(key)) {
      replacements[`tool.${key}`] = toolI18n[key];
    }
  });
  
  Object.entries(replacements).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{${key.replace('.', '\\.')}\\}\\}`, 'g');
    toolContent = toolContent.replace(regex, value || '');
  });
  
  return buildPageHTML(lang, {
    title: toolI18n.title,
    metaDescription: toolI18n.metaDescription,
    keywords: toolI18n.keywords,
    canonicalPath: `/tools/${toolId}.html`,
    toolId,
    toolName: toolI18n.name,
    categoryId: tool.category,
    categoryName: categories[tool.category]?.name,
    content: toolContent,
    isHome: false,
    isCategory: false
  });
}

// ========================================
// Build Sitemap
// ========================================
function buildSitemap() {
  let urls = [];
  
  config.languages.forEach(lang => {
    urls.push(`${config.baseUrl}/${lang}/`);
    toolsData.tools.forEach(tool => {
      urls.push(`${config.baseUrl}/${lang}/tools/${tool.id}.html`);
    });
    staticPages.forEach(page => {
      urls.push(`${config.baseUrl}/${lang}/pages/${page.id}.html`);
    });
  });
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`;
}

// ========================================
// Build Category Page
// ========================================
function buildCategoryPage(categoryId, lang) {
  const isArabic = lang === 'ar';
  const meta = i18n.meta[lang];
  const ui = i18n.ui[lang];
  const categories = i18n.categories[lang];
  const cat = categories[categoryId];
  const basePath = '../../'; // Category pages are at /ar/category/
  
  if (!cat) return null;
  
  // Build tools data for search
  const allToolsData = toolsData.tools.map(t => ({
    id: t.id,
    icon: t.icon,
    name: i18n.tools[t.id]?.[lang]?.name || t.id,
    keywords: i18n.tools[t.id]?.[lang]?.keywords || '',
    searchTerms: i18n.tools[t.id]?.[lang]?.searchTerms || '',
    category: t.category,
    categoryName: categories[t.category]?.name || '',
    url: `${basePath}${lang}/tools/${t.id}.html`
  }));
  
  // Get tools in this category
  const catTools = toolsData.tools.filter(t => t.category === categoryId);
  
  let toolsHTML;
  if (catTools.length === 0) {
    toolsHTML = `
      <div class="empty-category">
        <div class="empty-icon">🚧</div>
        <p>${isArabic ? 'قريباً... نعمل على إضافة أدوات لهذا التصنيف' : 'Coming soon... We are working on adding tools to this category'}</p>
      </div>
    `;
  } else {
    toolsHTML = `
      <div class="tools-grid">
        ${catTools.map(tool => {
          const toolI18n = i18n.tools[tool.id]?.[lang];
          return `
          <a href="${basePath}${lang}/tools/${tool.id}.html" class="tool-grid-card">
            <div class="tool-grid-icon">${tool.icon}</div>
            <div class="tool-grid-info">
              <h3>${toolI18n?.name || tool.id}</h3>
              <p>${toolI18n?.description || ''}</p>
            </div>
          </a>`;
        }).join('')}
      </div>
    `;
  }
  
  const content = `
    <div class="category-page-header">
      <div class="category-page-icon">${cat.icon}</div>
      <div>
        <h1 class="category-page-title">${cat.name}</h1>
        <p class="category-page-description">${cat.description || ''}</p>
      </div>
    </div>
    
    ${toolsHTML}
    
    <script>
      window.toolsData = ${JSON.stringify(allToolsData)};
    </script>
  `;
  
  return buildPageHTML(lang, {
    title: `${cat.name} - ${meta.siteName}`,
    metaDescription: cat.description || `${cat.name} - ${meta.siteDescription}`,
    keywords: isArabic ? `${cat.name}، أدوات، حاسبات` : `${cat.name}, tools, calculators`,
    canonicalPath: `/category/${categoryId}.html`,
    toolId: null,
    toolName: null,
    categoryId: categoryId,
    categoryName: cat.name,
    content,
    isHome: false,
    isCategory: true
  });
}

// ========================================
// Build Static Page (privacy, terms, about, contact, disclaimer)
// ========================================
function buildStaticPage(pageId, lang) {
  const isArabic = lang === 'ar';
  const meta = i18n.meta[lang];
  const ui = i18n.ui[lang];
  const categories = i18n.categories[lang];
  const basePath = '../'; // Static pages are at /ar/ or /en/
  const pageDef = staticPages.find(p => p.id === pageId);
  if (!pageDef) return null;

  const pageInfo = pageDef[lang];

  // Load page template
  const templatePath = path.join(config.srcDir, `pages/${lang}/${pageId}.html`);
  if (!fs.existsSync(templatePath)) {
    console.warn(`  ⚠ Static page template not found: ${lang}/${pageId}.html`);
    return null;
  }

  let pageContent = fs.readFileSync(templatePath, 'utf8');

  // Build tools data for search
  const allToolsData = toolsData.tools.map(t => ({
    id: t.id,
    icon: t.icon,
    name: i18n.tools[t.id]?.[lang]?.name || t.id,
    keywords: i18n.tools[t.id]?.[lang]?.keywords || '',
    searchTerms: i18n.tools[t.id]?.[lang]?.searchTerms || '',
    category: t.category,
    categoryName: categories[t.category]?.name || '',
    url: `${basePath}${lang}/tools/${t.id}.html`
  }));

  const content = `
    ${pageContent}
    <script>
      window.toolsData = ${JSON.stringify(allToolsData)};
    </script>
  `;

  return buildPageHTML(lang, {
    title: `${pageInfo.title} - ${meta.siteName}`,
    metaDescription: pageInfo.description,
    keywords: isArabic ? `${pageInfo.title}، عُدّة` : `${pageInfo.title}, Udda`,
    canonicalPath: `/pages/${pageId}.html`,
    toolId: null,
    toolName: null,
    categoryId: null,
    categoryName: null,
    content,
    isHome: false,
    isCategory: true // Use full-width layout (no sidebar)
  });
}

// ========================================
// Main Build
// ========================================
function build() {
  console.log('🔨 Building Udda...\n');
  
  // Clean
  if (fs.existsSync(config.distDir)) {
    fs.rmSync(config.distDir, { recursive: true });
  }
  
  // Copy assets
  copyDirRecursive(path.join(config.srcDir, 'assets'), path.join(config.distDir, 'assets'));
  console.log('✓ Assets copied');
  
  // Build for each language
  config.languages.forEach(lang => {
    console.log(`\n📦 Building ${lang.toUpperCase()}...`);
    
    const langDir = path.join(config.distDir, lang);
    const toolsDir = path.join(langDir, 'tools');
    const categoryDir = path.join(langDir, 'category');
    const pagesDir = path.join(langDir, 'pages');
    ensureDir(toolsDir);
    ensureDir(categoryDir);
    ensureDir(pagesDir);
    
    // Homepage
    fs.writeFileSync(path.join(langDir, 'index.html'), buildHomepage(lang));
    console.log(`  ✓ Homepage`);
    
    // Category pages
    toolsData.categoryOrder.forEach(catId => {
      const html = buildCategoryPage(catId, lang);
      if (html) {
        fs.writeFileSync(path.join(categoryDir, `${catId}.html`), html);
        console.log(`  ✓ Category: ${catId}`);
      }
    });
    
    // Tools
    toolsData.tools.forEach(tool => {
      const html = buildToolPage(tool.id, lang);
      if (html) {
        fs.writeFileSync(path.join(toolsDir, `${tool.id}.html`), html);
        console.log(`  ✓ Tool: ${tool.id}`);
      }
    });

    // Static pages (privacy, terms, about, contact, disclaimer)
    staticPages.forEach(page => {
      const html = buildStaticPage(page.id, lang);
      if (html) {
        fs.writeFileSync(path.join(pagesDir, `${page.id}.html`), html);
        console.log(`  ✓ Page: ${page.id}`);
      }
    });
  });
  
  // Sitemap & robots
  fs.writeFileSync(path.join(config.distDir, 'sitemap.xml'), buildSitemap());
  fs.writeFileSync(path.join(config.distDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${config.baseUrl}/sitemap.xml`);
  
  // Redirect index
  fs.writeFileSync(path.join(config.distDir, 'index.html'), `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<script>window.location.href=(navigator.language?.startsWith('en')?'en':'ar')+'/';</script>
<meta http-equiv="refresh" content="0;url=ar/">
</head><body><a href="ar/">العربية</a> | <a href="en/">English</a></body></html>`);
  
  console.log('\n✓ Sitemap generated');
  console.log('✓ robots.txt generated');
  console.log('✓ Redirect index generated');
  console.log('\n✅ Build complete!');
  console.log(`📁 Output: ${config.distDir}`);
}

build();
