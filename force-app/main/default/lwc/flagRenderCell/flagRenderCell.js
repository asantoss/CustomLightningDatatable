import { getRelatedListRecordsBatch } from "lightning/uiRelatedListApi";
import { api, LightningElement, wire } from "lwc";

export default class FlagRenderCell extends LightningElement {
  @api recordId;
  _relatedRecords = [];

  get _fields() {
    return [this.objectApiName + ".Name"];
  }

  @wire(getRelatedListRecordsBatch, {
    parentRecordId: "$recordId",
    relatedListParameters: [
      {
        relatedListId: "Flags__r",
        pageSize: 10,
        sortBy: ["-CreatedDate"],
        where: "{ and: [{ isActive__c: { eq: true }}] }",
        fields: ["Flag__c.Name"]
      }
    ]
  })
  getRelatedRecordsBatch({ data }) {
    if (data) {
      this._relatedRecords = data.results;
      for (const result of data.results) {
        this._relatedRecords = result.result.records;
      }
      console.log("Flags", JSON.stringify(this._relatedRecords, null, 2));
    }
  }
}

/**
 * "params":{"parentRecordId":"a0t52000005ABgjAAG","listRecordsQuery":{"relatedListParameters":[{"relatedListId":"Flags__r","pageSize":10,"sortBy":["-Added_On__c"],"where":"{ and: [{ isActive__c: { eq: true }}] }","fields":["Flag__c.Id","Flag__c.Name","Flag__c.Id","Flag__c.Flag_Reason__c","Flag__c.Added_On__c"]}]}
 */

/**
 * 
 * 
 * r: 
37
aura.RelatedListUi.postRelatedListRecordsBatch: 
20
message: 
aura.context:  
{"mode":"PRODDEBUG","fwuid":"Vo_clYDmAijdWOzW3-3Mow","app":"one:one","loaded":{"APPLICATION@markup://one:one":"V7Bipm69QBBTAyFobLeeOA"},"dn":[],"globals":{"density":"VIEW_TWO","appContextId":"06m52000000QlipAAC"},"uad":true}
aura.pageURI: 
/lightning/n/SMB_Contractor
aura.token: 
eyJub25jZSI6IlBfVnliTl85M2twOC1QVDdlYWVTYnZxYy1MSk1QVUlLQjJXazZUYzItbThcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDNCMDAwMDAwOGFIdVwiLFwidlwiOlwiMDJHM0IwMDAwMDAwYUE5XCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2NzQxNzMxNzU3ODAsImV4cCI6MH0=..Yz-avJxD-RNfuw60dvBCRSQozU3PV4Xrvhgr7302f1s=
 * 
 * {"actions":[{"id":"1828;a","descriptor":"aura://RelatedListUiController/ACTION$postRelatedListRecordsBatch","callingDescriptor":"UNKNOWN","params":{"parentRecordId":"a0t52000005ABgjAAG","listRecordsQuery":{"relatedListParameters":[{"relatedListId":"Flags__r","pageSize":10,"sortBy":["-Added_On__c"],"where":"{ and: [{ isActive__c: { eq: true }}] }","fields":["Flag__c.Id","Flag__c.Name","Flag__c.Id","Flag__c.Flag_Reason__c","Flag__c.Added_On__c"]}]}}}]}

 */
