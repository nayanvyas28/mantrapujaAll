const cp = require('child_process');
const fs = require('fs');
fs.writeFileSync('pred_2.txt', cp.execSync('node test_predictions.js', { encoding: 'utf8' }));
