package com.example.manage_device.service;

import com.example.manage_device.model.Device;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;


import java.io.ByteArrayInputStream;
import java.util.List;

@Service
public interface ExcelService {

  ByteArrayInputStream writeExcel(List<Device> deviceList);

  Workbook getWorkbook(String filePath);

  boolean writeHeader(Sheet sheet, int rowIndex);

  void writeData(Device log, Row row);

  CellStyle createStyleForHeader(Sheet sheet);

  boolean writeFooter(Sheet sheet, int rowIndex);

  boolean autoResizeColumn(Sheet sheet, int lastColumn);

  ByteArrayInputStream createOutput(Workbook workbook);
}
