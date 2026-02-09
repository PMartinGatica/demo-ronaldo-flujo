import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import {
  Activity, Clock, AlertTriangle, CheckCircle, Settings,
  Layers, Package, ChevronRight, TrendingDown, Users,
  Monitor, Database, Info, Play, Pause, Thermometer, Droplets
} from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const App = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  // --- MOCK DATA ---
  const processData = [
    { name: 'Diseño', real: 12, estimado: 10, downtime: 2 },
    { name: 'Mecanizado', real: 24, estimado: 20, downtime: 4 },
    { name: 'Inyectora 01', real: 45, estimado: 40, downtime: 5 },
    { name: 'Enfriamiento', real: 15, estimado: 15, downtime: 0 },
    { name: 'Calidad', real: 8, estimado: 10, downtime: 0 },
  ];

  const downtimeReasons = [
    { name: 'Mantenimiento', value: 40 },
    { name: 'Cambio Molde', value: 30 },
    { name: 'Falta Material', value: 20 },
    { name: 'Otros', value: 10 },
  ];

  const orders = [
    { id: '742', model: 'Modelo A', client: 'Automotriz X', status: 'Inyección', progress: 65, priority: 'Alta' },
    { id: '743', model: 'Modelo B', client: 'Tech Corp', status: 'Diseño', progress: 15, priority: 'Media' },
    { id: '744', model: 'Modelo C', client: 'Electro S.A.', status: 'Mecanizado', progress: 40, priority: 'Baja' },
    { id: '745', model: 'Modelo A', client: 'Global Parts', status: 'Calidad', progress: 90, priority: 'Alta' },
  ];

  const machines = [
    { id: 'INY-01', type: 'Inyectora 150T', status: 'Produciendo', temp: '195°C', pressure: '120 bar', health: 98, load: 85 },
    { id: 'CNC-04', type: 'Centro de Mecanizado', status: 'Parada', temp: '45°C', pressure: '0 bar', health: 85, load: 0 },
    { id: 'INY-02', type: 'Inyectora 200T', status: 'Ajuste Molde', temp: '160°C', pressure: '40 bar', health: 92, load: 40 },
    { id: 'ST-01', type: 'Estación de Diseño', status: 'Activa', temp: '22°C', pressure: 'N/A', health: 100, load: 95 },
  ];

  const personnel = [
    { id: 'OP-101', name: 'Carlos Ruiz', role: 'Operador Inyección', shift: 'Mañana', station: 'INY-01', status: 'Activo' },
    { id: 'DS-202', name: 'Elena Gómez', role: 'Diseñadora Industrial', shift: 'Mañana', station: 'ST-01', status: 'Activo' },
    { id: 'MT-303', name: 'Marcos Peña', role: 'Técnico Mecanizado', shift: 'Tarde', station: 'CNC-04', status: 'Descanso' },
    { id: 'QC-404', name: 'Lucía Fernández', role: 'Control Calidad', shift: 'Mañana', station: 'Laboratorio', status: 'Activo' },
  ];

  // --- HELPER COMPONENTS ---
  const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-transform hover:scale-[1.02]">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
          {trend && (
            <p className={`text-xs mt-2 flex items-center ${trend.startsWith('+') ? 'text-red-500' : 'text-emerald-500'}`}>
              <TrendingDown className="w-3 h-3 mr-1" />
              {trend} vs semana anterior
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </div>
  );

  // --- VIEWS ---
  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tiempo Total Ciclo" value="104 hrs" icon={Clock} color="bg-blue-500" />
        <StatCard title="Tiempos Muertos" value="11 hrs" icon={AlertTriangle} trend="+2.4%" color="bg-orange-500" />
        <StatCard title="Eficiencia (OEE)" value="88.5%" icon={Activity} color="bg-emerald-500" />
        <StatCard title="Órdenes Activas" value="14" icon={Package} color="bg-purple-500" />
      </div>

      {/* Stepper del Proceso Actual */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6 italic">Rastreo de Orden Activa: #742 - Modelo A</h3>
        <div className="flex items-center min-w-full overflow-x-auto pb-4">
          {processData.map((step, idx, arr) => (
            <React.Fragment key={step.name}>
              <div className="flex flex-col items-center min-w-[120px]">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${idx < 2 ? 'bg-emerald-500 border-emerald-100 text-white' :
                    idx === 2 ? 'bg-blue-600 border-blue-100 text-white animate-pulse' :
                      'bg-slate-100 border-slate-50 text-slate-400'
                  }`}>
                  {idx < 2 ? <CheckCircle className="w-6 h-6" /> : <span className="font-bold">{idx + 1}</span>}
                </div>
                <p className={`text-xs font-bold mt-2 ${idx === 2 ? 'text-blue-600' : 'text-slate-700'}`}>{step.name}</p>
                <p className="text-[10px] text-slate-400 font-mono uppercase">{step.real}h acumuladas</p>
              </div>
              {idx < arr.length - 1 && <div className={`flex-1 h-1 mx-2 mb-10 rounded-full ${idx < 2 ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de Barras: Real vs Estimado */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-blue-500" />
            Tiempo Real vs. Estimado (Horas)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="real" name="Tiempo Real" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="estimado" name="Tiempo Estimado" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="downtime" name="Tiempo Muerto" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Causas de Tiempos Muertos */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Causas de Tiempos Muertos
          </h3>
          <div className="flex h-72 items-center">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={downtimeReasons}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {downtimeReasons.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-4 pr-4">
              {downtimeReasons.map((reason, index) => (
                <div key={reason.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-sm text-slate-600 font-medium">{reason.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{reason.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Inyectoras en Dashboard */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Estado de Inyectoras en Tiempo Real</h3>
          <button onClick={() => setActiveTab('Maquinaria')} className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
            Ver detalle técnico <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Máquina</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Salud</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Carga de Trabajo</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {machines.slice(0, 3).map((machine) => (
                <tr key={machine.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{machine.id}</div>
                    <div className="text-[10px] text-slate-400">{machine.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${machine.status === 'Produciendo' ? 'bg-emerald-100 text-emerald-800' :
                        machine.status === 'Parada' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${machine.status === 'Produciendo' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                      {machine.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{machine.health}%</td>
                  <td className="px-6 py-4">
                    <div className="w-32 bg-slate-100 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${machine.load > 80 ? 'bg-purple-500' : 'bg-blue-500'}`} style={{ width: `${machine.load}%` }} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"><Info className="w-4 h-4" /></button>
                      <button className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Play className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b flex justify-between items-center bg-slate-50">
        <h3 className="text-lg font-bold">Listado de Órdenes de Fabricación</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-blue-500/20 hover:bg-blue-700">
          + Nueva Orden
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="bg-white border-b border-slate-200">
          <tr className="text-slate-500 text-xs uppercase font-bold">
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Modelo</th>
            <th className="px-6 py-4">Cliente</th>
            <th className="px-6 py-4">Etapa Actual</th>
            <th className="px-6 py-4">Progreso</th>
            <th className="px-6 py-4">Prioridad</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
              <td className="px-6 py-4 font-mono font-bold text-blue-600">#{order.id}</td>
              <td className="px-6 py-4 font-medium">{order.model}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{order.client}</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-bold uppercase tracking-wider">{order.status}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${order.progress}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-600">{order.progress}%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm ${order.priority === 'Alta' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-50 text-slate-600 border border-slate-100'
                  }`}>{order.priority}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMachinery = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in zoom-in-95 duration-500">
      {machines.map(machine => (
        <div key={machine.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="p-5 border-b flex justify-between items-start">
            <div>
              <h4 className="text-lg font-bold text-slate-900">{machine.id}</h4>
              <p className="text-xs text-slate-500">{machine.type}</p>
            </div>
            <div className={`p-2 rounded-xl ${machine.status === 'Produciendo' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
              <Monitor className="w-5 h-5" />
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                  <Thermometer className="w-3 h-3" />
                  <p className="text-[10px] uppercase font-bold">Temp.</p>
                </div>
                <p className="text-sm font-bold text-slate-800">{machine.temp}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                  <Droplets className="w-3 h-3" />
                  <p className="text-[10px] uppercase font-bold">Presión</p>
                </div>
                <p className="text-sm font-bold text-slate-800">{machine.pressure}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Salud de Componentes</p>
                <p className="text-xs font-bold text-emerald-600">{machine.health}%</p>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${machine.health}%` }} />
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-50">
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${machine.status === 'Produciendo' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'
                }`}>{machine.status}</span>
              <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors">
                Panel Sensores <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPersonnel = () => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm animate-in fade-in duration-500 overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 className="text-lg font-bold">Personal en Planta</h3>
          <p className="text-xs text-slate-500">Distribución por turnos y estaciones</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center px-4 py-1 border-r border-slate-200">
            <p className="text-xl font-bold text-emerald-600">08</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Activos</p>
          </div>
          <div className="text-center px-4 py-1">
            <p className="text-xl font-bold text-slate-400">02</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Pausa</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-x divide-y divide-slate-100">
        {personnel.map(person => (
          <div key={person.id} className="p-6 flex items-center gap-5 hover:bg-slate-50/80 transition-all group">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-bold text-slate-600 text-lg border border-slate-200 group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
                {person.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${person.status === 'Activo' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{person.name}</h4>
                  <p className="text-xs font-medium text-slate-500">{person.role}</p>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold uppercase border border-slate-200">{person.shift}</span>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <span className="text-[10px] flex items-center gap-1.5 text-slate-400 font-bold uppercase">
                  <Monitor className="w-3.5 h-3.5" /> {person.station}
                </span>
                <span className={`text-[10px] flex items-center gap-1.5 font-bold uppercase ${person.status === 'Activo' ? 'text-emerald-600' : 'text-slate-400'}`}>
                  <Activity className="w-3.5 h-3.5" /> {person.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col border-r border-slate-800">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-blue-600 p-2.5 rounded-2xl shadow-xl shadow-blue-600/30 ring-4 ring-blue-600/10">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">FlowFactory</h1>
        </div>

        <nav className="space-y-1.5 flex-1">
          {[
            { id: 'Dashboard', icon: Activity },
            { id: 'Órdenes', icon: Package },
            { id: 'Maquinaria', icon: Settings },
            { id: 'Personal', icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-white' : 'text-slate-500'}`} />
              <span className="font-semibold text-sm tracking-wide">{item.id}</span>
              {activeTab === item.id && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-sm" />}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-slate-800/40 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-black shadow-inner border border-white/10">AD</div>
            <div>
              <p className="text-xs font-bold text-white">Admin Local</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Servidor Sincronizado</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200 px-10 py-5 flex justify-between items-center sticky top-0 z-30">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">{activeTab}</h2>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">v1.2.0</span>
            </div>
            <p className="text-xs font-medium text-slate-500">Sistema de seguimiento de flujo de procesos</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">Uptime Servidor</p>
              <p className="text-xs font-bold text-slate-700 font-mono">14d 05h 22m</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200 cursor-pointer hover:bg-white transition-all shadow-sm">
                <Database className="w-5 h-5 text-slate-500" />
              </div>
              <div className="h-11 w-11 bg-slate-900 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
                <Info className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-10 pb-16 max-w-[1600px] mx-auto w-full">
          {activeTab === 'Dashboard' && renderDashboard()}
          {activeTab === 'Órdenes' && renderOrders()}
          {activeTab === 'Maquinaria' && renderMachinery()}
          {activeTab === 'Personal' && renderPersonnel()}
        </main>
      </div>
    </div>
  );
};

export default App;
