package mx.mexicocovid19.plataforma.model.exception;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import mx.mexicocovid19.plataforma.util.ErrorEnum;
import mx.mexicocovid19.plataforma.util.Utils;


@Getter
@Setter
public class Notification implements Serializable {

	/**
	 * {@link long} serialVersionUID - variable para la serializacion de la clase
	 */
	private static final long serialVersionUID = 7072807556206216645L;

	/** variable: code. */
	private String code;

	/** variable: message. */
	private String message;

	/** variable: timestamp. */
	private String timestamp;

	/** La variable que contiene informacion con respecto a: level. */
	private String level;

	/**
	 * constructor de la clase.
	 *
	 * @param error objeto: error
	 */
	public Notification(ErrorEnum error) {
		super();
		this.code = error.getCode();
		this.message = error.getMessage();
		this.timestamp = Utils.getDateIso();
		this.level = error.getLevel();
	}

	/**
	 * constructor de la clase.
	 *
	 * @param code      objeto: code
	 * @param message   objeto: message
	 * @param level     the level
	 */
	public Notification(String code, String message, String level) {
		super();
		this.code = code;
		this.message = message;
		this.timestamp = Utils.getDateIso();
		this.level = level;
	}

}
