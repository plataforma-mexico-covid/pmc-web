package mx.mexicocovid19.plataforma.model.exception;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;

@Data
public class DefaultErrorList implements Serializable {

	/**
	 * {@link long} serialVersionUID - variable para la serializacion de la clase
	 */
	private static final long serialVersionUID = 5303634808431522360L;

	/**
	 * List<{@link Notification}> lista de errores que se encontraron y seran expuestos en la respuesta del endpoint 
	 */
	private List<Notification> notifications = new ArrayList<>();

	/**
	 * Nueva instancia default error list.
	 *
	 * @param notification El objeto: notification
	 */
	public DefaultErrorList(Notification notification) {
		if (null == this.notifications || this.notifications.isEmpty()) {
			this.notifications = new ArrayList<>();
		}
		this.notifications.add(notification);
	}

	/**
	 * metodo: Agrega notificaciones a la lista de errores
	 *
	 * @param notification objeto: notification
	 */
	void add(Notification notification) {
		if (this.notifications == null || this.notifications.isEmpty()) {
			this.notifications = new ArrayList<>();
		}
		this.notifications.add(notification);
	}

	/**
	 * To json string.
	 *
	 * @return retorna: string
	 * @throws JsonProcessingException error: json processing exception
	 */
	String toJsonString() throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.writeValueAsString(this);
	}

}
