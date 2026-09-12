export enum OrderCancelCode {
  NO_LONGER_NEEDED = 'no_longer_needed',
  WRONG_ADDRESS = 'wrong_address',
  CHANGE_ORDER = 'change_order',
  OTHER = 'other',

  OUT_OF_STOCK = 'out_of_stock',
  PENDING_TIMEOUT = 'pending_timeout',
  ADMIN_CANCELED = 'admin_canceled',
}
