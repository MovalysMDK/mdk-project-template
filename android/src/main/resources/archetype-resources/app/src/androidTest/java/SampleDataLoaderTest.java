package ${package};

import android.test.suitebuilder.annotation.SmallTest;

import com.adeuza.movalysfwk.mobile.mf4android.test.AbstractMFAndroidTestCase;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.context.ItfTransactionalContext;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.context.MContext;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.core.services.BeanLoader;

/**
 * @author lmichenaud
 *
 */
public class SampleDataLoaderTest extends AbstractMFAndroidTestCase {
	
	@SmallTest
	public void testDataLoaders() throws Exception {
		MContext oContext = createTransactionContext();
		try {
			oContext.beginTransaction();
			try {
				//TODO: Write your daoloader test
				/*YOURDATALOADER oDataLoader = 
						BeanLoader.getInstance().getBean(YOURDATALOADER.class);
				assertNotNull(oDataLoader);
				oDataLoader.setItemId(1);
				oDataLoader.reload(oContext);
				YOURENTITY oEntity = oDataLoader.getData();
				assertNotNull(oEntity);*/
			} finally {
				((ItfTransactionalContext)oContext).getTransaction().rollback();
			}
		} finally {
			oContext.close();
		}
	}
}
