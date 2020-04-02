package mx.mexicocovid19.plataforma.service.helper;

import java.util.Collection;

import org.ahocorasick.trie.Emit;
import org.ahocorasick.trie.Trie;

public final class GroseriasHelper {
	
	
	/**
	 * DEFAULT CONSTRUCTOR.
	 */
	private GroseriasHelper(){
		throw new UnsupportedOperationException("METHOD NOT AVAILABLE");
	}

	/** {@link String[] } GROSERIAS lista de groserias. */

	private final static String[] GROSERIAS = { "PUT0", "PUTO", "PUTOS", "PUT0S", "PUTA", "PUT4", "PENDEJO", "PENDEJA",
			"P3NDEJ0", "P3NDEJA", "PENDEJOS", "PENDEJAS", "PENDEJ0S", "PEND3J0S", "P3ND3J0S", "P3ND3JOS", "C4BR0N",
			"CABR0N", "CABRON", "CABRONA", "CABRONES", "CABRON3S", "VERGA", "VERG4", "PUTA", "PINCHE", "PINCHES",
			"MAMES", "M4MES", "MAMAR", "JOTOS", "JOTO", "JOTA", "J0T0", "PITO", "PIT0", "PINGA", "PALO", "PIJA",
			"PANOCHA", "MAMADAS", "CULOS", "CULO", "CUL0", "CUL0S", "MIERDA", "MIERD4", "M1ERDA" };
	
	/**
	 * 
	 * Este metodo evalua si el texto contiene palabras soeces
	 * 
	 * @param texto {@link String} - Texto a evular.
	 * @return {@link boolean} - Resultado boleano, True si el texto tiene groserias, de lo contrario False  
	 */
	public static boolean evaluarTexto(String texto) { 
		
		
		Trie trie = Trie.builder().ignoreCase().onlyWholeWords().addKeywords(GROSERIAS).build();
		
		Collection<Emit> emits = trie.parseText(texto.toUpperCase());
		
		/**
		 * Realiza la validacion de coincidencias de palabras soeces vs texto a evaluar.
		 */
		return !emits.isEmpty();
	}
	
}
