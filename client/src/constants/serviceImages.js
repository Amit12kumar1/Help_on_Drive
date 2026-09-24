/**
 * 🚗 HELP ON DRIVE - Service Imagery & Metadata Catalog
 *
 * 🎓 Viva & Presentation Note:
 * Yeh file sabhi services ke liye high-definition Unsplash photography,
 * 3D badge colors, aur fallback URLs define karti hai.
 * Sabhi images responsive format (fit=crop&w=800&q=80) me optimize ki gayi hain
 * taaki loading time fast ho aur UI visuals 60fps par render hon.
 */

export const SERVICE_IMAGES = {
  // 1. Mechanical Breakdown & Engine Repair
  breakdown: {
    title: 'Vehicle Breakdown Assistance',
    category: 'Roadside Assistance',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    alt: 'Mechanic inspecting engine under vehicle hood during roadside breakdown',
    eta: '15-20 mins',
    price: '₹399',
    badge: 'On-Spot Repair',
    badgeColor: 'bg-amber-500 text-white',
    accentColor: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-400/40',
  },

  // 2. Flat Tyre & Puncture Plugging
  puncture: {
    title: 'Flat Tyre & Puncture Repair',
    category: 'Roadside Assistance',
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    alt: 'Technician repairing flat tubeless car tyre with hydraulic jack lift',
    eta: '15 mins',
    price: '₹199',
    badge: 'Express Service',
    badgeColor: 'bg-blue-600 text-white',
    accentColor: 'from-blue-500/20 to-cyan-500/10',
    borderColor: 'border-blue-400/40',
  },

  // 3. Battery Jumpstart & Health Check
  battery: {
    title: 'Battery Jump Start',
    category: 'Roadside Assistance',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80',
    alt: 'Dead car battery boosted with heavy-duty booster jumper cables',
    eta: '15-20 mins',
    price: '₹349',
    badge: 'Instant Boost',
    badgeColor: 'bg-emerald-600 text-white',
    accentColor: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'border-emerald-400/40',
  },

  // 4. Emergency Fuel Delivery
  fuel: {
    title: 'Emergency Fuel Delivery',
    category: 'Roadside Assistance',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1527018607616-a6fe606f15cb?auto=format&fit=crop&w=800&q=80',
    alt: '5 Litres emergency petrol and diesel canister delivery at roadside',
    eta: '20 mins',
    price: '₹249',
    badge: '5L Dispensed',
    badgeColor: 'bg-rose-600 text-white',
    accentColor: 'from-rose-500/20 to-pink-500/10',
    borderColor: 'border-rose-400/40',
  },

  // 5. Flatbed Hydraulic Towing
  towing: {
    title: 'Flatbed & Underlift Towing',
    category: 'Roadside Assistance',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
    alt: 'Hydraulic flatbed recovery carrier tow truck transporting vehicle',
    eta: '25-35 mins',
    price: '₹799',
    badge: 'Zero-Drag Carrier',
    badgeColor: 'bg-purple-600 text-white',
    accentColor: 'from-purple-500/20 to-indigo-500/10',
    borderColor: 'border-purple-400/40',
  },

  // 6. Key Lockout Non-Destructive Opening
  lockout: {
    title: 'Key Lockout Assistance',
    category: 'Roadside Assistance',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    alt: 'Automotive locksmith specialty air-wedge tool opening locked car door',
    eta: '20 mins',
    price: '₹449',
    badge: 'Zero Scratch',
    badgeColor: 'bg-indigo-600 text-white',
    accentColor: 'from-indigo-500/20 to-blue-500/10',
    borderColor: 'border-indigo-400/40',
  },

  // 7. On-Demand Driver / City Chauffeur
  driverCity: {
    title: 'City Chauffeur (Hourly)',
    category: 'Hire a Driver',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    alt: 'Professional chauffeur driving luxury car smoothly through urban city traffic',
    eta: '20-30 mins',
    price: '₹120/hr',
    badge: 'Vetted & Uniformed',
    badgeColor: 'bg-blue-600 text-white',
    accentColor: 'from-blue-600/20 to-indigo-500/10',
    borderColor: 'border-blue-400/40',
  },

  // 8. Outstation Highway Roadtrip Driver
  driverOutstation: {
    title: 'Outstation Roadtrip Chauffeur',
    category: 'Hire a Driver',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    alt: 'Scenic open road highway trip with professional experienced highway driver',
    eta: 'Advance Booking',
    price: '₹900/day',
    badge: 'Highway Specialist',
    badgeColor: 'bg-emerald-600 text-white',
    accentColor: 'from-emerald-600/20 to-teal-500/10',
    borderColor: 'border-emerald-400/40',
  },

  // 9. Full Day Executive Chauffeur
  driverFullDay: {
    title: 'Full Day Corporate Chauffeur',
    category: 'Hire a Driver',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    alt: 'Executive luxury car chauffeur ready for full-day business meetings',
    eta: 'Flexible Time',
    price: '₹900/10hrs',
    badge: 'VIP Service',
    badgeColor: 'bg-amber-600 text-white',
    accentColor: 'from-amber-600/20 to-yellow-500/10',
    borderColor: 'border-amber-400/40',
  },

  // 10. Night Commute / Late Night Party Driver
  driverNight: {
    title: 'Safe Night Drive Home',
    category: 'Hire a Driver',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    alt: 'Night party safe drive home in your own personal car with trusted chauffeur',
    eta: '24/7 Available',
    price: '₹240/2hrs',
    badge: '100% Safe Commute',
    badgeColor: 'bg-purple-600 text-white',
    accentColor: 'from-purple-600/20 to-rose-500/10',
    borderColor: 'border-purple-400/40',
  }
};
