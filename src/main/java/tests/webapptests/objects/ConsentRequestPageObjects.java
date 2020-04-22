package tests.webapptests.objects;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import tests.webapptests.wrappers.GenricWrappers;

public class ConsentRequestPageObjects extends GenricWrappers {

	@FindBy(id = "search-field")
	public static WebElement enterPatientName;

	@FindBy(xpath = "/html/body/div[1]/div/div/div/button/span[1]")
	public static WebElement clickOnRequest;

	@FindBy(xpath = "/html/body/div[3]/div[3]/div/form/div[1]/div[2]/div/div/button")
	public static WebElement clickOnSearch;

	@FindBy(xpath = "/html/body/div[3]/div[3]/div/form/div[5]/div[2]/div/fieldset/div/label[1]/span[1]")
	public static WebElement selectOption;

	@FindBy(xpath = "/html/body/div[3]/div[3]/div/form/div[7]/button")
	public static WebElement clickOnSubmitButton;

}
