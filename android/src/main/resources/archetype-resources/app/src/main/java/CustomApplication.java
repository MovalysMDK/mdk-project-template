package ${package};

import org.acra.ReportField;
import org.acra.ReportingInteractionMode;
import org.acra.annotation.ReportsCrashes;

import com.adeuza.movalysfwk.mobile.mf4android.crashreport.MCrashReportHandler;
import com.adeuza.movalysfwk.mobile.mf4android.application.MFAndroidApplication;

import ${package}.R;

@ReportsCrashes(
//mode = ReportingInteractionMode.NOTIFICATION,
mode = ReportingInteractionMode.TOAST,
resToastText = R.string.crash_toast_text, // optional, displayed as soon as the crash occurs, before collecting data which can take a few seconds
customReportContent = { ReportField.APP_VERSION_NAME, ReportField.APP_VERSION_CODE,
	ReportField.ANDROID_VERSION, 
	ReportField.PHONE_MODEL, 
	ReportField.TOTAL_MEM_SIZE,
	ReportField.AVAILABLE_MEM_SIZE,
	ReportField.BRAND,
	ReportField.DEVICE_ID,
	ReportField.DEVICE_FEATURES,
	ReportField.DISPLAY,
	ReportField.CUSTOM_DATA, 
	ReportField.STACK_TRACE, 
	ReportField.LOGCAT },  

resNotifTickerText = R.string.crash_notif_ticker_text,
resNotifTitle = R.string.crash_notif_title,
resNotifText = R.string.crash_notif_text,
resNotifIcon = android.R.drawable.stat_notify_error, // optional. default is a warning sign
resDialogText = R.string.crash_dialog_text,
resDialogIcon = android.R.drawable.ic_dialog_info, //optional. default is a warning sign
resDialogTitle = R.string.crash_dialog_title, // optional. default is your application name
resDialogCommentPrompt = R.string.crash_dialog_comment_prompt, // optional. when defined, adds a user text field input with this text resource as a label
resDialogOkToast = R.string.crash_dialog_ok_toast, // optional. displays a Toast message when the user accepts to send a report.
forceCloseDialogAfterToast=true 
)
public class CustomApplication extends MFAndroidApplication {

	@Override
	public void onCreate() {
		MCrashReportHandler.initialize(this);
		super.onCreate();
	}
}
