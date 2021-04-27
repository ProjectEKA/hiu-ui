package tests.webapptests.pages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.relevantcodes.extentreports.ExtentTest;

import tests.webapptests.objects.NCGHomepageObjects;
import tests.webapptests.wrappers.GenricWrappers;

public class NCGHomepage extends NCGHomepageObjects {

	private WebDriverWait wait;

	public NCGHomepage(RemoteWebDriver driver, ExtentTest test) {
		this.driver = driver;
		this.test = test;
		wait = new WebDriverWait(driver, 15, 50);
		PageFactory.initElements(driver, this);

	}

	public NCGHomepage enterUsername() {

		checkVisibility(usernameText);
		usernameText.sendKeys(obj.getProperty("NCGHomepage.name"));

		return this;
	}

	public NCGHomepage enterPassword() {

		checkVisibility(passwordText);
		passwordText.sendKeys(obj.getProperty("NCGHomepage.password"));

		return this;
	}

	public ConsentRequestPage clickOnSignin() {

		checkVisibility(signinButton);
		signinButton.click();
		return new ConsentRequestPage(driver, test);

	}

}
