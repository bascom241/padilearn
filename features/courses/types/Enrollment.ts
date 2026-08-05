export interface InitializeEnrollmentResult {
  free: boolean;
  authorizationUrl?: string;
  accessCode?: string;
  reference?: string;
  enrollment?: unknown;
}

export interface EnrollmentStatus {
  enrolled: boolean;
}
