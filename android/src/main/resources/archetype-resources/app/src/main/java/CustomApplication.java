package ${package};

import com.adeuza.movalysfwk.mobile.mf4android.application.MFAndroidApplication;
import com.soprasteria.movalysmdk.widget.core.provider.MDKWidgetApplication;
import com.soprasteria.movalysmdk.widget.core.provider.MDKWidgetComponentActionHelper;
import com.soprasteria.movalysmdk.widget.core.provider.MDKWidgetComponentProvider;
import com.soprasteria.movalysmdk.widget.core.provider.MDKWidgetSimpleComponentActionHelper;
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
	
	/**
	 * Component action helper for mdk widget.
	 */
	private MDKWidgetSimpleComponentActionHelper mdkWidgetComponentActionHelper;
	
	@Override
	public void onCreate() {
		super.onCreate();
		mdkWidgetComponentProvider = new MDKWidgetSimpleComponentProvider(this);
		mdkWidgetComponentActionHelper = new MDKWidgetSimpleComponentActionHelper();
	}
	
	@Override
	public MDKWidgetComponentProvider getMDKWidgetComponentProvider() {
		return mdkWidgetComponentProvider;
	}

	@Override
	public MDKWidgetComponentActionHelper getMDKWidgetComponentActionHelper() {
		return mdkWidgetComponentActionHelper;
	}
}