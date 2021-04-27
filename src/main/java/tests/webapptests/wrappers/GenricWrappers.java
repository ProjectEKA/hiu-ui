package tests.webapptests.wrappers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.ElementNotInteractableException;
import org.openqa.selenium.ElementNotVisibleException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.NotFoundException;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.SessionNotCreatedException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.ScreenshotException;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import tests.webapptests.utils.Reports;

public class GenricWrappers extends Reports implements wrappers {

	public static  RemoteWebDriver driver;

	public static WebDriverWait wait;
	public static Properties obj;
	
	/* ############################ Property file Method ############################## */

	public void loadObject() {

		obj = new Properties();
		try {
			obj.load(new FileInputStream("./src/test/java/application.properties"));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void unloadObject() {

		obj = null;
	}

	/* ############################ Take snapshot Methods ############################## */
	
	@Override
	public long takeSnap() {

		long snap = System.currentTimeMillis();
		TakesScreenshot ts = (TakesScreenshot) driver;
		File source = ts.getScreenshotAs(OutputType.FILE);
		try {
			FileUtils.copyFile(source, new File("./screenshot/" + snap + ".png"));
		} catch (IOException e) {
		
			e.printStackTrace();
		}catch (ScreenshotException e) {
			reportLog("fail", "error occured");
		} catch (NotFoundException e) {
			reportLog("fail", "error occured");
		
		} catch (WebDriverException e) {
			reportLog("fail", "error occured");
		} 

		return snap;
	}
	
	
	/* ############################ Launch Browser options method ############################## */
	
	public void invokeApp(String browser, String url) {

		try {
			if (browser.equalsIgnoreCase("chrome")) {
				System.setProperty("webdriver.chrome.driver", "./driver/chromedriver");
				driver = new ChromeDriver();
			} else if (browser.equalsIgnoreCase("firefox")) {
				System.setProperty("webdriver.gecko.driver", "./driver/geckodriver.exe");
				driver = new FirefoxDriver();
			} else if (browser.equalsIgnoreCase("ie")) {
				System.setProperty("webdriver.ie.driver", "./driver/IEDriverServer.exe");
				driver = new InternetExplorerDriver();
			}
			driver.manage().window().maximize();
			driver.get(url);
			
			reportLog("Pass","The browser: " + browser + " is launched with url: " + url + " successfully");
		
		
		} catch (SessionNotCreatedException e) {
			
			reportLog("The browser: " + browser + " is not launched due to session not created error","Fail");
		       
		} catch (WebDriverException e) {
			reportLog("The browser " + browser + " is not launched due to unknown error","Fail");
				} 
	}
	
	/* ############################ close browser Method ############################## */

	public void closeAllBrowsers() {
		try {
			driver.quit(); 
			reportLog("pass","All browsers has been closed successfully");
		} catch (SessionNotCreatedException e) {
			// TODO Auto-generated catch block
			reportLog("The sessionIDs not created","fail");
		} catch (NotFoundException e) {
			// TODO Auto-generated catch block
			reportLog("The browser is closed due to unknown reasons","fail" );
		
		} catch (WebDriverException e) {
			// TODO: handle exception
			reportLog("The browser is closed due to unknown reasons","fail");
		}

	}
	
	/* ############################ Common  Methods to click and enter in text box and buttons############################## */
	
	public void clickById(String id) {

		try {
			driver.findElementById(id).click();
			reportLog("Pass","The element with id " + id + " is clicked succesfully");
		}

		catch (NoSuchElementException e) {
			reportLog("The element with id " + id + " is not found in DOM","Fail");

		} catch (ElementClickInterceptedException e) {
			reportLog("The element with id " + id + " is not clicked intercepted in Application","Fail");

		} catch (ElementNotInteractableException e) {
			reportLog("The element with id " + id + " is not interactable in Application","Fail");
		} catch (StaleElementReferenceException e) {
			reportLog("The element with id " + id + " is not stable in Application","Fail");
		} catch (WebDriverException e) {
			reportLog("The element with id not found due to unkown error","Fail");
		}


	}

	public void clickByXpath(String xpath)  {

		try {
			driver.findElementByXPath(xpath).click();
			reportLog("pass","the  element for xapth " + xpath + " is clicked successfully");
		} catch (NoSuchElementException e) {
			reportLog("the element for xpath " + xpath + " is not found in the DOM","Fail");
		} catch (ElementClickInterceptedException e) {
			reportLog("the element for xpath " + xpath + " is not clickable in the Application","Fail");
		} catch (ElementNotInteractableException e) {
			reportLog("the element for xpath " + xpath + " is not interactable in the Application","Fail");
		} catch (WebDriverException e) {
			reportLog("the element for xpath " + xpath + " is not found due to unknown error","Fail");
		} catch (Exception e){
			System.out.println(" exception occured");
		}
	}

	public void enterById(String id, String data) {

		try {
			driver.findElementById(id).sendKeys(data);
			 reportLog("pass","The element with id " + id + " is entered with data " + data + "");
		} catch (NoSuchElementException e) {
			reportLog("The element with id " + id + " is not found in DOM","Fail");
		
		} catch (ElementNotVisibleException e) {
			// TODO: handle exception
			reportLog("The element with id " + id + " is not visible in Application","Fail");
		} catch (ElementNotInteractableException e) {
			// TODO: handle exception
			reportLog("The element with id " + id + " is not interactable in Application","Fail");
		} catch (StaleElementReferenceException e) {
			// TODO: handle exception
			reportLog("The element with id " + id + " is not stable","Fail");
		} catch (WebDriverException e) {
			// TODO: handle exception
			reportLog(
					"The element with id " + id + " is not entered with data " + data + " due to unknown error","Fail");
		} 
	}

	public void enterByXpath(String xpath, String data) {

		try {
			driver.findElementByXPath(xpath).sendKeys(data);
			reportLog("Pass","the element with xpath " + xpath + " is entered with the data "+data+"");
		} catch (NoSuchElementException e) {

			reportLog("the element with xapth " + xpath + " is not found in DOM","Fail");
		} catch (ElementNotVisibleException e) {
			reportLog("the element with xpath " + xpath + " is not visible in Application","Fail");
		} catch (ElementNotInteractableException e) {
			reportLog("the element with xpath " + xpath + " is not interactable in Application","Fail");
		} catch (StaleElementReferenceException e) {
			reportLog("the element with xpath " + xpath + " is not stable in Application","Fail");
		}

		catch (WebDriverException e) {
			reportLog("The element with id " + xpath + " is not entered with data " + data
					+ " due to unknown error","Fail");
		}
	}
	
	/* ############################ switch window Methods ############################## */

	public void switchLastWindow() {

		Set<String> allwindow = driver.getWindowHandles();

		for (String next : allwindow) {
			driver.switchTo().window(next);

		}
	}
	
	/* ############################ Static & page wait Methods ############################## */

	public void implicitTime() {

		try {
			driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public long threadWait(long time) throws InterruptedException {

		try {
			Thread.sleep(time);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return time;

	}

	
	/* ############################ Common wait Methods ############################## */

	public static void waitObjectAppearByHomeId(String idValue) {

			wait = new WebDriverWait(driver, 800);
			wait.until(ExpectedConditions.elementToBeClickable(By.id(idValue)));

		
	}

	public static void waitObjectAppearById(String idValue) {
		
			wait = new WebDriverWait(driver, 180);
			wait.until(ExpectedConditions.elementToBeClickable(By.id(idValue)));

		
	}

	public static void waitObjectAppearByIdAvailable(String idValue) {
		
			WebDriverWait wait = new WebDriverWait(driver, 30);
			wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(idValue)));

		
	}

	public static void waitObjectAppearByXpath(String xpathValue) {

			wait = new WebDriverWait(driver, 180);
			wait.until(ExpectedConditions.elementToBeClickable(By.xpath(xpathValue)));

		
	}
		
		public static void waitObjectAppearByXpathVisible(String xpathValue) {
		
				wait = new WebDriverWait(driver, 180);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(xpathValue)));
				

			
	
	
}
		
		/* ############################ check visibility method ############################## */
		
		//To check element is visible in the page or not
		
		public void checkVisibility(WebElement element) {
			wait = new WebDriverWait(driver, 15, 50);
			 wait.until(ExpectedConditions.visibilityOf(element));
		}
		
		
		
		
		
}



