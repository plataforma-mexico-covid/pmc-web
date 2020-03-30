package mx.mexicocovid19.plataforma.service.helpers;

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
	
	private final static String[] GROSERIAS = { "PUT0", "PUTO", "PUTA", "PUT4", "PENDEJO", "PENDEJA", "P3NDEJ0",
			"P3NDEJA", "C4BR0N", "CABR0N", "CABRON", "CABRONA", "VERGA", "VERG4", "PUTA", "PINCHE", "PINCHES", "MAMES",
			"M4MES" };
	
	/**
	 * 
	 * Este metodo evalua si el texto contiene palabras soeces
	 * 
	 * @param texto {@link String} - Texto a evular.
	 * @return {@link boolean} - Resultado boleano, True si el texto tiene groserias, de lo contrario False  
	 */
	public static boolean evaluarTexto(String texto) { 
		
		
		Trie trie = Trie.builder().onlyWholeWords().addKeywords(GROSERIAS).build();
		
		Collection<Emit> emits = trie.parseText(texto.toUpperCase());
		
		/**
		 * Realiza la validacion de coincidencias de palabras soeces vs texto a evaluar.
		 */
		if ( emits.isEmpty() ) {
			return Boolean.FALSE;
		} else {
			return Boolean.TRUE;
		}
		
	}
	
}
