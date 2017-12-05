from __future__ import print_function

import json
import boto3
import os
import uuid


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
            'uuid': event['pathParameters']['resourceId']
        }
    )
    item = response['Item']
    print(item)
    
    return {
        'statusCode': 200,
        'body': json.dumps(item),
        'headers': {
            'Content-Type': 'application/json',
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
            'uuid': itemUuid,
            'content': body['content']
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps({'uuid':itemUuid}),
        'headers': {
            'Content-Type': 'application/json',
        },
    }
    
def delete(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    print("value1 = " + event['resource'])
    print("value2 = " + event['pathParameters']['resourceId'])

    response = table.delete_item(
        Key={
            'uuid': event['pathParameters']['resourceId']
        }
    )
    print(response)
    
    return {
        'statusCode': response['ResponseMetadata']['HTTPStatusCode']
    }    
    