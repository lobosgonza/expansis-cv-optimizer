import React from 'react';

function KineticTextButton({ isLoading }) {
	// Forzamos el texto estático para la prueba con hover
	const textoBoton = isLoading ? 'OPTIMIZING...' : 'OPTIMIZE CV';

	return (
		<button
			type='submit'
			disabled={isLoading}
			className={`relative w-full p-3 border-2 border-stone-950 font-monoton md:text-5xl text-xl tracking-widest transition-all duration-200 cursor-pointer
				${isLoading ? 'bg-stone-950 text-white animate-strobo-loop' : 'bg-stone-950 text-white hover:text-[#F1005E] active:scale-[0.99]'}`}>
			{textoBoton}
		</button>
	);
}

export default KineticTextButton;
