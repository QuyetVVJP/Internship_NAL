package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class ExcelServiceImpl implements ExcelService {

  public static final int COLUMN_INDEX_ID = 0;
  public static final int COLUMN_INDEX_DEVICE_NAME = 1;
  public static final int COLUMN_INDEX_STATUS = 2;
  public static final String FILE_NAME = "device.xlsx";
  private static CellStyle cellStyleFormatNumber = null;

  @Override
  public ByteArrayInputStream writeExcel(List<Device> logs) {
    boolean resultOfWriteHeader;
    boolean resultOfAutoResizeColumn;
    ByteArrayInputStream byteArrayInputStream = null;
    int rowIndex = 0;
    Workbook workbook;
    Sheet sheet;
    try {
      workbook = getWorkbook(FILE_NAME);
      if (workbook != null) {
        sheet = workbook.createSheet("Devices");
        resultOfWriteHeader = writeHeader(sheet, rowIndex);
        if (resultOfWriteHeader) {
          rowIndex++;
          for (Device log : logs) {
            Row row = sheet.createRow(rowIndex);
            writeData(log, row);
            rowIndex++;
          }
          int numberOfColumn = sheet.getRow(0).getPhysicalNumberOfCells();
          resultOfAutoResizeColumn = autoResizeColumn(sheet, numberOfColumn);
          if (resultOfAutoResizeColumn) {
            byteArrayInputStream = createOutput(workbook);
          }
        }
      }
    } catch (Exception ex) {
      throw new IllegalArgumentException(ex.getMessage());
    }
    return byteArrayInputStream;
  }

  @Override
  public Workbook getWorkbook(String filePath) {
    try {
      Workbook workbook = null;
      if (filePath.endsWith("xlsx")) {
        workbook = new XSSFWorkbook();
      } else if (filePath.endsWith("xls")) {
        workbook = new HSSFWorkbook();
      } else {
        throw new IllegalArgumentException("The specified file is not Excel file");
      }
      return workbook;
    } catch (Exception ex) {
      throw new IllegalArgumentException(ex.getMessage());
    }
  }

  @Override
  public boolean writeHeader(Sheet sheet, int rowIndex) {
    CellStyle cellStyle;
    Cell cell;
    Row row;
    try {
      cellStyle = createStyleForHeader(sheet);
      row = sheet.createRow(rowIndex);

      cell = row.createCell(COLUMN_INDEX_ID);
      cell.setCellStyle(cellStyle);
      cell.setCellValue("ID");

      cell = row.createCell(COLUMN_INDEX_DEVICE_NAME);
      cell.setCellStyle(cellStyle);
      cell.setCellValue("Tên thiết bị");


      cell = row.createCell(COLUMN_INDEX_STATUS);
      cell.setCellStyle(cellStyle);
      cell.setCellValue("Trạng thái");

      return true;
    } catch (Exception ex) {
      throw new IllegalArgumentException(ex.getMessage());
    }
  }


  @Override
  public void writeData(Device device, Row row) {
    Cell cell;
    try {
      if (cellStyleFormatNumber == null) {
        short format = (short) BuiltinFormats.getBuiltinFormat("#,##0");
        Workbook workbook = row.getSheet().getWorkbook();
        cellStyleFormatNumber = workbook.createCellStyle();
        cellStyleFormatNumber.setDataFormat(format);
      }


      cell = row.createCell(COLUMN_INDEX_ID);
      cell.setCellValue(device.getId());

      cell = row.createCell(COLUMN_INDEX_DEVICE_NAME);
      cell.setCellValue(device.getDevice_name());

      cell = row.createCell(COLUMN_INDEX_STATUS);
      cell.setCellValue(device.getStatus());


    } catch (Exception ex) {
      throw new IllegalArgumentException(ex.getMessage());
    }
  }

  @Override
  public CellStyle createStyleForHeader(Sheet sheet) {
    Font font;
    CellStyle cellStyle;
    try {
      font = sheet.getWorkbook().createFont();
      font.setFontName("Times New Roman");
      font.setBold(true);
      font.setFontHeightInPoints((short) 14);
      font.setColor(IndexedColors.WHITE.getIndex());

      cellStyle = sheet.getWorkbook().createCellStyle();
      cellStyle.setFont(font);
      cellStyle.setFillForegroundColor(IndexedColors.BLUE.getIndex());
      cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
      cellStyle.setBorderBottom(BorderStyle.THIN);
    } catch (Exception ex) {
      throw new IllegalArgumentException(ex.getMessage());
    }
    return cellStyle;
  }

  @Override
  public boolean writeFooter(Sheet sheet, int rowIndex) {
    return false;
  }

  @Override
  public boolean autoResizeColumn(Sheet sheet, int lastColumn) {
    try {
      for (int i = 0; i < lastColumn; i++) {
        sheet.autoSizeColumn(i);
      }
    } catch (Exception ex) {
      throw new IllegalArgumentException(ex.getMessage());
    }
    return true;
  }

  @Override
  public ByteArrayInputStream createOutput(Workbook workbook) {
    ByteArrayInputStream in;
    ByteArrayOutputStream out;
    try {
      out = new ByteArrayOutputStream();
      workbook.write(out);
      in = new ByteArrayInputStream(out.toByteArray());
    } catch (Exception ex) {
      throw new IllegalArgumentException(ex.getMessage());
    }
    return in;
  }
}
