//
//  SampleActionTest.m
//  MFTemplate
//
//  Created by Movalys MDK.
//  Copyright (c) 2014 Sopra Consulting. All rights reserved.
//

#import <XCTest/XCTest.h>

#import "MFTestHelper.h"
#import "MViewModelCreator.h"


@interface SampleActionTest : XCTestCase

@end

@implementation SampleActionTest

+(void)setUp
{
    [[MFTestHelper getInstance] setUpOnce];
}

+ (void)tearDown
{
    [[MFTestHelper getInstance] tearDownOnce];
    [super tearDown];
}

- (void)testSaveAction
{
    id<MFContextProtocol> mfContext = [[MFTestHelper getInstance] createContext];
    @try {
        /*MENTITY *entity = [MENTITY MF_createMENTITYInContext: mfContext];
		//TODO: set values in entity
    
        MViewModelCreator *viewModelCreator = [[MFApplication getInstance] getBeanWithKey:BEAN_KEY_VIEW_MODEL_CREATOR];
        [viewModelCreator updateMVIEWMODEL:entity];
    
        entity = [[MFTestHelper getInstance] launchAction:@"SAVEACTION" withInParameter:nil andContext:mfContext];
        XCTAssertNotNil(entity, @"Result of save action must not be nil");
        XCTAssertTrue([entity.identifier intValue] < -1, @"Identifier of newly entity must be lower than -1");*/
    
    } @finally {
        [[MFTestHelper getInstance] rollbackContext: mfContext];
    }
}

@end
