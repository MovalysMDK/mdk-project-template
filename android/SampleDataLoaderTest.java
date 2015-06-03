package ${package};

import android.support.test.runner.AndroidJUnit4;
import android.test.suitebuilder.annotation.LargeTest;

import com.adeuza.movalysfwk.mobile.mf4android.test.TestHelper;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.context.ItfTransactionalContext;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.context.MContext;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.core.services.BeanLoader;

import org.junit.Test;
import org.junit.runner.RunWith;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class SampleDataLoaderTest {
	
	@Test
	public void testDataLoaders() throws Exception {
		MContext oContext = TestHelper.createTransactionContext();
		try {
			oContext.beginTransaction();
			try {
				//TODO: Write your daoloader test
				/*YOURDATALOADER oDataLoader = 
						BeanLoader.getInstance().getBean(YOURDATALOADER.class);
				assertThat(oDataLoader, is(notNullValue()));
				oDataLoader.setItemId(1);
				oDataLoader.reload(oContext);
				YOURENTITY oEntity = oDataLoader.getData();
				assertThat(oEntity, is(notNullValue()));*/
			} finally {
				((ItfTransactionalContext)oContext).getTransaction().rollback();
			}
		} finally {
			oContext.close();
		}
	}
}
