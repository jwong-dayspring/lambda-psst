from __future__ import print_function

import json
import boto3
import os
import uuid

from botocore.exceptions import ClientError

baseUrl = os.getenv("BASE_URL")

# Get the service resource.
dynamodb = boto3.resource('dynamodb')

print("Using table: "+os.getenv("TABLE_NAME"))
table = dynamodb.Table(os.getenv("TABLE_NAME"))
print(table.creation_date_time)

print('Loading function')


def get(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    print("value1 = " + event['resource'])
    print("value2 = " + event['pathParameters']['resourceId'])

    response = table.get_item(
        Key={
            'id': event['pathParameters']['resourceId']
        }
    )
    item = response['Item']
    print(item)
    
    return {
        'statusCode': 200,
        'body': json.dumps(item),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' 
        },
    }

def post(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    print("value1 = " + event['resource'])

    body = json.loads(event['body'])
    print(body)

    itemUuid = uuid.uuid4().hex
    print ("uuid = " + itemUuid)

    table.put_item(
        Item={
            'id': itemUuid,
            'content': body['content'],
            'senderName': body['senderName'],
            'senderEmail': body['senderEmail'],
            'recipientName': body['recipientName'],
            'recipientEmail': body['recipientEmail'],
        }
    )

    sendEmail(body['recipientName'], body['recipientEmail'], body['senderName'], '', itemUuid)

    return {
        'statusCode': 200,
        'body': json.dumps({'uuid':itemUuid}),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }
    
def delete(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    print("value1 = " + event['resource'])
    print("value2 = " + event['pathParameters']['resourceId'])

    response = table.delete_item(
        Key={
            'id': event['pathParameters']['resourceId']
        }
    )
    print(response)
    
    return {
        'statusCode': response['ResponseMetadata']['HTTPStatusCode'],
        'headers': {
            'Access-Control-Allow-Origin': '*'
        }
    }    
    

def sendEmail(recipientName, recipientEmail, senderName, senderEmail, itemUuid):
    SUBJECT = "Psst, %s, %s sent you a secret" % (recipientName, senderName )

    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = ("Psst, %s,\n"
                "%s is sending you a secret.\n"
                "Go to %s/#/message/%s to read your secret.") % ( recipientName, senderName, baseUrl, itemUuid )
                
    # The HTML body of the email.
    BODY_HTML = """<html>
    <head></head>
    <body>
    <h1>Psst, %s,</h1>
    <p>%s is sending you a secret. Read your secret at
        <a href='%s/#/message/%s'>%s/#/message/%s</a></a>.</p>
    </body>
    </html>""" % ( recipientName, senderName, baseUrl, itemUuid, baseUrl, itemUuid )

    # The character encoding for the email.
    CHARSET = "UTF-8"

    # Create a new SES resource and specify a region.
    client = boto3.client('ses')

    # Try to send the email.
    try:
        #Provide the contents of the email.
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    recipientEmail,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': CHARSET,
                        'Data': BODY_HTML,
                    },
                    'Text': {
                        'Charset': CHARSET,
                        'Data': BODY_TEXT,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': SUBJECT,
                },
            },
            Source="psst@dayspring-tech.net",
        )
    # Display an error if something goes wrong.	
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['ResponseMetadata']['RequestId'])
