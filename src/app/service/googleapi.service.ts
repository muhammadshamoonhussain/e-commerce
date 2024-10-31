import { Injectable } from '@angular/core';
import { google, GoogleApis } from "googleapis";
@Injectable({
  providedIn: 'root'
})
export class GoogleapiService {

  private sheets: any;

  constructor() {
    const google = new GoogleApis();
    this.sheets = google.sheets('v4');
  }

  async appendData(spreadsheetId: string, range: string, values: any[]) {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'path/to/your/service-account-file.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const client = await auth.getClient();
    const request = {
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: 'RAW',
      resource: {
        values: [values],
      },
      auth: client,
    };

    try {
      const response = await this.sheets.spreadsheets.values.append(request);
      console.log('Data appended successfully:', response.data);
    } catch (error) {
      console.error('Error appending data:', error);
    }
  }
}
