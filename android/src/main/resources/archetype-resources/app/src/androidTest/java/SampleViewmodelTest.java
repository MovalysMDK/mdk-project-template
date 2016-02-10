package ${package};

import android.test.suitebuilder.annotation.SmallTest;

import com.adeuza.movalysfwk.mobile.mf4android.test.AbstractMFAndroidTestCase;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.context.ItfTransactionalContext;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.context.MContext;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.core.services.BeanLoader;

public class SampleViewmodelTest extends AbstractMFAndroidTestCase {

	@SmallTest
	public void testViewmodel() throws Exception {
		MContext oContext = createTransactionContext();
		try {
			oContext.beginTransaction();
			try {
				//TODO: Write your viewmodel test
				/*YOURDATALOADER oDataLoader = 
						BeanLoader.getInstance().getBean(YOURDATALOADER.class);
				assertNotNull(oDataLoader);
				oDataLoader.setItemId(1);
				oDataLoader.reload(oContext);
				YOURENTITY oEntity = oDataLoader.getData();
				assertNotNull(oEntity);*/
				
				/*ViewModelCreator oViewModelCreator = 
					(ViewModelCreator) BeanLoader.getInstance().getBeanByType("viewmodelcreator");
				assertNotNull(oViewModelCreator);
				YOURVIEWMODEL oViewModel = 
						oViewModelCreator.createOrUpdateYOURVIEWMODEL(oEntity, true);
				assertNotNull(oViewModel);*/
				
			} finally {
				((ItfTransactionalContext)oContext).getTransaction().rollback();
			}
		} finally {
			oContext.close();
		}
	}
}
