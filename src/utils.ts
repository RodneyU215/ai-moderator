export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type LogData = {
  [key: string]: any;
};

export function log(
  level: "INFO" | "ERROR",
  message: string,
  data: LogData = {},
  error?: Error
) {
  const logObject: LogData = {
    level,
    message,
    ...data,
    timestamp: new Date().toISOString(),
  };

  if (error) {
    logObject.error = {
      message: error.message,
      stack: error.stack,
    };
  }

  console.log(JSON.stringify(logObject, null, 2));
}
