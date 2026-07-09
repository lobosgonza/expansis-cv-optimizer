// src/components/DashboardForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { optimizeCVWithGemini } from '../services/geminiEngine';

function DashboardForm({ apiKey, isLoading, setIsLoading, setOptimizedCV }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [linkedin, setLinkedin] = useState('');

	const [baseCV, setBaseCV] = useState('');
	const [jobDescription, setJobDescription] = useState('');
	const [language, setLanguage] = useState('es');
	const [fitToSinglePage, setFitToSinglePage] = useState(false);
	const [error, setError] = useState('');

	const loadExample = () => {
		setName('Pablo Roblero');
		setEmail('pablo.roblero@email.com');
		setPhone('+44 7123 456789');
		setLinkedin('linkedin.com/in/pablo-roblero-970849287');

		setBaseCV(
			"Dedicated researcher with a strong background in quantitative and qualitative methods, specializing in the study of pressing social issues such as education, health inequalities, food systems, and climate change. Experienced in designing and leading research projects at The British Academy and King's College London.",
		);
		setJobDescription(
			'Job Title: Research Director\nOrganization: Centre for Policy Studies (CPS)\nLocation: London, UK\nKey Responsibilities:\n- Oversee the design, methodology, and execution of high-quality public policy research.\n- Translate complex socio-economic data analysis into impactful and rigorous policy reports.',
		);
		setLanguage('en');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (!apiKey) {
			setError('⚠️ Por favor, ingresa tu API Key de Gemini en la parte superior para operar.');
			return;
		}
		if (baseCV.trim().length < 20 || jobDescription.trim().length < 20) {
			setError('⚠️ Ambos bloques de texto deben contener suficiente información.');
			return;
		}

		setIsLoading(true);
		try {
			const aiResult = await optimizeCVWithGemini(apiKey, baseCV, jobDescription, language);

			const customizedCV = {
				...aiResult,
				name: name.trim() || aiResult.name || 'Curriculum Vitae',
				language: language,
				fitToSinglePage: fitToSinglePage,
				contact: {
					email: email.trim() || aiResult.contact?.email || '',
					phone: phone.trim() || aiResult.contact?.phone || '',
					location: aiResult.contact?.location || '',
					links: linkedin.trim() ? [linkedin.trim()] : aiResult.contact?.links || [],
				},
			};

			setOptimizedCV(customizedCV);
		} catch (err) {
			setError(err.message || 'Ocurrió un error inesperado al procesar los datos.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		// 🎨 SUIZO: Fondo blanco plano, bordes finos de 1px, cero curvas (rounded-none), cero sombras
		<form onSubmit={handleSubmit} className='bg-white border border-stone-200 p-8 md:p-12 rounded-none shadow-none space-y-10'>
			{/* SECCIÓN SUPERIOR: Controles Globales */}
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-stone-200 pb-6'>
				<button
					type='button'
					onClick={loadExample}
					className='text-[11px] font-medium uppercase tracking-widest text-stone-500 hover:text-stone-950 underline underline-offset-4 cursor-pointer transition-colors'>
					✨ Cargar Datos de Ejemplo
				</button>

				<div className='flex flex-wrap items-center gap-6'>
					{/* CHECKBOX: Rediseño geométrico */}
					<label className='flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-stone-950 cursor-pointer select-none'>
						<input
							type='checkbox'
							checked={fitToSinglePage}
							onChange={(e) => setFitToSinglePage(e.target.checked)}
							className='w-3.5 h-3.5 border border-stone-400 rounded-none text-stone-950 focus:ring-0 accent-stone-950 cursor-pointer'
						/>
						Forzar 1 página
					</label>

					{/* SELECTOR DE IDIOMA: Bordes duros e i18n compacto */}
					<div className='flex items-center gap-3'>
						<span className='text-[11px] font-bold uppercase tracking-widest text-stone-400'>Idioma:</span>
						<div className='border border-stone-200 p-0.5 flex bg-transparent rounded-none'>
							<button
								type='button'
								onClick={() => setLanguage('es')}
								className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer rounded-none ${language === 'es' ? 'bg-stone-950 text-white' : 'text-stone-500 hover:text-stone-950'}`}>
								ES
							</button>
							<button
								type='button'
								onClick={() => setLanguage('en')}
								className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase transition-colors cursor-pointer rounded-none ${language === 'en' ? 'bg-stone-950 text-white' : 'text-stone-500 hover:text-stone-950'}`}>
								EN
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* SECCIÓN: Datos de Contacto */}
			{/* SUIZO: Eliminamos el contenedor gris flotante, ahora se separa por una línea estructural limpia */}
			<div className='border-b border-stone-200 pb-8 space-y-6'>
				<h4 className='text-[11px] font-bold uppercase tracking-widest text-stone-950 flex items-center gap-2'>
					<span className='text-stone-400'>—</span> Datos de Contacto Opcionales
				</h4>

				{/* Inputs integrados de forma invisible mediante líneas inferiores finas */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6'>
					<div className='flex flex-col space-y-1.5'>
						<label className='text-[10px] font-medium uppercase tracking-widest text-stone-400'>Nombre Completo</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder='Ej: Pablo Roblero'
							className='w-full bg-transparent border-b border-stone-200 py-1.5 text-xs text-stone-900 placeholder-stone-300 focus:border-stone-950 focus:outline-none rounded-none transition-colors'
						/>
					</div>
					<div className='flex flex-col space-y-1.5'>
						<label className='text-[10px] font-medium uppercase tracking-widest text-stone-400'>Email Formal</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Ej: pablo@email.com'
							className='w-full bg-transparent border-b border-stone-200 py-1.5 text-xs text-stone-900 placeholder-stone-300 focus:border-stone-950 focus:outline-none rounded-none transition-colors'
						/>
					</div>
					<div className='flex flex-col space-y-1.5'>
						<label className='text-[10px] font-medium uppercase tracking-widest text-stone-400'>Teléfono</label>
						<input
							type='text'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder='Ej: +44 7123 456789'
							className='w-full bg-transparent border-b border-stone-200 py-1.5 text-xs text-stone-900 placeholder-stone-300 focus:border-stone-950 focus:outline-none rounded-none transition-colors'
						/>
					</div>
					<div className='flex flex-col space-y-1.5'>
						<label className='text-[10px] font-medium uppercase tracking-widest text-stone-400'>LinkedIn / Link</label>
						<input
							type='text'
							value={linkedin}
							onChange={(e) => setLinkedin(e.target.value)}
							placeholder='Ej: linkedin.com/in/user'
							className='w-full bg-transparent border-b border-stone-200 py-1.5 text-xs text-stone-900 placeholder-stone-300 focus:border-stone-950 focus:outline-none rounded-none transition-colors'
						/>
					</div>
				</div>
			</div>

			{/* SECCIÓN: Bloques de Redacción (Grid Maestro) */}
			{/* SUIZO: Ampliamos el gap a 10 para aumentar la tensión espacial del lienzo editorial */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
				<div className='flex flex-col space-y-3'>
					<label className='text-[11px] font-bold uppercase tracking-widest text-stone-950'>1. Currículum Base o Perfil Profesional</label>
					<textarea
						value={baseCV}
						onChange={(e) => setBaseCV(e.target.value)}
						placeholder='Pega tu historial académico o laboral aquí...'
						className='w-full h-80 p-4 text-xs border border-stone-200 focus:border-stone-950 focus:outline-none rounded-none resize-none bg-transparent font-mono leading-relaxed transition-colors'
					/>
				</div>
				<div className='flex flex-col space-y-3'>
					<label className='text-[11px] font-bold uppercase tracking-widest text-stone-950'>2. Requisitos de la Oferta Laboral</label>
					<textarea
						value={jobDescription}
						onChange={(e) => setJobDescription(e.target.value)}
						placeholder='Pega la descripción de cargo o el Job Description aquí...'
						className='w-full h-80 p-4 text-xs border border-stone-200 focus:border-stone-950 focus:outline-none rounded-none resize-none bg-transparent font-mono leading-relaxed transition-colors'
					/>
				</div>
			</div>

			{/* RENDERIZADO DE ERRORES */}
			{error && <div className='p-4 border border-red-200 bg-transparent text-xs font-medium text-red-600 tracking-wide rounded-none'>{error}</div>}

			{/* BOTÓN DE ACCIÓN PRINCIPAL */}
			{/* SUIZO: Caja negra sólida, tipografía expandida, cero curvas, transición reactiva inmediata */}
			<div className='pt-2'>
				<motion.button
					whileTap={{ scale: isLoading ? 1 : 0.99 }}
					type='submit'
					disabled={isLoading}
					className={`w-full py-4 font-bold text-xs uppercase tracking-widest transition-colors duration-150 border select-none rounded-none ${
						isLoading ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed' : 'bg-stone-950 border-stone-950 text-white hover:bg-stone-800 cursor-pointer'
					}`}>
					{isLoading ? 'Analizando y maquetando con IA...' : 'Optimizar CV para Filtros ATS'}
				</motion.button>
			</div>
		</form>
	);
}

export default DashboardForm;
