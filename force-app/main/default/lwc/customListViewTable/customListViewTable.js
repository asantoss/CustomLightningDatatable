import LightningDatatable from "lightning/datatable";
import flagCellMarkup from "./flagsCellMarkup.html";
import relatedFieldCellMarkup from "./relatedFieldCellMarkup.html";
import firstRelatedRecordMarkup from "./firstRelatedRecord.html";
export default class CustomListViewTable extends LightningDatatable {
  static customTypes = {
    flags: {
      template: flagCellMarkup,
      standardCellLayout: true,
      typeAttributes: ["relatedListId", "objectApiName", "filter"]
    },
    firstRelatedRecord: {
      template: firstRelatedRecordMarkup,
      standardCellLayout: true,
      typeAttributes: ["relatedListId", "objectApiName", "fieldName", "idField"]
    },
    relatedField: {
      template: relatedFieldCellMarkup,
      standardCellLayout: true,
      typeAttributes: ["type", "fieldName", "objectApiName"]
    }
  };
}
