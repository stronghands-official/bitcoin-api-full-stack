'use strict';

const {

    utils: {
        stringify,
    }

} = require( '@bitcoin-api.io/common-private' );

const {
    constants: {
        exchangeEmailDeliveryResults: {
            snsNotificationTypes: {
                Delivery,
                Bounce,
                Complaint,
            },
            types: {
                success,
                block,
                review,
            },
        }
    }
} = require( '../../../../../exchangeUtils' );

const addEEDRToDatabase = require( './addEEDRToDatabase' );

const MAILBOX_FULL = 'MailboxFull';

const getBouncedEmailEEDRType = Object.freeze( ({

    bounceSubType,

}) => {

    if( bounceSubType === MAILBOX_FULL ) {

        return review;
    }

    return block;
});


module.exports = Object.freeze( async ({

    event,

}) => {

    console.log(
        
        'running handleCase - here is the event: ' +
        stringify( event )
    );

    const records = event.Records;

    for( const record of records ) {

        const snsMessageObject = JSON.parse( record.Sns.Message );

        const {
    
            notificationType
            
        } = snsMessageObject;

        const coreData = {

            messageId:  snsMessageObject.mail.messageId,
            sourceArn: snsMessageObject.mail.sourceArn,
            timestamp: snsMessageObject.mail.timestamp,             
        };
    
        if( notificationType === Delivery ) {

            const emailAddresses = (
                snsMessageObject.delivery.recipients.map(
                    ({ emailAddress }) => emailAddress
                )
            );

            await addEEDRToDatabase({

                emailAddresses,
                type: success,
                coreData,
            });
        }
        else if( notificationType === Bounce ) {
    
            const {

                bouncedRecipients,
                bounceType,
                bounceSubType,

            } = snsMessageObject.bounce;

            const emailAddresses = bouncedRecipients.map(
                ({ emailAddress }) => emailAddress
            );

            const type = getBouncedEmailEEDRType({

                bounceSubType,
            });
            
            Object.assign(

                coreData,
                {
                    bounceType,
                    bounceSubType,
                }
            );

            await addEEDRToDatabase({

                emailAddresses,
                type,
                coreData,
            });
        }
        else if( notificationType === Complaint ) {

            const {

                complainedRecipients,
                complaintFeedbackType = 'No complaint feedback type provided',

            } = snsMessageObject.complaint;
    
            const emailAddresses = complainedRecipients.map(
                ({ emailAddress }) => emailAddress
            );

            Object.assign(

                coreData,
                {
                    complaintFeedbackType,
                }
            );

            await addEEDRToDatabase({

                emailAddresses,
                type: review,
                coreData,
            });
        }
    }    

    console.log( 'handleCase executed successfully👩🏿‍💻👨🏻‍💻👩🏼‍💻👨🏾‍💻👏🏿👏🏽👏' );
});
