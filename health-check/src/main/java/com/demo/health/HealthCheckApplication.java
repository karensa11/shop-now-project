package com.demo.health;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class HealthCheckApplication {
	private static String[] addresses = new String[] {
			"http://localhost:8000/", "http://localhost:8100/", "http://localhost:8200/", "http://localhost:8300/"
	};
	static class Status {
		private String status;

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}
	}
	@SuppressWarnings("static-access")
	public static void main(String[] args) throws Exception{
		/*
		Properties props = new Properties();
		props.load(HealthCheckApplication.class.getClassLoader().getSystemResourceAsStream("application.properties"));
		String addresses = props.getProperty("addresses.list");
		*/
		boolean allUp = false;
		while (!allUp) {
			allUp = checkStatus();
			System.out.println("\n\n\n\n");
			if (!allUp) {
				Thread.sleep(10000);
			}
		}
		System.out.println();
		System.out.println("======================");
		System.out.println("UP!!!!!!!!!!!!!!!!!!!!");
		System.out.println("======================");
	}

	private static boolean checkStatus() {
		boolean allUp = true;
		for (String address:addresses) {
			try {
				ResponseEntity<Status> currencyExchangeData = new RestTemplate().getForEntity(address + "/actuator/health", Status.class);
				Status data = currencyExchangeData.getBody();
				System.out.println("status for address " + address + " --> " + data.status);
				if (!data.getStatus().equals("UP")) {
					System.out.println("address " + address + " IS NOT UP");
					allUp = false;
				}
			} catch (Exception e) {
				System.out.println("address " + address + " IS NOT UP");
				allUp = false;
			}
		}
		return allUp;
	}
}
