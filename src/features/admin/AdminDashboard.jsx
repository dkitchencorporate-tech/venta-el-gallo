import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Image as ImageIcon, Users, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  const stats = [
    { title: 'Gestión de Carrusel', value: '11 Imágenes', icon: <ImageIcon size={24} />, path: '/admin/carrusel', color: 'bg-gold/10 text-gold border-gold/30' },
    { title: 'Reservas (Futuro)', value: 'Próximamente', icon: <Activity size={24} />, path: '#', color: 'bg-white/5 text-white/50 border-white/10' },
    { title: 'Usuarios (Futuro)', value: 'Próximamente', icon: <Users size={24} />, path: '#', color: 'bg-white/5 text-white/50 border-white/10' },
  ];

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-gold tracking-widest uppercase flex items-center gap-3">
          <ShieldCheck size={32} />
          Panel de Control
        </h1>
        <p className="text-white/60 mt-2">Bienvenido, <strong className="text-white">{currentUser?.email}</strong>. Sistema de gestión integral de Venta El Gallo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Link 
            key={i} 
            to={stat.path}
            className={`p-6 rounded-xl border ${stat.color} hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between h-40`}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-sm tracking-wider uppercase">{stat.title}</h3>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-serif tracking-widest">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
