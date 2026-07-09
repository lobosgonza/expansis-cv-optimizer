// src/App.jsx
import React, { useState } from 'react';
import DashboardForm from './components/DashboardForm';
import ApiKeyInput from './components/ApiKeyInput';
import PreviewCV from './components/PreviewCV';

function App() {
	// 1. Inicialización de la API Key (Mantenemos tu lógica intacta)
	const [apiKey, setApiKey] = useState(() => {
		const envKey = import.meta.env.VITE_GEMINI_API_KEY;
		if (envKey) return envKey;
		return localStorage.getItem('expansis_gemini_key') || '';
	});

	// 2. Estados globales de control
	const [optimizedCV, setOptimizedCV] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	return (
		// 🎨 MÉXICO 68: Fondo blanco puro de alto contraste y selección en Rosa Mexicano vibrante
		<div className='min-h-screen bg-white text-stone-950 antialiased selection:bg-[#F1005E] selection:text-white print:bg-white print:p-0'>
			{/* ENCABEZADO OLÍMPICO */}
			<header className='pt-8 bg-white print:hidden'>
				<div className='max-w-5xl mx-auto px-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-6'>
					{/* Bloque de Identidad Gráfica Expandida */}
					<div className='space-y-1.5 text-center md:text-left'>
						<h1 className='font-black text-5xl uppercase tracking-tighter text-stone-950 text-wyman-echo'>ATS OPTIMIZER</h1>
						<p className='text-[10px] text-stone-900 uppercase tracking-widest font-bold font-mono'>[ SECTION 01 // KINETIC DATA ENGINE ]</p>
					</div>

					{/* Contenedor de Llave API */}
					<div className='w-full md:w-auto flex justify-center md:justify-end'>
						<ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
					</div>
				</div>

				{/* 🏁 LA FRANJA WYMAN: Líneas paralelas Huichol que dividen la interfaz de forma matemática */}
				{/* Nota: Requiere la clase .bg-wyman-lines que declaramos en tu archivo src/index.css */}
				<div className='h-6 w-full bg-wyman-lines border-t-2 border-b-2 border-stone-950 shadow-none'></div>
			</header>

			{/* ZONA DE TRABAJO PRINCIPAL */}
			<main className='max-w-5xl mx-auto px-6 py-12 print:p-0'>
				{/* Formulario principal de captura */}
				<div className='print:hidden'>
					<DashboardForm apiKey={apiKey} setIsLoading={setIsLoading} isLoading={isLoading} setOptimizedCV={setOptimizedCV} />
				</div>

				{/* LIENZO DE RENDERIZADO DEL PDF */}
				{/* MÉXICO 68: Enmarcado con un contorno negro grueso de 2px, emulando un cartel serigráfico */}
				{optimizedCV && (
					<div className='mt-12 bg-white p-8 md:p-12 border-2 border-stone-950 rounded-none print:shadow-none print:border-none print:p-0 print:mt-0'>
						<PreviewCV data={optimizedCV} />
					</div>
				)}
			</main>
			{/* 🏁 FOOTER MINIMALISTA TECNOLÓGICO */}
			<footer className='py-8 bg-white border-t border-stone-100 print:hidden mt-auto'>
				<div className='max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono font-bold tracking-widest uppercase text-stone-400'>
					<span>[ ENGINE v1.0.0 // PRODUCTION ]</span>
					<span className='text-center sm:text-right'>
						DEVELOPED BY{' '}
						<a
							href='https://expansispro.com/'
							target='_blank'
							rel='noopener noreferrer'
							className='text-stone-950 hover:text-[#F1005E] underline underline-offset-4 transition-colors'>
							EXPANSISPRO.COM
						</a>
					</span>
				</div>
			</footer>
		</div>
	);
}

export default App;
