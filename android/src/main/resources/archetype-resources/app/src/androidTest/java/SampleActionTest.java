package ${package};

import android.test.suitebuilder.annotation.SmallTest;

import com.adeuza.movalysfwk.mobile.mf4android.test.AbstractMFAndroidTestCase;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.action.ActionParameter;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.action.EntityActionParameterImpl;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.action.NullActionParameterImpl;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.business.doopenmap.AddressLocation;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.context.ItfTransactionalContext;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.context.MContext;
import com.adeuza.movalysfwk.mobile.mf4mjcommons.core.services.BeanLoader;

public class SampleActionTest extends AbstractMFAndroidTestCase {

	@SmallTest
	public void testSaveAction() throws Exception {
		MContext oContext = createTransactionContext();
		try {
			oContext.beginTransaction();
			try {

				/*
				
				// Create a new entity
				YOURENTITY oNewEntity = BeanLoader.getInstance().getBean(YOURENTITYFACTORY.class).createInstance();
				assertNotNull(oNewEntity);
				//TODO: fill your entities with values
				
				// Initialize viewmodel with the data of the entity
				ViewModelCreator oViewModelCreator = 
					(ViewModelCreator) BeanLoader.getInstance().getBeanByType("viewmodelcreator");
				assertNotNull(oViewModelCreator);
				YOURVIEWMODEL oViewModel = oViewModelCreator.createOrUpdateYOURVIEWMODEL(oNewEntity, true);
				assertNotNull(oViewModel);
				
				// Start the save action
				ActionParameter oOut = launchAction(YUORSAVEACTION.class, 
						new NullActionParameterImpl(), oContext);
				assertNotNull(oOut);
				EntityActionParameterImpl<YOURENTITY> param = (EntityActionParameterImpl<YOURENTITY>) oOut;
				YOURENTITY oSavedEntity = param.getEntity();
				assertTrue(oSavedEntity.getId() < -1 );

				*/

			} finally {
				((ItfTransactionalContext)oContext).getTransaction().rollback();
			}
		} finally {
			oContext.close();
		}
	}



}
