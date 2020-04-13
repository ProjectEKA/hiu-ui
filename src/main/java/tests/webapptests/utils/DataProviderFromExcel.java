package tests.webapptests.utils;


import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class DataProviderFromExcel {

	
	public  static String[][] getData(String ExcelSheetName) throws IOException {

		String[][] testData;

		FileInputStream fis = new FileInputStream("./testData/"+ExcelSheetName+".xlsx");
		XSSFWorkbook wb = new XSSFWorkbook(fis);
		XSSFSheet sheet = wb.getSheetAt(0);
		// no: of rows
		int rowcount = sheet.getLastRowNum();
		System.out.println(rowcount);
		// no: of coloum
		int colcount = sheet.getRow(0).getLastCellNum();
		System.out.println(colcount);

		testData = new String[rowcount][colcount];

		for (int i = 1; i <= rowcount; i++) {
			XSSFRow row = sheet.getRow(i);
			for (int j = 0; j < colcount; j++) {
				String cellData = row.getCell(j).getStringCellValue();
				System.out.println("The value of i " + i + " and j " + j + " is " + cellData);
				testData[i - 1][j] = cellData;

			}

		}

		return testData;

	}

}
