import { getLogBuyResponse, getLogEventResponse } from "@/typings";

const mergeLogData = (
  logBuy: getLogBuyResponse,
  logEvent: getLogEventResponse
) => {
  const logBuyData = logBuy.data;
  const logEventData = logEvent.data;

  const mergedLog = [...logBuyData, ...logEventData];
  mergedLog.sort(
    (a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime()
  );
  return mergedLog
};
