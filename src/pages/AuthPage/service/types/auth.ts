export type IApiLoginBody = {
  phone: string;
  password: string;
}

export type IApiLoginResData = {
  Id: string;
  Name: string;
  UserName__c: string;
  BirthDay__c: string;
  Email__c: string;
  Gender__c: boolean;
  Phone__c: string;
  token: string;
}