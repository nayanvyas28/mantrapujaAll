const fs = require('fs');

const content = fs.readFileSync('docs/poojas_migration_batch_2.sql', 'utf8');
const inserts = content.split('INSERT INTO public.poojas');

console.log(`Checking ${inserts.length - 1} statements...`);

for (let i = 1; i < inserts.length; i++) {
   const block = 'INSERT INTO public.poojas' + inserts[i];
   
   // Simple regex to check if values contain anything that might break PostgREST
   // Mostly we look for stray single quotes inside text fields
   // Let's use PostgreSQL's strict rules to parse
   
   // We can spot check lines
   const lines = block.split('\n');
   for(let l=0; l<lines.length; l++) {
      const line = lines[l];
      if (line.includes("'") && !line.includes("VALUES") && !line.includes("INSERT")) {
          // If there's an odd number of single quotes in a line, it's malformed
          const quoteCount = (line.match(/'/g) || []).length;
          if (quoteCount % 2 !== 0 && !line.endsWith(",'") && !line.match(/s:\d+:"/)) {
             // It's not a definitive test, but good for debugging
             // console.log(`Suspicious line ${l} in statement ${i}: ${line.substring(0, 100)}`);
          }
      }
   }
   
   // A common issue is the serialized PHP arrays in seo_title/seo_description
   const seoTitleMatch = block.match(/"seo_title",\n  "seo_description"[\s\S]*?ARRAY\[*(.*?)\]*::text\[\],\n  '([^']+)',\n  '([^']+)'/);
   
   const matches = block.match(/'(.*?)'/g);
}

console.log("Checking for PHP serialized arrays with quotes...");
const lines = content.split('\n');
for(let i=0; i<lines.length; i++) {
   const line = lines[i];
   if (line.includes('s:') && line.includes('";')) {
       console.log(`Line ${i+1}: ${line}`);
   }
}
