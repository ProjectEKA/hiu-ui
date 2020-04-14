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
		description = "To ensure that the code changes introduced are working as expected ."
				+ "This testing is a checkpoint to determine if testing for the build can proceed or not and also to make sure functionality breakdown";
		
		browser="chrome";
	}

	@Test
	public void loginPage() throws InterruptedException {
		
		new NCGHomepage(driver, test)
		.enterUsername()
		.enterPassword()
		.clickOnSignin();
	
		
		
		

	}

}
