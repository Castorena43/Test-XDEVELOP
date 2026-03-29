export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  _meta: Meta;
}

interface Meta {
  powered_by: string;
  docs_url: string;
  upgrade_url: string;
  example_url: string;
  variant: string;
  message: string;
  cta: Cta;
  context: string;
}

interface Cta {
  label: string;
  url: string;
}

export interface VerifyResponse {
  token: string;
  id: string;
  createdAt: string;
}