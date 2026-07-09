// src/components/ApiKeyInput.jsx
import React, { useState, useEffect } from 'react';

// 🏁 MÉXICO 68: Mantenemos tu corrección estructural pero con empaque de alta tensión gráfica
function ApiKeyInput({ apiKey, setApiKey, hasError = false }) {
	const [showKey, setShowKey] = useState(false);

	// Detectamos si la clave actual fue inyectada por el archivo .env
	const isSystemKey = import.meta.env.VITE_GEMINI_API_KEY === apiKey;

	useEffect(() => {
		if (!import.meta.env.VITE_GEMINI_API_KEY) {
			const savedKey = localStorage.getItem('expansis_gemini_key');
			if (savedKey) setApiKey(savedKey);
		}
	}, [setApiKey]);

	const handleChange = (e) => {
		if (isSystemKey) return;
		const value = e.target.value.trim();
		setApiKey(value);
		if (value) {
			localStorage.setItem('expansis_gemini_key', value);
		} else {
			localStorage.removeItem('expansis_gemini_key');
		}
	};

	return (
		<div className='flex flex-col items-center md:items-end gap-2 w-full sm:w-auto'>
			<div className='flex items-center gap-2 w-full sm:w-64 relative'>
				<input
					type={showKey || isSystemKey ? 'text' : 'password'}
					value={isSystemKey ? 'SYSTEM KEY ACTIVE' : apiKey}
					onChange={handleChange}
					disabled={isSystemKey}
					placeholder={hasError ? 'API KEY REQUIRED...' : 'ENTER GEMINI API KEY...'}
					// 🎨 COLOR FUNCIONAL OLÍMPICO: Marcos duros de 2px, Rosa Mexicano para éxito y Rojo Puro para alertas
					className={`w-full text-[10px] p-2.5 pr-14 border-2 rounded-none bg-white font-mono font-bold tracking-widest focus:outline-none transition-all ${
						isSystemKey
							? 'border-[#529346] border-l-4 border-l-[#529346] bg-[#529346]/5 text-[#529346] select-none'
							: !apiKey && hasError
								? 'border-red-600 border-l-4 border-l-red-600 bg-red-50 text-red-600 placeholder-red-400 font-black'
								: apiKey
									? 'border-stone-950 focus:border-[#F1005E] text-stone-950'
									: 'border-stone-950 focus:border-[#529346] text-stone-950 placeholder-stone-300'
					}`}
				/>

				{!isSystemKey && apiKey && (
					<button
						type='button'
						onClick={() => setShowKey(!showKey)}
						className='absolute right-3 top-1/2 -translate-y-1/2 text-stone-950 hover:text-[#F1005E] cursor-pointer text-[9px] font-black tracking-widest border-l border-stone-200 pl-2'>
						{showKey ? 'HIDE' : 'SHOW'}
					</button>
				)}
			</div>

			<a
				href='https://aistudio.google.com/'
				target='_blank'
				rel='noopener noreferrer'
				className='text-[9px] text-stone-950 hover:text-[#F1005E] font-black uppercase tracking-widest border-b-2 border-stone-950 hover:border-[#F1005E] transition-colors'>
				{isSystemKey ? '// AUTH VIA ENV' : 'GET API KEY NOW ↗'}
			</a>
		</div>
	);
}

export default ApiKeyInput;
