import { getFieldDisplayValue, getFieldValue } from "lightning/uiRecordApi";
import { getRelatedListRecords } from "lightning/uiRelatedListApi";
import { api, LightningElement, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";

export default class FirstRelatedRecord extends NavigationMixin(
  LightningElement
) {
  @api recordId;
  @api relatedListId;
  @api fieldName;
  @api idField;
  @api objectApiName;
  _relatedRecords = [];
  value = "";
  id = "";
  recordPageUrl = "";
  get _field() {
    return [
      `${this.objectApiName}.${this.fieldName}`,
      `${this.objectApiName}.${this.idField}`
    ];
  }

  navigateToRecord() {}

  @wire(getRelatedListRecords, {
    parentRecordId: "$recordId",
    relatedListId: "$relatedListId",
    pageSize: 10,
    sortBy: ["CreatedDate"],
    optionalFields: "$_field"
  })
  getRelatedRecordsBatch({ data }) {
    if (data?.records?.length > 0) {
      if (this.idField) {
        this.id = this.value = getFieldValue(
          data.records[0],
          `${this.objectApiName}.${this.idField}`
        );
        this[NavigationMixin.GenerateUrl]({
          type: "standard__recordPage",
          attributes: {
            recordId: this.id,
            actionName: "view"
          }
        }).then((url) => {
          this.recordPageUrl = url;
        });
      }
      if (this.type) {
        this.value = getFieldDisplayValue(
          data.records[0],
          `${this.objectApiName}.${this.fieldName}`
        );
      } else {
        this.value = getFieldValue(
          data.records[0],
          `${this.objectApiName}.${this.fieldName}`
        );
      }
    }
  }
}
