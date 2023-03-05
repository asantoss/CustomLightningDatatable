import {
  getFieldDisplayValue,
  getFieldValue,
  getRecord
} from "lightning/uiRecordApi";
import { api, LightningElement, wire } from "lwc";

export default class RelatedFieldCell extends LightningElement {
  @api fieldName = "";
  @api recordId;
  @api type;

  value = "";
  @wire(getRecord, {
    recordId: "$recordId",
    optionalFields: "$fieldName"
  })
  processResponse(res) {
    this._recordInfo = res;
    if (this.type) {
      this.value = getFieldDisplayValue(this._recordInfo.data, this.fieldName);
    } else {
      this.value = getFieldValue(this._recordInfo.data, this.fieldName);
    }
  }
}
