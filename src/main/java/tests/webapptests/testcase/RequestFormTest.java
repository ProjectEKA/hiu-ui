package tests.webapptests.testcase;

import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import tests.webapptests.pages.NCGHomepage;
import tests.webapptests.wrappers.ProjectWrappers;

public class RequestFormTest extends ProjectWrappers {

	@BeforeClass
	public void beforeClass() {

		author = "ThoughtWorks";
		category = "SANITY-TESTING";
		testCaseName = "NCG-Consent request form";
		description = "To check Functionality breakdown";
		browser = "chrome";
	}

	@Test
	public void sendRequest() throws InterruptedException {

		new NCGHomepage(driver, test).enterUsername().enterPassword().clickOnSignin().clickOnNewRequest().enterPatientName().clickOnSearch().selectOptions().submitRequest();

	}

}
