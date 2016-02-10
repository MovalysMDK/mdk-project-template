package ${package};

import android.test.suitebuilder.annotation.SmallTest;

import com.adeuza.movalysfwk.mobile.mf4android.test.AbstractMFAndroidTestCase;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.context.ItfTransactionalContext;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.context.MContext;

/**
 * @author lmichenaud
 *
 */
public class SampleDaoTest extends AbstractMFAndroidTestCase {

	/**
	 * @throws Exception
	 */
	@SmallTest
	public void test() throws Exception {
		MContext oContext = createTransactionContext();
		try {
			oContext.beginTransaction();
			try {
				//TODO: Write your dao test
				/*YOURDAO oDao = BeanLoader.getInstance().getBean(YOURDAO.class);
				assertNotNull(oDao);
				List<YOURENTITY> listEntities = oDao.getListYOURENTITY(oContext);
				assertNotNull(listEntities);
				assertFalse(listEntities.isEmpty());*/
			} finally {
				((ItfTransactionalContext)oContext).getTransaction().rollback();
			}
		} finally {
			oContext.close();
		}
	}
}
