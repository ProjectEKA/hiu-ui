package tests.webapptests.utils;

import java.io.IOException;

import com.relevantcodes.extentreports.ExtentReports;
import com.relevantcodes.extentreports.ExtentTest;
import com.relevantcodes.extentreports.LogStatus;



public abstract class Reports {

	public String author, category;
	public static ExtentReports reports;
	public ExtentTest test;
	public String description,testCaseName;

	// totally 5 methods in Reports startReport , startTest , reportLog ,
	// endTest ,endReport

	public void startReport() {

		reports = new ExtentReports("./reports/index.html",false);
	}

	public void startTest(String testName, String description) {
		test = reports.startTest(testName, description);
		test.assignAuthor(author);
		test.assignCategory(category);

	}

	public void reportLog(String status, String details)  {
		
		long number=takeSnap();

		if (status.equalsIgnoreCase("pass")) {
			test.log(LogStatus.PASS, details,test.addScreenCapture(".././screenshot/" + number + ".png"));
		} else if (status.equalsIgnoreCase("fail")) {
			test.log(LogStatus.FAIL, details);
		}

	}

	public void endTest() {
		reports.endTest(test);
	}

	public void endReport() {
		reports.flush();
	}
	
	public abstract long takeSnap() ;

}
