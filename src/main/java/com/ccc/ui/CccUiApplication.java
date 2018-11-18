package com.ccc.ui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableZuulProxy
@SpringBootApplication
public class CccUiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CccUiApplication.class, args);
		System.out.println("UI Application Started");
	}
}
