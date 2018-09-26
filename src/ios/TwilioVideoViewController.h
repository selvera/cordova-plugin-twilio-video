//
//  TwilioVideoViewController.h
//
//  Copyright © 2016-2017 Twilio, Inc. All rights reserved.
//

@import UIKit;
#import <Cordova/CDV.h>

@interface TwilioVideoViewController : UIViewController

@property (nonatomic, strong) NSString *user;
@property (nonatomic, strong) NSString *accessToken;
@property BOOL isVideo;
@property (nonatomic, strong) id<CDVCommandDelegate> commandDelegate;
@property (nonatomic, strong) NSString *successCallbackId;

- (void)connectToRoom:(NSString*)room asVideoCall:(BOOL) isVideo withUser:(NSString*)user;

@end
