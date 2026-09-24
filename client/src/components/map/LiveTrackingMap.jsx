import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import './LeafletFix';
import { userPinIcon, vehiclePinIcon, mechanicPinIcon } from './LeafletFix';
import { Navigation, Compass, Play, MapPin, Gauge } from 'lucide-react';

// Auto zoom & center on markers
function MapBoundsUpdater({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points && points.length > 0) {
      const validPoints = points.filter(p => p && p[0] && p[1]);
      if (validPoints.length > 1) {
        map.fitBounds(validPoints, { padding: [50, 50] });
      } else if (validPoints.length === 1) {
        map.setView(validPoints[0], 14);
      }
    }
  }, [points, map]);
  return null;
}

export default function LiveTrackingMap({
  userLocation = { lat: 28.5494, lng: 77.2001, address: 'Hauz Khas, New Delhi' },
  partnerLocation = { lat: 28.5700, lng: 77.2300, name: 'Rajesh (Driver)', role: 'driver' },
  bookingStatus = 'on_the_way'
}) {
  const [currentPartnerPos, setCurrentPartnerPos] = useState([partnerLocation.lat, partnerLocation.lng]);
  const [distanceKm, setDistanceKm] = useState(3.4);
  const [etaMins, setEtaMins] = useState(12);
  const [isSimulating, setIsSimulating] = useState(false);

  // Haversine distance calculator
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(1));
  };

  useEffect(() => {
    if (partnerLocation?.lat && partnerLocation?.lng) {
      setCurrentPartnerPos([partnerLocation.lat, partnerLocation.lng]);
      const dist = calculateDistance(partnerLocation.lat, partnerLocation.lng, userLocation.lat, userLocation.lng);
      setDistanceKm(dist);
      setEtaMins(Math.max(2, Math.round(dist * 3.5)));
    }
  }, [partnerLocation, userLocation]);

  // Live simulation to watch the partner vehicle move toward the user
  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    const steps = 25;
    let step = 0;
    const startLat = currentPartnerPos[0];
    const startLng = currentPartnerPos[1];
    const targetLat = userLocation.lat;
    const targetLng = userLocation.lng;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const newLat = startLat + (targetLat - startLat) * progress;
      const newLng = startLng + (targetLng - startLng) * progress;

      setCurrentPartnerPos([newLat, newLng]);
      const remainingDist = calculateDistance(newLat, newLng, targetLat, targetLng);
      setDistanceKm(remainingDist);
      setEtaMins(Math.max(1, Math.round(remainingDist * 3.5)));

      if (step >= steps) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 800);
  };

  const userPos = [userLocation.lat, userLocation.lng];
  const routePoints = [currentPartnerPos, userPos];
  const isMechanic = partnerLocation.role === 'provider';

  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      {/* Dynamic Telemetry HUD overlay */}
      <div className="absolute top-4 left-4 z-[500] bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-md border border-slate-100 flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
          <Navigation className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Estimated Arrival</div>
          <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>{etaMins} mins</span>
            <span className="text-slate-300">•</span>
            <span className="text-sm font-normal text-slate-600">{distanceKm} km away</span>
          </div>
        </div>
      </div>

      {/* Simulation trigger button */}
      <div className="absolute top-4 right-4 z-[500]">
        <button
          onClick={startSimulation}
          disabled={isSimulating}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md transition-all ${
            isSimulating
              ? 'bg-amber-500 text-white animate-pulse'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isSimulating ? 'Tracking in Transit...' : 'Simulate Live Movement'}</span>
        </button>
      </div>

      {/* Bottom status badge */}
      <div className="absolute bottom-4 left-4 right-4 z-[500] bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl text-xs flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-medium">
            {partnerLocation.name} ({isMechanic ? 'Service Provider' : 'Driver'}) is en route
          </span>
        </div>
        <span className="text-slate-300">Live GPS Connected</span>
      </div>

      {/* Map Container */}
      <MapContainer
        center={userPos}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        <Marker position={userPos} icon={userPinIcon}>
          <Popup>
            <div className="p-1">
              <div className="font-bold text-xs text-rose-600 uppercase">Your Location</div>
              <div className="text-xs text-slate-700">{userLocation.address || 'Pickup Point'}</div>
            </div>
          </Popup>
        </Marker>

        {/* Partner Vehicle Marker */}
        <Marker position={currentPartnerPos} icon={isMechanic ? mechanicPinIcon : vehiclePinIcon}>
          <Popup>
            <div className="p-1">
              <div className="font-bold text-xs text-amber-600 uppercase">
                {isMechanic ? 'Technician Vehicle' : 'Chauffeur Vehicle'}
              </div>
              <div className="text-xs font-semibold text-slate-800">{partnerLocation.name}</div>
              <div className="text-[11px] text-slate-500">Speed: ~34 km/h</div>
            </div>
          </Popup>
        </Marker>

        {/* Route Line */}
        <Polyline
          positions={routePoints}
          color="#ea580c"
          weight={4}
          dashArray="6, 8"
          opacity={0.8}
        />

        <MapBoundsUpdater points={routePoints} />
      </MapContainer>
    </div>
  );
}
