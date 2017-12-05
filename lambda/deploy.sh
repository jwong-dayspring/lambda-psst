#!/bin/bash
aws cloudformation deploy --template-file /Users/jwong/projects/ed-day-lambda/lambda/packaged-template.yaml --stack-name jrw-psst-lambda2 --capabilities CAPABILITY_IAM

