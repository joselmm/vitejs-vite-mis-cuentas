import { DateTime } from 'luxon';
import '../constants/luxon.config';
import generateId from '../constants/generateID';
import { setEmptyHour } from '../constants/time.functions';
import PAYMENT_STATUSES from '../constants/paymentStatuses.enum';

const defaultLastBillingDate = setEmptyHour(DateTime.now());

class Platform {
  constructor({
    id,
    platformName,
    withCredentials,
    active,
    clientId,
    email,
    password,
    emailPassword,
    paymentMethod,
    additionalInfo,
    lastBillingDate,
    nextBillingDate,
    price,
    parcialPayment,
    paymentStatus,
    usageTime,
    fullAccount,
    soldUsers,
  } = {}) {
    this.id = id || generateId(30);
    this.platformName = platformName || '';
    this.withCredentials =
      withCredentials !== undefined ? withCredentials : '1';
    this.active = active !== undefined ? active : '1';
    this.fullAccount = fullAccount !== undefined ? fullAccount : '0';
    this.clientId = clientId || '';
    this.email = email || '';
    this.password = password || '';
    this.emailPassword = emailPassword || '';
    this.lastBillingDate = lastBillingDate || defaultLastBillingDate.toString();

    this.usageTime = usageTime || 30;
    this.nextBillingDate =
      defaultLastBillingDate.plus({ days: this.usageTime }).toString() ||
      nextBillingDate;

    this.paymentMethod = paymentMethod || '';
    this.price = price || 0;
    this.paymentStatus = paymentStatus || '';
    this.parcialPayment = parcialPayment || 0;
    this.additionalInfo = additionalInfo || '';
    this.soldUsers = soldUsers || 0;
  }
}

export default Platform;
