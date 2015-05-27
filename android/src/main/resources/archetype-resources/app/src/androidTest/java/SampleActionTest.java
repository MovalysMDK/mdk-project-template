package ${package};

import android.support.test.runner.AndroidJUnit4;
import android.test.suitebuilder.annotation.LargeTest;

import com.adeuza.movalysfwk.mobile.mf4android.test.TestHelper;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.action.ActionParameter;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.action.EntityActionParameterImpl;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.action.NullActionParameterImpl;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.context.ItfTransactionalContext;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.context.MContext;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.core.services.BeanLoader;

import org.junit.Test;
import org.junit.runner.RunWith;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.hamcrest.Matchers.lessThan;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class SampleActionTest {

	@Test
	public void testSaveAction() throws Exception {
		MContext oContext = TestHelper.createTransactionContext();
		try {
			oContext.beginTransaction();
			try {

				/*
				// Create a new entity
				YOURENTITY oNewEntity = BeanLoader.getInstance().getBean(YOURENTITYFACTORY.class).createInstance();
				assertThat(oNewEntity, is(notNullValue()));
				//TODO: fill your entities with values
				
				// Initialize viewmodel with the data of the entity
				ViewModelCreator oViewModelCreator = 
					(ViewModelCreator) BeanLoader.getInstance().getBeanByType("viewmodelcreator");
				assertThat(oViewModelCreator, is(notNullValue()));
				YOURVIEWMODEL oViewModel = oViewModelCreator.createOrUpdateYOURVIEWMODEL(oNewEntity, true);
				assertThat(oViewModel, is(notNullValue()));
				
				// Start the save action
				ActionParameter oOut = TestHelper.launchAction(YUORSAVEACTION.class,
						new NullActionParameterImpl(), oContext);
				assertThat(oOut, is(notNullValue()));
				EntityActionParameterImpl<YOURENTITY> param = (EntityActionParameterImpl<YOURENTITY>) oOut;
				YOURENTITY oSavedEntity = param.getEntity();
				assertThat(oSavedEntity.getId(), is(lessThan(-1L)));
				*/

			} finally {
				((ItfTransactionalContext)oContext).getTransaction().rollback();
			}
		} finally {
			oContext.close();
		}
	}
}
