import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Table, Canvas, Line, Txt } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.css']
})
export class GeneratePdfComponent implements OnInit {

  private pdf: PdfMakeWrapper;

  constructor() { }

  ngOnInit() {
    PdfMakeWrapper.setFonts(pdfFonts);
    this.pdf = new PdfMakeWrapper();
    const table = new Table([
      ['column 1', 'column 2'],
      ['column 1', 'column 2']
    ]).end;
    this.pdf.add(
      new Canvas([
        new Line([10, 10], [70, 10]).end
      ]).end
    );
    this.pdf.footer(new Canvas([
      new Line([10, 0], [70, 0]).end
    ]).end);
    this.pdf.create().download();
    // this.pdf.add('Hello World!');
    // this.pdf.create().download();
  }



}
