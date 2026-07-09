// src/components/ApiKeyInput.jsx
import React, { useState, useEffect } from 'react';

// 🎯 LA REPARACIÓN: Agregamos "hasError = false" como parámetro con un valor por defecto seguro
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
		<div className='flex flex-col items-start md:items-end gap-1.5 w-full sm:w-auto'>
			<div className='flex items-center gap-2 w-full sm:w-64 relative'>
				<input
					type={showKey || isSystemKey ? 'text' : 'password'}
					value={isSystemKey ? 'SYSTEM KEY ACTIVE' : apiKey}
					onChange={handleChange}
					disabled={isSystemKey}
					placeholder={hasError ? 'API KEY REQUIRED...' : 'ENTER GEMINI API KEY...'}
					className={`w-full text-[10px] p-2 pr-8 border rounded-none bg-transparent font-mono tracking-wider focus:outline-none transition-all ${
						isSystemKey
							? 'border-emerald-600 border-l-4 border-l-emerald-600 bg-emerald-50/20 text-emerald-700 font-bold tracking-widest select-none'
							: !apiKey && hasError
								? 'border-red-600 border-l-4 border-l-red-600 bg-red-50/20 text-red-700 placeholder-red-400 font-bold'
								: apiKey
									? 'border-stone-950 focus:border-stone-950 text-stone-950'
									: 'border-stone-200 focus:border-stone-950 text-stone-950 placeholder-stone-300'
					}`}
				/>

				{!isSystemKey && apiKey && (
					<button
						type='button'
						onClick={() => setShowKey(!showKey)}
						className='absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-950 cursor-pointer text-[10px] font-bold tracking-tighter'>
						{showKey ? 'HIDE' : 'SHOW'}
					</button>
				)}
			</div>

			<a
				href='https://aistudio.google.com/'
				target='_blank'
				rel='noopener noreferrer'
				className='text-[9px] text-stone-400 hover:text-stone-950 underline underline-offset-2 uppercase tracking-widest font-medium transition-colors'>
				{isSystemKey ? 'Cargada vía .env.local' : 'Get API Key ↗'}
			</a>
		</div>
	);
}

export default ApiKeyInput;
