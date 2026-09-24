import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import './LeafletFix';
import { userPinIcon } from './LeafletFix';
import { Crosshair, MapPin } from 'lucide-react';

function ClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LocationPickerMap({
  initialPos = { lat: 28.6139, lng: 77.2090, address: 'Connaught Place, New Delhi' },
  onLocationChange
}) {
  const [position, setPosition] = useState([initialPos.lat, initialPos.lng]);
  const [addressText, setAddressText] = useState(initialPos.address || 'Selected Location');
  const [locating, setLocating] = useState(false);

  const handleSelect = (lat, lng) => {
    setPosition([lat, lng]);
    const approxAddress = `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`;
    setAddressText(approxAddress);
    if (onLocationChange) {
      onLocationChange({ lat, lng, address: approxAddress });
    }
  };

  const locateUser = () => {
    if ('geolocation' in navigator) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition([lat, lng]);
          const addr = `Current GPS Position (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
          setAddressText(addr);
          setLocating(false);
          if (onLocationChange) {
            onLocationChange({ lat, lng, address: addr });
          }
        },
        (err) => {
          console.warn('Geolocation denied or unavailable, using fallback', err);
          setLocating(false);
        }
      );
    }
  };

  return (
    <div className="relative w-full h-[260px] rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="absolute top-2 left-2 z-[500] bg-white/95 px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium text-slate-700 flex items-center space-x-1.5 border border-slate-200">
        <MapPin className="w-3.5 h-3.5 text-brand-600" />
        <span className="truncate max-w-[200px]">{addressText}</span>
      </div>

      <button
        type="button"
        onClick={locateUser}
        disabled={locating}
        className="absolute top-2 right-2 z-[500] bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium border border-slate-200 flex items-center space-x-1"
      >
        <Crosshair className={`w-3.5 h-3.5 text-brand-600 ${locating ? 'animate-spin' : ''}`} />
        <span>{locating ? 'Locating...' : 'GPS Detect'}</span>
      </button>

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={userPinIcon} />
        <ClickHandler onLocationSelect={handleSelect} />
      </MapContainer>
    </div>
  );
}
