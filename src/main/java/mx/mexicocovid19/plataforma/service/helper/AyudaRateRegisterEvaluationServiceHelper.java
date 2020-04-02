package mx.mexicocovid19.plataforma.service.helper;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

@Component
public class AyudaRateRegisterEvaluationServiceHelper implements InitializingBean {
	
	
    @Value("${plataforma.ayuda-service.hoursToWaitRegister}")
    private Integer hoursToWaitRegister;
    
    @Value("${plataforma.ayuda-service.registerAvailablePeruser}")
    private Integer registerAvailablePeruser;
    
    
    private LoadingCache<String, Integer> requestCountsPerUser;
    
    
	public boolean isMaximumRequestsPerHourExceeded(String user) {
		int requests = 0;
		try {
			requests = requestCountsPerUser.get(user);
			if (requests > registerAvailablePeruser) {
				return true;
			}
		} catch (ExecutionException e) {
			requests = 0;
		}
		requests ++;
		requestCountsPerUser.put(user, requests);
		return false;
	}


	@Override
	public void afterPropertiesSet() throws Exception {
		requestCountsPerUser = CacheBuilder.newBuilder().expireAfterWrite(hoursToWaitRegister, TimeUnit.MINUTES)
				
		.build(new CacheLoader<String, Integer>() {
			public Integer load(String key) {
				return 1;
			}
		});
	}
}
