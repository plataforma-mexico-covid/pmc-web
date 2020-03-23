package mx.mexicocovid19.plataforma.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtil {
    public static String formatDTO(final LocalDateTime date){
        DateTimeFormatter df = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        return df.format(date);
    }

    public static LocalDateTime parseDTO(final String date){
        DateTimeFormatter df = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        return LocalDateTime.parse(date, df);
    }
}
