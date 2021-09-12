package com.demo.health;

import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class HealthCheckApplication {
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
		Properties props = new Properties();
		props.load(HealthCheckApplication.class.getClassLoader().getSystemResourceAsStream("application.properties"));
		String addresses = props.getProperty("addresses.list");
		List<String> addressSplit = Arrays.asList(addresses.split(","));
		boolean allUp = false;
		while (!allUp) {
			allUp = checkStatus(addressSplit);
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

	private static boolean checkStatus(List<String> addressSplit) {
		boolean allUp = true;
		for (String address:addressSplit) {
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
