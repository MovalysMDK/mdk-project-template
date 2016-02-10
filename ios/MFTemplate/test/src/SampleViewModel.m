//
//  SampleViewModel.m
//  MFTemplate
//
//  Created by Movalys MDK.
//  Copyright (c) 2014 Sopra Consulting. All rights reserved.
//

#import <XCTest/XCTest.h>

#import "MFTestHelper.h"
#import "MViewModelCreator.h"

@interface SampleViewModel : XCTestCase

@end

@implementation SampleViewModel

+(void)setUp
{
    [[MFTestHelper getInstance] setUpOnce];
}

+ (void)tearDown
{
    [[MFTestHelper getInstance] tearDownOnce];
    [super tearDown];
}

- (void)testFromIdentifiable
{
    id<MFContextProtocol> mfContext = [[MFTestHelper getInstance] createContext];
    @try {
        /*id<MFDataLoaderProtocol> dataLoader = [[MFBeanLoader getInstance] getBeanWithKey: @"MDATALOADER"];
        [dataLoader setDataIdentifiers:@[ @1]];
        [dataLoader setLoadingOptions:nil];
    
        [dataLoader reload:mfContext];
        MENTITY *entity = [dataLoader getLoadedData:mfContext];
        XCTAssertNotNil(entity, @"entity must not be null");
        XCTAssertEqual(entity.identifier, @1, @"entity.identifier must be to 1");
    
        MViewModelCreator *viewModelCreator = [[MFApplication getInstance] getBeanWithKey:BEAN_KEY_VIEW_MODEL_CREATOR];
        MVIEWMODEL *vm = [viewModelCreator updateMVIEWMODEL:entity];
        XCTAssertNotNil(vm, @"vm must not be null");
        XCTAssertEqual(vm.id_identifier, @1, @"vm.identifier must be to 1");*/
    
    }
    @finally {
        [[MFTestHelper getInstance] rollbackContext: mfContext];
    }
    
}

@end
