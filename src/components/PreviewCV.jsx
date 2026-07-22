// src/components/PreviewCV.jsx
import React, { useState } from 'react';

function PreviewCV({ data }) {
	if (!data) return null;

	// 1. GLOBAL INTERACTIVE STATES
	const [isEditing, setIsEditing] = useState(false);
	const [brandColor, setBrandColor] = useState('#F1005E'); // 🎯 Color Picker State
	const [fontTheme, setFontTheme] = useState('geometric'); // 🎯 Typography Theme State

	const isSingle = data.fitToSinglePage;
	const pageMargin = isSingle ? '12mm 15mm 12mm 15mm' : '18mm 20mm 18mm 20mm';
	const sectionSpacing = isSingle ? 'mb-4' : 'mb-8';
	const itemSpacing = isSingle ? 'space-y-3' : 'space-y-6';
	const textLeading = isSingle ? 'leading-tight' : 'leading-relaxed';

	// Mapping the 3 distinct aesthetic typography themes
	const themeFonts = {
		geometric: "'Space Grotesk', sans-serif",
		modern: 'system-ui, -apple-system, sans-serif',
		editorial: 'Georgia, serif',
	};

	const t = {
		es: {
			success: '✨ ¡CURRÍCULUM OPTIMIZADO CON ÉXITO!',
			subtitle: isEditing
				? '// MODO EDICIÓN ACTIVO: HAZ CLIC DIRECTAMENTE EN CUALQUIER TEXTO PARA CORREGIR.'
				: 'El archivo se guardará automáticamente con el formato oficial de fecha y nombre.',
			saveBtn: '🖨️ PRINT AS PDF',
			editBtn: isEditing ? '🔒 LOCK CHANGES' : '✍️ EDIT TEXT',
			profile: 'Perfil Profesional',
			skills: 'Habilidades & Tecnologías',
			experience: 'Experiencia Profesional',
			education: 'Educación & Certificaciones',
		},
		en: {
			success: '✨ RESUME OPTIMIZED SUCCESSFULLY!',
			subtitle: isEditing ? '// EDIT MODE ACTIVE: CLICK ON ANY TEXT BELOW TO MAKE CORRECTIONS.' : 'The file will automatically save with the official date and name format.',
			saveBtn: '🖨️ SAVE AS PDF',
			editBtn: isEditing ? '🔒 LOCK CHANGES' : '✍️ EDIT TEXT',
			profile: 'Professional Summary',
			skills: 'Core Skills & Expertise',
			experience: 'Professional Experience',
			education: 'Education & Certifications',
		},
	}[data.language === 'en' ? 'en' : 'es'];

	const isSpecified = (text) => {
		if (!text) return false;
		const lower = text.toLowerCase();
		return !(lower.includes('no especificado') || lower.includes('no especificada') || lower.includes('sin nombre especificado'));
	};

	const handlePrint = () => {
		setIsEditing(false);

		const today = new Date().toISOString().split('T')[0];
		const cleanName = data.name
			? data.name
					.trim()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.replace(/\s+/g, '-')
			: 'CV';

		const originalTitle = document.title;
		document.title = `${today}-${cleanName}`;

		setTimeout(() => {
			window.print();
			document.title = originalTitle;
		}, 50);
	};

	return (
		<div className='space-y-8 print:space-y-0'>
			{/* DYNAMIC SCOPED ENGINE STYLE RULES */}
			<style>{`
				@page {
					size: letter;
					margin: ${pageMargin}; 
				}
				@media print {
					body {
						background-color: #ffffff;
						-webkit-print-color-adjust: exact;
					}
				}
				/* 🏁 Injecting layout overrides programmatically */
				.cv-sheet-target {
					font-family: ${themeFonts[fontTheme]} !important;
				}
				.brand-text-target {
					color: ${brandColor} !important;
				}
				.brand-bg-target {
					background-color: ${brandColor} !important;
				}
				.brand-border-target {
					border-color: ${brandColor} !important;
				}
			`}</style>

			{/* ACTION PANEL & ENGINE ENGINE CONTROLS */}
			<div className='flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 bg-white p-6 border-2 border-stone-950 rounded-none shadow-none print:hidden'>
				<div className='text-left space-y-2 flex-1'>
					<div>
						<p className='text-xs font-black uppercase tracking-widest brand-text-target'>{t.success}</p>
						<p className='text-[10px] font-mono text-stone-900 uppercase font-bold tracking-wide'>{t.subtitle}</p>
					</div>

					{/* 🏁 THEME CONFIGURATION CONTROL BAR */}
					<div className='flex flex-wrap items-center gap-4 pt-1'>
						{/* COLOR PICKER UNIT */}
						<div className='flex items-center gap-2 border-2 border-stone-950 p-1 bg-white h-9'>
							<span className='text-[10px] font-mono font-black pl-1 text-stone-950'>COLOR:</span>
							<input
								type='color'
								value={brandColor}
								onChange={(e) => setBrandColor(e.target.value)}
								className='w-6 h-full border border-stone-300 p-0 cursor-pointer bg-transparent rounded-none outline-none'
							/>
						</div>

						{/* TYPOGRAPHY THEME SELECTOR BLOCK */}
						<div className='flex items-center border-2 border-stone-950 p-0.5 bg-white h-9'>
							<span className='text-[10px] font-mono font-black px-2 text-stone-400 border-r border-stone-200'>FONTS:</span>
							<button
								type='button'
								onClick={() => setFontTheme('geometric')}
								className={`px-3 h-full text-[10px] font-black font-mono tracking-wider transition-colors cursor-pointer ${fontTheme === 'geometric' ? 'bg-stone-950 text-white' : 'text-stone-950 hover:bg-stone-100'}`}>
								GEOMETRIC
							</button>
							<button
								type='button'
								onClick={() => setFontTheme('modern')}
								className={`px-3 h-full text-[10px] font-black font-mono tracking-wider transition-colors cursor-pointer border-x border-stone-200 ${fontTheme === 'modern' ? 'bg-stone-950 text-white' : 'text-stone-950 hover:bg-stone-100'}`}>
								MODERN
							</button>
							<button
								type='button'
								onClick={() => setFontTheme('editorial')}
								className={`px-3 h-full text-[10px] font-black font-mono tracking-wider transition-colors cursor-pointer ${fontTheme === 'editorial' ? 'bg-stone-950 text-white' : 'text-stone-950 hover:bg-stone-100'}`}>
								SERIF
							</button>
						</div>
					</div>
				</div>

				{/* SYSTEM OPERATION CONTROLS */}
				<div className='flex flex-row gap-3 items-end justify-end self-center w-full lg:w-auto shrink-0'>
					{/* EDIT TEXT TOGGLE */}
					<button
						type='button'
						onClick={() => setIsEditing(!isEditing)}
						className={`font-black text-xs uppercase tracking-widest py-4 px-5 border-2 transition-colors cursor-pointer rounded-none h-12 flex items-center justify-center ${
							isEditing ? 'brand-bg-target border-stone-950 text-white' : 'bg-white border-stone-950 text-stone-950 hover:bg-stone-50'
						}`}
						style={isEditing ? { borderColor: '#1c1917' } : {}}>
						{t.editBtn}
					</button>

					{/* SYSTEM PRINT BUTTON */}
					<button
						type='button'
						onClick={handlePrint}
						className='bg-stone-950 text-white font-black text-xs uppercase tracking-widest py-4 px-6 border-2 border-stone-950 shadow-none transition-all cursor-pointer rounded-none h-12 flex items-center justify-center hover:opacity-90'>
						{t.saveBtn}
					</button>
				</div>
			</div>

			{/* CURRICULUM WORK SHEET FRAME */}
			<div
				className={`bg-white text-stone-950 max-w-[800px] mx-auto print:p-0 print:max-w-full cv-sheet-target transition-all ${
					isSingle ? 'print:text-[10.5px]' : 'print:text-[11px]'
				} ${isEditing ? 'border-2 border-dashed p-6 bg-stone-50 brand-border-target' : ''}`}>
				{/* COMPONENT HEADER BLOCK */}
				<header className={`border-b-4 border-stone-950 pb-4 ${isSingle ? 'mb-5' : 'mb-8'} text-left`}>
					<h1
						contentEditable={isEditing}
						suppressContentEditableWarning
						className='text-3xl font-black uppercase tracking-tighter text-stone-950 print:text-2xl focus:bg-stone-100 focus:outline-none px-0.5 transition-colors'>
						{data.name}
					</h1>
					<h2
						contentEditable={isEditing}
						suppressContentEditableWarning
						className='text-xs font-bold uppercase tracking-widest mt-1.5 focus:bg-stone-100 focus:outline-none px-0.5 transition-colors brand-text-target'>
						{data.title}
					</h2>

					{/* METADATA TRACK */}
					<div className='flex flex-wrap gap-y-1 gap-x-4 text-xs font-bold text-stone-950 mt-4 print:text-[10px] tracking-widest font-mono uppercase'>
						{isSpecified(data.contact?.email) && (
							<span className='flex items-center gap-1'>
								<span className='font-black select-none brand-text-target'>[E]</span>
								<span contentEditable={isEditing} suppressContentEditableWarning className='focus:bg-stone-100 focus:outline-none px-0.5'>
									{data.contact.email}
								</span>
							</span>
						)}
						{isSpecified(data.contact?.phone) && (
							<span className='flex items-center gap-1'>
								<span className='font-black select-none brand-text-target'>[T]</span>
								<span contentEditable={isEditing} suppressContentEditableWarning className='focus:bg-stone-100 focus:outline-none px-0.5'>
									{data.contact.phone}
								</span>
							</span>
						)}
						{isSpecified(data.contact?.location) && (
							<span className='flex items-center gap-1'>
								<span className='font-black select-none brand-text-target'>[L]</span>
								<span contentEditable={isEditing} suppressContentEditableWarning className='focus:bg-stone-100 focus:outline-none px-0.5'>
									{data.contact.location}
								</span>
							</span>
						)}
					</div>

					{data.contact?.links && data.contact.links.length > 0 && (
						<div className='flex flex-wrap gap-x-4 text-[10px] text-stone-500 font-mono mt-2.5 font-bold tracking-tight'>
							{data.contact.links.map((link, idx) => (
								<div key={idx} className="flex items-center gap-1.5 before:content-['//'] first:before:content-none before:text-stone-300">
									<span contentEditable={isEditing} suppressContentEditableWarning className='focus:bg-stone-100 focus:outline-none px-0.5'>
										{link}
									</span>
								</div>
							))}
						</div>
					)}
				</header>

				{/* SUMMARY SECTION */}
				{isSpecified(data.summary) && (
					<section className={sectionSpacing}>
						<h3 className='text-[11px] font-black uppercase tracking-widest border-b-2 border-stone-950 pb-1 mb-3 text-stone-950'>{t.profile}</h3>
						<p
							contentEditable={isEditing}
							suppressContentEditableWarning
							className={`text-xs text-stone-900 text-justify font-normal focus:bg-stone-100 focus:outline-none p-0.5 transition-colors ${textLeading} ${isSingle ? 'print:text-[10px]' : 'print:text-[11px]'}`}>
							{data.summary}
						</p>
					</section>
				)}

				{/* SKILLS SECTION */}
				{data.skills && data.skills.length > 0 && (
					<section className={sectionSpacing}>
						<h3 className='text-[11px] font-black uppercase tracking-widest border-b-2 border-stone-950 pb-1 mb-3 text-stone-950'>{t.skills}</h3>
						<div className={`flex flex-wrap gap-x-2 gap-y-1 text-xs font-bold text-stone-900 ${isSingle ? 'print:text-[10px]' : 'print:text-[11px]'}`}>
							{data.skills.map((skill, idx) => (
								<span
									key={idx}
									contentEditable={isEditing}
									suppressContentEditableWarning
									className='bg-stone-100 px-2 py-0.5 rounded-none font-mono text-[11px] border border-stone-300 focus:bg-stone-100 focus:outline-none print:bg-transparent print:border-none print:px-0 print:py-0 print:after:content-[",_"] last:print:after:content-none'>
									{skill}
								</span>
							))}
						</div>
					</section>
				)}

				{/* EXPERIENCE SECTION */}
				{data.experience && data.experience.length > 0 && (
					<section className={sectionSpacing}>
						<h3 className='text-[11px] font-black uppercase tracking-widest border-b-2 border-stone-950 pb-1 mb-3 text-stone-950'>{t.experience}</h3>
						<div className={itemSpacing}>
							{data.experience.map((exp, idx) => (
								<div key={idx} className='break-inside-avoid text-xs'>
									<div className='flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-stone-950'>
										<span className='text-xs font-black text-stone-950 flex flex-wrap gap-1'>
											<span contentEditable={isEditing} suppressContentEditableWarning className='focus:bg-stone-100 focus:outline-none px-0.5'>
												{exp.role}
											</span>
											{isSpecified(exp.company) && (
												<>
													<span className='font-normal text-stone-400 font-sans'>//</span>
													<span contentEditable={isEditing} suppressContentEditableWarning className='font-black text-stone-700 focus:bg-stone-100 focus:outline-none px-0.5'>
														{exp.company}
													</span>
												</>
											)}
										</span>
										{isSpecified(exp.period) && (
											<span
												contentEditable={isEditing}
												suppressContentEditableWarning
												className='text-[10.5px] font-mono font-bold text-stone-950 sm:text-right focus:bg-stone-100 focus:outline-none px-0.5'>
												{exp.period}
											</span>
										)}
									</div>

									{exp.highlights && exp.highlights.length > 0 && (
										<ul
											className={`list-disc list-outside ml-4 mt-1.5 text-stone-900 space-y-1 text-justify ${textLeading} ${isSingle ? 'print:text-[10px]' : 'print:text-[11px]'}`}>
											{exp.highlights.map((highlight, kdx) => (
												<li key={kdx} contentEditable={isEditing} suppressContentEditableWarning className='focus:bg-stone-100 focus:outline-none px-0.5 transition-colors'>
													{highlight}
												</li>
											))}
										</ul>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				{/* EDUCATION SECTION */}
				{data.education && data.education.length > 0 && (
					<section className='mb-0 break-inside-avoid'>
						<h3 className='text-[11px] font-black uppercase tracking-widest border-b-2 border-stone-950 pb-1 mb-3 text-stone-950'>{t.education}</h3>
						<div className='space-y-3'>
							{data.education.map((edu, idx) => (
								<div key={idx} className='flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-xs'>
									<span className='font-bold text-stone-950 text-xs flex flex-wrap gap-1'>
										<span contentEditable={isEditing} suppressContentEditableWarning className='focus:bg-stone-100 focus:outline-none px-0.5'>
											{edu.degree}
										</span>
										{isSpecified(edu.institution) && (
											<>
												<span className='font-normal text-stone-400'>—</span>
												<span contentEditable={isEditing} suppressContentEditableWarning className='font-bold text-stone-600 focus:bg-stone-100 focus:outline-none px-0.5'>
													{edu.institution}
												</span>
											</>
										)}
									</span>
									{isSpecified(edu.period) && (
										<span
											contentEditable={isEditing}
											suppressContentEditableWarning
											className='text-[10.5px] font-mono font-bold text-stone-950 sm:text-right focus:bg-stone-100 focus:outline-none px-0.5'>
											Sí {edu.period}
										</span>
									)}
								</div>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}

export default PreviewCV;
