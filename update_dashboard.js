const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'dashboard', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const target = `<p className="text-sm text-slate-500 line-clamp-2 md:line-clamp-1">{result.feedback}</p>`;

const replace = `{result.expert_feedback ? (
                      <div className="mt-1 flex items-start gap-1.5">
                        <span className="shrink-0 bg-[#B8212E] text-white text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm mt-0.5">Expert</span>
                        <p className="text-sm text-slate-800 font-medium line-clamp-2 md:line-clamp-1 border-l-2 border-[#B8212E] pl-2">{result.expert_feedback}</p>
                      </div>
                    ) : (
                      <div className="mt-1 flex items-start gap-1.5">
                        <span className="shrink-0 bg-slate-200 text-slate-500 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm mt-0.5">AI</span>
                        <p className="text-sm text-slate-500 line-clamp-2 md:line-clamp-1">{result.feedback}</p>
                      </div>
                    )}`;

if (content.includes(target) && !content.includes('result.expert_feedback')) {
  content = content.replace(target, replace);
  fs.writeFileSync(filePath, content);
  console.log('Dashboard updated successfully');
} else {
  console.log('Dashboard update skipped or already applied');
}
