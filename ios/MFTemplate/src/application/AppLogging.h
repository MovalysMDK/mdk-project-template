//
//  AppLogging.h
//  MFTemplate
//
//  Created by Movalys MDK.
//  Copyright (c) 2012 Sopra Group. All rights reserved.
//

#import "MFLogging.h"
#define APP_LOG_CONTEXT 3

#define AppLogError(frmt, ...)    SYNC_LOG_OBJC_MAYBE(ddLogLevel, LOG_FLAG_ERROR,   APP_LOG_CONTEXT, frmt, ##__VA_ARGS__)
#define AppLogWarn(frmt, ...)     SYNC_LOG_OBJC_MAYBE(ddLogLevel, LOG_FLAG_WARN,    APP_LOG_CONTEXT, frmt, ##__VA_ARGS__)
#define AppLogInfo(frmt, ...)     SYNC_LOG_OBJC_MAYBE(ddLogLevel, LOG_FLAG_INFO,    APP_LOG_CONTEXT, frmt, ##__VA_ARGS__)
#define AppLogVerbose(frmt, ...)  SYNC_LOG_OBJC_MAYBE(ddLogLevel, LOG_FLAG_VERBOSE, APP_LOG_CONTEXT, frmt, ##__VA_ARGS__)

