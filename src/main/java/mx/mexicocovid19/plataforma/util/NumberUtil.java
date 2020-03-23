package mx.mexicocovid19.plataforma.util;

import java.math.BigDecimal;

public class NumberUtil {
    private static final int maxDecimal = 4;

    public static double formatThree(final double value) {
        return new BigDecimal(value)
                .setScale(maxDecimal, BigDecimal.ROUND_HALF_UP)
                .doubleValue();
    }
}
