'use strict';
const products = [
  ['AgentGuard','ai-agent-security-audit'],
  ['AI Automation Starter','ai-automation-starter'],
  ['Enterprise Hybrid-RAG','enterprise-rag-pilot'],
  ['OmniGuard','omniguard'],
  ['AgentVault','agentvault'],
  ['Agent Eval','agent-eval'],
  ['FoundationCentar','foundationcentar']
];
const host = 'https://shop.wedocare-global.com';
const container = document.getElementById('products');
if (container) {
  container.replaceChildren(...products.map(([name, handle]) => {
    const card = document.createElement('article');
    card.className = 'card';
    const heading = document.createElement('h2');
    heading.textContent = name;
    const description = document.createElement('p');
    description.textContent = 'View current details and pricing in the official Shopify store.';
    const link = document.createElement('a');
    link.className = 'button';
    link.href = host + '/products/' + encodeURIComponent(handle);
    link.textContent = 'View product →';
    card.append(heading, description, link);
    return card;
  }));
}
