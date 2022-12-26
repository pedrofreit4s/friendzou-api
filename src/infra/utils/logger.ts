import { format } from "date-fns";

const logger = {
  log: (message: string) => {
    console.log(`[${format(new Date(), "HH:mm:ss")} INFO] - ${message}`);
  },
  err: (message: string) => {
    console.log(`[${format(new Date(), "HH:mm:ss")} ERROR] - ${message}`);
  },
  succ: (message: string) => {
    console.log(`[${format(new Date(), "HH:mm:ss")} SUCC] - ${message}`);
  },
};

export { logger };
