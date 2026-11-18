/**
 * Help on Drive - Standalone UI Utilities & Common Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  renderDemoTopbar();
  renderEmergencySOSModal();
  lucide.createIcons();
});

// Render Top Simulation Bar
function renderDemoTopbar() {
  const topbar = document.getElementById('demoTopbar');
  if (!topbar) return;

  const currentRole = HOD.getCurrentRole();
  const currentUser = HOD.getCurrentUser();

  topbar.innerHTML = `
    <div style="display:flex; align-items:center; gap:0.5rem;">
      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10b981; box-shadow:0 0 8px #10b981;"></span>
      <span><strong>Standalone Portable Mode</strong> (Zero Server Setup Required)</span>
    </div>

    <div class="demo-pills">
      <span style="font-size:0.7rem; color:#94a3b8; margin-right:0.25rem;">1-Click Role Switch:</span>
      <button class="demo-btn ${currentRole === 'user' ? 'active' : ''}" onclick="HOD.switchRole('user')">
        👤 Customer (${HOD.USERS.user.name})
      </button>
      <button class="demo-btn ${currentRole === 'provider' ? 'active' : ''}" onclick="HOD.switchRole('provider')">
        👨‍🔧 Mechanic (${HOD.USERS.provider.name})
      </button>
      <button class="demo-btn ${currentRole === 'driver' ? 'active' : ''}" onclick="HOD.switchRole('driver')">
        👨‍✈️ Driver (${HOD.USERS.driver.name})
      </button>
      <button class="demo-btn ${currentRole === 'admin' ? 'active' : ''}" onclick="HOD.switchRole('admin')">
        👑 Admin
      </button>
    </div>
  `;
}

// Emergency SOS Modal Logic
function renderEmergencySOSModal() {
  if (document.getElementById('sosModalOverlay')) return;

  const modalHtml = `
    <div id="sosModalOverlay" class="modal-overlay">
      <div class="modal-card" style="border: 2px solid #ef4444; box-shadow: 0 25px 50px -12px rgba(239, 68, 68, 0.4);">
        <button class="modal-close" onclick="closeSOSModal()">✕</button>
        
        <div style="text-align:center; margin-bottom:1.25rem;">
          <div style="width:3.5rem; height:3.5rem; border-radius:50%; background:#fee2e2; color:#ef4444; display:flex; align-items:center; justify-content:center; font-size:1.75rem; margin:0 auto 0.75rem auto; animation:pulse-red 2s infinite;">
            🚨
          </div>
          <span style="background:#fef2f2; color:#991b1b; padding:0.2rem 0.6rem; border-radius:9999px; font-size:0.7rem; font-weight:800; border:1px solid #fecaca;">
            HIGHWAY EMERGENCY SOS DISPATCH
          </span>
          <h3 style="font-size:1.35rem; font-weight:900; color:#0f172a; margin-top:0.4rem;">Immediate Highway Rescue</h3>
          <p style="font-size:0.75rem; color:#64748b; margin-top:0.25rem;">
            Direct-dial official emergency responders or broadcast your live GPS to Help on Drive rescue team.
          </p>
        </div>

        <!-- Direct Dial Grid -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin-bottom:1.25rem;">
          <a href="tel:112" class="btn" style="background:#1e293b; color:#fff; font-size:0.75rem; padding:0.6rem;">
            🚓 Police: 112
          </a>
          <a href="tel:108" class="btn" style="background:#dc2626; color:#fff; font-size:0.75rem; padding:0.6rem;">
            🚑 Ambulance: 108
          </a>
          <a href="tel:1033" class="btn" style="background:#0284c7; color:#fff; font-size:0.75rem; padding:0.6rem;">
            🛣️ NHAI Express: 1033
          </a>
          <a href="tel:1800435737" class="btn" style="background:#f97316; color:#fff; font-size:0.75rem; padding:0.6rem;">
            📞 Helpline: 1800-HOD
          </a>
        </div>

        <!-- GPS Details Box -->
        <div style="background:#f8fafc; border:1px dashed #cbd5e1; border-radius:14px; padding:0.85rem; margin-bottom:1.25rem;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.35rem;">
            <span style="font-size:0.7rem; font-weight:800; color:#475569; text-transform:uppercase;">Live Highway Coordinates:</span>
            <span style="font-size:0.65rem; color:#10b981; font-weight:bold;">● GPS Lock Active</span>
          </div>
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:#0f172a; font-weight:bold;">
            LAT: 28.5494° N, LNG: 77.2001° E
          </div>
          <p style="font-size:0.7rem; color:#64748b; margin-top:0.2rem;">Hauz Khas Enclave, Outer Ring Road, New Delhi</p>
          
          <button onclick="copyCoordinates()" class="btn btn-outline btn-sm" style="width:100%; margin-top:0.6rem;">
            📋 Copy GPS Coordinates
          </button>
        </div>

        <button onclick="triggerDispatchSOS()" class="btn" style="width:100%; background:linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); color:#fff; font-size:0.85rem; padding:0.8rem; box-shadow:0 8px 20px rgba(239, 68, 68, 0.4);">
          🚨 Broadcast SOS to Help on Drive Dispatch
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openSOSModal() {
  const modal = document.getElementById('sosModalOverlay');
  if (modal) modal.classList.add('open');
}

function closeSOSModal() {
  const modal = document.getElementById('sosModalOverlay');
  if (modal) modal.classList.remove('open');
}

function copyCoordinates() {
  const text = 'EMERGENCY GPS: 28.5494 N, 77.2001 E (Hauz Khas Enclave, New Delhi) - Help on Drive Highway Rescue';
  navigator.clipboard.writeText(text).then(() => {
    alert('✅ GPS Coordinates copied to clipboard! Share with emergency services.');
  }).catch(() => {
    alert('Coordinates: 28.5494 N, 77.2001 E');
  });
}

function triggerDispatchSOS() {
  const alertObj = HOD.triggerSOS(28.5494, 77.2001, 'Hauz Khas Enclave, Outer Ring Road, New Delhi');
  closeSOSModal();
  if (typeof confetti === 'function') {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
  }
  alert(`🚨 SOS ALERT DISPATCHED!\nReference ID: ${alertObj.id}\nEmergency network alerted. Response vehicle en-route.`);
}

// Toast notification helper
function showToast(title, message, type = 'info') {
  alert(`${title}\n${message}`);
}
