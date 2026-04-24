fetch('https://s1.mantrapuja.com/auth/v1/health')
  .then(r => r.json())
  .then(d => console.log('Supabase Health:', d))
  .catch(e => console.error('Connection Failed:', e.message));
