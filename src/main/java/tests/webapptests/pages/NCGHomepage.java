package tests.webapptests.pages;

import org.openqa.selenium.remote.RemoteWebDriver;

import com.relevantcodes.extentreports.ExtentTest;

import tests.webapptests.wrappers.GenricWrappers;

public class NCGHomepage extends GenricWrappers{
	
	public NCGHomepage(RemoteWebDriver driver, ExtentTest test) {
		this.driver = driver;
		this.test = test;

	}
	
	public ConsentRequestPage clickOnNewRequest() throws InterruptedException {
		
		clickByXpath(obj.getProperty("HomePage.clickOnNewRequest"));
		return new ConsentRequestPage(driver, test);
		
	}
	
	

}
