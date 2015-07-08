package ${package};

import com.adeuza.movalysfwk.mobile.mf4android.application.MFAndroidApplication;
import com.soprasteria.movalysmdk.widget.core.provider.MDKWidgetApplication;
import com.soprasteria.movalysmdk.widget.core.provider.MDKWidgetComponentProvider;
import com.soprasteria.movalysmdk.widget.core.provider.MDKWidgetSimpleComponentProvider;

/**
 * Custom application.
 *
 */
public class CustomApplication extends MFAndroidApplication implements MDKWidgetApplication {

	/**
	 * Component provider for mdk widget.
	 */
	private MDKWidgetSimpleComponentProvider mdkWidgetComponentProvider ;
	
	@Override
	public void onCreate() {
		super.onCreate();
		mdkWidgetComponentProvider = new MDKWidgetSimpleComponentProvider(this);
	}
	
	@Override
	public MDKWidgetComponentProvider getMDKWidgetComponentProvider() {
		return mdkWidgetComponentProvider;
	}
}
