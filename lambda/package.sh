#!/bin/bash
aws cloudformation package --template-file template.yaml --s3-bucket jrw-psst-lambda --output-template-file packaged-template.yaml

