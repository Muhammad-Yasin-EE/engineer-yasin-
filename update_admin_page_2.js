const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'admin', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const target1 = `                    {u.premium_plan && u.premium_plan !== 'free' ? 'Revoke Premium' : 'Grant Premium'}
                  </button>
                </div>`;

const replace1 = `                    {u.premium_plan && u.premium_plan !== 'free' ? 'Revoke Premium' : 'Grant Premium'}
                  </button>

                  <button
                      onClick={() => {
                        setSelectedUser(u)
                        setShowEvaluationsPanel(true)
                      }}
                      className="mt-2 w-full py-2 text-[10px] font-black uppercase tracking-widest rounded-sm transition-colors bg-[#0A192F] hover:bg-slate-800 text-white flex items-center justify-center gap-1.5"
                    >
                      <ClipboardList className="w-3.5 h-3.5" /> View ISSB Tests
                  </button>
                </div>`;

if (content.includes(target1) && !content.includes('View ISSB Tests')) {
  content = content.replace(target1, replace1);
}

const target2 = `              ))}
            </div>
          )}
        </div>
      )}`;

const replace2 = `              ))}
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

if (content.includes(target2) && !content.includes('<UserEvaluationsPanel')) {
  content = content.replace(target2, replace2);
}

fs.writeFileSync(filePath, content);
console.log('Admin page updated successfully phase 2');
