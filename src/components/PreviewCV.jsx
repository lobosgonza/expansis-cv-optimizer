// src/components/PreviewCV.jsx
import React, { useState } from 'react';

function PreviewCV({ data }) {
	if (!data) return null;

	// 1. ESTADO DE EDICIÓN INTERACTIVO (Mantenemos tu lógica intacta)
	const [isEditing, setIsEditing] = useState(false);

	const isSingle = data.fitToSinglePage;
	const pageMargin = isSingle ? '12mm 15mm 12mm 15mm' : '18mm 20mm 18mm 20mm';
	const sectionSpacing = isSingle ? 'mb-4' : 'mb-8';
	const itemSpacing = isSingle ? 'space-y-3' : 'space-y-6';
	const textLeading = isSingle ? 'leading-tight' : 'leading-relaxed';

	const t = {
		es: {
			success: '✨ ¡CURRÍCULUM OPTIMIZADO CON ÉXITO!',
			subtitle: isEditing
				? '// MODO EDICIÓN ACTIVO: HAZ CLIC DIRECTAMENTE EN CUALQUIER TEXTO PARA CORREGIR.'
				: 'El archivo se guardará automáticamente con el formato oficial de fecha y nombre.',
			saveBtn: '🖨️ IMPRIMIR AS PDF',
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
      `}</style>

			{/* PANEL DE ACCIÓN SUPERIOR */}
			<div className='flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 border-2 border-stone-950 rounded-none shadow-none print:hidden'>
				<div className='text-left space-y-0.5'>
					<p className='text-xs font-black uppercase tracking-widest text-[#F1005E]'>{t.success}</p>
					<p className='text-[10px] font-mono text-stone-900 uppercase font-bold tracking-wide'>{t.subtitle}</p>
				</div>
				<div className='flex w-full sm:w-auto gap-3'>
					{/* BOTÓN EDITAR */}
					<button
						type='button'
						onClick={() => setIsEditing(!isEditing)}
						className={`flex-1 sm:flex-none font-black text-xs uppercase tracking-widest py-3 px-5 border-2 transition-colors cursor-pointer rounded-none ${
							isEditing ? 'bg-[#F1005E] border-stone-950 text-white' : 'bg-white border-stone-950 text-stone-950 hover:bg-stone-50'
						}`}>
						{t.editBtn}
					</button>

					{/* BOTÓN IMPRIMIR */}
					<button
						type='button'
						onClick={handlePrint}
						className='flex-1 sm:w-auto bg-stone-950 hover:bg-[#F1005E] text-white font-black text-xs uppercase tracking-widest py-3 px-6 border-2 border-stone-950 shadow-none transition-colors cursor-pointer rounded-none'>
						{t.saveBtn}
					</button>
				</div>
			</div>

			{/* HOJA DEL CURRÍCULUM */}
			<div
				className={`bg-white text-stone-950 max-w-[800px] mx-auto print:p-0 print:max-w-full ${
					isSingle ? 'print:text-[10.5px]' : 'print:text-[11px]'
				} ${isEditing ? 'border-2 border-dashed border-[#F1005E] p-6 bg-[#F1005E]/5' : ''}`}>
				{/* ENCABEZADO REGLAMENTARIO */}
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
						className='text-xs font-bold text-[#F1005E] uppercase tracking-widest mt-1.5 focus:bg-stone-100 focus:outline-none px-0.5 transition-colors'>
						{data.title}
					</h2>

					{/* Metadatos de contacto tipográficos */}
					<div className='flex flex-wrap gap-y-1 gap-x-4 text-xs font-bold text-stone-950 mt-4 print:text-[10px] tracking-widest font-mono uppercase'>
						{isSpecified(data.contact?.email) && (
							<span className='flex items-center gap-1'>
								<span className='text-[#F1005E] font-black select-none'>[E]</span>
								<span contentEditable={isEditing} suppressContentEditableWarning className='focus:bg-stone-100 focus:outline-none px-0.5'>
									{data.contact.email}
								</span>
							</span>
						)}
						{isSpecified(data.contact?.phone) && (
							<span className='flex items-center gap-1'>
								<span className='text-[#F1005E] font-black select-none'>[T]</span>
								<span contentEditable={isEditing} suppressContentEditableWarning className='focus:bg-stone-100 focus:outline-none px-0.5'>
									{data.contact.phone}
								</span>
							</span>
						)}
						{isSpecified(data.contact?.location) && (
							<span className='flex items-center gap-1'>
								<span className='text-[#F1005E] font-black select-none'>[L]</span>
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

				{/* SECCIÓN: PERFIL */}
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

				{/* SECCIÓN: HABILIDADES */}
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

				{/* SECCIÓN: EXPERIENCIA */}
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

				{/* SECCIÓN: EDUCACIÓN */}
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
											{edu.period}
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
