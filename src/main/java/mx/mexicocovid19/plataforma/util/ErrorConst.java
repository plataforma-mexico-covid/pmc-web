package mx.mexicocovid19.plataforma.util;

public final class ErrorConst {
	
	/** La constante ERROR. */
	public static final String ERROR = "Error";

	/** La constante WARNING. */
	public static final String WARNING = "Warning";
	
	/**
	 * Esta variable realiza el salto de linea
	 */
	public static final String BREAK_LINE = "\n\n";
	
	/**
	 * Este contructor evita que sea instanciada la clase, ya que es una utileria de contantes.
	 */
	private ErrorConst() {
		throw new UnsupportedOperationException("No instanciar la clase");
	}
	
}