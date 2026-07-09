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
		// 🎨 CAMBIO SUIZO: Cambiamos bg-stone-100 por un tono papel limpio y un resaltado negro puro ultra-elegante
		<div className='min-h-screen bg-[#fafaf9] text-stone-950 antialiased selection:bg-stone-950 selection:text-white print:bg-white print:p-0'>
			{/* ENCABEZADO DE CONTROL (Estilo Cabecera de Prensa) */}
			{/* CAMBIO SUIZO: Eliminamos sombras, bajamos a borde fino de 1px (hairline) y quitamos curvas */}
			<header className='py-8 bg-white border-b border-stone-200 print:hidden'>
				<div className='max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-baseline justify-between gap-6'>
					{/* Bloque de Identidad Visual */}
					<div className='space-y-1 text-left'>
						<h1 className='font-black text-2xl tracking-tighter uppercase text-stone-950'>
							ATS Optimizer
							<span className='font-light text-stone-400 text-xs tracking-widest uppercase block sm:inline sm:ml-3 normal-case'>by expansis pro</span>
						</h1>
						<p className='text-[10px] text-stone-500 uppercase tracking-widest font-medium'>Semantics & data engineering for modern resumes</p>
					</div>

					{/* Contenedor de Llave API */}
					<div className='w-full md:w-auto flex justify-end'>
						<ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
					</div>
				</div>
			</header>

			{/* ZONA DE TRABAJO PRINCIPAL */}
			{/* CAMBIO SUIZO: Espaciados más amplios (py-14) para dejar respirar la composición */}
			<main className='max-w-5xl mx-auto px-6 py-14 print:p-0'>
				{/* Formulario principal de captura */}
				<div className='print:hidden'>
					<DashboardForm apiKey={apiKey} setIsLoading={setIsLoading} isLoading={isLoading} setOptimizedCV={setOptimizedCV} />
				</div>

				{/* LIENZO DE RENDERIZADO DEL PDF */}
				{/* CAMBIO SUIZO: Eliminamos shadow-xs por completo, el documento se expone plano sobre la rejilla */}
				{optimizedCV && (
					<div className='mt-14 bg-white p-8 md:p-12 border border-stone-200 rounded-none print:shadow-none print:border-none print:p-0 print:mt-0 animate-fade-in'>
						<PreviewCV data={optimizedCV} />
					</div>
				)}
			</main>
		</div>
	);
}

export default App;
