//
//  SampleEntityTest.m
//  MFTemplate
//
//  Created by Movalys MDK.
//  Copyright (c) 2014 Sopra Consulting. All rights reserved.
//

#import <XCTest/XCTest.h>

#import "MFTestHelper.h"

@interface SampleEntityTest : XCTestCase

@end

@implementation SampleEntityTest

+(void)setUp
{
    [[MFTestHelper getInstance] setUpOnce];
}

+ (void)tearDown
{
    [[MFTestHelper getInstance] tearDownOnce];
    [super tearDown];
}

- (void)testCreateEntity
{
    id<MFContextProtocol> mfContext = [[MFTestHelper getInstance] createContext];
    @try {
        /*MENTITY *entity = [MENTITY MF_createMENTITYInContext: mfContext];
        XCTAssertNotNil(entity, @"entity must not be null");
        XCTAssertEqual(entity.identifier, @-1,  @"identifier must be equals -1");*/
    }
    @finally {
        [[MFTestHelper getInstance] rollbackContext: mfContext];
    }
}

@end
