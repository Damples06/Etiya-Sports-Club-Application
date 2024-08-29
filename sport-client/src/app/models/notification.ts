export interface Notification {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  background: string;
  duration: number;
}
