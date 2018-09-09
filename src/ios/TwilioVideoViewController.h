//
//  TwilioVideoViewController.h
//
//  Copyright © 2016-2017 Twilio, Inc. All rights reserved.
//

@import UIKit;

@interface TwilioVideoViewController : UIViewController

@property (nonatomic, strong) NSString *accessToken;
@property BOOL *isVideo;

- (void)connectToRoom:(NSString*)room asVideoCall:(BOOL) isVideo;

@end
