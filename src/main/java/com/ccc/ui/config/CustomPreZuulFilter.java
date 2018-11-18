package com.ccc.ui.config;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.stereotype.Component;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

@PropertySources(value = {@PropertySource("classpath:application.properties")})
@Component
public class CustomPreZuulFilter extends ZuulFilter {

    @Value("${app.clientId}")
    private String clientId;

    @Value("${app.clientSecret}")
    private String clientSecret;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public Object run() {
        final RequestContext ctx = RequestContext.getCurrentContext();
        logger.info("in zuul filter " + ctx.getRequest().getRequestURI());
        byte[] encoded;
        try {
            String client = clientId + ":" + clientSecret;
            encoded = Base64.encode(client.getBytes("UTF-8"));
            ctx.addZuulRequestHeader("Authorization", "Basic " + new String(encoded));
            logger.info("pre filter");
            logger.info(ctx.getRequest().getHeader("Authorization"));

            final HttpServletRequest req = ctx.getRequest();
            if(req.getParameter("grant_type").equals("refresh_token")){
	            final String refreshToken = extractRefreshToken(req);
	            if (refreshToken != null) {
	                final Map<String, String[]> param = new HashMap<String, String[]>();
	                param.put("refresh_token", new String[]{refreshToken});
	                param.put("grant_type", new String[]{"refresh_token"});
	                ctx.setRequest(new CustomHttpServletRequest(req, param));
	            }
            }else {
            	  final Map<String, String[]> param = new HashMap<String, String[]>();
            	  param.put("grant_type", new String[]{"password"});
            	  ctx.setRequest(new CustomHttpServletRequest(req, param));
            }

        } catch (final UnsupportedEncodingException e) {
            logger.error("Error occured in pre filter", e);
        }

        //
        return null;
    }

    private String extractRefreshToken(HttpServletRequest req) {
        final Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (int i = 0; i < cookies.length; i++) {
                if (cookies[i].getName().equalsIgnoreCase("refreshToken")) {
                	return cookies[i].getValue();
                }
            }
        }
        return null;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public int filterOrder() {
        return -2;
    }

    @Override
    public String filterType() {
        return "pre";
    }

}
