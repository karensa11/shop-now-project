package com.demo.sanity.data;

public class RateGeneralDetails {

	private int averageRate;
	private RateDetails[] rates;
	public int getAverageRate() {
		return averageRate;
	}
	public RateDetails[] getRates() {
		return rates;
	}
	public void setAverageRate(int averageRate) {
		this.averageRate = averageRate;
	}
	public void setRates(RateDetails[] rates) {
		this.rates = rates;
	}
}