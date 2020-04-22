package tests.webapptests.pages;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotInteractableException;
import org.openqa.selenium.ElementNotVisibleException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.relevantcodes.extentreports.ExtentTest;

import tests.webapptests.objects.ConsentRequestPageObjects;
import tests.webapptests.wrappers.GenricWrappers;

public class ConsentRequestPage extends ConsentRequestPageObjects {

	private WebDriverWait wait;

	public ConsentRequestPage(RemoteWebDriver driver, ExtentTest test) {
		this.driver = driver;
		this.test = test;
		wait = new WebDriverWait(driver, 15, 50);
		PageFactory.initElements(driver, this);

	}

	public ConsentRequestPage clickOnNewRequest() throws InterruptedException {

		checkVisibility(clickOnRequest);
		clickOnRequest.click();

		return this;

	}

	public ConsentRequestPage enterPatientName() throws InterruptedException {

		checkVisibility(enterPatientName);
		enterPatientName.sendKeys(obj.getProperty("ConsentRequestPage.enterPatientName"));

		return this;

	}

	public ConsentRequestPage clickOnSearch() {

		checkVisibility(clickOnSearch);
		clickOnSearch.click();

		return this;

	}

	public ConsentRequestPage selectOptions() {

		checkVisibility(selectOption);
		selectOption.click();
		return this;
	}

	public ConsentRequestPage submitRequest() {

		checkVisibility(clickOnSubmitButton);
		clickOnSubmitButton.click();
		return this;

	}
}
