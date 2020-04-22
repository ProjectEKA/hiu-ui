package tests.webapptests.testcase;

import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import tests.webapptests.pages.NCGHomepage;
import tests.webapptests.wrappers.ProjectWrappers;

public class LoginTest extends ProjectWrappers {

	@BeforeClass
	public void beforeClass() {

		author = "ThoughtWorks";
		category = "SANITY-TESTING";
		testCaseName = "NCG-Consent request form";
		description = "To ensure functionality breakdown";
		browser = "chrome";
	}

	@Test
	public void loginUser() throws InterruptedException {

		new NCGHomepage(driver, test).enterUsername().enterPassword().clickOnSignin();

	}

}
