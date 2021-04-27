package tests.webapptests.objects;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import tests.webapptests.wrappers.GenricWrappers;

public class NCGHomepageObjects extends GenricWrappers {

	@FindBy(id = "userName")
	public static WebElement usernameText;

	@FindBy(id = "password")
	public static WebElement passwordText;

	@FindBy(xpath = "//*[@id=\"app\"]/div/div/main/div[1]/form/button")
	public static WebElement signinButton;

}
