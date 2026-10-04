import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { HomeViewV2 as HomeView } from './components/HomeViewV2';
import { LiveARCameraCanvas } from './components/LiveARCameraCanvas';
import { NailStudioEditor } from './components/NailStudioEditor';
import { BookingRequest } from './components/BookingRequest';
import { AdminPanel } from './components/AdminPanel';
import { MyBookingsView } from './components/MyBookingsView';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Appointment, CustomDesign, GiftCard, NailCatalogStyle } from './types';
import { NAIL_STYLES_CATALOG } from './data/mockData';
import { apiService } from './data/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  // Citas y diseÃ±os: persistidos en SQLite a travÃ©s de la API (server.js)
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [customDesigns, setCustomDesigns] = useState<CustomDesign[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const [catalogStyles, setCatalogStyles] = useState<NailCatalogStyle[]>(() => {
    const saved = localStorage.getItem('bettyjaimez_catalog_styles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return NAIL_STYLES_CATALOG;
  });

  const [giftCards, setGiftCards] = useState<GiftCard[]>(() => {
    const saved = localStorage.getItem('bettyjaimez_giftcards');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Los datos privados de citas y diseÃ±os se cargan Ãºnicamente desde Cabina Staff.
  // La web pÃºblica no debe consultar endpoints protegidos al arrancar.
  useEffect(() => {
    setIsLoadingData(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('bettyjaimez_catalog_styles', JSON.stringify(catalogStyles));
  }, [catalogStyles]);

  useEffect(() => {
    localStorage.setItem('bettyjaimez_giftcards', JSON.stringify(giftCards));
  }, [giftCards]);

  const handleAddBooking = async (appt: Appointment) => {
    const result = await apiService.createAppointment(appt);
    if (result?.success) {
      setAppointments(prev => [appt, ...prev]);
    } else {
      alert('No se pudo guardar la cita en el servidor. Comprueba que la API estÃ© en marcha (npm run server).');
    }
  };

  const handleSaveDesign = async (design: CustomDesign) => {
    const result = await apiService.createDesign(design);
    if (result?.success) {
      setCustomDesigns(prev => [design, ...prev]);
    } else {
      alert('No se pudo guardar el diseÃ±o en el servidor. Comprueba que la API estÃ© en marcha (npm run server).');
    }
  };

  const handleAddToCatalog = (design: CustomDesign) => {
    const newStyle: NailCatalogStyle = {
      id: `custom_${design.id}`,
      name: `DiseÃ±o ${design.code} (${design.clientName})`,
      bgGradient: 'from-[#082D05] via-[#8CFF00]/40 to-[#176B00]',
      accent: '#8CFF00',
      badge: 'Exclusivo DueÃ±a',
      isCustom: true
    };
    if (!catalogStyles.some(s => s.id === newStyle.id)) {
      setCatalogStyles(prev => [newStyle, ...prev]);
      alert(`Â¡DiseÃ±o ${design.code} aÃ±adido al muestrario con Ã©xito! Ya estÃ¡ disponible en el muestrario.`);
    } else {
      alert('Este diseÃ±o ya estÃ¡ en el muestrario.');
    }
  };

  const activeBookingCount = appointments.filter(a => a.status === 'Confirmada').length;

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#082D05] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        bookingCount={activeBookingCount} 
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        <div mode="wait">
          <div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
        {activeTab === 'home' && (
          <HomeView 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'livear' && (
          <LiveARCameraCanvas 
            onSaveDesign={handleSaveDesign} 
            setActiveTab={setActiveTab}
            catalogStyles={catalogStyles}
          />
        )}
        {activeTab === 'atelier' && (
          <NailStudioEditor 
            onSaveDesign={handleSaveDesign} 
            setActiveTab={setActiveTab}
            catalogStyles={catalogStyles}
          />
        )}
        {activeTab === 'booking' && (
          <BookingRequest setActiveTab={setActiveTab} />
        )}
        {activeTab === 'mybookings' && (
          <MyBookingsView 
            appointments={appointments}
            setAppointments={setAppointments}
            giftCards={giftCards}
            setGiftCards={setGiftCards}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'admin' && (
          <AdminPanel 
            appointments={appointments}
            setAppointments={setAppointments}
            customDesigns={customDesigns}
            setCustomDesigns={setCustomDesigns}
            catalogStyles={catalogStyles}
            setCatalogStyles={setCatalogStyles}
            onAddToCatalog={handleAddToCatalog}
          />
        )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <WhatsAppButton />
    </div>
  );
}


