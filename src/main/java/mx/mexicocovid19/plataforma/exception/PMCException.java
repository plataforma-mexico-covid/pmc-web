package mx.mexicocovid19.plataforma.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import mx.mexicocovid19.plataforma.util.DateUtil;
import mx.mexicocovid19.plataforma.util.ErrorEnum;

@Data
@EqualsAndHashCode(callSuper=false)
public class PMCException extends Exception {

	private static final long serialVersionUID = -5530149417876733092L;
	
	/**
	 * {@link String} code - identificador de la excepcion 
	 */
	private final String code;

	/**
	 * {@link String} errorMessage - Mensaje del error 
	 */
	private final String errorMessage;

	/**
	 * {@link String} timeStamp - timestamp cuando se se genere la excepcion 
	 */
	private final String timeStamp;

	/**
	 * {@link String} classError - Clase que genere el error 
	 */
	private final String classError;

	/**
	 * {@link String} errorDescripcion - descripcion del error 
	 */
	private final String errorDescripcion;
	
	/**
	 * {@link ErrorEnum} errorEnum - variable que guarda el error
	 */
    private final ErrorEnum errorEnum;


	/**
	 * Nueva instancia de exception.
	 *
	 * @param errorEnum El objeto: error enum
	 * @param classError El objeto: class error
	 */
	public PMCException(final ErrorEnum errorEnum,final String classError) {
		super(errorEnum.getMessage());
		this.errorEnum = errorEnum;
		this.code = errorEnum.getCode();
		this.errorMessage = errorEnum.getMessage();
		this.timeStamp = DateUtil.getDateIso();
		this.classError = classError;
		this.errorDescripcion = errorEnum.getDescription();
	}
	
	/**
	 * Nueva instancia PMCException exception.
	 *
	 * @param errorEnum  the error enum
	 * @param classError the class error
	 * @param cause      the cause
	 */
	public PMCException(final ErrorEnum errorEnum,final  String classError,final Throwable cause) {
		super(errorEnum.getMessage());
		this.errorEnum = errorEnum;
		this.code = errorEnum.getCode();
		this.errorMessage = errorEnum.getMessage();
		this.timeStamp = DateUtil.getDateIso();
		this.classError = classError;
		this.errorDescripcion = errorEnum.getDescription();
		this.addSuppressed(cause);
	}

	/**
	 * Nueva instancia activation exception.
	 *
	 * @param errorEnum El objeto: error enum
	 * @param classError El objeto: class error
	 * @param errorIn El objeto: error in
	 */
	public PMCException(final ErrorEnum errorEnum,final  String classError,final String errorIn) {
		super(errorEnum.getMessage() + ": " + errorIn);
		this.errorEnum = errorEnum;
		this.code = errorEnum.getCode();
		this.errorMessage = errorEnum.getMessage() + ": " + errorIn;
		this.timeStamp = DateUtil.getDateIso();
		this.classError = classError;
		this.errorDescripcion = errorEnum.getDescription();
	}
	
	/**
	 * Nueva instancia PMCException exception.
	 *
	 * @param errorEnum  the error enum
	 * @param classError the class error
	 * @param errorIn    the error in
	 * @param cause      the cause
	 */
	public PMCException(final ErrorEnum errorEnum,final  String classError,final  String errorIn,final Throwable cause) {
		super(errorEnum.getMessage() + ": " + errorIn);
		this.errorEnum = errorEnum;
		this.code = errorEnum.getCode();
		this.errorMessage = errorEnum.getMessage() + ": " + errorIn;
		this.timeStamp = DateUtil.getDateIso();
		this.classError = classError;
		this.errorDescripcion = errorEnum.getDescription();
		this.addSuppressed(cause);
	}
	
}
