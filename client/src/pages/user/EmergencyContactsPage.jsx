import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import EmergencySOSModal from '../../components/sos/EmergencySOSModal';
import { Shield, Plus, Trash2, Siren, Phone, Users, CheckCircle2 } from 'lucide-react';

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Father');
  const [phone, setPhone] = useState('');

  const fetchContacts = async () => {
    try {
      const res = await api.get('/emergency-contacts');
      if (res.data.success) setContacts(res.data.contacts);
    } catch (err) {
      console.error('Error fetching emergency contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/emergency-contacts', { name, relationship, phone });
      if (res.data.success) {
        setModalOpen(false);
        setName('');
        setPhone('');
        fetchContacts();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add contact');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/emergency-contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Emergency SOS Contacts</h1>
          <p className="text-xs text-slate-500">
            Contacts alerted automatically with live GPS coordinates whenever you press the SOS panic button
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSosModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 transition-all"
          >
            <Siren className="w-4 h-4" />
            <span>Test SOS Alert</span>
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Relative</span>
          </button>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-start space-x-3">
        <Shield className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-rose-900">
          <strong>Instant Relay Protocol:</strong> In an emergency, our servers transmit automated high-priority SMS notifications with a live GPS tracking link to your registered emergency contacts so they can track and reach your location immediately.
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs text-slate-400">Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <Users className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Emergency Contacts Registered</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Please add at least 2 family members or trusted friends for your personal safety during road trips.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md"
          >
            Add Contact Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-xs text-slate-900">{c.name}</h4>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                      {c.relationship}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono mt-1">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>{c.phone}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(c._id)}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                title="Remove Contact"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Contact Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">Add Emergency Contact</h3>
            <p className="text-xs text-slate-500 mb-4">Will receive automated distress SMS during SOS</p>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Name</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Relationship</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone</label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98111 22334"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500 font-mono"
                />
              </div>

              <div className="flex space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-600/20"
                >
                  Save Relative
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Emergency SOS Modal */}
      <EmergencySOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />
    </div>
  );
}
