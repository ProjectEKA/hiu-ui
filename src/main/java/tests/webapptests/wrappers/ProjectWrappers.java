package tests.webapptests.wrappers;

import java.io.IOException;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.DataProvider;

import tests.webapptests.utils.DataProviderFromExcel;

public class ProjectWrappers extends GenricWrappers {

	// contains 8 testng methods
	public String excelSheetName,description;
	public String browser;

	@BeforeSuite
	public void beforeSuit() {
		startReport();

	}

	@BeforeTest
	public void beforeTest() {
		loadObject();
	}

	@BeforeMethod
	public void beforeMethod() {

		startTest(testCaseName, description);
		invokeApp(browser, "https://ncg-dev.projecteka.in/hiu");
	}

	@AfterMethod
	public void afterMethod() {

		driver.close();
	}

	@AfterClass
	public void afterClass() {
		endTest();
	}

	@AfterTest
	public void afterTest() {

		unloadObject();
	}

	@AfterSuite
	public void afterSuit() {
		endReport();
	}

	@DataProvider(name = "fetchData")
	public String[][] fetchData() throws IOException {
		return DataProviderFromExcel.getData(excelSheetName);

	}

}
