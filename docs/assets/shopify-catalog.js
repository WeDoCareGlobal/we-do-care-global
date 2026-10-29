'use strict';
const products = [
 ['AgentGuard','ai-agent-security-audit'],
 ['AI Automation Starter','ai-automation-starter'],
 ['Enterprise Hybrid-RAG','enterprise-rag-pilot'],
 ['OmniGuard','omniguard'],
 ['AgentVault','agentvault'],
 ['Agent Eval','agent-eval'],
 ['FoundationCentar','foundationcentar'],
 ['Pharma Intelligence OS','pharma-intelligence-os']
];
const container = document.getElementById('products');
if (container) {
  const base = 'https://shop.wedocare-global.com/products/';
  container.replaceChildren(...products.map(([name, handle]) => {
    const card = document.createElement('article');
    card.className = 'card';
    const heading = document.createElement('h2');
    heading.textContent = name;
    const description = document.createElement('p');
    description.textContent = 'See live pricing and availability in our Shopify store.';
    const link = document.createElement('a');
    link.className = 'button';
    link.href = base + encodeURIComponent(handle);
    link.textContent = 'View product →';
    card.append(heading, description, link);
    return card;
  }));
}
