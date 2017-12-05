


from __future__ import print_function

import json

print('Loading function')


def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    print("value1 = " + event['resource'])
    print("value2 = " + event['pathParameters']['resourceId'])
    return {
        'statusCode': 200,
        'body': '["hello world"]',
        'headers': {
            'Content-Type': 'application/json',
        },
    }
    