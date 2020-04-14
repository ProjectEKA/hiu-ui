package tests.webapptests.pages;

import org.openqa.selenium.remote.RemoteWebDriver;

import com.relevantcodes.extentreports.ExtentTest;

import tests.webapptests.wrappers.GenricWrappers;

public class NCGHomepage extends GenricWrappers{
	
	public NCGHomepage(RemoteWebDriver driver, ExtentTest test) {
		this.driver = driver;
		this.test = test;

	}

	
	public NCGHomepage enterUsername() {
		
		enterById(obj.getProperty("NCGHomepage.enterUsername"), obj.getProperty("NCGHomepage.name"));
		return this;
	}
	
	
	public NCGHomepage enterPassword() {
		enterById(obj.getProperty("NCGHomepage.enterPassword"), obj.getProperty("NCGHomepage.password"));
		return this;
		
	}
	
	public ConsentRequestPage clickOnSignin() {
		
		clickByXpath(obj.getProperty("NCGHomepage.clickOnSignin"));
		
		return new ConsentRequestPage(driver, test);
		
	}

}
