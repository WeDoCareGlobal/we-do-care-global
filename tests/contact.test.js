const test = require('node:test');
const assert = require('node:assert/strict');
const handler = require('../api/contact.js');
function request(body, overrides = {}) {
  const req = { method: 'POST', headers: { origin: 'https://wedocare-global.com', 'content-type': 'application/json', 'x-forwarded-for': overrides.ip || String(Math.random()), ...overrides.headers }, body };
  const res = { code: 200, headers: {}, setHeader(k,v){this.headers[k]=v;}, status(code){this.code=code; return this;}, json(data){this.body=data; return this;} };
  return { req, res };
}
const valid = { name: 'Test Person', email: 'test@example.org', interest: 'Partnership', message: 'Please contact me about a technical partnership.', consent: true, company_website: '' };
test('rejects non-POST', async () => {
  const { req, res } = request(valid);
  req.method = 'GET';
  await handler(req,res);
  assert.equal(res.code,405);
});
test('rejects untrusted origin', async () => {
  const { req, res } = request(valid,{headers:{origin:'https://attacker.example'}});
  await handler(req,res);
  assert.equal(res.code,403);
});
test('rejects missing consent', async () => {
  const { req, res } = request({...valid,consent:false});
  await handler(req,res);
  assert.equal(res.code,400);
});
test('rejects malformed address', async () => {
  const { req, res } = request({...valid,email:'invalid-at-domain'});
  await handler(req,res);
  assert.equal(res.code,400);
});
test('honeypot does not call HubSpot', async () => {
  const original = global.fetch;
  global.fetch = () => { throw new Error('Must not send'); };
  try {
    const {req,res} = request({...valid,company_website:'spam.example'});
    await handler(req,res);
    assert.equal(res.code,200);
  } finally { global.fetch = original; }
});
test('successful authorized inquiry forwards to published form', async () => {
  const original = global.fetch;
  let called = false;
  global.fetch = async (url,opts) => {
    called=true;
    assert.match(url,/api\.hsforms\.com\/submissions/);
    assert.equal(JSON.parse(opts.body).fields.find(x=>x.name==='email').value, valid.email);
    return {ok:true};
  };
  try {
    const {req,res} = request(valid);
    await handler(req,res);
    assert.equal(res.code,200);
    assert.equal(res.body.ok,true);
    assert.equal(called,true);
  } finally {global.fetch=original;}
});
test('HubSpot failure cannot be presented as success', async () => {
  const original = global.fetch;
  global.fetch = async () => ({ok:false});
  try {
    const {req,res} = request(valid);
    await handler(req,res);
    assert.equal(res.code,502);
  } finally {global.fetch=original;}
});