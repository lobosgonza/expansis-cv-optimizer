// src/components/DashboardForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { optimizeCVWithGemini } from '../services/geminiEngine';
import KineticVectorButton from './KineticVectorButton'; // 👈 Agrega esta línea

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
		setName('Alberto Aguilera Valadéz');
		setEmail('alberto.aguilera@gmail.com');
		setPhone('+44 7123 456789');
		setLinkedin('linkedin.com/in/alberto-aguilera-valadez');

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
			setError('⚠️ Please enter your Gemini API Key at the top to operate.');
			return;
		}
		if (baseCV.trim().length < 20 || jobDescription.trim().length < 20) {
			setError('⚠️ Both text blocks must contain sufficient information.');
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
		<form onSubmit={handleSubmit} className='bg-white wyman-border-concentric p-8 md:p-12 rounded-none space-y-10 my-6 mx-3'>
			{/* CONTROLES SUPERIORES */}
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b-2 border-stone-950 pb-6'>
				<button
					type='button'
					onClick={loadExample}
					className='text-[11px] font-black uppercase tracking-widest text-stone-950 hover:text-[#F1005E] underline underline-offset-4 cursor-pointer transition-colors'>
					LOAD CONFIG EXAMPLE
				</button>

				<div className='flex flex-wrap items-center gap-6'>
					<label className='flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest text-stone-950 cursor-pointer select-none'>
						<input
							type='checkbox'
							checked={fitToSinglePage}
							onChange={(e) => setFitToSinglePage(e.target.checked)}
							className='w-4 h-4 border-2 border-stone-950 rounded-none text-stone-950 focus:ring-0 accent-stone-950 cursor-pointer'
						/>
						FORCE 1 PAGE
					</label>

					<div className='flex items-center gap-3'>
						<span className='text-[11px] font-black uppercase tracking-widest text-stone-400'>LANG:</span>
						<div className='border-2 border-stone-950 p-0.5 flex bg-white rounded-none'>
							<button
								type='button'
								onClick={() => setLanguage('es')}
								className={`px-4 py-1.5 text-[10px] font-black tracking-widest uppercase transition-colors cursor-pointer rounded-none ${language === 'es' ? 'bg-[#F1005E] text-white' : 'text-stone-950 hover:bg-stone-100'}`}>
								ES
							</button>
							<button
								type='button'
								onClick={() => setLanguage('en')}
								className={`px-4 py-1.5 text-[10px] font-black tracking-widest uppercase transition-colors cursor-pointer rounded-none ${language === 'en' ? 'bg-[#F1005E] text-white' : 'text-stone-950 hover:bg-stone-100'}`}>
								EN
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* BLOQUE: Datos de Contacto */}
			<div className='border-b-2 border-stone-950 pb-8 space-y-6'>
				<h4 className='text-[11px] font-black uppercase tracking-widest text-stone-950 flex items-center gap-2'>
					<span className='text-[#F1005E]'>■</span> INPUT METADATA CONTROLS
				</h4>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
					<div className='flex flex-col space-y-2'>
						<label className='text-[10px] font-black uppercase tracking-widest text-stone-500'>Full Name</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder='Ej: Pablo Roblero'
							className='w-full bg-white border-2 border-stone-950 p-3 text-xs font-mono font-bold text-stone-900 placeholder-stone-300 focus:border-[#F1005E] focus:bg-[#F1005E]/5 focus:outline-none rounded-none transition-all'
						/>
					</div>
					<div className='flex flex-col space-y-2'>
						<label className='text-[10px] font-black uppercase tracking-widest text-stone-500'>Professional Email</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Ej: pablo@email.com'
							className='w-full bg-white border-2 border-stone-950 p-3 text-xs font-mono font-bold text-stone-900 placeholder-stone-300 focus:border-[#F1005E] focus:bg-[#F1005E]/5 focus:outline-none rounded-none transition-all'
						/>
					</div>
					<div className='flex flex-col space-y-2'>
						<label className='text-[10px] font-black uppercase tracking-widest text-stone-500'>Phone Number</label>
						<input
							type='text'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder='Ej: +44 7123 456789'
							className='w-full bg-white border-2 border-stone-950 p-3 text-xs font-mono font-bold text-stone-900 placeholder-stone-300 focus:border-[#F1005E] focus:bg-[#F1005E]/5 focus:outline-none rounded-none transition-all'
						/>
					</div>
					<div className='flex flex-col space-y-2'>
						<label className='text-[10px] font-black uppercase tracking-widest text-stone-500'>Link</label>
						<input
							type='text'
							value={linkedin}
							onChange={(e) => setLinkedin(e.target.value)}
							placeholder='Ej: linkedin.com/in/user'
							className='w-full bg-white border-2 border-stone-950 p-3 text-xs font-mono font-bold text-stone-900 placeholder-stone-300 focus:border-[#F1005E] focus:bg-[#F1005E]/5 focus:outline-none rounded-none transition-all'
						/>
					</div>
				</div>
			</div>

			{/* BLOQUES DE TEXTO MAESTROS */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
				<div className='flex flex-col space-y-3'>
					<label className='text-[11px] font-black uppercase tracking-widest text-stone-950'>[ 01 // TEXT SOURCE CURRICULUM ]</label>
					<textarea
						value={baseCV}
						onChange={(e) => setBaseCV(e.target.value)}
						placeholder='Pega tu historial académico o laboral aquí...'
						className='w-full h-80 p-4 text-xs border-2 border-stone-950 focus:border-[#F1005E] focus:outline-none rounded-none resize-none bg-white font-mono font-bold leading-relaxed transition-colors'
					/>
				</div>
				<div className='flex flex-col space-y-3'>
					<label className='text-[11px] font-black uppercase tracking-widest text-stone-950'>[ 02 // TARGET JOB DESCRIPTION ]</label>
					<textarea
						value={jobDescription}
						onChange={(e) => setJobDescription(e.target.value)}
						placeholder='Pega la descripción de cargo o el Job Description aquí...'
						className='w-full h-80 p-4 text-xs border-2 border-stone-950 focus:border-[#F1005E] focus:outline-none rounded-none resize-none bg-white font-mono font-bold leading-relaxed transition-colors'
					/>
				</div>
			</div>

			{error && <div className='p-4 border-2 border-red-600 bg-red-50 text-xs font-black uppercase tracking-widest text-red-600 rounded-none'>{error}</div>}

			<KineticVectorButton isLoading={isLoading} />
		</form>
	);
}

export default DashboardForm;
