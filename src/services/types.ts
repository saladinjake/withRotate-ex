
export type UserDataType = {
  user_id: string;
  email: string;
  name: string;
  picture: any;
  email_verified: boolean;
  user_metadata: {
    role: number;
    org: any;
  };
  last_login: any;
  given_name: string | null;
  family_name: string | null;
  blocked: boolean;
};

export type CompanyInfoDataType = {
  org_id: string;
  main_domain: string;
  unique_name: string;
  display_name: string;
  parent_org: null;
  organization_state: string;
  organization_type: string;
  onboarding_type: string;
  created_time: string;
  last_updated: string;
  _id: string;
   onboarding_data: {
    activeStep: number;
    complete: boolean;
    consented: boolean;
    form: any[];
  };
  profile: {
    company_logo: string;
    contact_name: string;
    contact_email: string;
    industry: string;
  };
  information: {
    name: string;
    sector: null;
    employees: null;
    revenues: null;
  };
  children: any[];
  domains: any[];
  lifecycle_events: any[];
};

export type UpdateProfileDataType = {
  company_name: string;
  contact_name: string;
  contact_email: string;
  industry: string;
  company_logo_b64: string;
};
