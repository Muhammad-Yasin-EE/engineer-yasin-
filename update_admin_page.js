const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'admin', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Imports
if (!content.includes('UserEvaluationsPanel')) {
  content = content.replace(
    "import PortalContentManager from '@/components/admin/PortalContentManager'",
    "import PortalContentManager from '@/components/admin/PortalContentManager'\nimport UserEvaluationsPanel from '@/components/admin/UserEvaluationsPanel'"
  );
  if (!content.includes('ClipboardList')) {
    content = content.replace(
      "GraduationCap, Briefcase } from 'lucide-react'",
      "GraduationCap, Briefcase, ClipboardList } from 'lucide-react'"
    );
  }
}

// 2. Add State
if (!content.includes('showEvaluationsPanel')) {
  content = content.replace(
    "const [selectedUser, setSelectedUser] = useState<any>(null)",
    "const [selectedUser, setSelectedUser] = useState<any>(null)\n  const [showEvaluationsPanel, setShowEvaluationsPanel] = useState(false)"
  );
}

// 3. Add Button to User Card
const btnTarget = "</div>\n                  </div>\n                  <div className=\"flex flex-col gap-2 mt-2\">\n                    {u.premium_plan === 'free' ? (";
const btnReplace = `</div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      onClick={() => {
                        setSelectedUser(u)
                        setShowEvaluationsPanel(true)
                      }}
                      className="bg-[#0A192F] hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ClipboardList className="w-3.5 h-3.5" /> View ISSB Tests
                    </button>
                    {u.premium_plan === 'free' ? (`
if (content.includes(btnTarget) && !content.includes('View ISSB Tests')) {
  content = content.replace(btnTarget, btnReplace);
}

// 4. Add Panel Render
const panelTarget = "              ))}\n            </div>\n          )}\n        </div>\n      )}";
const panelReplace = `              ))}
            </div>
          )}
          {showEvaluationsPanel && selectedUser && (
            <UserEvaluationsPanel 
              userId={selectedUser.id} 
              onClose={() => {
                setShowEvaluationsPanel(false)
                setSelectedUser(null)
              }} 
            />
          )}
        </div>
      )}`;

if (content.includes(panelTarget) && !content.includes('<UserEvaluationsPanel')) {
  content = content.replace(panelTarget, panelReplace);
}

fs.writeFileSync(filePath, content);
console.log('Admin page updated successfully');
