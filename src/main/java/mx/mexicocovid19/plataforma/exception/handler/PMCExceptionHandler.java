package mx.mexicocovid19.plataforma.exception.handler;

import java.io.IOException;
import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import mx.mexicocovid19.plataforma.exception.PMCException;
import mx.mexicocovid19.plataforma.model.exception.DefaultErrorList;
import mx.mexicocovid19.plataforma.model.exception.Notification;
import mx.mexicocovid19.plataforma.util.ErrorEnum;

@ControllerAdvice
public class PMCExceptionHandler implements Serializable{
	

	private static final long serialVersionUID = -3903839705643975593L;

	/**
	 * Handle activation exception.
	 *
	 * @param ex El objeto: ex
	 * @return Objeto response entity
	 */
	@ExceptionHandler(PMCException.class)
	ResponseEntity<DefaultErrorList> handleActivationException(PMCException ex) {
		Notification notification = new Notification(ex.getCode(), ex.getMessage(), "ERROR");
		return new ResponseEntity<>(new DefaultErrorList(notification), HttpStatus.BAD_REQUEST);// prueba de codigo
	}


	/**
	 * Handle generic exception.
	 *
	 * @param ex El objeto: ex
	 * @return Objeto response entity
	 */
	@ExceptionHandler(Exception.class)
	ResponseEntity<DefaultErrorList> handleGenericException(Exception ex) {
		return new ResponseEntity<>(new DefaultErrorList(new Notification(ErrorEnum.ERR_GENERICO)),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}


	/**
	 * Esta funcion nos permitira gestionar todas las excepciones que se generen
	 * debido a un error de I/O
	 * 
	 * @param e       {@link IOException} excepcion generada
	 * @param request {@link HttpServletRequest} request donde se genero la
	 *                excepcion para verificar que no haya sido por un corte de cliente
	 * @return
	 */
	@ExceptionHandler(IOException.class)
	ResponseEntity<DefaultErrorList> handleIOException(IOException e, HttpServletRequest request) {
		/**
		 * Comparamos que el cliente haya cortado la conexion, si es el caso no
		 * devolvemos nada en caso contrario debemos devolver un Internal Error 500 por
		 * un error de IO
		 */
		if (StringUtils.containsIgnoreCase(ExceptionUtils.getRootCauseMessage(e), "Broken pipe")) { // (2)
			return null; // (2) socket is closed, cannot return any response
		} else {
			return new ResponseEntity<>(new DefaultErrorList(new Notification(ErrorEnum.ERR_GENERICO)),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}