package tests.webapptests.pages;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.relevantcodes.extentreports.ExtentTest;

import tests.webapptests.wrappers.GenricWrappers;

public class ConsentRequestPage extends GenricWrappers{

	
	public ConsentRequestPage(RemoteWebDriver driver, ExtentTest test) {
		this.driver = driver;
		this.test = test;

	}
	
	public ConsentRequestPage clickOnPatientName() {
		
		clickById(obj.getProperty("ConsentRequestPage.clickOnPatientName"));
		
		return this;
	}
	
	public ConsentRequestPage enterPatientName() throws InterruptedException {
		
		enterById(obj.getProperty("ConsentRequestPage.clickOnPatientName"), obj.getProperty("ConsentRequestPage.enterPatientName"));
		return this;
		
	}
	
	public ConsentRequestPage clickOnSearch() {
		
		clickByXpath(obj.getProperty("ConsentRequestPage.clickOnSearch"));
		return this;
	}
	
	public ConsentRequestPage clickOnPurpose() {
		clickByXpath(obj.getProperty("ConsentRequestPage.clickOnPurpose"));
		return this;
	}
	
	public ConsentRequestPage selectPurpose() {
		clickByXpath(obj.getProperty("ConsentRequestPage.selectPurpose"));
		return this;
	}
	
	public ConsentRequestPage clickOnHealthF() {
		clickByXpath(obj.getProperty("ConsentRequestPage.clickOnHealthF"));
		clickByXpath(obj.getProperty("ConsentRequestPage.clickOnHealthFF"));
		return this;
	}
	
	public ConsentRequestPage selectOptions() {
		 List<WebElement> els = driver.findElements(By.xpath(obj.getProperty("ConsentRequestPage.selectOptions")));
		 for ( WebElement el : els ) {
		     if ( !el.isSelected() ) {
		         el.click();
		     }
		 }
		return this;
	}
	
	public ConsentRequestPage clickOnExpiry() {
		clickByXpath(obj.getProperty("ConsentRequestPage.clickOnExpiryDate"));
		clickByXpath(obj.getProperty("ConsentRequestPage.clickOnExpiryTime"));
		clickByXpath(obj.getProperty("ConsentRequestPage.clickOnBody"));
		return this;
	}
	
	
	public ConsentRequestPage submitRequest() {
		clickByXpath(obj.getProperty("ConsentRequestPage.submitRequest"));
		return this;
	}
}
